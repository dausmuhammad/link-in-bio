import { BuilderLoading } from "@/components/builder-loading";
import { Suspense } from "react";
import { Builder } from "@/features/builder/builder";
export default function Page() {
  return (
    <Suspense fallback={<BuilderLoading />}>
      <Builder />
    </Suspense>
  );
}
