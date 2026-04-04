"use client";

import { useEffect, useState } from "react";

import { createStream, updateStream } from "@/lib/api";
import type { Stream, StreamCreate, StreamType, StreamStatus } from "@/types";
import ru from "@/i18n/ru";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const typeItems: Record<string, string> = {
  freelance: ru.streams.type.freelance,
  employment: ru.streams.type.employment,
  business: ru.streams.type.business,
  other: ru.streams.type.other,
};

const statusItems: Record<string, string> = {
  active: ru.streams.status.active,
  paused: ru.streams.status.paused,
  completed: ru.streams.status.completed,
};

interface StreamFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stream?: Stream | null;
  onSuccess: () => void;
}

export function StreamFormDialog({
  open,
  onOpenChange,
  stream,
  onSuccess,
}: StreamFormDialogProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<StreamType>("freelance");
  const [status, setStatus] = useState<StreamStatus>("active");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isEditing = !!stream;

  useEffect(() => {
    if (open) {
      setName(stream?.name ?? "");
      setType(stream?.type ?? "freelance");
      setStatus(stream?.status ?? "active");
      setDescription(stream?.description ?? "");
      setSubmitted(false);
    }
  }, [open, stream]);

  const nameError = submitted
    ? name.trim() === ""
      ? ru.streams.form.nameRequired
      : name.length > 100
        ? ru.streams.form.nameTooLong
        : null
    : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);

    if (name.trim() === "" || name.length > 100) return;

    setSaving(true);
    try {
      const data: StreamCreate = {
        name: name.trim(),
        type,
        status,
        description: description.trim() || null,
      };

      if (isEditing && stream) {
        await updateStream(stream.id, data);
      } else {
        await createStream(data);
      }
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to save stream:", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? ru.streams.editStream : ru.streams.newStream}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="stream-name">{ru.common.name}</Label>
            <Input
              id="stream-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={ru.streams.form.namePlaceholder}
            />
            {nameError && (
              <p className="text-sm text-destructive">{nameError}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>{ru.streams.type.label}</Label>
            <Select
              value={type}
              onValueChange={(val) => setType(val as StreamType)}
              items={typeItems}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(typeItems).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>{ru.streams.status.label}</Label>
            <Select
              value={status}
              onValueChange={(val) => setStatus(val as StreamStatus)}
              items={statusItems}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(statusItems).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="stream-description">{ru.common.description}</Label>
            <Textarea
              id="stream-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={ru.streams.form.descriptionPlaceholder}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {ru.common.cancel}
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? ru.common.saving : ru.common.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
