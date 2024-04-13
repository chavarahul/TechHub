'use client'
import React, { Children, ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
interface Props {
    children: ReactNode
}
const Provider = (props: Props) => {
    return (
        <SessionProvider>
            {props.children}
        </SessionProvider>
    )
}

export default Provider
