"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type HeaderSearchProps = {
  placeholder?: string;
};

export function HeaderSearch({
  placeholder = "Search book, author, ISBN...",
}: HeaderSearchProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      router.push("/book-list");
      return;
    }

    router.push(`/book-list?search=${encodeURIComponent(query)}`);
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="relative z-10 box-border flex h-14 min-w-[320px] flex-1 items-center gap-3 rounded-num-30504000 border-[0.9px] border-solid border-palette-indigo-300-20 bg-white/10 px-5 py-0 text-palette-slate-400 shadow-[inset_0_0_0_1px_rgba(255,_255,_255,_0.04)] backdrop-blur-xl"
    >
      <Search
        className="relative h-5 w-5 shrink-0 text-skyblue"
        aria-hidden="true"
      />
      <span className="sr-only">Search books</span>
      <Input
        type="search"
        aria-label="Search books"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder={placeholder}
        className="header-search-input relative h-full min-w-0 flex-1 border-0 bg-transparent px-0 py-0 text-base leading-5 font-medium text-palette-slate-50 shadow-none outline-none placeholder:text-palette-slate-400 focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent"
      />
      <Button
        type="submit"
        variant="outline"
        aria-label="Search"
        className="h-10 rounded-full border-[0.9px] border-palette-indigo-300-20 bg-white/10 px-5 text-sm leading-5 font-extrabold text-palette-slate-50 shadow-[inset_0_0_0_1px_rgba(255,_255,_255,_0.04)] outline outline-1 outline-palette-indigo-300-20 transition-colors hover:!border-palette-cyan-300 hover:bg-white/15 hover:text-palette-cyan-300 hover:outline-palette-cyan-300 focus-visible:!border-palette-cyan-300 focus-visible:text-palette-cyan-300 focus-visible:outline-palette-cyan-300 focus-visible:ring-palette-cyan-300/30 active:!border-palette-cyan-300 active:text-palette-cyan-300 active:outline-palette-cyan-300"
      >
        Search
      </Button>
    </form>
  );
}
