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
        <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', marginLeft: '28vw' }}>
            <div style={{ marginTop: '30vh', marginLeft: '-10vw' }}>
                <img src='./signuppic.png' style={{ width: '80%' }} />
            </div>
            <div style={{ marginTop: '40vh', marginRight: '20vw', width: '40vw' }}>
                <form onSubmit={handleSubmit}  >
                    <div className='mb-4'>
                        <input
                            className='form-control block w-full px-4 py-2 -mt-12 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            id="username-signup-input"
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <br />
                    <div className='mb-4'>
                        <input
                            className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            id="email-signup-input"
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <br />
                    <div className='mb-4'>
                        <input
                            className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            id="password-signup-input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {/* <br /> */}
                    {/* <label>Sign up for daily notifications</label> */}
                    {/* <input
                    className="h-4 w-4 border border-gray-300 rounded-sm mt-1 align-top bg-no-repeat float-left mr-2"
                    type="checkbox"
                    name="subscribed"
                    checked={formData.subscribed}
                    onChange={handleChange}
                /> */}
                    <br />
                    <button className='ml-16 inline-block px-7 py-3 bg-amber-400 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out' type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;