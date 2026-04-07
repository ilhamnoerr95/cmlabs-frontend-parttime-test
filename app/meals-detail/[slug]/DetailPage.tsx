"use client";

import { useHookQuery } from "@/hook/useHookQuery";
import type { IPMealDetail } from "@/types/FoodData.type";

// components
import { Breadcrumb } from "@/components/moleclues";
import Image from "next/image";

const DetailPage = ({ id }: { id: string }) => {
  /**
   * query as key for fetching, that have 3 val
   * first val for pathname localapi
   * second val for query param
   * third version of real api backend
   */
  const { data } = useHookQuery<{ success: boolean; meals: IPMealDetail[] }>({
    queryKey: ["/api/lookup.php", { i: id }, "v1"],
    auth: false,
  });

  const mealDetail = data?.meals?.[0];

  // ingredient + measure
  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const ing = mealDetail?.[`strIngredient${i + 1}` as keyof IPMealDetail];
    const meas = mealDetail?.[`strMeasure${i + 1}` as keyof IPMealDetail];

    if (!ing || ing === "") return null;
    return `${meas || ""} ${ing}`;
  }).filter(Boolean);

  // youtube

  const youtubeEmbed = mealDetail?.strYoutube.replace("watch?v=", "embed/");

  return (
    <>
      <Breadcrumb
        className="mb-10"
        items={[
          { label: "Home", href: "/" },
          { label: "Foods" },
          { label: mealDetail?.strCategory as string },
          { label: mealDetail?.strMeal as string },
        ]}
      />
      <h1 className="text-4xl font-medium text-left mb-10">{mealDetail?.strMeal}</h1>

      <p className="text-sm text-red-500 font-semibold mb-4">
        {mealDetail?.strCategory} • {mealDetail?.strArea}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={mealDetail?.strMealThumb as string}
            alt={mealDetail?.strMeal as string}
            fill
            className="object-cover"
          />
        </div>
        {/* CONTENT */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{mealDetail?.strMeal}</h1>
          </div>

          {/* INSTRUCTIONS */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Instructions</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {mealDetail?.strInstructions}
            </p>
          </div>

          {/* INGREDIENTS */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Recipes</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              {ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* youtube */}
      {mealDetail?.strYoutube && (
        <div className="mt-12 w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center">Tutorials</h2>

          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              src={youtubeEmbed}
              title="Youtube Video"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DetailPage;
