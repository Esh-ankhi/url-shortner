import { Suspense } from 'react'
import Skeleton from '@/Ui/skeleton'
 
export default function Page() {
  return (
    <>
      <h1>This will be pre-rendered</h1>
      <Suspense fallback={<Skeleton />}>
        <DynamicContent />
      </Suspense>
    </>
  )
}
 
async function DynamicContent() {
  'use cache'
  const res = await fetch('https://api.github.com/users/Esh-ankhi/repos')
  const  post = await res.json()
  return <div>hello loading</div>
}