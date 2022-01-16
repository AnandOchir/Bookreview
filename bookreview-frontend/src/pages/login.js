import React, { useState } from 'react'
import axios from 'axios'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const Login = async () => {
    const data = await axios.post('http://localhost:4000/', {
        query: `mutation login($email: String ,$password: String) {
            login(email:$email, password:$password) {
                _id
                username
                password
                email
                token
                type
            }
        }`,
        variables: {
            email: email,
            password: pass
        }
    }, {
        headers: {
        'Content-Type': 'application/json'
        }
    });

    if(data.data.data.login) {
        console.log('login success: ', data)
        localStorage.setItem('user', JSON.stringify(data.data.data.login))
    } else {
        console.log('err: ', data)
    }
  }

  return (
    <div>
        <h1>Login</h1>
        <input placeholder={'email'} value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder={'pass'} value={pass} onChange={(e) => setPass(e.target.value)} />
        
        <button onClick={Login} >Login</button>
    </div>
  );
}
