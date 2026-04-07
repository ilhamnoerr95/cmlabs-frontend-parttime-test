import { Shimmer } from "@/components/moleclues";

const loading = () => {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-black py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="min-h-screen bg-zinc-50 font-sans text-black py-10">
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
            {Array?.from({ length: 20 }).map((_, i) => (
              <Shimmer key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
