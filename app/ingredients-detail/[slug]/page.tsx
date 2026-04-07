import HydrationProvider, { PrefetchQueries } from "@/components/template/react-query/Hydration";
import { configQueryOptions } from "@/lib/QueryOptions";
import { IPDataDetail } from "@/types/FoodData.type";
import dynamic from "next/dynamic";

// components
const DetailPage = dynamic(() => import("./DetailPage"));

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = decodeURIComponent((await params).slug);

  /**
   * ex: penggunaan hydration untuk prefetch data di server
   */
  const queries: PrefetchQueries<IPDataDetail | null>[] = [
    {
      ...configQueryOptions<IPDataDetail | null>({
        queryKey: ["/api/filter.php", { i: slug }, "v1"],
        auth: false,
      }),
    },
  ];
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-black py-10">
      <div className="max-w-7xl mx-auto px-4">
        <HydrationProvider queries={queries}>
          <DetailPage title={slug} />
        </HydrationProvider>
      </div>
    </div>
  );
};

export default Page;
