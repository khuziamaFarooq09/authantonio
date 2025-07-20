import FormError from '@/components/form-error';
import { useCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@prisma/client';
import React from 'react'

interface RoleGateProps{
    children: React.ReactNode;
    allowedRole : UserRole
}
const RoleGate = ({children, allowedRole} : RoleGateProps) => {
    const role = useCurrentRole();

    if(role !== allowedRole){
        return (
            <FormError message="You don't have permission to Access Admin Page"/>
        )
    }
  return (
    <>
     {children} 
    </>
  )
}

export default RoleGate
