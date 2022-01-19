import React from 'react'

export const ProfilePage = () => {
    let user = localStorage.getItem('user');
    console.log('user: ', user)
    if(user != "null") {
        user = JSON.parse(user)
        console.log('user: ', user)
    } else {
        return (
            <h1>No Account</h1>
        )
    }

    const logOut = () => {
        localStorage.setItem('user', null)
    }

    return (
        <div>
            <h1>Profile</h1>
            <h2>Username: {user.username}</h2>
            <h2>Email: {user.email}</h2>

            <button onClick={logOut} >Log Out</button>
        </div>
    )
}