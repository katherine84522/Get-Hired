import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ setCurrentUser, setIsAuthenticated }) => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        subscribed: true
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    function handleSubmit(e) {
        e.preventDefault();

        const userCreds = { ...formData };

        fetch("http://127.0.0.1:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userCreds),
        }).then((res) => {
            if (res.ok) {
                res.json().then((user) => {
                    setCurrentUser(user);
                    setIsAuthenticated(true)
                    navigate('/')
                });
            } else {
                res.json().then((errors) => {
                    console.error(errors);
                });
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} style={{}}>
            <label htmlFor="username">Username:</label>
            <input
                id="username-signup-input"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="email">Email:</label>
            <input
                id="email-signup-input"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
                id="password-signup-input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />
            <br />
            <label>Sign up for daily notifications</label>
            <input
                type="checkbox"
                name="subscribed"
                checked={formData.subscribed}
                onChange={handleChange}
            />
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default SignupForm;