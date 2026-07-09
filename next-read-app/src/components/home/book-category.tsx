import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import scienceIcon from "@/assets/icons/category/Icon-1.svg";
import financeIcon from "@/assets/icons/category/Icon-2.svg";
import selfImprovementIcon from "@/assets/icons/category/Icon-3.svg";
import nonFictionIcon from "@/assets/icons/category/Icon-4.svg";
import fictionIcon from "@/assets/icons/category/Icon-5.svg";
import educationIcon from "@/assets/icons/category/Icon-6.svg";

interface CategoryItem {
  title: string;
  subtitle: string;
  icon: StaticImageData;
}

const categories: CategoryItem[] = [
  {
    title: "Fiction",
    subtitle: "Imagination & stories",
    icon: fictionIcon,
  },
  {
    title: "Non-Fiction",
    subtitle: "Real-world insight",
    icon: nonFictionIcon,
  },
  {
    title: "Self-Improvement",
    subtitle: "Growth & mindset",
    icon: selfImprovementIcon,
  },
  {
    title: "Finance",
    subtitle: "Money & business",
    icon: financeIcon,
  },
  {
    title: "Science & Technology",
    subtitle: "Future knowledge",
    icon: scienceIcon,
  },
  {
    title: "Education",
    subtitle: "Learning resources",
    icon: educationIcon,
  },
];

function CategoryCard({ title, subtitle, icon }: CategoryItem) {
  return (
    <Link
      href={{
        pathname: "/book-list",
        query: { category: title },
      }}
      className="min-w-[168px] flex-1"
      aria-label={`View ${title} books`}
    >
      <Card className="h-[182px] justify-center rounded-3xl border border-palette-indigo-300-20 bg-palette-slate-900-80 p-0 py-0 shadow-none ring-0 transition-all duration-200 hover:border-palette-cyan-300 hover:bg-gray-800">
        <CardContent className="flex h-full flex-col justify-center px-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-palette-cyan-300-10">
            <Image
              src={icon}
              alt=""
              className="size-6"
              aria-hidden="true"
            />
          </div>

          <div className="pt-5">
            <h2 className="max-w-[136px] text-base leading-6 font-bold text-palette-slate-50">
              {title}
            </h2>
            <p className="max-w-[136px] text-sm leading-5 font-medium text-palette-slate-400">
              {subtitle}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function BookCategory() {
  return (
    <section className="w-full pt-6" aria-label="Book categories">
      <div className="flex w-full flex-wrap gap-3 xl:flex-nowrap">
        {categories.map((category) => (
          <CategoryCard key={category.title} {...category} />
        ))}
      </div>
    </section>
  );
}
