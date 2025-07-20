"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Settings } from "@/actions/settings"
import { useState, useTransition } from "react"
import { useSession } from "next-auth/react"
import { SettingsSchema } from "@/schemas"
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from 'react-hook-form'
import { Form, FormControl, FormDescription,FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCurrentUser } from "@/hooks/use-current-user"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"
import { Select, SelectItem,SelectValue,SelectTrigger,SelectContent } from "@/components/ui/select"
import { UserRole } from "@prisma/client"
import { Switch } from "@/components/ui/switch"


 
export default function SettingsPage() {
  const user = useCurrentUser()
  const{ update } = useSession();
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState< string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof SettingsSchema>>({
      resolver: zodResolver(SettingsSchema) ,
      defaultValues: {
        name: user?.name || undefined,
        email: user?.email || undefined,
        password: undefined,
        newPassword: undefined,
        role: user?.role || undefined,
        isTwoFactorEnabled: user?.twoFactorEnabled || undefined
      }
    }
  )
  const onSubmit = (values: z.infer<typeof SettingsSchema>)=> {
    startTransition(()=> {
      Settings(values)
      .then((data)=>{
        if(data.error){
           setError(data.error)
        }

        if(data.success){
          update();
          setSuccess(data.success)
        }
      }).catch(()=> setError("Something went wrong!"))
    })
    }

  return (
  <Card className="w-[500px] bg-white border-none outline-none">
    <CardHeader>
        <p className="text-2xl font-semibold text-center">
          Settings
        </p>
    </CardHeader>
    <CardContent>
      <div>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
           <FormField control={form.control} name="name" render={({field})=> (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} type="name" placeholder="John Doe" disabled={isPending}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
           )}/>

              {user?.isOAuth === false && (
                <>
           <FormField control={form.control} name="email" render={({field})=> (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="John@example.com" disabled={isPending}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
           )}/>

           
           <FormField control={form.control} name="password" render={({field})=> (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="********" disabled={isPending}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
           )}/>

           <FormField control={form.control} name="newPassword" render={({field})=> (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="********" disabled={isPending}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
           )}/>

              </>
              )}

           <FormField control={form.control} name="role" render={({field})=> (
            <FormItem >
                 <FormLabel>Role</FormLabel>
                 <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className="border">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white w-full">
                    <SelectItem value={UserRole.ADMIN} >
                            Admin
                    </SelectItem>
                    <SelectItem value={UserRole.USER} >
                            User
                    </SelectItem>
                  </SelectContent>
                 </Select>
                  <FormMessage/>

            </FormItem>
           )}/>

              {user?.isOAuth === false && (

               <FormField control={form.control} name="isTwoFactorEnabled" render={({field})=> (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm ">
              <div className="space-y-0.5">
                <FormLabel>Two Factor Authentication</FormLabel>
                <FormDescription>Enable two factor authentication for your account</FormDescription>
              </div>

              <FormControl className="border">
                <Switch className="border bg-blue-500"
                disabled={isPending}
                checked={field.value}
                onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
           )}/>
          )}

           <FormSuccess message={error}/>
           <FormError message={success}/>   
      <Button disabled={isPending} type="submit" className="bg-black text-white my-4">
        Save
      </Button>
        </form>
      </Form>

       
      </div>
    </CardContent>
  </Card>
  )
}