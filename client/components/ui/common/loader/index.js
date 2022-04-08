const SIZES = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

export default function Loader({ size = "sm", color = "black" }) {
  return (
    <div className={`sk-fading-circle mx-auto ${SIZES[size]}`}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className={`sk-circle${i + 1} sk-circle ${
            color == "white" ? "sk-white" : ""
          }`}
        ></div>
      ))}
    </div>
  );
}
