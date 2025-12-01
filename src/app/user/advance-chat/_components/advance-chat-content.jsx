"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Paperclip,
  X,
  Loader2,
  Download,
  Plus,
  SendHorizontal,
} from "lucide-react";
import imageCompression from "browser-image-compression";
import { format, formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const POLL_INTERVAL = 10000;

const QuestionStatusBadge = ({ status }) => {
  const colorMap = useMemo(
    () => ({
      PENDING: "bg-yellow-100 text-yellow-800",
      ACTIVE: "bg-green-100 text-green-800",
      CLOSED: "bg-gray-200 text-gray-700",
    }),
    []
  );

  return (
    <span
      className={`px-2 py-1 text-xs rounded-full font-medium ${colorMap[status] ?? "bg-gray-200 text-gray-700"
        }`}
    >
      {status}
    </span>
  );
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
  [...list].sort((a, b) => getActivityTimestamp(b) - getActivityTimestamp(a));

const truncateText = (text, maxLength = 60) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const ExpandableText = ({
  text,
  maxLength = 60,
  className = "",
  as: Component = "span",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text && text.length > maxLength;
  const displayText =
    isExpanded || !shouldTruncate ? text : truncateText(text, maxLength);

  if (!text) return null;

  return (
    <Component
      className={cn(
        shouldTruncate && "cursor-pointer hover:underline",
        className
      )}
      onClick={(e) => {
        e.stopPropagation();
        if (shouldTruncate) {
          setIsExpanded(!isExpanded);
        }
      }}
      title={!isExpanded && shouldTruncate ? text : undefined}
    >
      {displayText}
      {shouldTruncate && (
        <span className="text-primary ml-1 font-semibold text-sm">
          {isExpanded ? " (less)" : " (more)"}
        </span>
      )}
    </Component>
  );
};

const IMAGE_COMPRESSION_OPTIONS = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1600,
  useWebWorker: true,
};

async function processFileForUpload(file) {
  if (!file || !file.type?.startsWith("image/")) {
    return file;
  }

  try {
    const compressed = await imageCompression(file, IMAGE_COMPRESSION_OPTIONS);
    return new File([compressed], file.name, {
      type: compressed.type,
      lastModified: Date.now(),
    });
  } catch (error) {
    console.warn("Image compression failed, sending original file", error);
    return file;
  }
}

const formatFileSize = (bytes) => {
  if (typeof bytes !== "number" || Number.isNaN(bytes)) {
    return "";
  }
  const sizes = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unit = 0;
  while (size >= 1024 && unit < sizes.length - 1) {
    size /= 1024;
    unit += 1;
  }
  const precision = size < 10 && unit > 0 ? 1 : 0;
  return `${size.toFixed(precision)} ${sizes[unit]}`;
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

const QuestionList = ({
  questions,
  loading,
  selectedQuestion,
  onSelect,
  currencyFormatter,
  readCounts,
}) => {
  if (loading) {
    return <div className="p-4 text-sm text-gray-500">Loading...</div>;
  }

  if (!questions.length) {
    return <div className="p-4 text-sm text-gray-500">No questions yet.</div>;
  }

  return (
    <ul className="space-y-2">
      {questions.map((question) => {
        const lastActivity =
          question.latestMessage?.createdAt || question.updatedAt;
        const lastMessagePreview =
          question.latestMessage?.body?.trim() || "No messages yet";
        const lastSender =
          question.latestMessage?.sender?.role === "ADMIN"
            ? "Admin"
            : question.latestMessage?.sender?.role === "USER"
              ? "You"
              : null;
        const unread = question.unreadCount ?? 0;

        return (
          <li
            key={question.id}
            className={cn(
              "space-y-1 rounded-lg border border-transparent px-4 py-3 transition hover:border-primary/40 hover:bg-primary/5 cursor-pointer",
              selectedQuestion?.id === question.id
                ? "border-primary/50 bg-primary/10"
                : unread > 0
                  ? "border-primary/30 bg-primary/5"
                  : "bg-white/80"
            )}
            onClick={() => onSelect(question)}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <ExpandableText
                    text={question.title}
                    maxLength={50}
                    className="font-medium flex-1"
                    as="p"
                  />
                  {unread > 0 && (
                    <span className="inline-flex items-center justify-center rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white flex-shrink-0">
                      {unread > 99 ? "99+" : unread}
                    </span>
                  )}
                </div>
                {question.description && (
                  <ExpandableText
                    text={question.description}
                    maxLength={60}
                    className="text-xs text-muted-foreground/80 mt-0.5"
                  />
                )}
                <span className="text-[11px] text-muted-foreground">
                  {lastActivity
                    ? `Updated ${formatDistanceToNow(new Date(lastActivity), {
                      addSuffix: true,
                    })}`
                    : "No activity yet"}
                </span>
              </div>
              <QuestionStatusBadge status={question.status} />
            </div>
            <p className="text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span>
                Amount:{" "}
                {question.price != null
                  ? currencyFormatter.format(Number(question.price))
                  : "—"}
              </span>
              <span className="hidden sm:inline text-muted-foreground/60">
                •
              </span>
              <span className="capitalize">
                Status: {question.paymentStatus?.toLowerCase()}
              </span>
            </p>
            <div className="text-xs text-foreground italic">
              {lastSender ? `${lastSender}: ` : ""}
              <ExpandableText
                text={lastMessagePreview}
                maxLength={70}
                className="inline"
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const MobileQuestionDrawer = ({
  open,
  onOpenChange,
  onNewQuestion,
  questions,
  loading,
  selectedQuestion,
  currencyFormatter,
  readCounts,
  onSelect,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-md w-[90vw] sm:w-[420px] rounded-2xl border border-primary/20 bg-white/95 p-0 shadow-xl">
      <DialogHeader className="px-4 pt-4 pb-2 text-left">
        <DialogTitle className="text-lg font-semibold">
          My Questions
        </DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          Latest conversations appear first.
        </DialogDescription>
      </DialogHeader>
      <div className="px-4 pb-4 space-y-3">
        <Button
          className="w-full"
          onClick={() => {
            onOpenChange(false);
            onNewQuestion();
          }}
        >
          Create New Question
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/user/advance-chat/history">View History</Link>
        </Button>
        <div className="max-h-[60vh] overflow-y-auto rounded-lg border border-primary/20 bg-white/80 p-2 shadow-inner">
          <QuestionList
            questions={questions}
            loading={loading}
            selectedQuestion={selectedQuestion}
            currencyFormatter={currencyFormatter}
            readCounts={readCounts}
            onSelect={(question) => {
              onSelect(question);
              onOpenChange(false);
            }}
          />
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

function UserContent() {
  const { data: session, status } = useSession();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [creatingQuestion, setCreatingQuestion] = useState(false);
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    description: "",
  });
  const [messageInput, setMessageInput] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [sending, setSending] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [payImmediately, setPayImmediately] = useState(true);
  const [paymentType, setPaymentType] = useState("RAZORPAY");
  const [readCounts, setReadCounts] = useState({});
  const selectedQuestionRef = useRef(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [questionPrice, setQuestionPrice] = useState(null);
  const messagesContainerRef = useRef(null);
  const shouldStickToBottomRef = useRef(true);
  const initialMessagesRenderRef = useRef(true);
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
  const formattedQuestionPrice =
    questionPrice != null ? currencyFormatter.format(questionPrice) : null;

  const fetchQuestions = useCallback(async () => {
    if (status !== "authenticated") return;
    setLoadingQuestions(true);
    try {
      const res = await fetch("/api/advance-chat/questions?limit=15", {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to load questions");
      }
      const data = await res.json();
      let fetched = sortQuestionsByRecent(data.questions ?? []);

      const currentSelected = selectedQuestionRef.current;
      if (currentSelected) {
        const match = fetched.find((q) => q.id === currentSelected.id);
        if (match) {
          setSelectedQuestion((prev) => {
            if (!prev) return prev;
            const latestId = match.latestMessage?.id ?? null;
            const prevLatestId = prev.latestMessage?.id ?? null;
            if (
              prev.messageCount === (match.messageCount ?? prev.messageCount) &&
              prevLatestId === latestId &&
              prev.status === match.status &&
              prev.paymentStatus === match.paymentStatus
            ) {
              return prev;
            }
            return { ...prev, ...match };
          });
        } else {
          try {
            const detailRes = await fetch(
              `/api/advance-chat/questions/${currentSelected.id}`,
              {
                cache: "no-store",
              }
            );
            if (detailRes.ok) {
              const detailData = await detailRes.json();
              const detail = detailData.question;
              if (detail) {
                const latest = detail.chats?.[detail.chats.length - 1] ?? null;
                const hydrated = {
                  ...detail,
                  price: detail.price != null ? Number(detail.price) : null,
                  messageCount: detail.chats?.length ?? 0,
                  latestMessage: latest,
                  unreadCount: detail.unreadCount ?? 0,
                };
                fetched = sortQuestionsByRecent([hydrated, ...fetched]).slice(
                  0,
                  15
                );
                setSelectedQuestion((prev) => {
                  if (!prev || prev.id !== hydrated.id) return prev;
                  const prevLatestId = prev.latestMessage?.id ?? null;
                  const nextLatestId = hydrated.latestMessage?.id ?? null;
                  if (
                    prev.messageCount === hydrated.messageCount &&
                    prevLatestId === nextLatestId &&
                    prev.status === hydrated.status &&
                    prev.paymentStatus === hydrated.paymentStatus &&
                    prev.unreadCount === hydrated.unreadCount
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
      toast.error(error?.message || "Unable to fetch questions");
    } finally {
      setLoadingQuestions(false);
    }
  }, [status]);

  const fetchMessages = useCallback(
    async (questionId, { silent = false } = {}) => {
      if (!questionId) return;
      if (!silent) {
        setLoadingMessages(true);
      }
      try {
        const res = await fetch(
          `/api/advance-chat/questions/${questionId}/messages`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to load messages");
        }
        const data = await res.json();
        const mappedMessages = (data.messages ?? []).map((msg) => ({
          ...msg,
          files: msg.attachments ?? msg.files ?? [],
        }));
        setMessages(mappedMessages);
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
                unreadCount: 0,
              }
              : q
          );
          return sortQuestionsByRecent(updated);
        });
        setSelectedQuestion((prev) => {
          if (!prev || prev.id !== questionId) return prev;
          const nextMessageCount =
            data.messages?.length ?? prev.messageCount ?? 0;
          const latestId = latest?.id ?? null;
          const prevLatestId = prev.latestMessage?.id ?? null;
          if (
            prev.messageCount === nextMessageCount &&
            prevLatestId === latestId
          ) {
            return prev;
          }
          return {
            ...prev,
            messageCount: nextMessageCount,
            latestMessage: latest ?? prev.latestMessage,
            unreadCount: 0,
          };
        });
      } catch (error) {
        console.error(error);
        toast.error(error?.message || "Unable to fetch messages");
      } finally {
        if (!silent) {
          setLoadingMessages(false);
        }
      }
    },
    [setMessages]
  );

  useEffect(() => {
    if (status === "authenticated") {
      fetchQuestions();
    } else if (status === "unauthenticated") {
      setQuestions([]);
      setSelectedQuestion(null);
    }
  }, [status, fetchQuestions]);

  useEffect(() => {
    const loadPrice = async () => {
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (data?.advanceQuestionPrice != null) {
          setQuestionPrice(Number(data.advanceQuestionPrice));
        }
      } catch (error) {
        console.error("Failed to load pricing", error);
      }
    };
    if (status === "authenticated") {
      loadPrice();
    } else if (status === "unauthenticated") {
      setQuestionPrice(null);
    }
  }, [status]);

  useEffect(() => {
    if (loadingQuestions) return;
    if (!questions.length) {
      if (selectedQuestion) setSelectedQuestion(null);
      if (currentQuestionId)
        router.replace("/user/advance-chat", { scroll: false });
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
      router.replace("/user/advance-chat", { scroll: false });
      setSelectedQuestion(null);
    }
  }, [
    questions,
    currentQuestionId,
    router,
    selectedQuestion,
    loadingQuestions,
  ]);

  useEffect(() => {
    if (!selectedQuestion?.id || status !== "authenticated") return;
    fetchMessages(selectedQuestion.id);
    const interval = setInterval(
      () => fetchMessages(selectedQuestion.id, { silent: true }),
      POLL_INTERVAL
    );
    return () => clearInterval(interval);
  }, [selectedQuestion, fetchMessages, status]);

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

  const scrollMessagesToBottom = useCallback((behavior = "smooth") => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTo({
      top: container.scrollHeight,
      behavior,
    });
  }, []);

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
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
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

  const handleCreateQuestion = async () => {
    if (!newQuestion.title.trim()) {
      toast.error("Question title is required");
      return;
    }
    setCreatingQuestion(true);
    try {
      const res = await fetch("/api/advance-chat/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newQuestion,
          paymentType: paymentType,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create question");
      }
      const { question } = await res.json();
      setQuestions((prev) =>
        sortQuestionsByRecent([question, ...prev]).slice(0, 15)
      );
      setReadCounts((prev) => ({
        ...prev,
        [question.id]: question.messageCount ?? 0,
      }));
      setSelectedQuestion(question);
      router.replace(`/user/advance-chat?question=${question.id}`, {
        scroll: false,
      });
      setQuestionModalOpen(false);
      setNewQuestion({ title: "", description: "" });
      const amountText =
        question.price != null
          ? currencyFormatter.format(Number(question.price))
          : formattedQuestionPrice ?? "";
      if (question.paymentStatus === "PENDING") {
        if (question.paymentType === "CASH") {
          toast.success(
            `Question created with cash payment. Waiting for admin approval.${amountText ? ` Amount: ${amountText}` : ""
            }`
          );
        } else if (payImmediately) {
          toast.success(
            `Question created. Redirecting you to pay${amountText ? ` ${amountText}` : ""
            } now.`
          );
          await initiatePayment(question.id);
        } else {
          toast.info(
            `Question created. Pay${amountText ? ` ${amountText}` : ""
            } later from the question list when you're ready.`
          );
        }
      } else {
        toast.success("Question created. You can start chatting right away.");
      }
      setPayImmediately(true);
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Unable to create question");
    } finally {
      setCreatingQuestion(false);
    }
  };

  const initiatePayment = async (questionId) => {
    setProcessingPayment(true);
    try {
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ advanceQuestionId: questionId }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create payment order");
      }
      const { order, key } = await res.json();
      if (!order || !key) {
        throw new Error("Invalid Razorpay configuration");
      }

      const payableAmount = order.amount / 100;
      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Medicolegal Support",
        description: `Question payment (${currencyFormatter.format(
          payableAmount
        )})`,
        order_id: order.id,
        handler: async function (response) {
          await verifyPayment({ advanceQuestionId: questionId, ...response });
        },
        prefill: {},
      };

      if (typeof window !== "undefined") {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        toast.error("Razorpay is not available");
      }
    } catch (error) {
      console.error(error);
      const message = error?.message || "Payment initiation failed";
      if (message.includes("Razorpay secret not configured")) {
        toast.error(
          "Payment gateway is not configured yet. Please contact support to complete the payment."
        );
      } else {
        toast.error(message);
      }
    } finally {
      setProcessingPayment(false);
    }
  };

  const verifyPayment = async ({
    advanceQuestionId,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  }) => {
    try {
      const res = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          advanceQuestionId,
          razorpayPaymentId: razorpay_payment_id,
          razorpayOrderId: razorpay_order_id,
          razorpaySignature: razorpay_signature,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Payment verification failed");
      }

      const { question } = await res.json();
      setQuestions((prev) =>
        sortQuestionsByRecent(
          prev.map((q) => (q.id === question.id ? question : q))
        )
      );
      setSelectedQuestion(question);
      if (currentQuestionId !== question.id) {
        router.replace(`/user/advance-chat?question=${question.id}`, {
          scroll: false,
        });
      }
      const paidAmount =
        question.price != null
          ? currencyFormatter.format(Number(question.price))
          : formattedQuestionPrice ?? "";
      toast.success(
        `Payment${paidAmount ? ` of ${paidAmount}` : ""
        } successful! You can start chatting now.`
      );
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Payment verification failed");
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

    if (
      selectedQuestion.status === "PENDING" ||
      selectedQuestion.paymentStatus !== "SUCCESS"
    ) {
      toast.info("Complete payment before sending messages");
      return;
    }

    if (!messageInput.trim() && attachments.length === 0) {
      return;
    }

    setSending(true);
    try {
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
        `/api/advance-chat/questions/${selectedQuestion.id}/messages`,
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
      const mappedMessage = {
        ...message,
        files: message.attachments ?? message.files ?? [],
      };
      shouldStickToBottomRef.current = true;
      setMessages((prev) => {
        const next = [...prev, mappedMessage];
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
      attachments.forEach(
        (item) => item.preview && URL.revokeObjectURL(item.preview)
      );
      setAttachments([]);
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Unable to send message");
    } finally {
      setSending(false);
    }
  };

  const closeChat = async () => {
    if (!selectedQuestion?.id) return;
    try {
      const res = await fetch(
        `/api/advance-chat/questions/${selectedQuestion.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "CLOSED" }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to close chat");
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
      toast.error(error?.message || "Unable to close chat");
    }
  };

  const canSendMessages =
    selectedQuestion &&
    selectedQuestion.status !== "CLOSED" &&
    selectedQuestion.paymentStatus === "SUCCESS";

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-6 min-h-[calc(100svh-4rem)] md:min-h-[calc(100dvh-4rem)] text-foreground">
      <div className="md:hidden sticky top-0 z-30 flex  items-center justify-between gap-3 rounded-xl border border-primary/20 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
        <div className="min-w-0">
          <h2 className="text-base font-semibold">My Questions</h2>
          <p className="text-xs text-muted-foreground">
            {selectedQuestion?.title ?? "Select a question to start"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsDrawerOpen(true)}
          >
            Queue
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link href="/user/advance-chat/history">History</Link>
          </Button>
          <Button size="sm" onClick={() => setQuestionModalOpen(true)}>
            New
          </Button>
        </div>
      </div>

      <aside className="hidden md:flex md:w-80 lg:w-96 flex-col rounded-xl border border-primary/20 bg-white/95 shadow-sm">
        <div className="p-4 flex items-center justify-between gap-2 border-b border-primary/10">
          <h2 className="text-lg font-semibold">My Questions</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/user/advance-chat/history">History</Link>
            </Button>
            <Button size="sm" onClick={() => setQuestionModalOpen(true)}>
              New
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          <QuestionList
            questions={questions}
            loading={loadingQuestions}
            selectedQuestion={selectedQuestion}
            currencyFormatter={currencyFormatter}
            readCounts={readCounts}
            onSelect={(question) => {
              setSelectedQuestion(question);
              shouldStickToBottomRef.current = true;
              initialMessagesRenderRef.current = true;
              setReadCounts((prev) => ({
                ...prev,
                [question.id]: question.messageCount ?? 0,
              }));
              if (currentQuestionId !== question.id) {
                router.replace(`/user/advance-chat?question=${question.id}`, {
                  scroll: false,
                });
              }
              fetchMessages(question.id);
            }}
          />
        </div>
      </aside>

      <MobileQuestionDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        onNewQuestion={() => setQuestionModalOpen(true)}
        questions={questions}
        loading={loadingQuestions}
        selectedQuestion={selectedQuestion}
        currencyFormatter={currencyFormatter}
        readCounts={readCounts}
        onSelect={(question) => {
          setSelectedQuestion(question);
          shouldStickToBottomRef.current = true;
          initialMessagesRenderRef.current = true;
          setReadCounts((prev) => ({
            ...prev,
            [question.id]: question.messageCount ?? 0,
          }));
          setIsDrawerOpen(false);
          if (currentQuestionId !== question.id) {
            router.replace(`/user/advance-chat?question=${question.id}`, {
              scroll: false,
            });
          }
          fetchMessages(question.id);
        }}
      />

      <div className="flex-1 flex min-h-0 flex-col rounded-xl border border-muted/40 bg-white/95 shadow-sm">
        {!selectedQuestion ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center text-muted-foreground">
            <p>Select a question from the queue to view the conversation.</p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsDrawerOpen(true)}>
                View Questions
              </Button>
              <Button onClick={() => setQuestionModalOpen(true)}>
                New Question
              </Button>
            </div>
          </div>
        ) : (
          <>
            <header className="rounded-t-xl border-b border-muted/40 bg-white/95 p-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-1">
                <ExpandableText
                  text={selectedQuestion.title}
                  maxLength={80}
                  className="text-xl font-semibold block"
                  as="h3"
                />
                {selectedQuestion.description && (
                  <ExpandableText
                    text={selectedQuestion.description}
                    maxLength={120}
                    className="text-sm text-muted-foreground block"
                    as="p"
                  />
                )}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground">Status:</span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${selectedQuestion.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : selectedQuestion.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {selectedQuestion.status?.toLowerCase()}
                    </span>
                  </div>
                  <span className="text-muted-foreground/60">•</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground">Payment:</span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${selectedQuestion.paymentStatus === "SUCCESS"
                          ? "bg-green-100 text-green-700"
                          : selectedQuestion.paymentStatus === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : selectedQuestion.paymentStatus === "FAILED"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {selectedQuestion.paymentStatus?.toLowerCase()}
                    </span>
                    {selectedQuestion.paymentType === "CASH" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                        Cash
                      </span>
                    )}
                    {selectedQuestion.paymentType === "RAZORPAY" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 text-[11px] font-medium text-purple-700">
                        Online
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {selectedQuestion.paymentStatus === "PENDING" &&
                  selectedQuestion.paymentType === "CASH" ? (
                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-2">
                    <p className="text-sm text-yellow-800 font-medium">
                      Waiting for admin approval of cash payment
                    </p>
                  </div>
                ) : (
                  selectedQuestion.paymentStatus === "PENDING" && (
                    <Button
                      variant="outline"
                      onClick={() => initiatePayment(selectedQuestion.id)}
                      disabled={processingPayment}
                    >
                      {processingPayment ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Complete Payment"
                      )}
                    </Button>
                  )
                )}
                <Button
                  variant="secondary"
                  onClick={closeChat}
                  disabled={selectedQuestion.status === "CLOSED"}
                >
                  Close Chat
                </Button>
              </div>
            </header>

            <section
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 pb-20 sm:pb-24 space-y-4 scroll-smooth"
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
                  No messages yet.{" "}
                  {canSendMessages
                    ? "Start the conversation when you're ready."
                    : "Complete payment to enable messaging."}
                </p>
              ) : (
                messages.map((msg) => {
                  const isUserMessage = msg.sender?.role !== "ADMIN";
                  const senderLabel = isUserMessage
                    ? "You"
                    : msg.sender?.name || "Admin";
                  const messageTime = formatMessageTime(msg.createdAt);

                  return (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex",
                        isUserMessage ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-lg rounded-2xl px-4 py-3 shadow-sm space-y-2",
                          isUserMessage
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
                                        src={file.url}
                                        alt={fileName}
                                        width={384}
                                        height={256}
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
                    isDragActive && "border-primary bg-primary/10",
                    !canSendMessages && "opacity-90"
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
                        if (canSendMessages && !sending) {
                          sendMessage();
                        }
                      }
                    }}
                    className="flex-1 resize-none border-none bg-transparent px-0 py-2 text-sm leading-6 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Ask anything..."
                    disabled={!canSendMessages}
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      onClick={sendMessage}
                      disabled={!canSendMessages || sending}
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
                {canSendMessages ? (
                  <p className="text-[11px] text-muted-foreground/70 mx-auto">
                    Enter sends
                    {isDragActive
                      ? " • Drop files to attach"
                      : " • Drag files here to attach"}
                  </p>
                ) : (
                  <p className="text-[11px] text-destructive">
                    {selectedQuestion.status === "CLOSED"
                      ? "This chat is closed."
                      : "Complete payment to enable messaging."}
                  </p>
                )}
              </div>
            </footer>
          </>
        )}
      </div>

      <Dialog open={questionModalOpen} onOpenChange={setQuestionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ask a new question</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {formattedQuestionPrice && (
              <p className="text-sm text-gray-500">
                Each consultation costs{" "}
                <span className="font-semibold text-gray-700">
                  {formattedQuestionPrice}
                </span>{" "}
                (payment required to start chat).
              </p>
            )}
            {questionPrice > 0 && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Payment Method
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentType"
                        value="RAZORPAY"
                        checked={paymentType === "RAZORPAY"}
                        onChange={(e) => setPaymentType(e.target.value)}
                        className="h-4 w-4"
                      />
                      <span className="text-sm text-gray-700">
                        Online (Razorpay)
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentType"
                        value="CASH"
                        checked={paymentType === "CASH"}
                        onChange={(e) => setPaymentType(e.target.value)}
                        className="h-4 w-4"
                      />
                      <span className="text-sm text-gray-700">
                        Cash (Offline)
                      </span>
                    </label>
                  </div>
                </div>
                {paymentType === "RAZORPAY" && (
                  <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                    <input
                      id="pay-immediately"
                      type="checkbox"
                      checked={payImmediately}
                      onChange={(event) =>
                        setPayImmediately(event.target.checked)
                      }
                      className="mt-1 h-4 w-4"
                    />
                    <label
                      htmlFor="pay-immediately"
                      className="text-sm text-left text-gray-600"
                    >
                      Pay immediately after submitting this question. Unchecking
                      this will save the question as pending so you can pay
                      later from the list.
                    </label>
                  </div>
                )}
                {paymentType === "CASH" && (
                  <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2">
                    <p className="text-sm text-blue-800">
                      Cash payment selected. Your question will be created and
                      admin will approve it after receiving cash payment. You&apos;ll
                      be notified once approved.
                    </p>
                  </div>
                )}
              </>
            )}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Question Title
              </label>
              <Input
                value={newQuestion.title}
                onChange={(e) =>
                  setNewQuestion((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Summarize your question"
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {newQuestion.title.length}/100 characters
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Details
              </label>
              <Textarea
                rows={4}
                value={newQuestion.description}
                onChange={(e) =>
                  setNewQuestion((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Provide relevant background, deadlines, etc."
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {newQuestion.description.length}/500 characters
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setQuestionModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateQuestion}
                disabled={creatingQuestion}
              >
                {creatingQuestion ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : paymentType === "CASH" ? (
                  `Create Question${formattedQuestionPrice ? ` (₹${questionPrice})` : ""
                  }`
                ) : (
                  `Create & Pay${formattedQuestionPrice ? ` ${formattedQuestionPrice}` : ""
                  }`
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserContent;
