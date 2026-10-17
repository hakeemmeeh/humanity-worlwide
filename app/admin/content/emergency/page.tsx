import { ContentManager } from "@/components/admin/ContentManager";

export const metadata = { title: "Emergency Response" };

export default function AdminEmergencyPage() {
  return <ContentManager type="emergency" />;
}
