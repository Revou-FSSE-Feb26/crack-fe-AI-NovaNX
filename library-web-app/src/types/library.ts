export type Role = "USER" | "ADMIN";

export type LoanStatus = "BORROWED" | "RETURNED" | "OVERDUE";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  numberOfPages: number;
  totalCopies: number;
  availableCopies: number;
  averageRating: number;
  authorId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Loan {
  id: string;
  userId: string;
  bookId: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  durationDays: number;
  status: LoanStatus;
  createdAt: string;
  updatedAt: string;
}

