"use client";

import Image from "next/image";
import { useState } from "react";
import { TICKET_IMG, TICKET_IMG_FALLBACK } from "@/lib/campaign";

/** Campaign artwork with the full-resolution original as a fallback. */
export function TicketImage({ alt, className }: { alt: string; className?: string }) {
  const [src, setSrc] = useState(TICKET_IMG);
  return <Image src={src} alt={alt} width={1599} height={984} sizes="(max-width: 760px) 90vw, 620px" className={className} onError={() => src !== TICKET_IMG_FALLBACK && setSrc(TICKET_IMG_FALLBACK)}/>;
}
