import type {
  FinanceEntry,
  FinanceEntryCreate,
  FinanceEntryUpdate,
  Stream,
  StreamCreate,
  StreamUpdate,
  TimeEntry,
  TimeEntryCreate,
  TimeEntryUpdate,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// --- Streams ---

export function fetchStreams(): Promise<Stream[]> {
  return request("/streams");
}

export function fetchStream(id: number): Promise<Stream> {
  return request(`/streams/${id}`);
}

export function createStream(data: StreamCreate): Promise<Stream> {
  return request("/streams", { method: "POST", body: JSON.stringify(data) });
}

export function updateStream(id: number, data: StreamUpdate): Promise<Stream> {
  return request(`/streams/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteStream(id: number): Promise<void> {
  return request(`/streams/${id}`, { method: "DELETE" });
}

// --- Time entries ---

export function fetchTimeEntries(streamId?: number): Promise<TimeEntry[]> {
  const query = streamId != null ? `?stream_id=${streamId}` : "";
  return request(`/time-entries${query}`);
}

export function createTimeEntry(data: TimeEntryCreate): Promise<TimeEntry> {
  return request("/time-entries", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateTimeEntry(
  id: number,
  data: TimeEntryUpdate,
): Promise<TimeEntry> {
  return request(`/time-entries/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteTimeEntry(id: number): Promise<void> {
  return request(`/time-entries/${id}`, { method: "DELETE" });
}

// --- Finance entries ---

export function fetchFinanceEntries(
  streamId?: number,
): Promise<FinanceEntry[]> {
  const query = streamId != null ? `?stream_id=${streamId}` : "";
  return request(`/finance-entries${query}`);
}

export function createFinanceEntry(
  data: FinanceEntryCreate,
): Promise<FinanceEntry> {
  return request("/finance-entries", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateFinanceEntry(
  id: number,
  data: FinanceEntryUpdate,
): Promise<FinanceEntry> {
  return request(`/finance-entries/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteFinanceEntry(id: number): Promise<void> {
  return request(`/finance-entries/${id}`, { method: "DELETE" });
}
