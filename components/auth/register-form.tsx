"use client"
import CardWrapper from '@/components/auth/card-wrapper'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import * as z from 'zod'
import { RegisterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { register } from '@/actions/register'
import FormError from '../form-error'
import FormSuccess from '../form-success'

const RegisterForm = () => {
    const [success, setSuccess] = useState<string | undefined>("")
    const [error, setError] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof RegisterSchema>>({
           resolver: zodResolver(RegisterSchema),
           defaultValues: {
            name: "",
            email: "",
            password: "",
           }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>)=>{
        setError("")
        setSuccess("")

        startTransition(()=> {
            register(values)
            .then((data)=> {
                setError(data.error)
                setSuccess(data.success)
            })
        })
    } 
  return (
    <CardWrapper
    backButtonHref='/auth/login'
    backButtonLabel='Already have an account?'
    headerLabel='Create an Account'    

    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
          <FormField control={form.control} name='name'render={({field}) => (

            <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input disabled={isPending} type='name' placeholder='Username' {...field}/>
                </FormControl>
            </FormItem>
          )}>
             </FormField>

             <FormField control={form.control} name='email' render={({field})=> (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input disabled={isPending} {...field} type='email' placeholder='jhon@example.com' />
                    </FormControl>
                </FormItem>
             )}></FormField>

             <FormField control={form.control} name='password' render={({field})=> (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input disabled={isPending} {...field} type='password' placeholder='********' />
                    </FormControl>
                </FormItem>
             )}></FormField>
          </div>
            <FormError message={error}/>
            <FormSuccess message={success}/>
          <Button disabled={isPending} type='submit' className='w-full'>
            Sign up
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RegisterForm
