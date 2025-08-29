import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8", className)}
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
        fill="hsl(var(--primary))"
      />
      <path
        d="M12 6C9.17 6 6.88 7.79 6.2 10.5H8.23C8.82 8.92 10.28 8 12 8C13.72 8 15.18 8.92 15.77 10.5H17.8C17.12 7.79 14.83 6 12 6Z"
        fill="hsl(var(--accent))"
      />
      <path
        d="M12 18C14.83 18 17.12 16.21 17.8 13.5H15.77C15.18 15.08 13.72 16 12 16C10.28 16 8.82 15.08 8.23 13.5H6.2C6.88 16.21 9.17 18 12 18Z"
        fill="hsl(var(--accent))"
      />
    </svg>
  );
}
