import { notFound } from "next/navigation";
import { catalog, getProduct, products } from "@/lib/products";
import ProductView from "@/components/ProductView";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  return { title: p ? `${p.name} — GLASS TABLES` : "GLASS TABLES" };
}

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const related = catalog.filter((p) => p.slug !== product.slug).slice(0, 3);
  return <ProductView product={product} related={related} />;
}
