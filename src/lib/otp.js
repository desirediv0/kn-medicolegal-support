import { randomInt } from "crypto";
import { addMinutes, isBefore } from "date-fns";
import { prisma } from "./prisma";

const OTP_VALIDITY_MINUTES = 10;

export function generateOtp() {
  return Array.from({ length: 6 })
    .map(() => randomInt(0, 10))
    .join("");
}

export async function createOtp(email) {
  const otp = generateOtp();
  const expiresAt = addMinutes(new Date(), OTP_VALIDITY_MINUTES);

  await prisma.emailOtp.create({
    data: {
      email: email.toLowerCase(),
      otp,
      expiresAt,
    },
  });

  return { otp, expiresAt };
}

export async function verifyOtp(email, otp) {
  console.log("Verifying OTP for:", email, "Input OTP:", otp);

  const record = await prisma.emailOtp.findFirst({
    where: {
      email: email.toLowerCase(),
      consumed: false,
    },
    orderBy: { createdAt: "desc" },
  });

  console.log("Found record:", record);

  if (!record) {
    return { valid: false, reason: "OTP not found" };
  }

  if (isBefore(record.expiresAt, new Date())) {
    return { valid: false, reason: "OTP expired" };
  }

  // Check if otp field exists
  if (!record.otp) {
    console.log("OTP field is null/empty in database record");
    return { valid: false, reason: "OTP not found in database" };
  }

  // Direct string comparison - no hashing
  console.log("Comparing:", record.otp, "with", otp);
  if (record.otp !== otp) {
    return { valid: false, reason: "Invalid OTP" };
  }

  await prisma.emailOtp.update({
    where: { id: record.id },
    data: { consumed: true },
  });

  return { valid: true };
}

