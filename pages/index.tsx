import type { NextPage } from 'next'
import Head from 'next/head'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
const Home: NextPage = () => {

  const [user] = useAuthState(auth);

  return (
    <div className="">
      <Head>
        <title>Todo</title>
        <meta name="Todo app" content="List of your todos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <h1 className='text-red-500'>Test deploy</h1>
      {user ? <h1>{user.displayName}</h1> : <h1>Nobody signed in</h1>} 
      </div>
  )
}

export default Home
