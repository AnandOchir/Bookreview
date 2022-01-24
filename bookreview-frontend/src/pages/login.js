import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const image = require('../assets/image.jpg')

export const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [errorMessege, setErrorMessege] = useState('')
    const navigate = useNavigate()

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

        if (data.data.data.login) {
            navigate('/')
            console.log('login success: ', data)
            localStorage.setItem('user', JSON.stringify(data.data.data.login))
        } else {
            console.log('err: ', data.data.errors[0].message)
            setErrorMessege(data.data.errors[0].message)
        }
    }

    return (
        <div className='flex full-screen'>
        <div className='full-height Signin-Image flex-center' >
              <img src={image} />
        </div >
        <div className='flex align-center justify-center Signin-background' >
              <div className='inner-width '>
                    <div className='mb-1 '>Welcome back</div>
                    <div className='Roboto mb-3 fs-30'>Login to your account</div>
                    <div className='mb-3'>Email</div>
                    <div className='Signin-container mb-3'>
                          <input className='Signin-input ' placeholder={'John.snow@gmail.com'} value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-3'>Password</div>
                    <div className='Signin-container mb-4'>
                          <input className='Signin-input' placeholder={'*******'} value={pass} type='password' onChange={(e) => setPass(e.target.value)} />
                    </div>
                    <div className='mb-4 c-error'>{errorMessege}</div>
                    <button onClick={Login} className='Signin-Button fs-24' >Login Now free </button>
              </div>
        </div>
  </div>
    );
}
