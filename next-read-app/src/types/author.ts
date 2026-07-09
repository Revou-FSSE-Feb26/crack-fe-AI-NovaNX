import type { StaticImageData } from "next/image";

export type Author = {
  id: string;
  name: string;
  booksCount: number;
  borrowedBooksCount: number;
  rating: number;
  avatar: StaticImageData;
};
