"use client";

import { useEffect, useMemo, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Loader2, RefreshCw, TrendingUp } from "lucide-react";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/questions?limit=250", {
        cache: "no-store",
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Unable to load reports data");
      }
      const data = await response.json();
      setQuestions(sortQuestionsByRecent(data.questions ?? []));
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
    if (!questions?.length) {
      return {
        total: 0,
        active: 0,
        pending: 0,
        closed: 0,
        awaitingPayment: 0,
        revenue: 0,
        latestActivity: null,
      };
    }
    let active = 0;
    let pending = 0;
    let closed = 0;
    let awaitingPayment = 0;
    let revenue = 0;
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
        default:
          break;
      }
      if (question.paymentStatus === "PENDING") {
        awaitingPayment += 1;
      }
      if (
        question.paymentStatus === "SUCCESS" &&
        question.price != null &&
        !Number.isNaN(Number(question.price))
      ) {
        revenue += Number(question.price);
      }
    });

    const latestQuestion = questions[0];
    const latestActivity =
      latestQuestion?.latestMessage?.createdAt ||
      latestQuestion?.updatedAt ||
      latestQuestion?.createdAt ||
      null;

    return {
      total: questions.length,
      active,
      pending,
      closed,
      awaitingPayment,
      revenue,
      latestActivity,
    };
  }, [questions]);

  const latestItems = useMemo(() => questions.slice(0, 5), [questions]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/20 bg-white/95 px-4 py-3 shadow-sm">
        <div>
          <h1 className="text-2xl font-semibold">Reports</h1>
          <p className="text-sm text-muted-foreground">
            Live snapshot of question activity and payments across the workspace.
          </p>
          {lastUpdated && (
            <p className="text-xs text-muted-foreground/80">
              Last refreshed{" "}
              {formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={fetchReports} disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Refresh
              </>
            )}
          </Button>
          <Button variant="outline" className="flex items-center gap-2" disabled>
            <Download className="h-4 w-4" />
            Export CSV (coming soon)
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border border-primary/20 bg-white/95 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Questions
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-foreground">
              {metrics.total}
            </p>
          </CardContent>
        </Card>
        <Card className="border border-primary/20 bg-white/95 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Conversations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-foreground">
              {metrics.active}
            </p>
            <p className="text-xs text-muted-foreground">
              {metrics.pending} waiting • {metrics.closed} closed
            </p>
          </CardContent>
        </Card>
        <Card className="border border-primary/20 bg-white/95 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Awaiting Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-foreground">
              {metrics.awaitingPayment}
            </p>
            <p className="text-xs text-muted-foreground">
              Users yet to complete payment
            </p>
          </CardContent>
        </Card>
        <Card className="border border-primary/20 bg-white/95 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Estimated Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-foreground">
              ₹{metrics.revenue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </p>
            <p className="text-xs text-muted-foreground">
              Based on paid questions only
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-muted/40 bg-white/95 shadow-sm">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {latestItems.length === 0 ? (
            <p className="text-muted-foreground">
              Recent activity will appear here once questions are created.
            </p>
          ) : (
            latestItems.map((question) => {
              const lastActivity =
                question.latestMessage?.createdAt ||
                question.updatedAt ||
                question.createdAt;
              return (
                <div
                  key={question.id}
                  className="flex flex-col gap-1 rounded-lg border border-muted/40 bg-muted/10 px-3 py-2 text-foreground transition hover:border-primary/40 hover:bg-primary/5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium">{question.title}</p>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                      {question.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Payment: {question.paymentStatus?.toLowerCase()} •{" "}
                    {lastActivity
                      ? formatDistanceToNow(new Date(lastActivity), {
                        addSuffix: true,
                      })
                      : "No activity recorded"}
                  </p>
                  <p className="text-xs text-muted-foreground/80 truncate">
                    User: {question.user?.email ?? "Unknown"}
                  </p>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      <Card className="border border-muted/40 bg-white/95 shadow-sm">
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Detailed CSV exports are in progress. Soon you&apos;ll be able to download
            payment summaries, conversation timelines, and attachment logs directly
            from this workspace.
          </p>
          <p>
            Need data immediately? Use the refresh button above and copy the metrics,
            or reach out to the development team to prioritise custom exports.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
