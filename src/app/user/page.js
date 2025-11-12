"use client";

import {
  Suspense,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Paperclip,
  Send,
  X,
  Loader2,
  UploadCloud,
  Download,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import imageCompression from "browser-image-compression";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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
    <ul className="divide-y divide-gray-100">
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
        const unread = Math.max(
          0,
          (question.messageCount ?? 0) - (readCounts[question.id] ?? 0)
        );

        return (
          <li
            key={question.id}
            className={`px-4 py-3 space-y-1 cursor-pointer transition hover:bg-gray-100 border-l-4 ${selectedQuestion?.id === question.id
                ? "bg-gray-100 border-green-600"
                : unread > 0
                  ? "bg-green-50 border-green-500"
                  : "border-transparent"
              }`}
            onClick={() => onSelect(question)}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{question.title}</p>
                  {unread > 0 && (
                    <span className="inline-flex items-center justify-center rounded-full bg-green-500 px-2 text-[10px] font-semibold text-white">
                      {unread > 99 ? "99+" : unread}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-gray-400">
                  {lastActivity
                    ? `Updated ${formatDistanceToNow(new Date(lastActivity), {
                      addSuffix: true,
                    })}`
                    : "No activity yet"}
                </span>
              </div>
              <QuestionStatusBadge status={question.status} />
            </div>
            <p className="text-xs text-gray-500 flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span>
                Amount:{" "}
                {question.price != null
                  ? currencyFormatter.format(Number(question.price))
                  : "—"}
              </span>
              <span className="hidden sm:inline text-gray-300">•</span>
              <span className="capitalize">
                Status: {question.paymentStatus?.toLowerCase()}
              </span>
            </p>
            <p className="text-xs text-gray-400 italic truncate">
              {lastSender ? `${lastSender}: ` : ""}
              {lastMessagePreview}
            </p>
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
    <DialogContent className="p-0 max-w-sm w-[90vw] sm:w-[400px]">
      <DialogHeader className="px-4 pt-4 pb-0 text-left">
        <DialogTitle className="text-lg font-semibold">
          My Questions
        </DialogTitle>
      </DialogHeader>
      <div className="px-4">
        <Button
          className="w-full mb-3"
          onClick={() => {
            onOpenChange(false);
            onNewQuestion();
          }}
        >
          Create New Question
        </Button>
        <Button variant="outline" className="w-full mb-3" asChild>
          <Link href="/user/history">View History</Link>
        </Button>
      </div>
      <Separator />
      <div className="max-h-[60vh] overflow-y-auto">
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
  const [dropzoneExpanded, setDropzoneExpanded] = useState(false);
  const [sending, setSending] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [payImmediately, setPayImmediately] = useState(true);
  const [readCounts, setReadCounts] = useState({});
  const selectedQuestionRef = useRef(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [questionPrice, setQuestionPrice] = useState(null);
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
      const res = await fetch("/api/questions?limit=15", { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Failed to load questions");
      }
      const data = await res.json();
      let fetched = data.questions ?? [];

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
              `/api/questions/${currentSelected.id}`,
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
                fetched = [hydrated, ...fetched].slice(0, 15);
                setSelectedQuestion((prev) => {
                  if (!prev || prev.id !== hydrated.id) return prev;
                  const prevLatestId = prev.latestMessage?.id ?? null;
                  const nextLatestId = hydrated.latestMessage?.id ?? null;
                  if (
                    prev.messageCount === hydrated.messageCount &&
                    prevLatestId === nextLatestId &&
                    prev.status === hydrated.status &&
                    prev.paymentStatus === hydrated.paymentStatus
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

      setQuestions(fetched);
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
    async (questionId) => {
      if (!questionId) return;
      setLoadingMessages(true);
      try {
        const res = await fetch(`/api/questions/${questionId}/messages`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to load messages");
        }
        const data = await res.json();
        setMessages(data.messages ?? []);
        setReadCounts((prev) => ({
          ...prev,
          [questionId]: data.messages?.length ?? 0,
        }));
        const latest = data.messages?.[data.messages.length - 1] ?? null;
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) =>
            q.id === questionId
              ? {
                ...q,
                messageCount: data.messages?.length ?? q.messageCount ?? 0,
                latestMessage: latest ?? q.latestMessage,
              }
              : q
          )
        );
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
          };
        });
      } catch (error) {
        console.error(error);
        toast.error(error?.message || "Unable to fetch messages");
      } finally {
        setLoadingMessages(false);
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
        if (data?.questionPrice != null) {
          setQuestionPrice(Number(data.questionPrice));
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
      if (currentQuestionId) router.replace("/user", { scroll: false });
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
      router.replace("/user", { scroll: false });
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
      () => fetchMessages(selectedQuestion.id),
      POLL_INTERVAL
    );
    return () => clearInterval(interval);
  }, [selectedQuestion, fetchMessages, status]);

  useEffect(() => {
    selectedQuestionRef.current = selectedQuestion;
  }, [selectedQuestion]);

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
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "video/*": [".mp4", ".mov", ".m4v", ".webm"],
    },
  });

  const shouldShowExpandedDropzone =
    dropzoneExpanded || isDragActive || attachments.length > 0;

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
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuestion),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create question");
      }
      const { question } = await res.json();
      setQuestions((prev) => [question, ...prev].slice(0, 15));
      setReadCounts((prev) => ({
        ...prev,
        [question.id]: question.messageCount ?? 0,
      }));
      setSelectedQuestion(question);
      router.replace(`/user?question=${question.id}`, { scroll: false });
      setQuestionModalOpen(false);
      setNewQuestion({ title: "", description: "" });
      const amountText =
        question.price != null
          ? currencyFormatter.format(Number(question.price))
          : formattedQuestionPrice ?? "";
      if (question.paymentStatus === "PENDING") {
        if (payImmediately) {
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
        body: JSON.stringify({ questionId }),
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
          await verifyPayment({ questionId, ...response });
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
    questionId,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  }) => {
    try {
      const res = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId,
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
        prev.map((q) => (q.id === question.id ? question : q))
      );
      setSelectedQuestion(question);
      if (currentQuestionId !== question.id) {
        router.replace(`/user?question=${question.id}`, { scroll: false });
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
      setMessages((prev) => {
        const next = [...prev, message];
        setReadCounts((counts) => ({
          ...counts,
          [selectedQuestion.id]: next.length,
        }));
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) =>
            q.id === selectedQuestion.id
              ? {
                ...q,
                latestMessage: message,
                messageCount: next.length,
              }
              : q
          )
        );
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
      const res = await fetch(`/api/questions/${selectedQuestion.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CLOSED" }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to close chat");
      }

      const { question } = await res.json();
      setQuestions((prev) =>
        prev.map((q) => (q.id === question.id ? question : q))
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
    <div className="flex flex-col md:flex-row min-h-[100dvh] bg-gray-50 text-gray-900">
      <div className="md:hidden sticky top-0 z-30 flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div>
          <h2 className="text-base font-semibold">My Questions</h2>
          <p className="text-xs text-gray-500">
            {selectedQuestion?.title ?? "Select a question to start"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsDrawerOpen(true)}
          >
            Questions
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link href="/user/history">History</Link>
          </Button>
          <Button size="sm" onClick={() => setQuestionModalOpen(true)}>
            New
          </Button>
        </div>
      </div>

      <aside className="hidden md:flex md:w-80 border-r border-gray-200 bg-white flex-col">
        <div className="p-4 flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">My Questions</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/user/history">History</Link>
            </Button>
            <Button size="sm" onClick={() => setQuestionModalOpen(true)}>
              New
            </Button>
          </div>
        </div>
        <Separator />
        <QuestionList
          questions={questions}
          loading={loadingQuestions}
          selectedQuestion={selectedQuestion}
          currencyFormatter={currencyFormatter}
          readCounts={readCounts}
          onSelect={(question) => {
            setSelectedQuestion(question);
            setReadCounts((prev) => ({
              ...prev,
              [question.id]: question.messageCount ?? 0,
            }));
            if (currentQuestionId !== question.id) {
              router.replace(`/user?question=${question.id}`, {
                scroll: false,
              });
            }
            fetchMessages(question.id);
          }}
        />
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
          setReadCounts((prev) => ({
            ...prev,
            [question.id]: question.messageCount ?? 0,
          }));
          setIsDrawerOpen(false);
          if (currentQuestionId !== question.id) {
            router.replace(`/user?question=${question.id}`, { scroll: false });
          }
          fetchMessages(question.id);
        }}
      />

      <div className="flex-1 flex flex-col min-h-[60vh]">
        {!selectedQuestion ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center text-gray-500 p-6">
            <p>Select a question from the list to view the conversation.</p>
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
            <div className="p-4 border-b border-gray-200 flex flex-col gap-3 md:gap-0 md:flex-row md:items-center md:justify-between bg-white">
              <div>
                <h3 className="text-xl font-semibold">
                  {selectedQuestion.title}
                </h3>
                {selectedQuestion.description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedQuestion.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2 items-center flex-wrap">
                {selectedQuestion.paymentStatus === "PENDING" && (
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
                )}
                <Button
                  variant="secondary"
                  onClick={closeChat}
                  disabled={selectedQuestion.status === "CLOSED"}
                >
                  Close Chat
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {loadingMessages ? (
                <p className="text-sm text-gray-500">Loading messages...</p>
              ) : messages.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No messages yet. Start the conversation after payment.
                </p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender?.role === "ADMIN"
                        ? "justify-start"
                        : "justify-end"
                      }`}
                  >
                    <div
                      className={`max-w-lg rounded-2xl px-4 py-2 shadow ${msg.sender?.role === "ADMIN"
                          ? "bg-white"
                          : "bg-green-50"
                        }`}
                    >
                      <p className="text-xs font-semibold text-gray-500 mb-1">
                        {msg.sender?.role === "ADMIN"
                          ? msg.sender?.name || "Admin"
                          : "You"}
                      </p>
                      {msg.body && (
                        <p className="text-sm whitespace-pre-line">
                          {msg.body}
                        </p>
                      )}
                      {msg.files?.length > 0 && (
                        <div className="mt-3 space-y-3">
                          {msg.files.map((file) => {
                            const key =
                              file.id ?? file.key ?? file.url ?? file.fileName;
                            const mime =
                              file.mimeType ||
                              file.mediaType ||
                              file.type ||
                              "";
                            const fileName = getAttachmentName(file);
                            const fileSizeLabel = file.fileSize
                              ? formatFileSize(Number(file.fileSize))
                              : "";

                            if (isImageMimeType(mime)) {
                              return (
                                <figure
                                  key={key}
                                  className="overflow-hidden rounded-xl border border-gray-200 bg-white"
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
                                  <figcaption className="flex items-center justify-between gap-3 px-3 py-2 text-xs text-gray-600">
                                    <span className="truncate font-medium text-gray-700">
                                      {fileName}
                                    </span>
                                    <a
                                      href={file.url}
                                      download={fileName}
                                      className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-2 py-1 text-[11px] font-semibold text-green-600 hover:border-green-500 hover:text-green-700"
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
                                  className="overflow-hidden rounded-xl border border-gray-200 bg-white"
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
                                  <div className="flex items-center justify-between gap-3 px-3 py-2 text-xs text-gray-600">
                                    <div className="min-w-0">
                                      <p className="truncate font-medium text-gray-700">
                                        {fileName}
                                      </p>
                                      {fileSizeLabel && (
                                        <p className="text-[11px] text-gray-400">
                                          {fileSizeLabel}
                                        </p>
                                      )}
                                    </div>
                                    <a
                                      href={file.url}
                                      download={fileName}
                                      className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-2 py-1 text-[11px] font-semibold text-green-600 hover:border-green-500 hover:text-green-700"
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
                                className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 transition hover:border-green-400 hover:bg-green-50"
                              >
                                <span className="flex items-center gap-2">
                                  <Paperclip className="h-3 w-3 text-green-600" />
                                  <span className="truncate font-medium text-gray-700">
                                    {fileName}
                                  </span>
                                </span>
                                {fileSizeLabel && (
                                  <span className="text-[11px] text-gray-400">
                                    {fileSizeLabel}
                                  </span>
                                )}
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-gray-200 bg-white p-4">
              <div
                {...getRootProps({
                  className: `${shouldShowExpandedDropzone
                      ? "relative flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-5 text-center transition sm:p-6"
                      : "group relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-gray-50 text-gray-400 transition hover:border-green-400 hover:text-green-600"
                    } ${isDragActive
                      ? "border-green-500 bg-green-50"
                      : shouldShowExpandedDropzone
                        ? "border-gray-200 bg-gray-50 hover:border-green-400 hover:bg-white"
                        : ""
                    }`,
                  onClick: () => {
                    if (!shouldShowExpandedDropzone) {
                      setDropzoneExpanded(true);
                    }
                  },
                })}
              >
                <input {...getInputProps()} />
                {shouldShowExpandedDropzone ? (
                  <>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        if (!attachments.length && !isDragActive) {
                          setDropzoneExpanded(false);
                        }
                      }}
                      className="absolute right-3 top-3 rounded-full bg-white/80 p-1 text-gray-400 shadow hover:text-gray-600"
                      aria-label="Collapse uploader"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <UploadCloud className="h-8 w-8 text-green-500 sm:h-10 sm:w-10" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700 sm:text-base">
                        Drag & drop files here
                      </p>
                      <p className="text-xs text-gray-500 sm:text-sm">
                        or{" "}
                        <button
                          type="button"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            open();
                          }}
                          className="font-semibold text-green-600 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                          browse your device
                        </button>
                      </p>
                    </div>
                    <p className="text-xs text-gray-400 sm:text-sm">
                      PDF, DOC, DOCX, PNG, JPG, MP4 up to 25 MB
                    </p>
                  </>
                ) : (
                  <UploadCloud className="h-6 w-6 transition group-hover:scale-110" />
                )}
              </div>
              {attachments.length > 0 && (
                <div className="mb-4 mt-3 grid gap-2 sm:grid-cols-2">
                  {attachments.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                          <Paperclip className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex flex-col">
                          <span className="max-w-[160px] truncate font-medium text-gray-700 sm:max-w-[220px]">
                            {item.file.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatFileSize(item.file.size)}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(item.id)}
                        className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <Textarea
                  rows={2}
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
                  className="w-full resize-none sm:flex-1"
                  placeholder="Type your message..."
                  disabled={!canSendMessages}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!canSendMessages || sending}
                  className="w-full sm:w-auto sm:self-auto"
                >
                  {sending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {!canSendMessages && (
                <p className="text-xs text-red-500 mt-2">
                  {selectedQuestion.status === "CLOSED"
                    ? "This chat is closed."
                    : "Complete payment to enable messaging."}
                </p>
              )}
            </div>
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
                (charged via Razorpay immediately after you submit).
              </p>
            )}
            {questionPrice > 0 && (
              <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                <input
                  id="pay-immediately"
                  type="checkbox"
                  checked={payImmediately}
                  onChange={(event) => setPayImmediately(event.target.checked)}
                  className="mt-1 h-4 w-4"
                />
                <label
                  htmlFor="pay-immediately"
                  className="text-sm text-left text-gray-600"
                >
                  Pay immediately after submitting this question. Unchecking
                  this will save the question as pending so you can pay later
                  from the list.
                </label>
              </div>
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
              />
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
              />
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

function UserPageFallback() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gray-50 text-sm text-gray-500">
      Loading your workspace…
    </div>
  );
}

export default function User() {
  return (
    <Suspense fallback={<UserPageFallback />}>
      <UserContent />
    </Suspense>
  );
}