"use client";

import { useEffect, useMemo, useState } from "react";
import { format, formatDistanceToNow, subDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Loader2, RefreshCw, Users, MessageSquare, CreditCard, IndianRupee, FileText } from "lucide-react";
import Link from "next/link";

const sortQuestionsByRecent = (list = []) =>
  [...list].sort((a, b) => {
    const getTime = (item) => {
      const latest = item.latestMessage?.createdAt;
      const updated = item.updatedAt;
      const created = item.createdAt;
      return latest
        ? new Date(latest).getTime()
        : updated
          ? new Date(updated).getTime()
          : created
            ? new Date(created).getTime()
            : 0;
    };
    return getTime(b) - getTime(a);
  });

export default function AdminReports() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [advanceQuestions, setAdvanceQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const [questionsRes, advanceQuestionsRes, usersRes] = await Promise.all([
        fetch("/api/questions?limit=250&meta=true", { cache: "no-store" }),
        fetch("/api/advance-chat/questions?limit=250&meta=true", { cache: "no-store" }),
        fetch("/api/admin/users", { cache: "no-store" }),
      ]);

      if (questionsRes.ok) {
        const data = await questionsRes.json();
        setQuestions(sortQuestionsByRecent(data.questions ?? []));
      } else {
        throw new Error("Failed to load questions");
      }

      if (advanceQuestionsRes.ok) {
        const data = await advanceQuestionsRes.json();
        setAdvanceQuestions(data.questions ?? []);
      }

      if (usersRes.ok) {
        const data = await usersRes.json();
        setUsers(data.users ?? []);
      }

      setLastUpdated(new Date().toISOString());
    } catch (err) {
      console.error(err);
      setError(err?.message ?? "Something went wrong while loading reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const metrics = useMemo(() => {
    // General Questions Metrics
    let active = 0;
    let pending = 0;
    let closed = 0;
    let awaitingPayment = 0;
    let revenue = 0;
    let failedPayments = 0;
    let cashPayments = 0;
    let razorpayPayments = 0;

    questions.forEach((question) => {
      switch (question.status) {
        case "ACTIVE":
          active += 1;
          break;
        case "PENDING":
          pending += 1;
          break;
        case "CLOSED":
          closed += 1;
          break;
      }
      if (question.paymentStatus === "PENDING") {
        awaitingPayment += 1;
      }
      if (question.paymentStatus === "FAILED") {
        failedPayments += 1;
      }
      if (
        question.paymentStatus === "SUCCESS" &&
        question.price != null &&
        !Number.isNaN(Number(question.price))
      ) {
        revenue += Number(question.price);
        if (question.paymentType === "CASH") {
          cashPayments += Number(question.price);
        } else if (question.paymentType === "RAZORPAY") {
          razorpayPayments += Number(question.price);
        }
      }
    });

    // Advance Chat Metrics
    let advanceActive = 0;
    let advancePending = 0;
    let advanceClosed = 0;
    let advanceRevenue = 0;
    let advanceAwaitingPayment = 0;

    advanceQuestions.forEach((question) => {
      switch (question.status) {
        case "ACTIVE":
          advanceActive += 1;
          break;
        case "PENDING":
          advancePending += 1;
          break;
        case "CLOSED":
          advanceClosed += 1;
          break;
      }
      if (question.paymentStatus === "PENDING") {
        advanceAwaitingPayment += 1;
      }
      if (
        question.paymentStatus === "SUCCESS" &&
        question.price != null &&
        !Number.isNaN(Number(question.price))
      ) {
        advanceRevenue += Number(question.price);
      }
    });

    // User Metrics
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.totalQuestions > 0).length;
    const newUsersLast7Days = users.filter(u => {
      const created = new Date(u.createdAt);
      return created >= subDays(new Date(), 7);
    }).length;

    // Time-based metrics (last 7 days)
    const sevenDaysAgo = subDays(new Date(), 7);
    const questionsLast7Days = questions.filter(q => new Date(q.createdAt) >= sevenDaysAgo).length;
    const revenueLast7Days = questions
      .filter(q => new Date(q.createdAt) >= sevenDaysAgo && q.paymentStatus === "SUCCESS")
      .reduce((sum, q) => sum + (Number(q.price) || 0), 0);

    const latestQuestion = questions[0];
    const latestActivity =
      latestQuestion?.latestMessage?.createdAt ||
      latestQuestion?.updatedAt ||
      latestQuestion?.createdAt ||
      null;

    return {
      // General Questions
      total: questions.length,
      active,
      pending,
      closed,
      awaitingPayment,
      revenue,
      failedPayments,
      cashPayments,
      razorpayPayments,
      latestActivity,
      questionsLast7Days,
      revenueLast7Days,
      // Advance Chat
      advanceTotal: advanceQuestions.length,
      advanceActive,
      advancePending,
      advanceClosed,
      advanceRevenue,
      advanceAwaitingPayment,
      // Users
      totalUsers,
      activeUsers,
      newUsersLast7Days,
    };
  }, [questions, advanceQuestions, users]);

  const latestItems = useMemo(() => questions.slice(0, 10), [questions]);

  const exportToCSV = () => {
    const headers = [
      "Question ID",
      "Title",
      "User Email",
      "Status",
      "Payment Status",
      "Payment Type",
      "Price",
      "Created At",
      "Updated At",
    ];

    const rows = questions.map((q) => [
      q.id,
      q.title || "",
      q.user?.email || "Unknown",
      q.status || "",
      q.paymentStatus || "",
      q.paymentType || "",
      q.price || 0,
      q.createdAt ? format(new Date(q.createdAt), "yyyy-MM-dd HH:mm:ss") : "",
      q.updatedAt ? format(new Date(q.updatedAt), "yyyy-MM-dd HH:mm:ss") : "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `reports-${format(new Date(), "yyyy-MM-dd-HHmmss")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Reports & Analytics</h1>
          <p className="text-sm text-gray-600 mt-1">
            Comprehensive overview of questions, payments, and user activity
          </p>
          {lastUpdated && (
            <p className="text-xs text-gray-500 mt-1">
              Last refreshed {formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={fetchReports} disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </>
            )}
          </Button>
          <Button onClick={exportToCSV} disabled={loading || questions.length === 0} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <Separator />

      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-gray-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading reports...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
                <MessageSquare className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{metrics.total}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {metrics.questionsLast7Days} in last 7 days
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <IndianRupee className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">
                  ₹{metrics.revenue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  ₹{metrics.revenueLast7Days.toLocaleString("en-IN")} in last 7 days
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-5 w-5 text-purple-500" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{metrics.totalUsers}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {metrics.activeUsers} active • {metrics.newUsersLast7Days} new (7d)
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Awaiting Payments</CardTitle>
                <CreditCard className="h-5 w-5 text-amber-500" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{metrics.awaitingPayment}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {metrics.failedPayments} failed payments
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Statistics */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* General Questions Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  General Questions Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Active</p>
                    <p className="text-lg font-semibold">{metrics.active}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Pending</p>
                    <p className="text-lg font-semibold">{metrics.pending}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Closed</p>
                    <p className="text-lg font-semibold">{metrics.closed}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Total</p>
                    <p className="text-lg font-semibold">{metrics.total}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-xs text-gray-600 mb-2">Payment Breakdown</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Razorpay:</span>
                      <span className="font-medium">₹{metrics.razorpayPayments.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cash:</span>
                      <span className="font-medium">₹{metrics.cashPayments.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advance Chat Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Advance Chat Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Total</p>
                    <p className="text-lg font-semibold">{metrics.advanceTotal}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Active</p>
                    <p className="text-lg font-semibold">{metrics.advanceActive}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Pending</p>
                    <p className="text-lg font-semibold">{metrics.advancePending}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Closed</p>
                    <p className="text-lg font-semibold">{metrics.advanceClosed}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-xs text-gray-600 mb-2">Revenue</p>
                  <p className="text-lg font-semibold">
                    ₹{metrics.advanceRevenue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {metrics.advanceAwaitingPayment} awaiting payment
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Recent Questions Activity</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/questions">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {latestItems.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No questions found. Activity will appear here once questions are created.
                </p>
              ) : (
                <div className="space-y-3">
                  {latestItems.map((question) => {
                    const lastActivity =
                      question.latestMessage?.createdAt ||
                      question.updatedAt ||
                      question.createdAt;
                    return (
                      <div
                        key={question.id}
                        className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 hover:bg-gray-100/50 transition"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {question.title}
                            </p>
                            <p className="text-xs text-gray-600 mt-1 truncate">
                              {question.user?.email ?? "Unknown user"}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${question.status === "ACTIVE"
                              ? "bg-green-100 text-green-800"
                              : question.status === "CLOSED"
                                ? "bg-gray-200 text-gray-700"
                                : "bg-yellow-100 text-yellow-800"
                              }`}>
                              {question.status}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${question.paymentStatus === "SUCCESS"
                              ? "bg-blue-100 text-blue-800"
                              : question.paymentStatus === "PENDING"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                              }`}>
                              {question.paymentStatus}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                          <span>
                            {lastActivity
                              ? formatDistanceToNow(new Date(lastActivity), { addSuffix: true })
                              : "No activity"}
                          </span>
                          {question.price && (
                            <span>• ₹{Number(question.price).toLocaleString("en-IN")}</span>
                          )}
                          {question.paymentType && (
                            <span>• {question.paymentType}</span>
                          )}
                          <Link
                            href={`/dashboard/questions?question=${question.id}`}
                            className="text-blue-600 hover:text-blue-800 underline ml-auto"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* User Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Total Users</p>
                  <p className="text-2xl font-semibold">{metrics.totalUsers}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Active Users</p>
                  <p className="text-2xl font-semibold">{metrics.activeUsers}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {metrics.totalUsers > 0
                      ? Math.round((metrics.activeUsers / metrics.totalUsers) * 100)
                      : 0}% of total
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">New Users (7 days)</p>
                  <p className="text-2xl font-semibold">{metrics.newUsersLast7Days}</p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/users">View All Users</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
