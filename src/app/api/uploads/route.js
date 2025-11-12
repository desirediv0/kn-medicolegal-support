import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { uploadBuffer } from "@/lib/storage";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB
const ALLOWED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "video/mp4",
  "video/quicktime",
  "video/webm",
];

export async function POST(request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData;
  try {
    formData = await request.formData();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid form submission" },
      { status: 400 }
    );
  }

  const file = formData.get("file");
  const providedName = formData.get("fileName");

  if (!file || typeof file !== "object" || typeof file.arrayBuffer !== "function") {
    return NextResponse.json(
      { error: "No file provided" },
      { status: 400 }
    );
  }

  const fileName = (typeof providedName === "string" && providedName.trim()) || file.name;
  const fileType = file.type;
  const fileSize = file.size;

  if (!fileName || !fileType || fileSize == null) {
    return NextResponse.json(
      { error: "Invalid file metadata" },
      { status: 400 }
    );
  }

  if (fileSize > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "File too large" },
      { status: 400 }
    );
  }

  const isAllowed =
    ALLOWED_TYPES.includes(fileType) ||
    fileType.startsWith("image/") ||
    fileType.startsWith("video/");

  if (!isAllowed) {
    return NextResponse.json(
      { error: "Unsupported file type" },
      { status: 400 }
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const { key, publicUrl } = await uploadBuffer({
      fileName,
      fileType,
      buffer,
    });

    return NextResponse.json({
      key,
      url: publicUrl,
      fileName,
      mimeType: fileType,
      fileSize,
    });
  } catch (error) {
    console.error("Direct upload error:", error);
    return NextResponse.json(
      { error: "Failed to store file" },
      { status: 500 }
    );
  }
}


