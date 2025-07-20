"use client"
import React, { useState } from 'react'
import CardWrapper from './card-wrapper'
import {useForm} from 'react-hook-form'
import { NewPasswordSchema } from '@/schemas'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import FormError from '../form-error'
import { useTransition } from 'react'
import FormSuccess from '../form-success'
import { useSearchParams } from 'next/navigation'
import { newPassword } from '@/actions/new-password'

 const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
      resolver: zodResolver(NewPasswordSchema),
      defaultValues: {
        password: "",
      }
  })

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("")
    setSuccess("")

    startTransition(()=> {
      newPassword(values, token)
      .then((data)=> {
          setError(data?.error)
          setSuccess(data?.success)
      })

    })
  }
   
  return (
    <CardWrapper
    headerLabel='Reset Your Password'
    backButtonHref='/auth/login'
    backButtonLabel="Back to Login"
    >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>

              <div className='space-y-4'>
              <FormField control={form.control} name='password' render={({field})=> (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder='New Password' {...field} type='password'/>
                  </FormControl>
                
                </FormItem>
              )}>
              </FormField>
                </div>

                 <FormError message={error }/>
                 <FormSuccess message={success}/>
                <Button disabled={isPending} type='submit' className='w-full bg-black text-white' >
                         Reset Password
                </Button>           
            </form>
           
          </Form>
    </CardWrapper>
  )
}


export default NewPasswordForm