"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, MessageSquare, UserCheck, Wallet } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [questionPrice, setQuestionPrice] = useState(0);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [questionsRes, settingsRes] = await Promise.all([
          fetch("/api/questions", { cache: "no-store" }),
          fetch("/api/settings", { cache: "no-store" }),
        ]);
        if (questionsRes.ok) {
          const data = await questionsRes.json();
          setQuestions(data.questions ?? []);
        }
        if (settingsRes.ok) {
          const data = await settingsRes.json();
          setQuestionPrice(Number(data.questionPrice ?? 0));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const stats = useMemo(() => {
    const pending = questions.filter((q) => q.status === "PENDING").length;
    const active = questions.filter((q) => q.status === "ACTIVE").length;
    const closed = questions.filter((q) => q.status === "CLOSED").length;
    const paid = questions.filter((q) => q.paymentStatus === "SUCCESS");
    const revenue = paid.reduce(
      (sum, q) => sum + Number.parseFloat(q.price ?? 0),
      0
    );

    return { pending, active, closed, total: questions.length, revenue };
  }, [questions]);

  const recentQuestions = useMemo(
    () =>
      [...questions]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 5),
    [questions]
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Admin Overview
          </h1>
          <p className="text-sm text-gray-500">
            Monitor question intake, revenue, and recent conversations.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href="/dashboard/questions">Manage Questions</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/settings">Pricing Settings</Link>
          </Button>
        </div>
      </div>

      <Separator />

      {loading ? (
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading dashboard insights...
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Questions
                </CardTitle>
                <MessageSquare className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{stats.total}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {stats.pending} pending / {stats.active} active
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Closed Conversations
                </CardTitle>
                <UserCheck className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{stats.closed}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {Math.round(
                    stats.total ? (stats.closed / stats.total) * 100 : 0
                  )}
                  % of all questions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Estimated Revenue
                </CardTitle>
                <Wallet className="h-5 w-5 text-amber-500" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">
                  ₹{stats.revenue.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Price per question: ₹{Number(questionPrice).toFixed(2)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Button variant="secondary" asChild>
                  <Link href="/dashboard/users">View Users</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/dashboard/reports">Download Reports</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Recent Questions</CardTitle>
              </CardHeader>
              <CardContent>
                {recentQuestions.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No questions have been submitted yet.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {recentQuestions.map((question) => (
                      <li
                        key={question.id}
                        className="rounded-md border border-gray-200 p-3 hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {question.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {question.user?.email ?? "Unknown user"}
                            </p>
                          </div>
                          <Link
                            href={`/dashboard/questions?question=${question.id}`}
                            className="text-xs text-blue-600 hover:text-blue-800 underline"
                          >
                            Open
                          </Link>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDistanceToNow(new Date(question.createdAt), {
                            addSuffix: true,
                          })}
                          {" · "}
                          Status:{" "}
                          <span className="capitalize">
                            {question.status.toLowerCase()}
                          </span>
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <CardTitle>Payment Status Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["PENDING", "SUCCESS", "FAILED"].map((state) => {
                    const count = questions.filter(
                      (q) => q.paymentStatus === state
                    ).length;
                    return (
                      <div
                        key={state}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="font-medium text-gray-600">
                          {state}
                        </span>
                        <span className="text-gray-900">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
