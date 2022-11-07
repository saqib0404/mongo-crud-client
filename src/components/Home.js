import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUsers, setDisplayUsers] = useState(users);

    const handleDelete = user => {
        const agreed = window.confirm(`Do you want to delete ${user.name}`);
        if (agreed) {
            // console.log(user.name);
            fetch(`http://localhost:5000/users/${user._id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        alert("User Deleted");
                        const remaining = displayUsers.filter(usr => usr._id !== user._id);
                        setDisplayUsers(remaining);
                    }
                })
        }
    }

    return (
        <div>
            <h2>Users: {displayUsers.length}</h2>
            {
                displayUsers.map(user => <p key={user._id}>{user.name}
                    <Link to={`/users/${user._id}`}><button>Update</button></Link>
                    <button onClick={() => handleDelete(user)}>X</button>
                </p>)
            }
        </div>
    );
};

export default Home;