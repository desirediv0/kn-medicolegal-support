"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const PER_PAGE = 30;

function UserHistoryContent() {
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
        const totalPages = Math.max(
          1,
          Math.ceil((data.total ?? 0) / PER_PAGE) || 1
        );
        if (data.total && currentPage > totalPages) {
          const params = new URLSearchParams(searchParams.toString());
          if (totalPages <= 1) {
            params.delete("page");
          } else {
            params.set("page", String(totalPages));
          }
          router.replace(
            `/user/history${params.toString() ? `?${params}` : ""}`
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
  const endIndex =
    total === 0 ? 0 : Math.min(total, startIndex + questions.length - 1);

  const changePage = (nextPage) => {
    if (nextPage === currentPage || nextPage < 1 || nextPage > totalPages)
      return;
    const params = new URLSearchParams(searchParams.toString());
    if (nextPage === 1) {
      params.delete("page");
    } else {
      params.set("page", String(nextPage));
    }
    router.push(`/user/history${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Question History
          </h1>
          <p className="text-sm text-gray-500">
            Review all your previous questions and reopen conversations if
            needed.
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
          <CardTitle>My Conversations</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/user">Back to dashboard</Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === "loading" || loading ? (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading history...
            </div>
          ) : questions.length === 0 ? (
            <p className="text-sm text-gray-500">
              You haven&apos;t asked any questions yet. Create one from the
              dashboard.
            </p>
          ) : (
            <>
              <ul className="space-y-3">
                {questions.map((question) => (
                  <li
                    key={question.id}
                    className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {question.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(question.createdAt), {
                            addSuffix: true,
                          })}{" "}
                          · status:{" "}
                          <span className="capitalize">
                            {question.status.toLowerCase()}
                          </span>
                        </p>
                      </div>
                      <Link
                        href={`/user?question=${question.id}`}
                        className="text-xs text-green-600 hover:text-green-700 underline"
                      >
                        View
                      </Link>
                    </div>
                    {question.admin?.email && (
                      <p className="text-xs text-gray-500 mt-1">
                        Assigned expert: {question.admin.email}
                      </p>
                    )}
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
      Loading your history…
    </div>
  );
}

export default function UserHistory() {
  return (
    <Suspense fallback={<HistoryFallback />}>
      <UserHistoryContent />
    </Suspense>
  );
}
