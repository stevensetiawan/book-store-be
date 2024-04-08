export interface User2 {
  id?: number;
  name: string;
  email: string;
  points: number;
  hashedPassword?: string;
  password?: string;
  created_at: Date;
}

export interface Info {
  message: string;
}

export interface Payload {
  name: string;
  email: string;
  hashedPassword?: string;
}