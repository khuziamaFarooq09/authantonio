import LoginButton from "@/components/LoginButton";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
       <div className="w-full flex items-center justify-center flex-col gap-y-5 min-h-screen bg-slate-900 text-white">
        <p className="text-5xl font-bold text-white drop-shadow-2xl">Auth.js</p>
        <LoginButton mode="modal" asChild>
         <Button variant={'secondary'} size={'lg'}>
            Sign in
         </Button>
        </LoginButton>
       </div>
  );
}
