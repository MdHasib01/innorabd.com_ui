"use client";

import Image from "next/image";
import { Check, LockKeyhole, Minus, Plus, Ticket, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { VariantKey } from "@/i18n/dictionaries";
import type { PaymentMethod } from "@/lib/api";
import { COD_DELIVERY_FEE, HOTLINE, MAX_QTY, ticketsFor, UNIT_PRICE, VARIANTS } from "@/lib/campaign";
import { toAsciiDigits } from "@/lib/format";
import s from "./landing.module.css";

export type CustomerInfo = { name: string; phone: string; address: string };
export const PHONE_PATTERN = "01[3-9][0-9]{8}";

type Props = {
  variant: VariantKey;
  variantTitle: string; qty: number; onQtyChange: (qty: number) => void;
  payment: PaymentMethod; onPaymentChange: (p: PaymentMethod) => void;
  customer: CustomerInfo; onCustomerChange: (c: CustomerInfo) => void;
  submitting: boolean; onSubmit: () => void;
};

export function Checkout({ variant, variantTitle, qty, onQtyChange, payment, onPaymentChange, customer, onCustomerChange, submitting, onSubmit }: Props) {
  const { t, n, lang } = useLanguage();
  const bn = lang === "bn";
  const activeProduct = VARIANTS.find(item => item.key === variant) ?? VARIANTS[0];
  const isAdvance = payment === "advance";
  const subtotal = qty * UNIT_PRICE;
  const total = subtotal + (isAdvance ? 0 : COD_DELIVERY_FEE);
  const setField = (field: keyof CustomerInfo) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onCustomerChange({ ...customer, [field]: field === "phone" ? toAsciiDigits(e.target.value) : e.target.value });

  return <section id="order-section" className={s.checkoutSection}>
    <div className={s.section}>
      <div className={s.checkoutHeading}><p className={s.eyebrow}>{bn ? "সহজ অর্ডার · সাথে হানিমুন ক্যাম্পেইন টিকিট" : "AN EASY ORDER. YOUR HONEYMOON TICKET INCLUDED."}</p><h2>{bn ? "অর্ডার করুন, স্বপ্নের সুযোগ নিন।" : "Your dream escape starts with an order."}</h2><p>{bn ? "ঠিকানা দিন, পেমেন্ট পদ্ধতি নির্বাচন করুন।" : "Add your address and pick how you’d like to pay."}</p></div>
      <div className={s.deliveryComparison}>
        <div className={s.bestDealOption}><span className={s.bestDealTag}>{bn ? <>সেরা<br/>অফার</> : <>BEST<br/>DEAL</>}</span><Truck size={23}/><span><strong>{bn ? "সম্পূর্ণ পেমেন্টে ডেলিভারি চার্জ ফ্রি" : "Full payment: delivery charge free"}</strong><small>{bn ? "বিকাশ / নগদ" : "bKash / Nagad"}</small></span><b>{bn ? "ফ্রি ডেলিভারি" : "FREE DELIVERY"}</b></div>
        <div><Truck size={23}/><span><strong>{bn ? "ক্যাশ অন ডেলিভারি" : "Cash on delivery"}</strong><small>{bn ? "পার্সেল হাতে পেয়ে পেমেন্ট" : "Pay when your parcel arrives"}</small></span><b>{bn ? `ডেলিভারি ৳${n(COD_DELIVERY_FEE)}` : `৳${COD_DELIVERY_FEE} DELIVERY`}</b></div>
      </div>
      <form onSubmit={e => {e.preventDefault(); onSubmit();}} className={s.checkoutGrid}>
        <fieldset disabled={submitting} className={s.deliveryForm}>
          <legend>{bn ? "১. আপনার সেট ও ঠিকানা" : "1. Your set & delivery details"}</legend>
          <label htmlFor="customer-name">{bn ? "আপনার নাম" : "Full name"}<span>*</span></label>
          <Input id="customer-name" name="name" className={s.input} placeholder={t.checkout.namePh} autoComplete="name" required maxLength={120} value={customer.name} onChange={setField("name")}/>
          <label htmlFor="customer-phone">{bn ? "মোবাইল নম্বর" : "Mobile number"}<span>*</span></label>
          <Input id="customer-phone" name="phone" type="tel" className={s.input} placeholder={bn ? "০১XXXXXXXXX" : "01XXXXXXXXX"} autoComplete="tel" inputMode="numeric" required pattern={PHONE_PATTERN} maxLength={11} title={t.errors.invalid} value={customer.phone} onChange={setField("phone")}/>
          <label htmlFor="customer-address">{bn ? "সম্পূর্ণ ঠিকানা" : "Delivery address"}<span>*</span></label>
          <Input id="customer-address" name="address" className={s.input} placeholder={t.checkout.addressPh} autoComplete="street-address" required maxLength={500} value={customer.address} onChange={setField("address")}/>
          <p className={s.deliveryNote}><Truck size={16}/>{bn ? "সারা বাংলাদেশে আপনার দরজায় পৌঁছে যাবে।" : "Delivered to your doorstep, anywhere in Bangladesh."}</p>
          <div className={s.paymentOptions}><h3 id="payment-label">{bn ? "২. কীভাবে পেমেন্ট করতে চান?" : "2. How would you like to pay?"}</h3><RadioGroup aria-labelledby="payment-label" disabled={submitting} value={payment} onValueChange={v => onPaymentChange(v as PaymentMethod)}>
            <label className={`${isAdvance ? s.paymentSelected : ""} ${s.bestDealOption}`}><span className={s.bestDealTag}>{bn ? <>সেরা<br/>অফার</> : <>BEST<br/>DEAL</>}</span><RadioGroupItem value="advance"/><span className={s.paymentCopy}><strong>{bn ? "সম্পূর্ণ পেমেন্ট · বিকাশ / নগদ" : "Pay in full · bKash / Nagad"}</strong><small>{bn ? `সম্পূর্ণ পেমেন্টে ডেলিভারি চার্জ ফ্রি · মোট ৳${n(subtotal)}` : `Delivery charge free with full payment · Total ৳${n(subtotal)}`}</small></span><b className={s.freeDeliveryBadge}>{bn ? "ডেলিভারি ফ্রি" : "FREE DELIVERY"}</b></label>
            <label className={payment === "cod" ? s.paymentSelected : ""}><RadioGroupItem value="cod"/><span className={s.paymentCopy}><strong>{t.checkout.cod}</strong><small>{bn ? `মোট ৳${n(subtotal + COD_DELIVERY_FEE)} · পার্সেল পেয়ে পেমেন্ট করুন` : `Total ৳${n(subtotal + COD_DELIVERY_FEE)} · Pay on arrival`}</small></span><b className={s.codDeliveryBadge}>+ ৳{n(COD_DELIVERY_FEE)}</b></label>
          </RadioGroup></div>
        </fieldset>
        <aside className={s.orderSummary}>
          <p className={s.eyebrow}>{bn ? "সেট + ক্যাম্পেইন টিকিট" : "YOUR SET + CAMPAIGN TICKETS"}</p><h3>{bn ? "৩. আপনার অর্ডার নিশ্চিত করুন" : "3. Confirm your order"}</h3>
          <div className={s.summaryProduct}><Image src={activeProduct.img} alt={variantTitle} width={64} height={80} className={s.summaryProductImage}/><div><strong>{variantTitle}</strong><span>{bn ? "প্রিমিয়াম নাইটওয়্যার · টু-পিস সেট" : "Premium nightwear · Two-piece set"}</span><b>৳{n(UNIT_PRICE)}</b></div></div>
          <div className={s.quantityRow}><span>{bn ? "পরিমাণ" : "Quantity"}</span><div className={s.quantityControl}><button type="button" disabled={qty <= 1 || submitting} onClick={() => onQtyChange(Math.max(1, qty - 1))} aria-label={bn ? "পরিমাণ কমান" : "Decrease quantity"}><Minus size={14}/></button><output aria-live="polite">{n(qty)}</output><button type="button" disabled={qty >= MAX_QTY || submitting} onClick={() => onQtyChange(Math.min(MAX_QTY, qty + 1))} aria-label={bn ? "পরিমাণ বাড়ান" : "Increase quantity"}><Plus size={14}/></button></div></div>
          <div className={s.ticketSummary}><Ticket size={20}/><span>{bn ? "আপনার ক্যাম্পেইন টিকিট" : "Your campaign tickets"}</span><strong aria-live="polite">{n(ticketsFor(qty))}</strong></div>
          <div className={s.billRow}><span>{bn ? "সাবটোটাল" : "Subtotal"}</span><span>৳{n(subtotal)}</span></div>
          <div className={s.billRow}><span>{bn ? "ডেলিভারি" : "Delivery"}</span><span>{isAdvance ? (bn ? "ফ্রি" : "Free") : `৳${n(COD_DELIVERY_FEE)}`}</span></div>
          <p className={isAdvance ? s.deliverySaving : s.deliveryHint} aria-live="polite"><Truck size={14}/>{isAdvance ? (bn ? `সম্পূর্ণ পেমেন্টে ডেলিভারি চার্জ ৳${n(COD_DELIVERY_FEE)} সাশ্রয়!` : `You save ৳${n(COD_DELIVERY_FEE)} on delivery with full payment!`) : (bn ? `সম্পূর্ণ পেমেন্ট বেছে নিলে ডেলিভারি চার্জ ৳${n(COD_DELIVERY_FEE)} সাশ্রয়।` : `Choose full payment to save the ৳${n(COD_DELIVERY_FEE)} delivery charge.`)}</p>
          <div className={s.totalRow}><strong>{bn ? "সর্বমোট" : "Total"}</strong><strong aria-live="polite">৳{n(total)}</strong></div>
          <Button type="submit" className={s.orderButton} disabled={submitting}>{submitting ? t.checkout.submitting : isAdvance ? t.checkout.submitAdvance(n(subtotal)) : t.checkout.submitCod(n(total))}{!submitting && <Check size={17}/>}</Button>
          <p className={s.secureNote}><LockKeyhole size={13}/>{bn ? "আপনার তথ্য শুধু অর্ডারের জন্য ব্যবহার করা হবে।" : "Your details are used to fulfil your order."}</p>
          <p className={s.helpNote}>{bn ? "কোনো প্রশ্ন আছে?" : "Need a little help?"} <a href={`tel:${HOTLINE}`}>{bn ? "আমাদের কল করুন" : "Give us a call"}</a></p>
        </aside>
      </form>
      <div className={s.faq}><div><p className={s.eyebrow}>{bn ? "জেনে নিন" : "A FEW GOOD THINGS TO KNOW"}</p><h3>{bn ? "আপনার প্রশ্ন, আমাদের উত্তর।" : "Before you make it yours."}</h3></div><div>
        <details><summary>{bn ? "কীভাবে পেমেন্ট করতে পারি?" : "How can I pay for my order?"}</summary><p>{bn ? "ক্যাশ অন ডেলিভারিতে ডেলিভারি চার্জ ১০০ টাকা। বিকাশ বা নগদে অগ্রিম পেমেন্ট করলে ডেলিভারি ফ্রি।" : "Pay cash on delivery with a ৳100 delivery charge, or pay in advance with bKash or Nagad for free delivery."}</p></details>
        <details><summary>{bn ? "ক্যাম্পেইন টিকিট কীভাবে পাব?" : "How do I receive my campaign tickets?"}</summary><p>{bn ? "ইউনিক সিরিয়াল নম্বরযুক্ত ফিজিক্যাল টিকিট আপনার পার্সেলের সাথে দেওয়া হবে। ১টি সেটে ১টি এবং ২টি সেটে ৩টি টিকিট পাবেন।" : "Physical tickets with unique serial numbers are included in your parcel. One set includes one ticket; two sets include three tickets."}</p></details>
        <details><summary>{bn ? "সাইজ বা ফিট সম্পর্কে জানতে চাই।" : "Have a question about sizing or fit?"}</summary><p>{bn ? "অর্ডারের আগে সাইজ ও ফিট সম্পর্কে নিশ্চিত হতে আমাদের হটলাইনে কল করুন। আমরা সাহায্য করতে প্রস্তুত।" : "Call our hotline before ordering to confirm the size and fit that are right for you. We’re happy to help."} <a href={`tel:${HOTLINE}`}>{HOTLINE}</a></p></details>
      </div></div>
    </div>
  </section>;
}
