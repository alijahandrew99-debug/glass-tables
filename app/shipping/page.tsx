import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Shipping & Returns — GLASS TABLES" };

export default function ShippingPage() {
  return (
    <LegalPage
      eyebrow="Care"
      title="Shipping & Returns"
      blocks={[
        {
          h: "Shipping",
          p: "Complimentary tracked shipping on orders over $100. Orders ship within 2 business days in discreet, unbranded outer packaging.",
        },
        {
          h: "Returns",
          p: "30 days, unworn, in the original lacquer case. Initiate by email and we send a prepaid label. Refunds issue to the original payment method within 5 business days of receipt.",
        },
        {
          h: "Repairs",
          p: "Every piece carries a one-year craftsmanship guarantee. Stones that loosen under normal wear are reset without charge.",
        },
      ]}
    />
  );
}
