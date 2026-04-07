import clsx from "clsx";
import Image from "next/image";

interface IFoodCard {
  title: string;
  image: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export const FoodCard = ({ title, image, className, onClick, size }: IFoodCard) => {
  return (
    <div
      className={clsx(
        "relative w-full rounded-xl overflow-hidden cursor-pointer",
        "shadow-sm hover:shadow-md transition-all duration-200",
        "h-20 sm:h-24 md:h-28 lg:h-32",
        className
      )}
    >
      {/* image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover object-center"
        onClick={onClick}
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Title */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg">{title}</h3>
      </div>
    </div>
  );
};

export default FoodCard;
