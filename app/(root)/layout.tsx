import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { isAuthenticate, logout } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/ui/LogoutButton";

const Layout = async ({ children }: { children: ReactNode }) => {

  const isAuthenticated = await isAuthenticate();

  if (!isAuthenticated) redirect("/sign-in")



  return (
    <div className="root-layout">
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="MockMate Logo" width={38} height={32} />
          <h2 className="text-primary-100">VOC AI</h2>
        </Link>
        <LogoutButton />
      </nav>

      {children}
    </div>
  );
};

export default Layout;
