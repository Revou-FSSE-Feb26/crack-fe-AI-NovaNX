import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import heartIcon from "@/assets/icons/heart.svg";
import bookIcon from "@/assets/icons/TrendingBook/Icon-1.svg";
import starIcon from "@/assets/icons/TrendingBook/Icon.svg";
import { Card, CardContent } from "@/components/ui/card";
import { mockBooks } from "@/data/mock-books";
import { getRecommendedBooks } from "@/lib/book-utils";
import type { Book } from "@/types/book";

function RecommendedBookCard({
  title,
  author,
  category,
  rating,
  coverClassName,
}: Book) {
  return (
    <Card className="h-[404px] rounded-[28px] border border-palette-indigo-300-20 bg-palette-slate-900-80 p-0 py-0 font-outfit shadow-none ring-0 transition-all duration-200 hover:border-palette-cyan-300 hover:bg-gray-800">
      <CardContent className="flex h-full flex-col px-5 py-5">
        <div
          className={`flex h-[224px] w-full flex-col justify-between rounded-[18px] p-5 shadow-[0px_10px_15px_-3px_rgba(0,_0,_0,_0.3),_0px_4px_6px_-4px_rgba(0,_0,_0,_0.3)] ${coverClassName}`}
        >
          <Image src={bookIcon} alt="" className="size-7" aria-hidden="true" />
          <h3 className="max-w-[150px] text-[22px] leading-6 font-extrabold text-white">
            {title}
          </h3>
        </div>

        <div className="flex flex-1 flex-col pt-5">
          <h4 className="text-[18px] leading-6 font-extrabold text-palette-slate-50">
            {title}
          </h4>
          <p className="pt-1 text-base leading-6 font-bold text-palette-slate-50/90">
            {author}
          </p>
          <p className="pt-1 text-base leading-6 font-medium text-palette-slate-400">
            {category}
          </p>

          <div className="mt-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-gold">
              <Image
                src={starIcon}
                alt=""
                className="size-4"
                aria-hidden="true"
              />
              <b className="text-sm leading-5">{rating.toFixed(1)}</b>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-palette-indigo-300-20 bg-gray-200">
                <ShoppingCart
                  className="size-4 text-palette-slate-50"
                  aria-hidden="true"
                />
              </span>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-palette-indigo-300-20 bg-gray-200">
                <Image
                  src={heartIcon}
                  alt=""
                  className="size-4"
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function RecommendedForYou() {
  const recommendedBooks = getRecommendedBooks(mockBooks);

  return (
    <section className="w-full py-10 text-left font-menlo text-[12px] text-skyblue">
      <div className="flex w-full items-end justify-between gap-5">
        <div className="flex max-w-[520px] flex-col items-start">
          <p className="tracking-[2.88px] leading-4 uppercase">recommendation</p>
          <h2 className="pt-1 font-outfit text-[30px] leading-9 font-extrabold text-palette-slate-50">
            Recommended for you
          </h2>
        </div>

        <Link
          href="/book-list"
          className="rounded-full border border-palette-indigo-300-20 px-6 py-2 font-outfit text-sm leading-5 text-palette-slate-50 transition-colors hover:border-palette-cyan-300 hover:text-palette-cyan-300"
        >
          View all
        </Link>
      </div>

      <div className="grid w-full grid-cols-1 gap-5 pt-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {recommendedBooks.map((book) => (
          <RecommendedBookCard key={book.id} {...book} />
        ))}
      </div>
    </section>
  );
}
