"use client";

import Image from "next/image";
import { useState } from "react";
import { TICKET_IMG, TICKET_IMG_FALLBACK } from "@/lib/campaign";

/** Ticket artwork with the same fallback behaviour as the original page. */
export function TicketImage({ alt, className }: { alt: string; className?: string }) {
  const [src, setSrc] = useState(TICKET_IMG);
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={600}
      sizes="(max-width: 768px) 100vw, 680px"
      className={className}
      onError={() => src !== TICKET_IMG_FALLBACK && setSrc(TICKET_IMG_FALLBACK)}
    />
  );
}
