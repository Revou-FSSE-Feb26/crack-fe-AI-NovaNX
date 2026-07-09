import type { Book } from "@/types/book";

export function getRecommendedBooks(books: Book[], limit = 10) {
  return [...books]
    .sort((firstBook, secondBook) => secondBook.rating - firstBook.rating)
    .slice(0, limit);
}
