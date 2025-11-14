import { getPublishedNews } from "./api/newsApi";
import NewsManager from "./NewsManager";
import { Typography } from "@/components/custom/Typography";

export default async function NewsManagerPage() {
  try {
    const data = await getPublishedNews();
    console.log("data", data);
    return <NewsManager initialData={data?.data || []} />;
  } catch {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Typography weight="semibold" className="text-lg mb-2 text-red-600">
          Failed to load news
        </Typography>
        <Typography size="sm" className="text-muted-foreground mb-4 max-w-sm">
          There was an issue fetching published news. Please try again later.
        </Typography>
      </div>
    );
  }
}
