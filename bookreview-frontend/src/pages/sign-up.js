import React, { useState } from 'react'
import axios from 'axios'

export const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')

  const SignUp = async () => {
     const data = await axios.post('http://localhost:4000/', {
        query: `mutation addUser($username: String, $email: String ,$password: String) {
            addUser(username:$username, email:$email, password:$password) {
                _id
                username
                password
                email
                token
                type
            }
        }`,
        variables: {
            username: username,
            email: email,
            password: pass
        }
    }, {
        headers: {
        'Content-Type': 'application/json'
        }
    });

    if(data.data.data.addUser) {
        console.log('signup success: ', data)
        localStorage.setItem('user', JSON.stringify(data.data.data.addUser))
    } else {
        console.log('err: ', data)
    }
  }


  return (
    <div>
        <h1>SignUp</h1>
        <input placeholder={'username'} value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder={'email'} value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder={'pass'} value={pass} onChange={(e) => setPass(e.target.value)} />
        
        <button onClick={SignUp} >SignUp</button>
    </div>
  );
}
