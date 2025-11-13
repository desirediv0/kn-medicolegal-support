"use client";

import {
    Suspense,
    useCallback,
    useEffect,
    useMemo,
    useState,
    useRef,
} from "react";
import { useDropzone } from "react-dropzone";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Paperclip,
    Loader2,
    X,
    UserCircle2,
    Download,
    Plus,
    SendHorizontal,
} from "lucide-react";
import imageCompression from "browser-image-compression";
import { format, formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const POLL_INTERVAL = 8000;

const IMAGE_COMPRESSION_OPTIONS = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1600,
    useWebWorker: true,
};

async function processFileForUpload(file) {
    if (!file?.type?.startsWith("image/")) {
        return file;
    }

    try {
        const compressed = await imageCompression(file, IMAGE_COMPRESSION_OPTIONS);
        return new File([compressed], file.name, {
            type: compressed.type,
            lastModified: Date.now(),
        });
    } catch (error) {
        console.warn("Image compression failed, using original file", error);
        return file;
    }
}

const formatFileSize = (bytes) => {
    if (typeof bytes !== "number" || Number.isNaN(bytes)) {
        return "";
    }
    const units = ["B", "KB", "MB", "GB"];
    let value = bytes;
    let unitIndex = 0;
    while (value >= 1024 && unitIndex < units.length - 1) {
        value /= 1024;
        unitIndex += 1;
    }
    const precision = value < 10 && unitIndex > 0 ? 1 : 0;
    return `${value.toFixed(precision)} ${units[unitIndex]}`;
};

const isImageMimeType = (mime) =>
    typeof mime === "string" && mime.toLowerCase().startsWith("image/");

const isVideoMimeType = (mime) =>
    typeof mime === "string" && mime.toLowerCase().startsWith("video/");

const getAttachmentName = (file) =>
    file?.fileName || file?.name || "attachment";

const formatMessageTime = (timestamp) => {
    if (!timestamp) return "";
    try {
        return format(new Date(timestamp), "hh:mm a");
    } catch (error) {
        return "";
    }
};

const getActivityTimestamp = (question) => {
    if (!question) return 0;
    const latest = question.latestMessage?.createdAt;
    const updated = question.updatedAt;
    const created = question.createdAt;
    return latest
        ? new Date(latest).getTime()
        : updated
            ? new Date(updated).getTime()
            : created
                ? new Date(created).getTime()
                : 0;
};

const sortQuestionsByRecent = (list = []) =>
    [...list].sort(
        (a, b) => getActivityTimestamp(b) - getActivityTimestamp(a)
    );

const StatusChip = ({ status }) => {
    const map = useMemo(
        () => ({
            PENDING: "bg-yellow-100 text-yellow-800",
            ACTIVE: "bg-green-100 text-green-800",
            CLOSED: "bg-gray-200 text-gray-700",
        }),
        []
    );
    return (
        <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${map[status] || "bg-gray-200 text-gray-700"
                }`}
        >
            {status}
        </span>
    );
};

function AdminQuestionsContent() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentQuestionId = searchParams.get("question");
    const currencyFormatter = useMemo(
        () =>
            new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 2,
            }),
        []
    );

    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loadingQuestions, setLoadingQuestions] = useState(false);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
    const [messageInput, setMessageInput] = useState("");
    const [sending, setSending] = useState(false);
    const [readCounts, setReadCounts] = useState({});
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deletingConversation, setDeletingConversation] = useState(false);
    const selectedQuestionRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const shouldStickToBottomRef = useRef(true);
    const initialMessagesRenderRef = useRef(true);

    const fetchQuestions = useCallback(async () => {
        if (status !== "authenticated") return;
        setLoadingQuestions(true);
        try {
            const response = await fetch("/api/questions?limit=15", { cache: "no-store" });
            if (!response.ok) throw new Error("Failed to fetch questions");
            const data = await response.json();
            let fetched = sortQuestionsByRecent(data.questions ?? []);

            const currentSelected = selectedQuestionRef.current;
            if (currentSelected) {
                const match = fetched.find((q) => q.id === currentSelected.id);
                if (match) {
                    setSelectedQuestion((prev) => {
                        if (!prev) return prev;
                        const prevLatestId = prev.latestMessage?.id ?? null;
                        const nextLatestId = match.latestMessage?.id ?? null;
                        if (
                            prev.messageCount === (match.messageCount ?? prev.messageCount) &&
                            prevLatestId === nextLatestId &&
                            prev.status === match.status &&
                            prev.paymentStatus === match.paymentStatus &&
                            prev.adminId === match.adminId
                        ) {
                            return prev;
                        }
                        return { ...prev, ...match };
                    });
                } else {
                    try {
                        const detailRes = await fetch(`/api/questions/${currentSelected.id}`, {
                            cache: "no-store",
                        });
                        if (detailRes.ok) {
                            const detailData = await detailRes.json();
                            const detail = detailData.question;
                            if (detail) {
                                const latest = detail.chats?.[detail.chats.length - 1] ?? null;
                                const hydrated = {
                                    id: detail.id,
                                    title: detail.title,
                                    description: detail.description,
                                    status: detail.status,
                                    paymentStatus: detail.paymentStatus,
                                    price: detail.price != null ? Number(detail.price) : null,
                                    userId: detail.userId,
                                    adminId: detail.adminId,
                                    createdAt: detail.createdAt,
                                    updatedAt: detail.updatedAt,
                                    closedAt: detail.closedAt,
                                    user: detail.user,
                                    admin: detail.admin,
                                    messageCount: detail.chats?.length ?? 0,
                                    latestMessage: latest,
                                };
                                fetched = sortQuestionsByRecent([hydrated, ...fetched]).slice(0, 15);
                                setSelectedQuestion((prev) => {
                                    if (!prev || prev.id !== hydrated.id) return prev;
                                    const prevLatestId = prev.latestMessage?.id ?? null;
                                    const nextLatestId = hydrated.latestMessage?.id ?? null;
                                    if (
                                        prev.messageCount === hydrated.messageCount &&
                                        prevLatestId === nextLatestId &&
                                        prev.status === hydrated.status &&
                                        prev.paymentStatus === hydrated.paymentStatus &&
                                        prev.adminId === hydrated.adminId
                                    ) {
                                        return prev;
                                    }
                                    return { ...prev, ...hydrated };
                                });
                            }
                        }
                    } catch (err) {
                        console.error("Failed to hydrate selected question", err);
                    }
                }
            }

            setQuestions(sortQuestionsByRecent(fetched));
            setReadCounts((prev) => {
                const next = { ...prev };
                fetched.forEach((question) => {
                    if (next[question.id] == null) {
                        next[question.id] = question.messageCount ?? 0;
                    }
                });
                return next;
            });
        } catch (error) {
            console.error(error);
            toast.error(error?.message || "Unable to load questions");
        } finally {
            setLoadingQuestions(false);
        }
    }, [status]);

    const fetchMessages = useCallback(async (questionId, { silent = false } = {}) => {
        if (!questionId) return;
        if (!silent) {
            setLoadingMessages(true);
        }
        try {
            const response = await fetch(`/api/questions/${questionId}/messages`, {
                cache: "no-store",
            });
            if (!response.ok) throw new Error("Failed to fetch messages");
            const data = await response.json();
            const nextMessages = data.messages ?? [];
            setMessages(nextMessages);
            setReadCounts((prev) => ({
                ...prev,
                [questionId]: data.messages?.length ?? 0,
            }));
            const latest = data.messages?.[data.messages.length - 1] ?? null;
            setQuestions((prevQuestions) => {
                const updated = prevQuestions.map((q) =>
                    q.id === questionId
                        ? {
                            ...q,
                            messageCount: data.messages?.length ?? q.messageCount ?? 0,
                            latestMessage: latest ?? q.latestMessage,
                        }
                        : q
                );
                return sortQuestionsByRecent(updated);
            });
            setSelectedQuestion((prev) => {
                if (!prev || prev.id !== questionId) return prev;
                const nextMessageCount = data.messages?.length ?? prev.messageCount ?? 0;
                const prevLatestId = prev.latestMessage?.id ?? null;
                const nextLatestId = latest?.id ?? null;
                if (
                    prev.messageCount === nextMessageCount &&
                    prevLatestId === nextLatestId
                ) {
                    return prev;
                }
                return {
                    ...prev,
                    messageCount: nextMessageCount,
                    latestMessage: latest ?? prev.latestMessage,
                };
            });
        } catch (error) {
            console.error(error);
            toast.error(error?.message || "Unable to load messages");
        } finally {
            if (!silent) {
                setLoadingMessages(false);
            }
        }
    }, []);

    useEffect(() => {
        if (status === "authenticated") {
            fetchQuestions();
        } else if (status === "unauthenticated") {
            setQuestions([]);
            setSelectedQuestion(null);
        }
    }, [status, fetchQuestions]);

    useEffect(() => {
        if (loadingQuestions) return;
        if (!questions.length) {
            if (selectedQuestion) setSelectedQuestion(null);
            if (currentQuestionId)
                router.replace("/dashboard/questions", { scroll: false });
            return;
        }

        if (currentQuestionId) {
            const match = questions.find((q) => q.id === currentQuestionId);
            if (match) {
                if (!selectedQuestion || selectedQuestion.id !== match.id) {
                    setSelectedQuestion(match);
                }
                return;
            }
            router.replace("/dashboard/questions", { scroll: false });
            setSelectedQuestion(null);
        }
    }, [questions, currentQuestionId, router, selectedQuestion, loadingQuestions]);

    useEffect(() => {
        if (!selectedQuestion?.id) {
            setMessages([]);
            return;
        }
        fetchMessages(selectedQuestion.id);
        const interval = setInterval(
            () => fetchMessages(selectedQuestion.id, { silent: true }),
            POLL_INTERVAL
        );
        return () => clearInterval(interval);
    }, [selectedQuestion, fetchMessages]);

    useEffect(() => {
        selectedQuestionRef.current = selectedQuestion;
    }, [selectedQuestion]);

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;
        const handleScroll = () => {
            const threshold = 120;
            const distanceFromBottom =
                container.scrollHeight - (container.scrollTop + container.clientHeight);
            shouldStickToBottomRef.current = distanceFromBottom <= threshold;
        };
        container.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollMessagesToBottom = useCallback(
        (behavior = "smooth") => {
            const container = messagesContainerRef.current;
            if (!container) return;
            container.scrollTo({
                top: container.scrollHeight,
                behavior,
            });
        },
        []
    );

    useEffect(() => {
        if (initialMessagesRenderRef.current) {
            initialMessagesRenderRef.current = false;
            scrollMessagesToBottom("auto");
            return;
        }
        if (!shouldStickToBottomRef.current) {
            return;
        }
        scrollMessagesToBottom();
    }, [messages, scrollMessagesToBottom]);

    const onDrop = useCallback((acceptedFiles) => {
        const mapped = acceptedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            id: `${file.name}-${file.size}-${file.lastModified}`,
        }));
        setAttachments((prev) => [...prev, ...mapped]);
    }, []);

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        multiple: true,
        maxSize: 25 * 1024 * 1024,
        noClick: true,
        noKeyboard: true,
        accept: {
            "application/pdf": [".pdf"],
            "image/*": [".png", ".jpg", ".jpeg", ".webp"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                [".docx"],
            "video/*": [".mp4", ".mov", ".m4v", ".webm"],
        },
    });

    const removeAttachment = useCallback((id) => {
        setAttachments((prev) => {
            const target = prev.find((item) => item.id === id);
            if (target?.preview) {
                URL.revokeObjectURL(target.preview);
            }
            return prev.filter((item) => item.id !== id);
        });
    }, []);

    const handleQuestionSelect = useCallback(
        (question) => {
            if (!question) return;
            setSelectedQuestion(question);
            shouldStickToBottomRef.current = true;
            initialMessagesRenderRef.current = true;
            setReadCounts((prev) => ({
                ...prev,
                [question.id]: question.messageCount ?? 0,
            }));
            if (currentQuestionId !== question.id) {
                router.replace(`/dashboard/questions?question=${question.id}`, {
                    scroll: false,
                });
            }
            fetchMessages(question.id);
            setIsMobileDrawerOpen(false);
        },
        [currentQuestionId, fetchMessages, router]
    );

    const renderQuestionList = () => {
        if (loadingQuestions) {
            return (
                <p className="p-4 text-sm text-muted-foreground">
                    Loading questions...
                </p>
            );
        }

        if (questions.length === 0) {
            return (
                <p className="p-4 text-sm text-muted-foreground">
                    No questions yet.
                </p>
            );
        }

        return (
            <ul className="divide-y divide-white/10">
                {questions.map((question) => {
                    const lastActivity =
                        question.latestMessage?.createdAt || question.updatedAt;
                    const lastMessagePreview =
                        question.latestMessage?.body?.trim() || "No messages yet";
                    const amountText =
                        question.price != null
                            ? currencyFormatter.format(Number(question.price))
                            : "—";
                    const unread = Math.max(
                        0,
                        (question.messageCount ?? 0) - (readCounts[question.id] ?? 0)
                    );

                    return (
                        <li
                            key={question.id}
                            className={cn(
                                "px-4 py-3 space-y-1 cursor-pointer transition rounded-lg border border-transparent hover:border-primary/40 hover:bg-primary/5",
                                selectedQuestion?.id === question.id
                                    ? "bg-primary/10 border-primary/50"
                                    : unread > 0
                                        ? "bg-primary/5 border-primary/30"
                                        : "bg-white/5"
                            )}
                            onClick={() => handleQuestionSelect(question)}
                        >
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium truncate">{question.title}</p>
                                        {unread > 0 && (
                                            <span className="inline-flex items-center justify-center rounded-full bg-primary px-2 text-[10px] font-semibold text-primary-foreground">
                                                {unread > 99 ? "99+" : unread}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[11px] text-muted-foreground">
                                        {lastActivity
                                            ? `Updated ${formatDistanceToNow(new Date(lastActivity), {
                                                addSuffix: true,
                                            })}`
                                            : "No activity yet"}
                                    </span>
                                </div>
                                <StatusChip status={question.status} />
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground truncate">
                                <UserCircle2 className="h-3 w-3" />
                                <span>{question.user?.email ?? "Unknown"}</span>
                            </div>
                            <p className="text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:gap-2">
                                <span>Amount: {amountText}</span>
                                <span className="hidden sm:inline text-muted-foreground/60">
                                    •
                                </span>
                                <span className="capitalize">
                                    Payment: {question.paymentStatus?.toLowerCase()}
                                </span>
                            </p>
                            <p className="text-xs text-foreground italic truncate">
                                {question.latestMessage?.sender?.role
                                    ? `${question.latestMessage.sender.role === "ADMIN"
                                        ? "You"
                                        : "User"
                                    }: `
                                    : ""}
                                {lastMessagePreview}
                            </p>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const ensureAssignment = async () => {
        if (!session?.user?.id || !selectedQuestion?.id) return;
        if (selectedQuestion.adminId === session.user.id) return;
        try {
            const res = await fetch(`/api/questions/${selectedQuestion.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adminId: session.user.id }),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to claim question");
            }
            const { question } = await res.json();
            setQuestions((prev) =>
                sortQuestionsByRecent(
                    prev.map((q) => (q.id === question.id ? question : q))
                )
            );
            setSelectedQuestion(question);
        } catch (error) {
            console.error(error);
            toast.error(error?.message || "Unable to claim question");
        }
    };

    const uploadAttachment = async ({ file, originalName }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", originalName);

        const uploadRes = await fetch("/api/uploads", {
            method: "POST",
            body: formData,
        });

        if (!uploadRes.ok) {
            const data = await uploadRes.json().catch(() => ({}));
            throw new Error(data.error || `Upload failed for ${originalName}`);
        }

        const data = await uploadRes.json();

        return {
            fileName: data.fileName ?? originalName,
            fileSize: data.fileSize ?? file.size,
            mimeType: data.mimeType ?? file.type,
            url: data.url,
            key: data.key,
        };
    };

    const sendMessage = async () => {
        if (!selectedQuestion?.id) {
            toast.error("Select a question first");
            return;
        }
        if (selectedQuestion.status === "CLOSED") {
            toast.error("Conversation closed");
            return;
        }
        if (!messageInput.trim() && attachments.length === 0) {
            return;
        }

        setSending(true);
        try {
            await ensureAssignment();
            let uploaded = [];
            if (attachments.length) {
                uploaded = await Promise.all(
                    attachments.map(async (item) => {
                        const processedFile = await processFileForUpload(item.file);
                        return uploadAttachment({
                            file: processedFile,
                            originalName: item.file.name,
                        });
                    })
                );
            }

            const res = await fetch(
                `/api/questions/${selectedQuestion.id}/messages`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        message: messageInput.trim(),
                        attachments: uploaded,
                    }),
                }
            );

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to send message");
            }

            const { message } = await res.json();
            shouldStickToBottomRef.current = true;
            setMessages((prev) => {
                const next = [...prev, message];
                setReadCounts((counts) => ({
                    ...counts,
                    [selectedQuestion.id]: next.length,
                }));
                setQuestions((prevQuestions) => {
                    const updated = prevQuestions.map((q) =>
                        q.id === selectedQuestion.id
                            ? {
                                ...q,
                                latestMessage: message,
                                messageCount: next.length,
                            }
                            : q
                    );
                    return sortQuestionsByRecent(updated);
                });
                setSelectedQuestion((prevSelected) =>
                    prevSelected && prevSelected.id === selectedQuestion.id
                        ? {
                            ...prevSelected,
                            latestMessage: message,
                            messageCount: next.length,
                        }
                        : prevSelected
                );
                return next;
            });
            setMessageInput("");
            attachments.forEach((item) => item.preview && URL.revokeObjectURL(item.preview));
            setAttachments([]);
        } catch (error) {
            console.error(error);
            toast.error(error?.message || "Unable to send message");
        } finally {
            setSending(false);
        }
    };

    const closeConversation = async () => {
        if (!selectedQuestion?.id) return;
        try {
            const res = await fetch(`/api/questions/${selectedQuestion.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "CLOSED" }),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to close conversation");
            }
            const { question } = await res.json();
            setQuestions((prev) =>
                sortQuestionsByRecent(
                    prev.map((q) => (q.id === question.id ? question : q))
                )
            );
            setSelectedQuestion(question);
            toast.success("Conversation closed.");
        } catch (error) {
            console.error(error);
            toast.error(error?.message || "Unable to close conversation");
        }
    };

    const reopenConversation = async () => {
        if (!selectedQuestion?.id) return;
        try {
            const res = await fetch(`/api/questions/${selectedQuestion.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "ACTIVE" }),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to reopen conversation");
            }
            const { question } = await res.json();
            setQuestions((prev) =>
                sortQuestionsByRecent(
                    prev.map((q) => (q.id === question.id ? question : q))
                )
            );
            setSelectedQuestion(question);
            toast.success("Conversation reopened.");
        } catch (error) {
            console.error(error);
            toast.error(error?.message || "Unable to reopen conversation");
        }
    };

    const handleDeleteConversation = async (deleteAttachments) => {
        if (!selectedQuestion?.id || deletingConversation) return;
        setDeletingConversation(true);
        try {
            const response = await fetch(`/api/questions/${selectedQuestion.id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ deleteAttachments }),
            });
            let payload = {};
            try {
                payload = await response.json();
            } catch (error) {
                payload = {};
            }
            if (!response.ok) {
                throw new Error(payload.error || "Failed to delete conversation");
            }
            attachments.forEach((item) => item.preview && URL.revokeObjectURL(item.preview));
            setAttachments([]);
            setQuestions((prev) =>
                sortQuestionsByRecent(prev.filter((q) => q.id !== selectedQuestion.id))
            );
            setReadCounts((prev) => {
                const next = { ...prev };
                delete next[selectedQuestion.id];
                return next;
            });
            setSelectedQuestion(null);
            setMessages([]);
            setMessageInput("");
            setDeleteDialogOpen(false);
            const deletedAttachments = payload.deletedAttachments ?? 0;
            toast.success(
                deleteAttachments
                    ? deletedAttachments
                        ? `Conversation and ${deletedAttachments} attachment${deletedAttachments === 1 ? "" : "s"
                        } deleted.`
                        : "Conversation deleted. No attachments found to remove."
                    : "Conversation deleted."
            );
            if (currentQuestionId) {
                router.replace(`/dashboard/questions`, { scroll: false });
            }
            setTimeout(() => fetchQuestions(), 0);
        } catch (error) {
            console.error(error);
            toast.error(error?.message || "Unable to delete conversation");
        } finally {
            setDeletingConversation(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 md:flex-row md:gap-6 min-h-[calc(100svh-4rem)] md:min-h-[calc(100dvh-4rem)] text-foreground">
            <div className="md:hidden flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/20 bg-white/80 px-4 py-3 shadow-sm">
                <div className="min-w-0">
                    <h2 className="text-base font-semibold">Questions</h2>
                    <p className="text-xs text-muted-foreground">
                        {selectedQuestion?.title ?? "Select a conversation to get started"}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsMobileDrawerOpen(true)}
                    >
                        Queue
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                        <Link href="/dashboard/questions/history">History</Link>
                    </Button>
                    <Button
                        size="sm"
                        onClick={fetchQuestions}
                        disabled={loadingQuestions}
                    >
                        {loadingQuestions ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            "Refresh"
                        )}
                    </Button>
                </div>
            </div>

            <Dialog open={isMobileDrawerOpen} onOpenChange={setIsMobileDrawerOpen}>
                <DialogContent className="max-w-lg w-[90vw] sm:w-[480px] p-0">
                    <DialogHeader className="px-4 pt-4 pb-2 text-left">
                        <DialogTitle className="text-lg font-semibold">
                            Questions Queue
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                            Latest conversations appear first.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="px-4 pb-4 space-y-3">
                        <div className="flex items-center gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={fetchQuestions}
                                disabled={loadingQuestions}
                                className="flex-1"
                            >
                                {loadingQuestions ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    "Refresh"
                                )}
                            </Button>
                            <Button size="sm" variant="outline" asChild className="flex-1">
                                <Link href="/dashboard/questions/history">History</Link>
                            </Button>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto rounded-lg border border-primary/20 bg-white/70 p-2 shadow-inner">
                            {renderQuestionList()}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <aside className="hidden md:flex md:w-80 lg:w-96 flex-col rounded-xl border border-primary/20 bg-white/90 shadow-sm">
                <div className="p-4 flex items-center justify-between gap-2 border-b border-primary/10">
                    <h2 className="text-lg font-semibold">Questions</h2>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/dashboard/questions/history">History</Link>
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={fetchQuestions}
                            disabled={loadingQuestions}
                        >
                            {loadingQuestions ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                "Refresh"
                            )}
                        </Button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    {renderQuestionList()}
                </div>
            </aside>

            <main className="flex-1 flex min-h-0 flex-col rounded-xl border border-muted/40 bg-white/95 shadow-sm">
                {!selectedQuestion ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center text-muted-foreground">
                        <p>Select a question from the queue to review or respond.</p>
                        <Button
                            variant="outline"
                            onClick={fetchQuestions}
                            disabled={loadingQuestions}
                        >
                            {loadingQuestions ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                "Refresh Queue"
                            )}
                        </Button>
                    </div>
                ) : (
                    <>
                        <header className="rounded-t-xl border-b border-muted/40 bg-white/95 p-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                            <div className="space-y-1">
                                <h3 className="text-xl font-semibold">{selectedQuestion.title}</h3>
                                {selectedQuestion.description && (
                                    <p className="text-sm text-muted-foreground">
                                        {selectedQuestion.description}
                                    </p>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    From: {selectedQuestion.user?.name ?? "Anonymous"} (
                                    {selectedQuestion.user?.email ?? "N/A"})
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Amount:{" "}
                                    {selectedQuestion.price != null
                                        ? currencyFormatter.format(Number(selectedQuestion.price))
                                        : "—"}{" "}
                                    • Payment: {selectedQuestion.paymentStatus?.toLowerCase()}
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                {selectedQuestion.adminId !== session?.user?.id && (
                                    <Button variant="outline" onClick={ensureAssignment}>
                                        Claim Conversation
                                    </Button>
                                )}
                                {selectedQuestion.status === "CLOSED" ? (
                                    <Button variant="secondary" onClick={reopenConversation}>
                                        Reopen
                                    </Button>
                                ) : (
                                    <Button
                                        variant="secondary"
                                        onClick={closeConversation}
                                        disabled={!selectedQuestion}
                                    >
                                        Close Conversation
                                    </Button>
                                )}
                                <Button
                                    variant="destructive"
                                    onClick={() => setDeleteDialogOpen(true)}
                                    disabled={deletingConversation}
                                >
                                    Delete Conversation
                                </Button>
                            </div>
                        </header>

                        <section
                            ref={messagesContainerRef}
                            className="flex-1 overflow-y-auto p-4 pb-24 sm:pb-28 space-y-4 scroll-smooth"
                        >
                            {loadingMessages ? (
                                <div className="flex h-full min-h-[160px] items-center justify-center text-sm text-muted-foreground">
                                    <span className="inline-flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1">
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        Syncing conversation…
                                    </span>
                                </div>
                            ) : messages.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    No messages yet. Reply to start the conversation.
                                </p>
                            ) : (
                                messages.map((msg) => {
                                    const isAdminMessage = msg.sender?.role === "ADMIN";
                                    const senderLabel = isAdminMessage
                                        ? "You"
                                        : msg.sender?.name || msg.sender?.email || "User";
                                    const messageTime = formatMessageTime(msg.createdAt);

                                    return (
                                        <div
                                            key={msg.id}
                                            className={cn(
                                                "flex",
                                                isAdminMessage ? "justify-end" : "justify-start"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "max-w-lg rounded-2xl px-4 py-3 shadow-sm space-y-2",
                                                    isAdminMessage
                                                        ? "bg-primary/10 text-foreground"
                                                        : "bg-muted/30 text-foreground"
                                                )}
                                            >
                                                <div>
                                                    <span className="inline-flex select-none items-center rounded-full bg-muted/70 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                                                        {senderLabel}
                                                    </span>
                                                </div>
                                                {msg.body && (
                                                    <p className="text-sm whitespace-pre-line leading-relaxed">
                                                        {msg.body}
                                                    </p>
                                                )}
                                                {msg.files?.length > 0 && (
                                                    <div className="space-y-3 pt-1">
                                                        {msg.files.map((file, index) => {
                                                            const key =
                                                                file?.id ??
                                                                file?.key ??
                                                                file?.url ??
                                                                file?.fileName ??
                                                                `file-${index}`;
                                                            const mime =
                                                                file?.mimeType ||
                                                                file?.mediaType ||
                                                                file?.type ||
                                                                "";
                                                            const fileName = getAttachmentName(file);
                                                            const fileSizeLabel = file?.fileSize
                                                                ? formatFileSize(Number(file.fileSize))
                                                                : "";

                                                            if (!file?.url) {
                                                                return (
                                                                    <div
                                                                        key={key}
                                                                        className="rounded-lg border border-muted/40 bg-muted/20 px-3 py-2 text-xs italic text-muted-foreground"
                                                                    >
                                                                        Attachment removed by admin.
                                                                    </div>
                                                                );
                                                            }

                                                            if (isImageMimeType(mime)) {
                                                                return (
                                                                    <figure
                                                                        key={key}
                                                                        className="overflow-hidden rounded-xl border border-muted/40 bg-white"
                                                                    >
                                                                        <a
                                                                            href={file.url}
                                                                            download={fileName}
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                            className="block"
                                                                        >
                                                                            <Image
                                                                                width={256}
                                                                                height={256}
                                                                                src={file.url}
                                                                                alt={fileName}
                                                                                className="max-h-64 w-full object-cover"
                                                                            />
                                                                        </a>
                                                                        <figcaption className="flex items-center justify-between gap-3 px-3 py-2 text-xs text-muted-foreground">
                                                                            <span className="truncate font-medium text-foreground">
                                                                                {fileName}
                                                                            </span>
                                                                            <a
                                                                                href={file.url}
                                                                                download={fileName}
                                                                                className="inline-flex items-center gap-1 rounded-full border border-primary/30 px-2 py-1 text-[11px] font-semibold text-primary hover:border-primary/50 hover:text-primary"
                                                                            >
                                                                                <Download className="h-3 w-3" />
                                                                                Download
                                                                            </a>
                                                                        </figcaption>
                                                                    </figure>
                                                                );
                                                            }

                                                            if (isVideoMimeType(mime)) {
                                                                return (
                                                                    <div
                                                                        key={key}
                                                                        className="overflow-hidden rounded-xl border border-muted/40 bg-white"
                                                                    >
                                                                        <div className="bg-black">
                                                                            <video
                                                                                controls
                                                                                className="max-h-72 w-full"
                                                                                preload="metadata"
                                                                            >
                                                                                <source src={file.url} type={mime} />
                                                                                Your browser does not support embedded
                                                                                videos.{" "}
                                                                                <a href={file.url} download={fileName}>
                                                                                    Download instead.
                                                                                </a>
                                                                            </video>
                                                                        </div>
                                                                        <div className="flex items-center justify-between gap-3 px-3 py-2 text-xs text-muted-foreground">
                                                                            <div className="min-w-0">
                                                                                <p className="truncate font-medium text-foreground">
                                                                                    {fileName}
                                                                                </p>
                                                                                {fileSizeLabel && (
                                                                                    <p className="text-[11px] text-muted-foreground/70">
                                                                                        {fileSizeLabel}
                                                                                    </p>
                                                                                )}
                                                                            </div>
                                                                            <a
                                                                                href={file.url}
                                                                                download={fileName}
                                                                                className="inline-flex items-center gap-1 rounded-full border border-primary/30 px-2 py-1 text-[11px] font-semibold text-primary hover:border-primary/50 hover:text-primary"
                                                                            >
                                                                                <Download className="h-3 w-3" />
                                                                                Download
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }

                                                            return (
                                                                <a
                                                                    key={key}
                                                                    href={file.url}
                                                                    download={fileName}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="flex items-center justify-between gap-3 rounded-lg border border-muted/50 bg-white px-3 py-2 text-xs text-muted-foreground transition hover:border-primary/40 hover:bg-primary/5"
                                                                >
                                                                    <span className="flex items-center gap-2">
                                                                        <Paperclip className="h-3 w-3 text-primary" />
                                                                        <span className="truncate font-medium text-foreground">
                                                                            {fileName}
                                                                        </span>
                                                                    </span>
                                                                    {fileSizeLabel && (
                                                                        <span className="text-[11px] text-muted-foreground/70">
                                                                            {fileSizeLabel}
                                                                        </span>
                                                                    )}
                                                                </a>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                                {messageTime && (
                                                    <div className="flex justify-end text-[11px] font-medium text-muted-foreground/70">
                                                        {messageTime}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </section>

                        <footer
                            {...getRootProps({
                                className: cn(
                                    "sticky bottom-0 border-t border-muted/40 bg-white/90 p-2 backdrop-blur supports-[backdrop-filter]:bg-white/70 transition-colors",
                                    isDragActive && "border-primary/40 bg-primary/10"
                                ),
                            })}
                        >
                            <input {...getInputProps()} />
                            <div className="flex flex-col gap-3">
                                <div
                                    className={cn(
                                        "flex items-end gap-2 rounded-full border border-muted/40 bg-white/95 px-3 py-2 shadow-sm transition focus-within:border-primary",
                                        isDragActive && "border-primary bg-primary/10"
                                    )}
                                >
                                    <button
                                        type="button"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            open();
                                        }}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/40 text-muted-foreground transition hover:bg-muted/60 hover:text-foreground my-auto"
                                        aria-label="Add attachments"
                                    >
                                        <Plus className="h-5 w-5" />
                                    </button>
                                    <Input

                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault();
                                                if (selectedQuestion.status !== "CLOSED" && !sending) {
                                                    sendMessage();
                                                }
                                            }
                                        }}
                                        className="flex-1 resize-none border-none bg-transparent px-0 py-2 text-sm leading-6 focus-visible:ring-0 focus-visible:ring-offset-0 my-auto"
                                        placeholder="Type your reply..."
                                        disabled={selectedQuestion.status === "CLOSED"}
                                    />
                                    <div className="flex items-center gap-2">

                                        <Button
                                            type="button"
                                            onClick={sendMessage}
                                            disabled={selectedQuestion.status === "CLOSED" || sending}
                                            className="h-11 w-11 rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 my-auto"
                                            size="icon"
                                        >
                                            {sending ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <SendHorizontal className="h-5 w-5" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                                {attachments.length > 0 && (
                                    <div className="space-y-2">
                                        {attachments.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center justify-between rounded-xl border border-muted/50 bg-white/90 px-3 py-2 text-sm shadow-sm"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                                        <Paperclip className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="max-w-[200px] truncate font-medium text-foreground sm:max-w-[280px]">
                                                            {item.file.name}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {formatFileSize(item.file.size)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                        removeAttachment(item.id);
                                                    }}
                                                    className="rounded-full p-1.5 text-muted-foreground transition hover:bg-muted/40 hover:text-foreground"
                                                    aria-label="Remove attachment"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <p className="text-[11px] text-muted-foreground/70 mx-auto">
                                    Enter sends
                                    {isDragActive
                                        ? " • Drop files to attach"
                                        : " • Drag files here to attach"}
                                </p>
                                {selectedQuestion.status === "CLOSED" && (
                                    <p className="text-[11px] text-destructive">
                                        This conversation is closed.
                                    </p>
                                )}
                            </div>
                        </footer>
                    </>
                )}
            </main>

            <Dialog
                open={deleteDialogOpen}
                onOpenChange={(open) => {
                    if (deletingConversation) return;
                    setDeleteDialogOpen(open);
                }}
            >
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete this conversation?</DialogTitle>
                        <DialogDescription>
                            This will remove the entire chat for {selectedQuestion?.user?.email ?? "the user"}.
                            You can also delete any files that were uploaded in this thread.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 text-sm text-muted-foreground">
                        <p>
                            Deleting the conversation cannot be undone. If you also remove the media, the files
                            will be permanently deleted from DigitalOcean Spaces.
                        </p>
                        <p className="text-xs text-muted-foreground/80">
                            Tip: choose “Delete chat only” to keep the files available in the media library.
                        </p>
                    </div>
                    <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                            disabled={deletingConversation}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => handleDeleteConversation(false)}
                            disabled={deletingConversation}
                        >
                            {deletingConversation ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Deleting…
                                </span>
                            ) : (
                                "Delete chat only"
                            )}
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => handleDeleteConversation(true)}
                            disabled={deletingConversation}
                        >
                            {deletingConversation ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Deleting files…
                                </span>
                            ) : (
                                "Delete chat & media"
                            )}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function QuestionsFallback() {
    return (
        <div className="flex h-[100dvh] items-center justify-center bg-gray-50 text-sm text-gray-500">
            Loading questions workspace…
        </div>
    );
}

export default function AdminQuestionsPage() {
    return (
        <Suspense fallback={<QuestionsFallback />}>
            <AdminQuestionsContent />
        </Suspense>
    );
}
