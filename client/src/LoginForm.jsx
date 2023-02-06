import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setCurrentUser, setIsAuthenticated }) => {
    const navigate = useNavigate()

    const [errorMsg, setErrorMsg] = useState(false)

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://127.0.0.1:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        }).then((res) => {
            if (res.ok) {
                res.json().then((user) => {
                    setCurrentUser(user);
                    setIsAuthenticated(true)
                    navigate('/')
                });
            } else {
                console.log(res)
                setErrorMsg(true)
            }
        })
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    id="username-input"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    id="password-input"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <br />
                <button type="submit">Submit</button>
            </form>
            {errorMsg && <p>Invalid username or password, please try again.</p>}
        </div>
    );
};

export default LoginForm;