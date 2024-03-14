export interface EmailRow {
  id: number;
  universal_message_id: string;
  in_reply_to: string;
  mailserver_id: string;
  from: string;
  to: string;
  cc: string;
  body: string;
  subject: string;
  date: number;
}
