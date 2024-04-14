export interface Book {
  id: number;
  title: string;
  writer: string;
  cover_image: string;
  point: number;
  tags: string[];
  created_at: Date;
}

export interface params {
  showentry: number;
  offset: number;
}


