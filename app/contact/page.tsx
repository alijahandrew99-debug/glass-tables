import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Contact — GLASS TABLES" };

export default function ContactPage() {
  return (
    <LegalPage
      eyebrow="Care"
      title="Contact"
      blocks={[
        {
          h: "Client services",
          p: "Write to concierge@glasstables.com. We reply within one business day, usually sooner.",
        },
        {
          h: "Orders",
          p: "Include your order number for the fastest resolution. Sizing guidance, exchanges, and repairs all start here.",
        },
        {
          h: "Press & partnerships",
          p: "press@glasstables.com. Please include timeline and usage.",
        },
      ]}
    />
  );
}
