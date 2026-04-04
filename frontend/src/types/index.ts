export type StreamType = "freelance" | "employment" | "business" | "other";

export type StreamStatus = "active" | "paused" | "completed";

export interface Stream {
  id: number;
  name: string;
  type: StreamType;
  status: StreamStatus;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface StreamCreate {
  name: string;
  type: StreamType;
  status?: StreamStatus;
  description?: string | null;
}

export interface StreamUpdate {
  name?: string;
  type?: StreamType;
  status?: StreamStatus;
  description?: string | null;
}

export type FinanceEntryType = "income" | "expense";

export interface TimeEntry {
  id: number;
  stream_id: number;
  date: string;
  hours: number;
  description: string | null;
  created_at: string;
}

export interface TimeEntryCreate {
  stream_id: number;
  date: string;
  hours: number;
  description?: string | null;
}

export interface TimeEntryUpdate {
  stream_id?: number;
  date?: string;
  hours?: number;
  description?: string | null;
}

export interface FinanceEntry {
  id: number;
  stream_id: number;
  date: string;
  amount: number;
  type: FinanceEntryType;
  description: string | null;
  created_at: string;
}

export interface FinanceEntryCreate {
  stream_id: number;
  date: string;
  amount: number;
  type: FinanceEntryType;
  description?: string | null;
}

export interface FinanceEntryUpdate {
  stream_id?: number;
  date?: string;
  amount?: number;
  type?: FinanceEntryType;
  description?: string | null;
}
