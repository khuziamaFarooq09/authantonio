"use client"
import React, { useState } from 'react'
import CardWrapper from './card-wrapper'
import {useForm} from 'react-hook-form'
import { ResetSchema } from '@/schemas'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import FormError from '../form-error'
import { useTransition } from 'react'
import FormSuccess from '../form-success'
import { useSearchParams } from 'next/navigation'
import { reset } from '@/actions/reset' 

export const ResetForm = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different providers!" : "";
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
      resolver: zodResolver(ResetSchema),
      defaultValues: {
        email: "",
      }
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("")
    setSuccess("")

    console.log(values)

    startTransition(()=> {
      reset(values)
      .then((data)=> {
        console.log(data)
          setError(data?.error)
          setSuccess(data?.success)
      })

    })
  }
   
  return (
    <CardWrapper
    headerLabel='Reset Your Password'
    backButtonHref='/auth/login'
    backButtonLabel="Back to login"
    >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <div className='space-y-4'>
              <FormField control={form.control} name='email' render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder='jhon@example.com' {...field} type='email'/>
                  </FormControl>
                </FormItem>
              )}></FormField>
                </div>

                 <FormError message={error || urlError}/>
                 <FormSuccess message={success}/>
                <Button disabled={isPending} type='submit' className='w-full bg-black text-white' >
                         Send reset Email
                </Button>           
            </form>
          </Form>
    </CardWrapper>
  )
}


