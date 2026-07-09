import type { RouteLayoutProps } from "@/types/layout";
import { pageBackgroundClassName } from "@/lib/page-background";

export default function UserLayout({ children }: RouteLayoutProps) {
  return <div className={pageBackgroundClassName}>{children}</div>;
}
