import { AppNav } from "@/components/layout/app-nav";
import { BookCategory } from "@/components/home/book-category";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/layout/hero-section";
import { PopularAuthors } from "@/components/home/popular-authors";
import { RecommendedForYou } from "@/components/home/recommended-for-you";

export default function Home() {
  return (
    <div className="min-h-screen font-outfit text-foreground">
      <div className="mx-auto w-full max-w-[1920px] px-8 py-5">
        <AppNav />
      </div>

      <main className="mx-auto flex w-full max-w-[1920px] flex-col items-start px-8 pb-16 pt-0">
        <HeroSection />
        <BookCategory />
        <RecommendedForYou />
        <PopularAuthors />
        <Footer />
      </main>
    </div>
  );
}
