import React, { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import './Home.css';
import swal from 'sweetalert'
import { Link } from 'react-router-dom';
const Home = () => {
    const [users, setUsers] = useState([]);
    //Read data from database
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, [users]);

    const nameRef = useRef();
    const emailRef = useRef();
    const photoRef = useRef();

    const handleAddUser = (e) => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const photo = photoRef.current.value;
        const newUser = { name: name, email: email, photo: photo };
        //Send data in the Database
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    const addedNewUser = [...users, newUser];
                    setUsers(addedNewUser);
                    e.target.reset();
                    swal("Good job!", "User added successfully!", "success");
                }
            })
        e.preventDefault();
    }

    const handleDeleteUser = id => {
        swal("Do you want delete the User ?")
            .then((value) => {
                if (value) {
                    const url = `http://localhost:5000/users/${id}`;
                    fetch(url, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            const remainingUsers = users.filter(user => user._id !== id);
                            setUsers(remainingUsers);
                            swal("Good job!", "User deleted successfully!", "success");
                        })
                }
            });
    }
    return (
        <Container className="text-light my-5">
            <div className="row">
                {/* Read data from User  */}
                <div className="col-lg-8">
                    <div className="row">
                        {
                            users.map(user => (
                                <div className="col-lg-6 mb-2">
                                    <div className="single-user">
                                        <div className="user-img">
                                            <img style={{ width: "70px", height: "70px", borderRadius: "50%", marginRight: "10px" }} src={user?.photo} alt="" />
                                        </div>
                                        <div className="user-content">
                                            <h5 className="m-0">{user?.name}</h5>
                                            <p >{user?.email}</p>
                                            <div className="action">
                                                <Link style={{ color: "#ffffff", textDecoration: "none" }} to={`/users/${user._id}`}>
                                                    <div className="update">
                                                        <i className="fas fa-user-edit"></i>
                                                        <span>Update</span>
                                                    </div>
                                                </Link>

                                                <div onClick={() => handleDeleteUser(user._id)} className="delete">
                                                    <i className="fas fa-user-minus"></i>
                                                    <span>Delete</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* Send data in database */}
                <div className="col-lg-4 form-section">
                    <div className="user-form">
                        <h3 className="text-center">Add User</h3>
                        <form onSubmit={handleAddUser}>
                            <input ref={nameRef} type="text" placeholder="Enter Your name" />
                            <input ref={emailRef} type="email" placeholder="Enter Your Email" />
                            <input ref={photoRef} type="text" placeholder="Enter your photo URL" />
                            <input className="my-button" type="submit" value="Add User" />
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Home;