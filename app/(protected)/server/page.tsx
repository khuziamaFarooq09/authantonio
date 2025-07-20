import React from 'react'
import { UserInfo } from '../_components/userInfo';
import { auth } from '@/auth';

const ServerPage = async() => {
   const session = await auth();
  return (
    <div>
          <UserInfo user={session?.user} label='Server Component'/>
    </div>
  )
}

export default ServerPage
