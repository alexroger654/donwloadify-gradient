import React, { Suspense } from 'react'
import Main from './(components)/Main'
import Loading from '@/app/components/loading'

export default function page() {
  return (
    <Suspense fallback={<Loading/>}>
      <Main />
    </Suspense>
  )
}
