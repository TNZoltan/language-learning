import { useState } from 'react';
import { supabase } from '../services/supabase';

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signUp = async () => {
    await supabase.auth.signUp({ email, password })
  }

  return <>
    <h1>Signup</h1>
    Email <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
    Password <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
    <button type="submit" onClick={signUp}>Submit</button>
  </>
}

export default Signup