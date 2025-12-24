"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  User,
  MessageSquare,
  FileText,
  CreditCard,
  Clock,
  CheckCircle2,
  ArrowRight,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalQuestions: 0,
    activeQuestions: 0,
    closedQuestions: 0,
    advanceChatAccess: false,
    advanceChatExpiry: null,
  });
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      loadDashboardData();
    }
  }, [status, session]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [questionsRes, accessRes] = await Promise.all([
        fetch("/api/questions", { cache: "no-store" }),
        fetch("/api/advance-chat/access", { cache: "no-store" }),
      ]);

      if (questionsRes.ok) {
        const questionsData = await questionsRes.json();
        const questionsList = questionsData.questions ?? [];
        setQuestions(questionsList);

        setStats(prev => ({
          ...prev,
          totalQuestions: questionsList.length,
          activeQuestions: questionsList.filter(q => q.status === "ACTIVE").length,
          closedQuestions: questionsList.filter(q => q.status === "CLOSED").length,
        }));
      }

      if (accessRes.ok) {
        const accessData = await accessRes.json();
        setStats(prev => ({
          ...prev,
          advanceChatAccess: accessData.hasAccess ?? false,
          advanceChatExpiry: accessData.access?.expiryDate || null,
        }));
      }
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const recentQuestions = questions
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  if (status === "loading" || loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Welcome back, {session?.user?.name || "User"}!
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Here&apos;s an overview of your account and activities.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/user/profile">
            <User className="h-4 w-4 mr-2" />
            View Profile
          </Link>
        </Button>
      </div>

      <Separator />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Questions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
            <MessageSquare className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{stats.totalQuestions}</p>
            <p className="text-xs text-gray-500 mt-1">
              {stats.activeQuestions} active
            </p>
          </CardContent>
        </Card>

        {/* Active Questions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Conversations</CardTitle>
            <Clock className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{stats.activeQuestions}</p>
            <p className="text-xs text-gray-500 mt-1">
              In progress
            </p>
          </CardContent>
        </Card>

        {/* Closed Questions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Closed</CardTitle>
            <CheckCircle2 className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{stats.closedQuestions}</p>
            <p className="text-xs text-gray-500 mt-1">
              Completed
            </p>
          </CardContent>
        </Card>

        {/* Advance Chat Access */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Advance Chat</CardTitle>
            <CreditCard className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            {stats.advanceChatAccess ? (
              <>
                <p className="text-lg font-semibold text-green-600">Active</p>
                <p className="text-xs text-gray-500 mt-1">
                  {stats.advanceChatExpiry
                    ? `Expires: ${format(new Date(stats.advanceChatExpiry), "MMM dd, yyyy")}`
                    : "Lifetime access"}
                </p>
              </>
            ) : (
              <>
                <p className="text-lg font-semibold text-gray-400">Not Active</p>
                <p className="text-xs text-gray-500 mt-1">
                  Purchase to access
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start" size="lg">
              <Link href="/user">
                <MessageSquare className="h-4 w-4 mr-2" />
                Start New Question
                <ArrowRight className="h-4 w-4 ml-auto" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start" size="lg">
              <Link href="/user/history">
                <FileText className="h-4 w-4 mr-2" />
                View Question History
                <ArrowRight className="h-4 w-4 ml-auto" />
              </Link>
            </Button>
            {stats.advanceChatAccess ? (
              <Button asChild variant="outline" className="w-full justify-start" size="lg">
                <Link href="/user/advance-chat">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Advance Chat
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Link>
              </Button>
            ) : (
              <Button asChild variant="outline" className="w-full justify-start" size="lg">
                <Link href="/user/advance-chat">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Purchase Advance Chat Access
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Link>
              </Button>
            )}
            <Button asChild variant="outline" className="w-full justify-start" size="lg">
              <Link href="/user/profile">
                <User className="h-4 w-4 mr-2" />
                Manage Profile
                <ArrowRight className="h-4 w-4 ml-auto" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Questions */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Recent Questions</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/user/history">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentQuestions.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500 mb-4">No questions yet</p>
                <Button asChild>
                  <Link href="/user">Start Your First Question</Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-3">
                {recentQuestions.map((question) => (
                  <li
                    key={question.id}
                    className="rounded-md border border-gray-200 p-3 hover:bg-gray-50 transition"
                  >
                    <Link href={`/user?question=${question.id}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {question.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {format(new Date(question.createdAt), "MMM dd, yyyy")}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${question.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : question.status === "CLOSED"
                            ? "bg-gray-200 text-gray-700"
                            : "bg-yellow-100 text-yellow-800"
                          }`}>
                          {question.status}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* User Profile Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Account Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Name</p>
              <p className="text-base text-gray-900">{session?.user?.name || "Not set"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Email</p>
              <p className="text-base text-gray-900">{session?.user?.email || "Not set"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Account Type</p>
              <p className="text-base text-gray-900 capitalize">
                {session?.user?.role?.toLowerCase() || "User"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Member Since</p>
              <p className="text-base text-gray-900">
                {session?.user?.emailVerified
                  ? format(new Date(session.user.emailVerified), "MMM dd, yyyy")
                  : "Recently"}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/user/profile">
                <User className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
