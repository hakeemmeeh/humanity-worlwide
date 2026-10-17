import { ContentManager } from "@/components/admin/ContentManager";

export const metadata = { title: "News" };

export default function AdminNewsPage() {
  return <ContentManager type="news" />;
}
