import { NavLink } from 'react-router-dom';
import { useState } from 'react'

export default function LoggedOutNav({ setTheme, handleThemeSwitch, theme }) {

    const [allJobsColor, setAllJobsColor] = useState(true)

    console.log(allJobsColor)

    return (
        <>
            <div className='dark:bg-stone-800 bg-white' style={{ position: 'fixed', height: '100vh', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', width: '22vw' }}>
                <div className='mt-16' style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{ textAlign: 'center' }}>For more functionalities, </p>
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '2vw' }}>
                        <NavLink style={{ textDecoration: 'underline' }} to='/signup' onClick={() => { setAllJobsColor(false) }}>Sign up</NavLink>
                        <p style={{ marginLeft: '1vw', marginRight: '1vw' }}>or</p>
                        <NavLink style={{ textDecoration: 'underline' }} to='/login' onClick={() => { setAllJobsColor(false) }}>Log in</NavLink>
                        <br />
                    </div>
                    <div className='h-14' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.8vw', marginTop: '4vh', backgroundColor: allJobsColor ? 'rgb(253 230 138)' : 'transparent' }}>
                        <NavLink to='/' onClick={() => { setAllJobsColor(true) }}  >All Jobs</NavLink>
                    </div>
                    <button style={{ marginTop: '45vh' }} className='bg-cyan-200 h-8' onClick={() => { handleThemeSwitch() }}>{theme} Mode</button>
                </div>
            </div>
            <div style={{ width: '22vw' }} />
        </>
    )
}