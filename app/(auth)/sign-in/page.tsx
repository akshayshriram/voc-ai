import AuthForm from "@/components/AuthForm";
import { isAuthenticate } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";

const Page = async () => {
  const isAuthenticated = await isAuthenticate();

  if (isAuthenticated) redirect("/")
  return <AuthForm type="sign-in" />;
};

export default Page;
