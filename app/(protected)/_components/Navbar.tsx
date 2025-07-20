"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import UserButton from './user-button'

const ProtectedNavbar = () => {
    const pathname = usePathname()
  return (
    <nav className='bg-gray-100 px-5 py-2 flex items-center justify-between w-[500px]'>
      <div className='flex items-center justify-center gap-x-2'>
          <Button size={'sm'} className={ pathname === "/server" ? "bg-black text-white" : "bg-white text-black"} asChild>
            <Link href={'/server'}>Server</Link>
        </Button>
          <Button size={'sm'} className={ pathname === "/client" ? "bg-black text-white" : "bg-white text-black"} asChild>
            <Link href={'/client'}>Client</Link>
        </Button>
          <Button size={'sm'} className={ pathname === "/admin" ? "bg-black text-white" : "bg-white text-black"} asChild>
            <Link href={'/admin'}>Admin</Link>
        </Button>
        <Button size={'sm'} className={ pathname === "/protected" ? "bg-black text-white" : "bg-white text-black"} asChild>
            <Link href={'/protected'}>Settings</Link>
        </Button>
      </div>

      <div>
      <UserButton/>
      </div>
    </nav>
  )
}

export default ProtectedNavbar
