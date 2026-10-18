import { ContentManager } from "@/components/admin/ContentManager";

export const metadata = { title: "Field Documentaries" };

export default function AdminDocumentariesPage() {
  return <ContentManager type="documentaries" />;
}
