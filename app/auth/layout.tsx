import React from 'react'

interface AuthLayoutProps {
    children: React.ReactNode
}
const AuthLayout = ({children}: AuthLayoutProps) => {
  return (
    <div className='w-full min-h-screen flex items-center justify-center bg-sky-500 text-white'>
      {children}
    </div>
  )
}

export default AuthLayout
