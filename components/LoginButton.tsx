"use client"
import { useRouter } from "next/navigation"
import { Dialog } from "./ui/dialog";
import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import LoginForm from "./auth/login-form";
interface LoginButtonProps{
    children: React.ReactNode,
    mode?: "modal" | "redirect",
    asChild?: boolean,
    }


const LoginButton = ({children, mode="redirect", asChild}: LoginButtonProps) => {
    const router = useRouter();
      const onClick = ()=>{
        console.log("LOOGIN HO GYA")
        router.push("/auth/login")
      }

      if(mode =="modal"){
        return (
            <Dialog>
              <DialogTrigger asChild={asChild}>
                {children}
              </DialogTrigger>
              <DialogContent className="p-0 w-auto bg-transparent border-none">
                <LoginForm/>
              </DialogContent>
            </Dialog>
        )
      }
  return (
    <div onClick={onClick} className='cursor-pointer'>
    {children}
    </div>
  )
}

export default LoginButton
