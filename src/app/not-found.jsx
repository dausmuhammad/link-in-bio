import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <main className="center-state">
      <span className="eyebrow">404 · A LITTLE LOST?</span>
      <h1>This space isn’t available.</h1>
      <p>The page may not exist or hasn’t been published yet.</p>
      <Button asChild>
        <Link href="/">Back to LinkSpace</Link>
      </Button>
    </main>
  );
}
