import clsx from "clsx";
import Link from "next/link";

export const Header = ({ className }: { className?: string }) => {
  return (
    <header
      className={clsx("sticky top-0 z-50", "bg-white border-b", "px-6 py-4 text-black", className)}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-bold">Food App</h1>

        {/* Navigation */}
        <nav className="flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/">Categories</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
