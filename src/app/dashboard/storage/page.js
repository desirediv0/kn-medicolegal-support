"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import {
  Loader2,
  Trash2,
  RefreshCw,
  Download,
  Paperclip,
  Video,
} from "lucide-react";
import Image from "next/image";

const formatBytes = (bytes) => {
  if (!bytes && bytes !== 0) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(size < 10 && unitIndex > 0 ? 1 : 0)} ${units[unitIndex]}`;
};

const isImageMimeType = (mime) =>
  typeof mime === "string" && mime.toLowerCase().startsWith("image/");

const isVideoMimeType = (mime) =>
  typeof mime === "string" && mime.toLowerCase().startsWith("video/");

const getAttachmentName = (attachment) =>
  attachment?.fileName || attachment?.name || "attachment";

export default function StoragePage() {
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [selected, setSelected] = useState({});

  const fetchAttachments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/attachments?limit=200", {
        cache: "no-store",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to fetch attachments");
      }
      const data = await res.json();
      setAttachments(data.attachments ?? []);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Unable to load attachments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttachments();
  }, []);

  const selectedIds = useMemo(
    () => Object.entries(selected).filter(([_, value]) => value).map(([id]) => id),
    [selected]
  );

  const toggleSelection = (id, value) => {
    setSelected((prev) => ({ ...prev, [id]: value }));
  };

  const handleDelete = async (ids) => {
    if (!ids.length) return;
    setDeleting(true);
    try {
      await Promise.all(
        ids.map((id) =>
          fetch(`/api/admin/attachments/${id}`, {
            method: "DELETE",
          }).then((res) => {
            if (!res.ok) {
              throw new Error(`Failed to delete attachment ${id}`);
            }
          })
        )
      );
      toast.success(`Deleted ${ids.length} attachment${ids.length > 1 ? "s" : ""}`);
      setAttachments((prev) => prev.filter((attachment) => !ids.includes(attachment.id)));
      setSelected({});
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to delete attachment(s)");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Storage</h1>
          <p className="text-sm text-gray-500">
            Review and manage all files shared during consultations.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => fetchAttachments()}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </>
            )}
          </Button>
          <Button
            variant="destructive"
            disabled={!selectedIds.length || deleting}
            onClick={() => handleDelete(selectedIds)}
          >
            {deleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </>
            )}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Files</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading files…
            </div>
          ) : attachments.length === 0 ? (
            <p className="text-sm text-gray-500">No files uploaded yet.</p>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-2 py-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={
                        attachments.length > 0 &&
                        selectedIds.length === attachments.length
                      }
                      onChange={(event) => {
                        if (event.target.checked) {
                          const allSelected = attachments.reduce(
                            (acc, attachment) => ({ ...acc, [attachment.id]: true }),
                            {}
                          );
                          setSelected(allSelected);
                        } else {
                          setSelected({});
                        }
                      }}
                    />
                  </th>
                  <th className="px-3 py-2 text-left">Preview</th>
                  <th className="px-3 py-2 text-left">File</th>
                  <th className="px-3 py-2 text-left">Question</th>
                  <th className="px-3 py-2 text-left">User</th>
                  <th className="px-3 py-2 text-left">Size</th>
                  <th className="px-3 py-2 text-left">Uploaded</th>
                  <th className="px-3 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {attachments.map((attachment) => {
                  const isSelected = !!selected[attachment.id];
                  return (
                    <tr key={attachment.id} className="hover:bg-gray-50">
                      <td className="px-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4"
                          checked={isSelected}
                          onChange={(event) =>
                            toggleSelection(attachment.id, event.target.checked)
                          }
                        />
                      </td>
                      <td className="px-3 py-2">
                        {isImageMimeType(attachment.mimeType) ? (
                          <a
                            href={attachment.url}
                            download={getAttachmentName(attachment)}
                            target="_blank"
                            rel="noreferrer"
                            className="block h-16 w-24 overflow-hidden rounded-lg border border-gray-200 bg-gray-100"
                          >
                            <Image
                              src={attachment.url}
                              alt={getAttachmentName(attachment)}
                              width={96}
                              height={64}
                              className="h-full w-full object-cover"
                            />
                          </a>
                        ) : isVideoMimeType(attachment.mimeType) ? (
                          <div className="h-16 w-24 overflow-hidden rounded-lg border border-gray-200 bg-black">
                            <video
                              src={attachment.url}
                              className="h-full w-full object-cover"
                              muted
                              playsInline
                              controls
                              preload="metadata"
                            />
                          </div>
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-gray-300 bg-gray-50">
                            <Paperclip className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-2 max-w-xs">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800 truncate">
                            {attachment.fileName}
                          </span>
                          <span className="text-xs text-gray-500">
                            {attachment.mimeType}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2 max-w-xs">
                        {attachment.question ? (
                          <div className="flex flex-col">
                            <span className="text-gray-800 truncate">
                              {attachment.question.title}
                            </span>
                            {attachment.question.user?.email && (
                              <span className="text-xs text-gray-500">
                                {attachment.question.user.email}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2 max-w-[140px]">
                        {attachment.sender ? (
                          <div className="flex flex-col">
                            <span className="text-gray-800 truncate">
                              {attachment.sender.name ||
                                attachment.sender.email ||
                                attachment.sender.role}
                            </span>
                            <span className="text-xs text-gray-500">
                              {attachment.sender.role}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        {formatBytes(attachment.fileSize)}
                      </td>
                      <td className="px-3 py-2">
                        <span className="text-xs text-gray-600">
                          {formatDistanceToNow(new Date(attachment.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                          >
                            <a
                              href={attachment.url}
                              download={getAttachmentName(attachment)}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </a>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                          >
                            <a href={attachment.url} target="_blank" rel="noreferrer">
                              Preview
                            </a>
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete([attachment.id])}
                            disabled={deleting}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

