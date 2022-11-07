import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const UpdateUser = () => {
    const storedUser = useLoaderData();
    const [user, setUser] = useState(storedUser);

    const handleSubmit = e => {
        e.preventDefault();
        console.log(user);
        fetch(`http://localhost:5000/users/${storedUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    alert('User Updated')
                }
                console.log(data);
            })
    }

    const handleChange = e => {
        const field = e.target.name;
        const name = e.target.value;
        const newUser = { ...user };
        newUser[field] = name;
        setUser(newUser)
    }

    return (
        <div>
            <h2>Please Update: {storedUser.name}</h2>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} defaultValue={storedUser.name} type="text" name="name" placeholder='Name' required /><br />
                <input onChange={handleChange} defaultValue={storedUser.address} type="text" name="address" placeholder='Address' required /><br />
                <input onChange={handleChange} defaultValue={storedUser.email} type="email" name="email" placeholder='Email' required /><br />
                <button type="submit">Update User</button>
            </form>
        </div>
    );
};

export default UpdateUser;