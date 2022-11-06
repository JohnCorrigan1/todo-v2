import type { NextPage } from 'next'
import Head from 'next/head'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import Todo from '../components/Todo';


const Home: NextPage = () => {

  const [user] = useAuthState(auth);

  return (
    <div className="flex justify-center flex-col">
      <Head>
        <title>Todo</title>
        <meta name="Todo app" content="List of your todos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center mt-10 text-2xl">
      {user ? <h1>{user.displayName}'s Todos</h1> : <h1>Sign in</h1>} 
      </div>
      <div className='items-center justify-center flex mt-10'>
      <Todo title="Learn Firebase" description='Learn authentication and crud operations with firebase and nextJS' done={false} due="1/1/2023" /> 
      </div>
      </div>
  )
}

export default Home
