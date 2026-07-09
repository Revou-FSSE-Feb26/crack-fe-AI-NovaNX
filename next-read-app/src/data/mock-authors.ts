import andreaHirataAvatar from "@/assets/images/authors/andrea-hirata.svg";
import charlesDickensAvatar from "@/assets/images/authors/charles-dickens.svg";
import danBrownAvatar from "@/assets/images/authors/dan-brown.svg";
import deeLestariAvatar from "@/assets/images/authors/dee-lestari.svg";
import jackLondonAvatar from "@/assets/images/authors/jack-london.svg";
import jkRowlingAvatar from "@/assets/images/authors/jk-rowling.svg";
import michaelConnellyAvatar from "@/assets/images/authors/michael-connelly.svg";
import tereLiyeAvatar from "@/assets/images/authors/tere-liye.svg";
import type { Author } from "@/types/author";

export const mockAuthors: Author[] = [
  {
    id: "andrea-hirata",
    name: "Andrea Hirata",
    booksCount: 12,
    borrowedBooksCount: 8400,
    rating: 4.9,
    avatar: andreaHirataAvatar,
  },
  {
    id: "tere-liye",
    name: "Tere Liye",
    booksCount: 16,
    borrowedBooksCount: 9200,
    rating: 4.8,
    avatar: tereLiyeAvatar,
  },
  {
    id: "dee-lestari",
    name: "Dee Lestari",
    booksCount: 20,
    borrowedBooksCount: 7800,
    rating: 4.8,
    avatar: deeLestariAvatar,
  },
  {
    id: "jk-rowling",
    name: "J.K. Rowling",
    booksCount: 24,
    borrowedBooksCount: 12100,
    rating: 4.9,
    avatar: jkRowlingAvatar,
  },
  {
    id: "jack-london",
    name: "Jack London",
    booksCount: 18,
    borrowedBooksCount: 6500,
    rating: 4.7,
    avatar: jackLondonAvatar,
  },
  {
    id: "charles-dickens",
    name: "Charles Dickens",
    booksCount: 30,
    borrowedBooksCount: 11300,
    rating: 4.9,
    avatar: charlesDickensAvatar,
  },
  {
    id: "michael-connelly",
    name: "Michael Connelly",
    booksCount: 22,
    borrowedBooksCount: 7100,
    rating: 4.7,
    avatar: michaelConnellyAvatar,
  },
  {
    id: "dan-brown",
    name: "Dan Brown",
    booksCount: 14,
    borrowedBooksCount: 8900,
    rating: 4.8,
    avatar: danBrownAvatar,
  },
];
