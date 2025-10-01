'use client'

import Loading from '@/app/components/loading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useLayoutEffect } from 'react'
import { toast } from 'sonner';

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {




    const { data: session, status } = useSession();
    const router = useRouter();

    useLayoutEffect(() => {
        if (!session && status !== "loading") {
            console.log("not logged in");
            toast("You are not logged in");
            router.push("/");
        }
    }, [session])

    if (status === "loading") return <Loading />

    return (
        <section>
            {children}
        </section>
    )
}
