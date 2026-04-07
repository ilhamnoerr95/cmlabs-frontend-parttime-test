"use client";
import dynamic from "next/dynamic";

import { useHookQuery } from "@/hook/useHookQuery";
import type { IPDataDetail } from "@/types/FoodData.type";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

// components
import { Button, InputCustom } from "@/components/atom";
import { Breadcrumb, Shimmer } from "@/components/moleclues";
const FoodCard = dynamic(() => import("@/components/moleclues/FoodCard"), { ssr: false });

const DetailPage = ({ title }: { title: string }) => {
  const [search, setSearch] = useState<string>("");
  const [visible, setVisible] = useState<number>(20);
  const router = useRouter();

  /**
   * query as key for fetching, that have 3 val
   * first val for pathname localapi
   * second val for query param
   * third version of real api backend
   */
  const { data: foodDetail, isLoading } = useHookQuery<{ success: boolean; meals: IPDataDetail[] }>(
    {
      queryKey: ["/api/filter.php", { i: title }, "v1"],
      auth: false,
    }
  );

  // filter data
  const filteredData = useMemo(() => {
    if (!foodDetail?.meals) return [];

    return foodDetail?.meals.filter((items) =>
      items?.strMeal.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }, [foodDetail, search]);

  // // data yg dipotong biar gak kebanyakan
  const visibleData = filteredData.slice(0, visible);

  return (
    <>
      <Breadcrumb
        className="mb-10"
        items={[{ label: "Home", href: "/" }, { label: "Foods" }, { label: title }]}
      />
      <h1 className="text-2xl font-bold text-left mb-10">{title}</h1>
      <InputCustom
        value={search}
        onChange={(e) => {
          setSearch(e.target.value as string);
          setVisible(20); // reset jd 20
        }}
        className="mb-8"
        placeholder="Search Meal Name"
      />

      <div
        className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-5 
          gap-4
        "
      >
        {isLoading
          ? Array?.from({ length: 20 }).map((_, i) => <Shimmer key={i} />)
          : visibleData.map((d) => (
              <FoodCard
                key={d.idMeal}
                image={d.strMealThumb}
                title={d.strMeal}
                onClick={() => {
                  router.push(`/meals-detail/${d.idMeal}`);
                }}
                className="h-40 sm:h-44 md:h-48 lg:h-52"
              />
            ))}
      </div>
      {visible < filteredData.length && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => setVisible((prev) => prev + 10)}
            label="Load More"
            className="text-white font-bold"
          />
        </div>
      )}
    </>
  );
};

export default DetailPage;
