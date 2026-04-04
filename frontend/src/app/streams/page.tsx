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
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        {ru.common.loading}
      </div>
    );
  }

  if (streams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
          <Layers className="h-6 w-6 text-muted-foreground" />
        </div>
        <h2 className="text-base font-semibold">{ru.streams.empty.title}</h2>
        <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
          {ru.streams.empty.description}
        </p>
        <Button className="mt-6" onClick={openCreateDialog}>
          <Plus className="h-4 w-4" />
          {ru.streams.addStream}
        </Button>
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
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {ru.streams.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {ru.streams.subtitle}
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4" />
          {ru.streams.addStream}
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {streams.map((stream) => (
          <Link key={stream.id} href={`/streams/${stream.id}`}>
            <Card className="h-full cursor-pointer transition-all hover:border-zinc-300 hover:shadow-md dark:hover:border-zinc-600">
              <CardHeader>
                <CardTitle>{stream.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{typeLabel[stream.type]}</Badge>
                  <Badge
                    variant="secondary"
                    className={statusClassName[stream.status]}
                  >
                    {statusLabel[stream.status]}
                  </Badge>
                </div>
                {stream.description && (
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {stream.description}
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
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
