import { useState } from 'react';
import { supabase } from '../services/supabase';
import Router from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('tran.zoltan@protonmail.com')
  const [password, setPassword] = useState('test123')

  const login = () => {
    supabase.auth.signInWithPassword({ email, password }).then(() => Router.reload())
  }

  return <>
    <h1>Login</h1>
    Email <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
    Password <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
    <button type="submit" onClick={login}>Submit</button>
  </>
}

export default Login