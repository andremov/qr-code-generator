import CodeGenerator from "~/_components/qr-code-generator";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <LocaleSwitcher />
      <CodeGenerator />
    </main>
  );
}
