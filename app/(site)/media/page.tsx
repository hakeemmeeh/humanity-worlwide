import { getVideos } from "@/lib/published-content";
import { MediaHub } from "./MediaHub";

export default async function MediaHubPage() {
  return <MediaHub videos={await getVideos()} />;
}
