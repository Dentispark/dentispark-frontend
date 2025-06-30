import { cn } from "@/src/lib/utils";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export function Title({ children, className }: TitleProps) {
  return (
    <span
      className={cn(
        "border-primary-700 bg-primary-100 text-primary-700 rounded-full border px-6 py-2 text-base font-medium",
        className,
      )}
    >
      {children}
    </span>
  );
}
