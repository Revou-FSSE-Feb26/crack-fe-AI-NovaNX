import type { RouteLayoutProps } from "@/types/layout";
import { UserNav } from "@/components/layout/user-nav";
import { pageBackgroundClassName } from "@/lib/page-background";

export default function AdminLayout({ children }: RouteLayoutProps) {
  return (
    <div className={pageBackgroundClassName}>
      <div className="mx-auto w-full max-w-[1920px] px-8 py-5">
        <UserNav
          items={[
            { label: "Dashboard", href: "/admin/dashboard" },
            { label: "Books", href: "/admin/books" },
            { label: "Users", href: "/admin/users" },
          ]}
          actionHref="/"
          actionLabel="View Site"
        />
      </div>
      {children}
    </div>
  );
}
