import Link from "next/link";

export default function LocaleSwitcher({
  lang = "en",
}: {
  lang?: "en" | "es";
}) {
  return (
    <div className="absolute top-5 flex rounded-md border border-gray-200">
      <Link
        href={"/en"}
        className={
          (lang === "en" ? "bg-gray-200 font-semibold" : "") + " px-3 py-1"
        }
      >
        EN
      </Link>

      <div className="h-full w-1 bg-gray-200" />

      <Link
        href={"/es"}
        className={
          (lang === "es" ? "bg-gray-200 font-semibold" : "") + " px-3 py-1"
        }
      >
        ES
      </Link>
    </div>
  );
}
