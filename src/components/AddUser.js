import React, { useState } from 'react';

const AddUser = () => {
    const [user, setUser] = useState({});

    const handleSubmit = e => {
        e.preventDefault();
        console.log(user);
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('User Added Successfully');
                    e.target.reset();
                }
            })
    }

    const handleBlur = e => {
        const field = e.target.name;
        const name = e.target.value;
        const newUser = { ...user };
        newUser[field] = name;
        setUser(newUser)
    }

    return (
        <div>
            <h2>Add a New User</h2>
            <form onSubmit={handleSubmit}>
                <input onBlur={handleBlur} type="text" name="name" placeholder='Name' required /><br />
                <input onBlur={handleBlur} type="text" name="address" placeholder='Address' required /><br />
                <input onBlur={handleBlur} type="email" name="email" placeholder='Email' required /><br />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default AddUser;