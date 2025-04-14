import { SpinningGradient } from "@/components/spinning-gradient";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden">
      <SpinningGradient />
      {children}
    </div>
  );
}