import { NavLink } from 'react-router-dom';
import { useState } from 'react'

export default function LoggedOutNav({ setTheme, handleThemeSwitch, theme }) {

    const [allJobsColor, setAllJobsColor] = useState(true)

    console.log(allJobsColor)

    return (
        <>
            <div className='dark:bg-stone-800 bg-white' style={{ zIndex: 2, position: 'fixed', height: '100vh', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', width: '22%' }}>
                <div className='mt-16' style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>
                        <img src='./logo.png' style={{ width: '80%', marginLeft: '10%', marginTop: '-10%' }} />
                    </div>
                    <div className='h-14 mb-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.8vw', gap: '1vw', marginTop: '6vh', backgroundColor: allJobsColor ? 'rgb(252 237 174)' : 'transparent' }}>
                        <img src='./alljobs.png' style={{ width: '10%' }} />
                        <NavLink to='/' onClick={() => { setAllJobsColor(true) }} className='dark:text-amber-500' >All Jobs</NavLink>
                    </div>
                    <p style={{ textAlign: 'center' }} className='dark:text-white'>To access all the features, </p>
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '2vw' }}>
                        <NavLink className='dark:text-white' to='/signup' onClick={() => { setAllJobsColor(false) }} className="inline-block px-5 py-2 bg-amber-300 text-white font-medium text-s leading-tight uppercase rounded-full shadow-md hover:bg-amber-400 hover:shadow-lg focus:bg-amber-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-400 active:shadow-lg transition duration-150 ease-in-out">Sign up</NavLink>
                        <p style={{ marginLeft: '1vw', marginRight: '1vw' }} className='dark:text-white'>or</p>
                        <NavLink className='dark:text-white' to='/login' onClick={() => { setAllJobsColor(false) }} className="inline-block px-5 py-2 bg-cyan-300 text-white font-medium text-s leading-tight uppercase rounded-full shadow-md hover:bg-cyan-400 hover:shadow-lg focus:bg-cyan-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-400 active:shadow-lg transition duration-150 ease-in-out">Log in</NavLink>
                        <br />
                    </div>
                    <button style={{ marginTop: '35vh' }} className='bg-cyan-200 h-8' onClick={() => { handleThemeSwitch() }}>{theme}</button>
                </div>
            </div>
            <div style={{ width: '22vw' }} />
        </>
    )
}