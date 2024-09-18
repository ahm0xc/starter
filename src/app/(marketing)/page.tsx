import ThemeToggle from "~/components/theme-toggle";
import { auth } from "~/lib/auth";

export default async function HomePage() {
  const session = await auth();
  return (
    <div>
      Home Page <ThemeToggle />
      <pre>
        <code>{JSON.stringify(session, undefined, 2)}</code>
      </pre>
    </div>
  );
}
