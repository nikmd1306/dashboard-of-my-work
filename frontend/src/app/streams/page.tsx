"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Layers, Plus } from "lucide-react";

import { fetchStreams } from "@/lib/api";
import type { Stream, StreamStatus, StreamType } from "@/types";
import ru from "@/i18n/ru";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StreamFormDialog } from "@/components/streams/stream-form-dialog";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";

const typeLabel: Record<StreamType, string> = {
  freelance: ru.streams.type.freelance,
  employment: ru.streams.type.employment,
  business: ru.streams.type.business,
  other: ru.streams.type.other,
};

const statusLabel: Record<StreamStatus, string> = {
  active: ru.streams.status.active,
  paused: ru.streams.status.paused,
  completed: ru.streams.status.completed,
};

const statusClassName: Record<StreamStatus, string> = {
  active: "bg-primary/10 text-primary border-transparent",
  paused: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-transparent",
  completed: "",
};

export default function StreamsPage() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStream, setEditingStream] = useState<Stream | null>(null);

  const loadStreams = useCallback(() => {
    fetchStreams()
      .then(setStreams)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadStreams();
  }, [loadStreams]);

  function openCreateDialog() {
    setEditingStream(null);
    setDialogOpen(true);
  }

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center text-muted-foreground">
        {ru.common.loading}
      </div>
    );
  }

  if (streams.length === 0) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title={ru.streams.title} subtitle={ru.streams.subtitle} />
        <EmptyState
          icon={Layers}
          title={ru.streams.empty.title}
          description={ru.streams.empty.description}
          action={
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4" />
              {ru.streams.addStream}
            </Button>
          }
        />
        <StreamFormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          stream={editingStream}
          onSuccess={loadStreams}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        title={ru.streams.title}
        subtitle={ru.streams.subtitle}
        action={
          <Button onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            {ru.streams.addStream}
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {streams.map((stream) => {
          const initials = stream.name.slice(0, 2).toUpperCase();
          return (
            <Link key={stream.id} href={`/streams/${stream.id}`}>
              <Card className="h-full cursor-pointer shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:hover:border-zinc-600">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                    {initials}
                  </div>
                  <div className="flex flex-col">
                    <CardTitle className="text-base font-medium">
                      {stream.name}
                    </CardTitle>
                    <span className="text-xs text-muted-foreground">
                      {typeLabel[stream.type]}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <Badge
                    variant="secondary"
                    className={statusClassName[stream.status]}
                  >
                    {statusLabel[stream.status]}
                  </Badge>
                  {stream.description && (
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {stream.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <StreamFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        stream={editingStream}
        onSuccess={loadStreams}
      />
    </div>
  );
}
