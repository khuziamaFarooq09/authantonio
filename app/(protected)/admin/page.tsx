"use client";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React from 'react'
import RoleGate from '../_components/role-gate';
import { UserRole } from '@prisma/client';
import FormSuccess from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { admin } from '@/actions/admin';
import { error } from 'console';
const AdminPage = () => {

    const onServerActionClick = ( )=> {
        admin()
        .then((data)=> {
            if(data.success){
                console.log(data.success)
            }

            if(data.error){
                console.log(data.error)
            }
        })
        
    }
const onApiRouteClick = ()=> {
    fetch("/api/admin").then((response)=> {
        if(response.ok) {
            console.log("OKEY!")
        }else{
            console.error("FORBIDDEN")
        }
    } )
}


  return (
    <Card className='w-[500px] bg-white'>
        <CardHeader>
            <p className='text-2xl font-semibold text-center'>
                Admin
            </p>
        </CardHeader>

        <CardContent className='space-y-4'>
           <RoleGate allowedRole={UserRole.ADMIN}>
               <FormSuccess message='You have Access to visit Admin Page'/>
           </RoleGate>
           <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
            <p className="text-sm font-medium">
                Admin-only API Route
            </p>
            <Button onClick={onApiRouteClick}>
                Click to test
            </Button>
           </div>
           <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
            <p className="text-sm font-medium">
                Admin-only Server Action
            </p>
            <Button onClick={onServerActionClick}>
                Click to test
            </Button>
           </div>
        </CardContent>
    </Card>
  )
}

export default AdminPage
