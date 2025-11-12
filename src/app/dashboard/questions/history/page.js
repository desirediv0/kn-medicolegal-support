"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const PER_PAGE = 30;

function AdminQuestionHistoryContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = useMemo(() => {
    const raw = searchParams.get("page");
    const parsed = raw ? parseInt(raw, 10) : 1;
    return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
  }, [searchParams]);

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.replace("/user");
    }
  }, [status, session, router]);

  useEffect(() => {
    const load = async () => {
      if (status !== "authenticated") return;
      setLoading(true);
      try {
        const res = await fetch(
          `/api/questions?limit=${PER_PAGE}&page=${currentPage}&meta=true`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Failed to load questions");
        const data = await res.json();
        setQuestions(data.questions ?? []);
        setTotal(data.total ?? 0);
        const totalPages = Math.max(1, Math.ceil((data.total ?? 0) / PER_PAGE) || 1);
        if (data.total && currentPage > totalPages) {
          const params = new URLSearchParams(searchParams.toString());
          if (totalPages <= 1) {
            params.delete("page");
          } else {
            params.set("page", String(totalPages));
          }
          router.replace(
            `/dashboard/questions/history${params.toString() ? `?${params}` : ""}`
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      load();
    } else if (status === "unauthenticated") {
      setQuestions([]);
      setTotal(0);
      setLoading(false);
    }
  }, [status, currentPage, router, searchParams]);

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE) || 1);
  const startIndex = total === 0 ? 0 : (currentPage - 1) * PER_PAGE + 1;
  const endIndex = total === 0 ? 0 : Math.min(total, startIndex + questions.length - 1);

  const changePage = (nextPage) => {
    if (nextPage === currentPage || nextPage < 1 || nextPage > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    if (nextPage === 1) {
      params.delete("page");
    } else {
      params.set("page", String(nextPage));
    }
    router.push(
      `/dashboard/questions/history${params.toString() ? `?${params}` : ""}`
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Question Archive
          </h1>
          <p className="text-sm text-gray-500">
            Browse every question submitted on the platform. Use the live dashboard to respond in real time.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          {total > 0 && (
            <span>
              Showing {startIndex}-{endIndex} of {total}
            </span>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>All Conversations</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/questions">Back to live queue</Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === "loading" || loading ? (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading archive...
            </div>
          ) : questions.length === 0 ? (
            <p className="text-sm text-gray-500">
              No questions have been submitted yet.
            </p>
          ) : (
            <>
              <ul className="space-y-3">
                {questions.map((question) => (
                  <li
                    key={question.id}
                    className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {question.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          Created {formatDistanceToNow(new Date(question.createdAt), {
                            addSuffix: true,
                          })}
                          {question.closedAt && (
                            <>
                              {" • "}
                              Closed {formatDistanceToNow(new Date(question.closedAt), {
                                addSuffix: true,
                              })}
                            </>
                          )}
                        </p>
                        <p className="text-xs text-gray-500">
                          Status: <span className="capitalize">{question.status.toLowerCase()}</span>
                          {" • "} Payment: <span className="capitalize">{question.paymentStatus?.toLowerCase()}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>User: {question.user?.email ?? "Unknown"}</span>
                        <span className="hidden sm:inline text-gray-300">•</span>
                        <span>
                          Assigned: {question.admin?.email ?? "Unassigned"}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                      <span>
                        Messages: {question.messageCount ?? 0} • Last activity: {question.latestMessage?.createdAt
                          ? formatDistanceToNow(new Date(question.latestMessage.createdAt), {
                              addSuffix: true,
                            })
                          : "No messages"}
                      </span>
                      <Link
                        href={`/dashboard/questions?question=${question.id}`}
                        className="text-green-600 hover:text-green-700 underline"
                      >
                        Open
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-xs text-gray-500">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function HistoryFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-gray-50 p-6 text-sm text-gray-500">
      Loading question archive…
    </div>
  );
}

export default function AdminQuestionHistory() {
  return (
    <Suspense fallback={<HistoryFallback />}>
      <AdminQuestionHistoryContent />
    </Suspense>
  );
}
