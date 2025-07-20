"use client";
import React from 'react'
import { UserInfo } from '../_components/userInfo';
import { useCurrentUser } from '@/hooks/use-current-user';

const ServerPage = () => {
  const user = useCurrentUser(); // in client side component you have to use custom hooks to get session data because we cannot use aysnc and await or auth in cliend side component
  return (
    <div>
          <UserInfo user={user} label='Client Component'/>
    </div>
  )
}

export default ServerPage
