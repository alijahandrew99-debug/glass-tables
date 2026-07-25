import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Terms — GLASS TABLES" };

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms"
      blocks={[
        {
          h: "The short version",
          p: "Buy things, enjoy them, treat the imagery as ours. Prices and availability can change without notice.",
        },
        {
          h: "Imagery",
          p: "Campaign imagery featuring our AI muse Aurelia is the property of Glass Tables and may not be reused commercially.",
        },
        {
          h: "Disputes",
          p: "We'd rather fix it than fight about it — email concierge@glasstables.com first.",
        },
      ]}
    />
  );
}
