"use client";
import { Button } from "@/components/ui/button";
export default function Error({ reset }) {
  return (
    <main className="center-state">
      <h1>Something interrupted your space.</h1>
      <p>Please try again. Your saved browser draft is kept separately.</p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
