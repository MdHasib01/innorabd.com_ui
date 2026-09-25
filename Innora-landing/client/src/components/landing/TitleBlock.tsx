import { cn } from "@/lib/utils";

export function TitleBlock({ title, subtitle, className }: { title: string; subtitle: string; className?: string }) {
  return (
    <div
      className={cn(
        "mb-10 text-center after:mx-auto after:mt-3 after:block after:h-[3px] after:w-[70px] after:bg-gold after:content-['']",
        className,
      )}
    >
      <h2 className="text-[32px] leading-tight font-extrabold text-burgundy">{title}</h2>
      <p className="mt-[5px] text-[15px] text-[#666]">{subtitle}</p>
    </div>
  );
}
