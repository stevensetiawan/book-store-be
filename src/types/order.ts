import { User2 } from "./customer";

export interface Orders {
  id: number;
  customer_id?: number;
  book_id?: number | undefined;
  quantity: number;
  total_points: number;
  status?: string;
  created_at: Date;
}

export interface OrderBook {
  id: number;
  book_id: number;
  quantity?: number;
  point?: number;
}

export interface Order {
  customer_id?: User2["id"],
  total_quantity: number,
  total_points: number,
  books?: OrderBook[]
}

export interface OrderPayload {
  customer_id?: number | undefined,
  books: OrderBook[],
  total_quantity: number,
  total_points: number,
}

export interface OrderPayloadCancel {
  customer_id?: number | undefined,
  total_points: number
  order_id: number
}