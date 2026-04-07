"use client";
import dynamic from "next/dynamic";

import { Button } from "@/components/atom";
import InputCustom from "@/components/atom/Input";
import Shimmer from "@/components/moleclues/Shimmer";
const FoodCard = dynamic(() => import("@/components/moleclues/FoodCard"), { ssr: false });

import { useHookQuery } from "@/hook/useHookQuery";
import type { IPData } from "@/types/FoodData.type";
import { useMemo, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [visible, setVisible] = useState<number>(20);

  /**
   * query as key for fetching, that have 3 val
   * first val for pathname localapi
   * second val for query param
   * third version of real api backend
   */
  const { data: foodData, isLoading } = useHookQuery<{ success: boolean; meals: IPData[] }>({
    queryKey: ["/api/list.php", { i: "list" }, "v1"],
    auth: false,
  });

  // filter data
  const filteredData = useMemo(() => {
    if (!foodData?.meals) return [];

    return foodData?.meals.filter((items) =>
      items?.strIngredient.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }, [foodData, search]);

  // data yg dipotong biar gak kebanyakan
  const visibleData = filteredData.slice(0, visible);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-black py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-34">See All The Delicious Foods</h1>
        <InputCustom
          value={search}
          onChange={(e) => {
            setSearch(e.target.value as string);
            setVisible(20); // reset jd 20
          }}
          className="mb-8"
          placeholder="Search Ingredients by Name"
        />

        {/* foodcard */}
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
                <FoodCard key={d.idIngredient} image={d.strThumb} title={d.strIngredient} />
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
      </div>
    </div>
  );
}
