import Image from "next/image";
import Link from "next/link";
import { Filter, ShoppingCart } from "lucide-react";

import heartIcon from "@/assets/icons/heart.svg";
import bookIcon from "@/assets/icons/TrendingBook/Icon-1.svg";
import starIcon from "@/assets/icons/TrendingBook/Icon.svg";
import { AppNav } from "@/components/layout/app-nav";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { mockBooks } from "@/data/mock-books";
import { cn } from "@/lib/utils";
import type { Book } from "@/types/book";
import type { FilterItem } from "@/types/filter";

const categoryLabels = [
  "Fiction",
  "Non-Fiction",
  "Self-Improvement",
  "Finance",
  "Science & Technology",
  "Education",
];

const ratingValues = [5, 4, 3, 2, 1];

type BookListPageProps = {
  searchParams?: Promise<{
    category?: string | string[];
    rating?: string | string[];
    search?: string | string[];
  }>;
};

const getParamValue = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

const buildBookListHref = ({
  category,
  rating,
  search,
}: {
  category?: string;
  rating?: number;
  search?: string;
}) => {
  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  if (rating) {
    params.set("rating", rating.toString());
  }

  if (search) {
    params.set("search", search);
  }

  const queryString = params.toString();
  return queryString ? `/book-list?${queryString}` : "/book-list";
};

const getCategoryFilters = ({
  selectedCategory,
  selectedRating,
  searchQuery,
}: {
  selectedCategory?: string;
  selectedRating?: number;
  searchQuery?: string;
}): FilterItem[] =>
  categoryLabels.map((label) => ({
    label,
    active: label === selectedCategory,
    href: buildBookListHref({
      category: label,
      rating: selectedRating,
      search: searchQuery,
    }),
  }));

const getRatingFilters = ({
  selectedCategory,
  selectedRating,
  searchQuery,
}: {
  selectedCategory?: string;
  selectedRating?: number;
  searchQuery?: string;
}): FilterItem[] =>
  ratingValues.map((rating) => ({
    label: `★ ${rating}`,
    active: rating === selectedRating,
    href: buildBookListHref({
      category: selectedCategory,
      rating,
      search: searchQuery,
    }),
  }));

function FilterGroup({ title, items }: { title: string; items: FilterItem[] }) {
  return (
    <div className="space-y-5">
      <h3 className="text-base leading-6 font-extrabold text-palette-slate-50">
        {title}
      </h3>

      <div className="space-y-4">
        {items.map((item) => {
          const content = (
            <>
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-md border border-palette-indigo-300-20 bg-white/5",
                  item.active && "border-skyblue bg-skyblue",
                )}
              >
                {item.active ? (
                  <span className="size-2 rounded-sm bg-[#101632]" />
                ) : null}
              </span>
              {item.label}
            </>
          );

          return item.href ? (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 text-[15px] leading-6 font-extrabold text-palette-slate-400 transition-colors hover:text-palette-cyan-300",
                item.active && "text-palette-slate-50",
              )}
            >
              {content}
            </Link>
          ) : (
            <label
              key={item.label}
              className="flex items-center gap-3 text-[15px] leading-6 font-extrabold text-palette-slate-400"
            >
              {content}
            </label>
          );
        })}
      </div>
    </div>
  );
}

function BookFilterCard({
  selectedCategory,
  selectedRating,
  searchQuery,
}: {
  selectedCategory?: string;
  selectedRating?: number;
  searchQuery?: string;
}) {
  const categories = getCategoryFilters({
    selectedCategory,
    selectedRating,
    searchQuery,
  });
  const ratings = getRatingFilters({
    selectedCategory,
    selectedRating,
    searchQuery,
  });

  return (
    <Card className="h-full min-h-[690px] rounded-[28px] border border-palette-indigo-300-20 bg-gray-200 p-0 py-0 ring-0">
      <CardContent className="px-7 py-8">
        <div className="flex items-center justify-between gap-4">
          <p className="font-menlo text-xs leading-4 font-bold tracking-[3.2px] text-skyblue uppercase">
            filter
          </p>
          <Filter className="size-5 text-skyblue" aria-hidden="true" />
        </div>

        <div className="pt-7">
          <FilterGroup title="Category" items={categories} />
        </div>

        <div className="my-10 h-px bg-palette-indigo-300-20" />

        <FilterGroup title="Rating" items={ratings} />
      </CardContent>
    </Card>
  );
}

function BookCard({ title, author, category, rating, coverClassName }: Book) {
  return (
    <Card className="h-[404px] rounded-[28px] border border-palette-indigo-300-20 bg-palette-slate-900-80 p-0 py-0 shadow-none ring-0 transition-all duration-200 hover:border-palette-cyan-300 hover:bg-gray-800">
      <CardContent className="flex h-full flex-col px-5 py-5">
        <div
          className={cn(
            "flex h-[224px] w-full flex-col justify-between rounded-[18px] p-5 shadow-[0px_10px_15px_-3px_rgba(0,_0,_0,_0.3),_0px_4px_6px_-4px_rgba(0,_0,_0,_0.3)]",
            coverClassName,
          )}
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

export default async function BookListPage({ searchParams }: BookListPageProps) {
  const resolvedSearchParams = await searchParams;
  const selectedCategory = getParamValue(resolvedSearchParams?.category);
  const selectedRatingParam = getParamValue(resolvedSearchParams?.rating);
  const selectedRating = selectedRatingParam
    ? Number(selectedRatingParam)
    : undefined;
  const searchQuery = getParamValue(resolvedSearchParams?.search)?.trim();
  const normalizedSearchQuery = searchQuery?.toLowerCase();
  const filteredBooks = mockBooks.filter((book) => {
    const matchesCategory = selectedCategory
      ? book.category === selectedCategory
      : true;
    const matchesSearch = normalizedSearchQuery
      ? [book.title, book.author, book.category].some((value) =>
          value.toLowerCase().includes(normalizedSearchQuery),
        )
      : true;
    const matchesRating = selectedRating
      ? Math.floor(book.rating) === selectedRating
      : true;

    return matchesCategory && matchesRating && matchesSearch;
  });
  const pageTitle = searchQuery
    ? `Search results for "${searchQuery}"`
    : selectedCategory ?? "Book List";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1160px] flex-col px-5 pt-7 pb-10 font-outfit text-palette-slate-50 sm:px-8">
      <AppNav />

      <h1 className="pt-8 text-[30px] leading-9 font-extrabold">
        {pageTitle}
      </h1>

      <div className="grid items-start gap-6 pt-5 lg:grid-cols-[246px_1fr]">
        <BookFilterCard
          selectedCategory={selectedCategory}
          selectedRating={selectedRating}
          searchQuery={searchQuery}
        />

        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => <BookCard key={book.id} {...book} />)
          ) : (
            <Card className="rounded-[24px] border border-palette-indigo-300-20 bg-gray-200 p-0 py-0 shadow-none ring-0 sm:col-span-2 xl:col-span-3">
              <CardContent className="px-6 py-8 text-sm leading-6 text-palette-slate-400">
                No books match your search yet.
              </CardContent>
            </Card>
          )}
        </section>
      </div>

      <div className="pt-14">
        <Footer />
      </div>
    </main>
  );
}
