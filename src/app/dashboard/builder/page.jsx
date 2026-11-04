import { Suspense } from "react";
import { Builder } from "@/features/builder/builder";
export default function Page() {
  return (
    <Suspense fallback={<p className="dashboard-content">Loading builder…</p>}>
      <Builder />
    </Suspense>
  );
}
