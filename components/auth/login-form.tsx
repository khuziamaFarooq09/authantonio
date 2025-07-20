"use client"
import React, { useState } from 'react'
import CardWrapper from './card-wrapper'
import {useForm} from 'react-hook-form'
import { LoginSchema } from '@/schemas'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import FormError from '../form-error'
import { useTransition } from 'react'
import { login } from '@/actions/login'
import FormSuccess from '../form-success'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different providers!" : "";
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
        email: "",
        password: ""
      }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")

    startTransition(()=> {
      login(values, callbackUrl)
      .then((data)=> {
        if(data?.error){
          form.reset()
          setError(data.error)
        }

        if(data?.success){
          form.reset()
          setSuccess(data.success)
        }

        if(data?.twoFactor){
          setShowTwoFactor(true)
        }
      })
       .catch(()=> setError("Something went wrong"))
    })
  }
   
  return (
    <CardWrapper
    headerLabel='Welcome back'
    backButtonHref='/auth/register'
    backButtonLabel="Don't have an Account?"
    showSocial
    >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <div className='space-y-4'>

                {showTwoFactor && (
                   <FormField control={form.control} name='code' render={({field}) => (
                <FormItem>
                  <FormLabel>Two Factor Code</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder='123456' {...field} />
                  </FormControl>
                </FormItem>
              )}/>
                )}


                {!showTwoFactor && (
                  <>
              <FormField control={form.control} name='email' render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder='jhon@example.com' {...field} type='email'/>
                  </FormControl>
                </FormItem>
              )}/>

              <FormField control={form.control} name='password' render={({field})=> (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder='*******' {...field} type='password'/>
                  </FormControl>
                  <Button size={'sm'} variant={'link'} className='px-0 font-normal' asChild>
                    <Link href={'/auth/reset'}>Forgot Password?</Link>
                  </Button>
                </FormItem>
              )}/>
                  </>

            )}

                </div>
                 <FormError message={error || urlError}/>
                 <FormSuccess message={success}/>
                <Button disabled={isPending} type='submit' className='w-full bg-black text-white' >
                         {showTwoFactor ? "Confirm" : "Login"}
                </Button>           
            </form>
          </Form>
    </CardWrapper>
  )
}

export default LoginForm
