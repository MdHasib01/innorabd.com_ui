"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import type { VariantKey } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ApiError, createOrder, type OrderPayload, type OrderResult, type PaymentMethod } from "@/lib/api";
import { UNIT_PRICE } from "@/lib/campaign";
import { Checkout, type CustomerInfo } from "./Checkout";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { PaymentDialog } from "./PaymentDialog";
import { ProductShowcase } from "./ProductShowcase";
import { SuccessDialog } from "./SuccessDialog";
import { TicketShowcase } from "./TicketShowcase";
import { BrandStory } from "./BrandStory";
import { OrderShortcut } from "./OrderShortcut";
import styles from "./landing.module.css";

const EMPTY_CUSTOMER: CustomerInfo = { name: "", phone: "", address: "" };

export function Landing() {
  const { t, lang } = useLanguage();

  const [variant, setVariant] = useState<VariantKey>("burgundy");
  const [qty, setQty] = useState(1);
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [customer, setCustomer] = useState<CustomerInfo>(EMPTY_CUSTOMER);
  const [submitting, setSubmitting] = useState(false);

  const [payOpen, setPayOpen] = useState(false);
  const [success, setSuccess] = useState<(OrderResult & { paymentMethod: PaymentMethod }) | null>(null);

  const placeOrder = useCallback(
    async (paymentMethod: PaymentMethod, advancePayment?: OrderPayload["advancePayment"]) => {
      setSubmitting(true);
      try {
        const result = await createOrder({ ...customer, variant, quantity: qty, paymentMethod, advancePayment, lang });
        setPayOpen(false);
        setCustomer(EMPTY_CUSTOMER);
        setQty(1);
        setPayment("cod");
        setSuccess({ ...result, paymentMethod });
      } catch (err) {
        const status = err instanceof ApiError ? err.status : 0;
        toast.error(status === 409 ? t.errors.duplicateTrx : status === 400 ? t.errors.invalid : t.errors.generic);
      } finally {
        setSubmitting(false);
      }
    },
    [customer, variant, qty, lang, t],
  );

  return (
    <>
      <a href="#dream-tour" className={styles.skipLink}>{lang === "bn" ? "মূল অংশে যান" : "Skip to content"}</a>
      <Header />
      <main>
        <Hero />
        <TicketShowcase />
        <ProductShowcase variant={variant} onVariantChange={setVariant} />
        <Checkout
          variant={variant}
          onVariantChange={setVariant}
          variantTitle={t.product.variants[variant].title}
          qty={qty}
          onQtyChange={setQty}
          payment={payment}
          onPaymentChange={setPayment}
          customer={customer}
          onCustomerChange={setCustomer}
          submitting={submitting}
          onSubmit={() => (payment === "advance" ? setPayOpen(true) : placeOrder("cod"))}
        />
        <BrandStory />
      </main>

      <Footer />
      <OrderShortcut hidden={payOpen || success !== null} />

      <PaymentDialog
        open={payOpen}
        onOpenChange={setPayOpen}
        amount={qty * UNIT_PRICE}
        submitting={submitting}
        onSubmit={(details) => placeOrder("advance", details)}
      />
      <SuccessDialog result={success} onClose={() => setSuccess(null)} />
    </>
  );
}
