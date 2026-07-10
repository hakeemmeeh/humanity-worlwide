import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: "light" | "dark";
}

export function Breadcrumbs({ items, variant = "dark" }: BreadcrumbsProps) {
  const isLight = variant === "light";

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol
        className={`flex flex-wrap items-center gap-2 text-sm ${
          isLight ? "text-white/60" : "text-ink/50"
        }`}
      >
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className={`transition-colors ${
                  isLight ? "hover:text-teal" : "hover:text-teal-text"
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`font-medium ${
                  isLight ? "text-white" : "text-navy"
                }`}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
