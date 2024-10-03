import CodeGenerator from "~/_components/qr-code-generator";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <CodeGenerator lang={router.query.lang} />
    </main>
  );
}
