import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import './UpdateUser.css';
import swal from 'sweetalert'
const UpdateUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({ name: '', email: '', photo: '' });
    const history = useHistory();
    const url = `http://localhost:5000/users/${id}`
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setUser(data))
    }, []);

    const handleName = (e) => {
        const updatedName = e.target.value;
        const updatedUser = { name: updatedName, email: user.email, photo: user.photo }
        setUser(updatedUser);
    }
    const handleEmail = (e) => {
        const updatedEmail = e.target.value;
        const updatedUser = { name: user.name, email: updatedEmail, photo: user.photo }
        setUser(updatedUser);
    }
    const handlePhoto = (e) => {
        const updatedPhoto = e.target.value;
        const updatedUser = { name: user.name, email: user.email, photo: updatedPhoto }
        setUser(updatedUser);
    }
    const handleUpdatedUser = (e) => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    history.push('/')
                    swal("Good job!", "User Updated successfully!", "success");
                }
            })
        e.preventDefault();
    }
    return (
        <Container>
            <div className="row my-5" >
                <div className="col-md-6 mx-auto update-form">
                    <h3 className="text-center text-light">Update User</h3>
                    <div className="text-center">
                        <img style={{ width: "100px", height: "100px", borderRadius: "50%" }} src={user.photo} alt="" />
                    </div>
                    <form onSubmit={handleUpdatedUser}>
                        <input onChange={handleName} type="text" defaultValue={user.name || ''} />
                        <input onChange={handleEmail} type="email" defaultValue={user.email || ''} />
                        <input onChange={handlePhoto} type="text" defaultValue={user.photo || ''} />
                        <input className="my-button" type="submit" value="Update" />
                    </form>
                </div>
            </div>
        </Container>
    );
};

export default UpdateUser;