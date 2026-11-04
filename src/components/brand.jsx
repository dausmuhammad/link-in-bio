import Link from "next/link";
import { Orbit } from "lucide-react";
export function Brand() {
  return (
    <Link href="/" className="brand">
      <span className="brand-icon">
        <Orbit size={23} />
      </span>
      linkspace<span className="brand-dot">.</span>
    </Link>
  );
}
