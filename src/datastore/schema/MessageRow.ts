export interface MessageRow {
  id: number;
  sender_id: number | null;
  email_id: number;
  thread_id: number;
  body: string;
  date: number;
}
