export const Shimmer = () => {
  return (
    <div
      className="
      relative
      aspect-[2/1]
      overflow-hidden
      rounded-xl
      bg-zinc-200
    "
    >
      <div
        className="
        absolute inset-0
        -translate-x-full
        animate-[shimmer_1.5s_infinite]
        bg-gradient-to-r
        from-transparent
        via-white/40
        to-transparent
        "
      />
    </div>
  );
};

export default Shimmer;
