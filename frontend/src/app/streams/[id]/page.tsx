"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Pencil, Trash2 } from "lucide-react";

import { deleteStream, fetchStream } from "@/lib/api";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  paused:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-transparent",
  completed: "",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function StreamDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const streamId = Number(params.id);
  const isValidId = !Number.isNaN(streamId);

  const [stream, setStream] = useState<Stream | null>(null);
  const [loading, setLoading] = useState(isValidId);
  const [notFound, setNotFound] = useState(!isValidId);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const loadStream = useCallback(() => {
    if (!isValidId) return;

    fetchStream(streamId)
      .then(setStream)
      .catch((err: Error) => {
        if (err.message.includes("404")) {
          setNotFound(true);
        } else {
          console.error("Failed to fetch stream:", err);
        }
      })
      .finally(() => setLoading(false));
  }, [streamId, isValidId]);

  useEffect(() => {
    loadStream();
  }, [loadStream]);

  async function handleDelete() {
    if (!stream) return;
    setDeleting(true);
    try {
      await deleteStream(stream.id);
      router.push("/streams");
    } catch (err) {
      console.error("Failed to delete stream:", err);
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        {ru.common.loading}
      </div>
    );
  }

  if (notFound || !stream) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-base font-semibold">
          {ru.streams.notFound.title}
        </h2>
        <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
          {ru.streams.notFound.description}
        </p>
        <Link
          href="/streams"
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {ru.streams.backToList}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/streams"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {ru.streams.backToList}
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{stream.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
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
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {stream.description}
            </p>
          )}

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {ru.streams.created} {formatDate(stream.created_at)}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(true)}
            >
              <Pencil className="h-4 w-4" />
              {ru.common.edit}
            </Button>
            <Button
              variant="destructive"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
              {ru.common.delete}
            </Button>
          </div>
        </CardContent>
      </Card>

      <StreamFormDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        stream={stream}
        onSuccess={loadStream}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{ru.streams.deleteConfirm.title}</DialogTitle>
            <DialogDescription>
              {ru.streams.deleteConfirm.description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              {ru.common.cancel}
            </Button>
            <Button
              variant="destructive"
              disabled={deleting}
              onClick={handleDelete}
            >
              {deleting ? ru.common.loading : ru.streams.deleteConfirm.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
