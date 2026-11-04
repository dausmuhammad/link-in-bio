import { notFound } from "next/navigation";
import { PublicProfile } from "@/components/public-profile";
import { demoProfile } from "@/lib/demo";
export async function generateMetadata({ params }) {
  const { username } = await params;
  return {
    title:
      username === demoProfile.username
        ? `${demoProfile.name} — Example profile`
        : "Profile unavailable",
    robots: { index: false, follow: false },
  };
}
export default async function Page({ params }) {
  const { username } = await params;
  if (username !== demoProfile.username) notFound();
  return (
    <main className="public-wrapper">
      <div className="public-demo-note">
        Example profile · This is not a published user page
      </div>
      <PublicProfile profile={demoProfile} />
    </main>
  );
}

// Phase 1 exposes only the explicit example; unknown usernames must be HTTP 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ username: demoProfile.username }];
}
