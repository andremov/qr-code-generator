"use client";

import LocaleSwitcher from "~/_components/locale-switcher";
import CodeGenerator from "~/_components/qr-code-generator";

type PageProps = {
  params: { lang: "en" | "es" };
};

export default function HomePage({ params }: PageProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <LocaleSwitcher lang={params.lang} />
      <CodeGenerator lang={params.lang} />
    </main>
  );
}
