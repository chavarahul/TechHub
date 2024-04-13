'use client'
import React, { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const Verify = ({ children }: { children: ReactNode }) => {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            // router.push('/Home');
        } 
    }, [session, router]);

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}

export default Verify;
