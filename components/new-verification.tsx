"use client"
import React, { useCallback, useEffect, useState } from 'react'
import CardWrapper from './auth/card-wrapper'
import {BeatLoader} from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { newVerification } from '@/actions/new-verification'
import FormError from './form-error'
import FormSuccess from './form-success'

const VerificationForm = () => {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const searchParams = useSearchParams()
    
    const token= searchParams.get("token")

    const onSubmit = useCallback(()=> {
        if(!token){
          setError("Missing Token");
          return;
        }
        
        newVerification(token)
        .then((data)=> {
            setSuccess(data.success)
            setError(data.error)
        }).catch(()=> {
            setError("Something went wrong!")
        })
    },[token])


    useEffect(()=> {
        onSubmit();
    },[onSubmit])


  return (
    <CardWrapper 
     headerLabel='Verify your Email'
     backButtonHref='/auth/login'
     backButtonLabel='Back to login'
    >
      <div className='flex items-center justify-center w-full'>
        {!success && !error && (
            <BeatLoader/>
        )}
          <FormError message={error} />
          <FormSuccess message={success} />
      </div>
    </CardWrapper>
  )
}

export default VerificationForm
