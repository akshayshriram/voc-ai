import HomeContent from "@/components/HomeContent";
import { getCurrentUser } from "@/lib/actions/auth.actions";

async function Home() {
  const user = await getCurrentUser();

  if (!user?.id) {
    return <div>Please sign in to continue</div>;
  }

  return <HomeContent userId={user.id} />;
}

export default Home;
