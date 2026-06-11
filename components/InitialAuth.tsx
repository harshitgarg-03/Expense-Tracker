"use client"
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react'

async function InitialAuth({children} : {children : ReactNode}) {

    const router = useRouter();
    const session = await authClient.getSession();
    if((session?.data?.user)){
        router.push("/dashboard")
    }
  return (
    <>
    {children}
    </>
  )
}

export default InitialAuth