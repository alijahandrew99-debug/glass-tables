import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Privacy — GLASS TABLES" };

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy"
      blocks={[
        {
          h: "What we collect",
          p: "Your email if you join the private list; your shipping details when you order. Payments are processed by Stripe — card numbers never touch our servers.",
        },
        {
          h: "What we don't do",
          p: "We don't sell your data, and we don't email more than we'd want to be emailed.",
        },
        {
          h: "Questions",
          p: "privacy@glasstables.com.",
        },
      ]}
    />
  );
}
