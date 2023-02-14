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
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', flexGrow: 1 }}>
            <div style={{ marginLeft: '20vw', marginTop: '2vw' }}>
                <img src='./welcomeback.png' style={{ width: '70%' }} />
            </div>
            < form onSubmit={handleSubmit} style={{ margin: 'auto' }}>
                <div className='mb-6'>
                    <input
                        className='form-control block w-full px-4 py-2 -mt-12 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                        id="username-input"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div className='mb-6'>
                    <input
                        className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                        id="password-input"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <button className='ml-16 inline-block px-7 py-3 bg-amber-400 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out' type="submit">Log In</button>
            </form >
            {errorMsg && <p>Invalid username or password, please try again.</p>}
        </div >
    );
};

export default LoginForm;