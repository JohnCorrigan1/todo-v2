import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserContext } from '../lib/AuthContext'
import Navbar from '../components/Navbar'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './../lib/firebase';
import TodosContextProvider from '../lib/TodoContext';
import { TodosContext } from '../lib/TodoContext';


function MyApp({ Component, pageProps }: AppProps) {

  const [user] = useAuthState(auth);

  return (
    <TodosContextProvider>
    <UserContext.Provider value={{ user }}>
      <Navbar />
      <Component {...pageProps} />
    </UserContext.Provider>
    </TodosContextProvider>
  ) 
}

export default MyApp
