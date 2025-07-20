"use client";

import { signOut } from "@/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/auth/login");
  }

  return (
    <Button onClick={handleSignOut}>
      Sign out
    </Button>
  );
}
