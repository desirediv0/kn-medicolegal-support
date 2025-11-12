"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function AdminUsers() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/users", { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Failed to load users");
        }
        const data = await res.json();
        setUsers(data.users ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500">
            Overview of registered users and their activity.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/dashboard/questions">Go to Questions</Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading users...
        </div>
      ) : users.length === 0 ? (
        <p className="text-sm text-gray-500">
          No users found. Once sign-ups begin, they will appear here.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {users.map((user) => (
            <Card key={user.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">
                  {user.name ?? "Unnamed User"}
                </CardTitle>
                <p className="text-xs text-gray-500">{user.email}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">Total Questions</p>
                    <p className="font-semibold text-gray-900">
                      {user.totalQuestions}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Open</p>
                    <p className="font-semibold text-gray-900">
                      {user.openQuestions}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Paid</p>
                    <p className="font-semibold text-gray-900">
                      {user.paidQuestions}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Joined</p>
                    <p className="font-semibold text-gray-900">
                      {formatDistanceToNow(new Date(user.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Last question:{" "}
                  {user.lastQuestionAt
                    ? formatDistanceToNow(new Date(user.lastQuestionAt), {
                        addSuffix: true,
                      })
                    : "No questions yet"}
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <Link href="/dashboard/questions">
                    <MessageSquare className="h-4 w-4" />
                    View Conversations
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
