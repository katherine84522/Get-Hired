import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react'

export default function LoggedInNav({ setIsAuthenticated, currentUser, setTheme, handleThemeSwitch, theme }) {

    const [navColor, setNavColor] = useState('alljobs')
    const navigate = useNavigate()

    const handleLogOut = () => {
        setIsAuthenticated(false)
        navigate('/')
    }



    return (
        <>
            <div className='dark:bg-stone-900 bg-white' style={{ zIndex: 2, position: 'fixed', height: '100vh', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', width: '22%' }}>
                <div className='mt-16' style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>
                        <img src='./logo.png' style={{ width: '70%', marginLeft: '14%', marginTop: '-10%' }} />
                    </div>
                    <br />
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2vh', marginBottom: '2vh' }}>
                        <div style={{ display: 'flex', height: '8vh', justifyContent: 'center', padding: '2.5vh', backgroundColor: navColor === 'alljobs' ? 'rgb(252 237 174)' : 'transparent' }}>
                            <img src='./alljobs.png' style={{ width: '10%', height: '100%' }} />
                            <NavLink className='dark:text-amber-500 ml-4' to='/' onClick={() => { setNavColor('alljobs') }}>All Jobs</NavLink>
                        </div>

                        <div style={{ display: 'flex', height: '8vh', justifyContent: 'center', padding: '2.5vh', backgroundColor: navColor === 'myjobs' ? 'rgb(252 237 174)' : 'transparent' }}>
                            <img src='./myjobs.png' style={{ width: '10%' }} />
                            <NavLink className='dark:text-amber-500 ml-4' to='/myjobs' onClick={() => { setNavColor('myjobs') }}>My Jobs</NavLink>
                        </div>

                        <div style={{ display: 'flex', height: '8vh', justifyContent: 'center', padding: '2.5vh', backgroundColor: navColor === 'network' ? 'rgb(252 237 174)' : 'transparent' }}>
                            <img src='./connections.png' style={{ width: '10%' }} />
                            <NavLink className='dark:text-amber-500 ml-4' to='/connections' onClick={() => { setNavColor('network') }}>Network</NavLink>
                        </div>

                        <div style={{ display: 'flex', height: '8vh', justifyContent: 'center', padding: '2.5vh', backgroundColor: navColor === 'interviews' ? 'rgb(252 237 174)' : 'transparent' }}>
                            <img src='./interviews.png' style={{ width: '10%' }} />
                            <NavLink className='dark:text-amber-500 ml-4' to='/interviews' onClick={() => { setNavColor('interviews') }}>Interviews</NavLink>
                        </div>

                        <div style={{ display: 'flex', height: '8vh', justifyContent: 'center', padding: '2.5vh', backgroundColor: navColor === 'calendar' ? 'rgb(252 237 174)' : 'transparent' }}>
                            <img src='./calendar.png' style={{ width: '10%' }} />
                            <NavLink className='dark:text-amber-500 ml-4' to='/calendar' onClick={() => { setNavColor('calendar') }}>Calendar</NavLink>
                        </div>

                        <div style={{ display: 'flex', height: '8vh', justifyContent: 'center', padding: '2.5vh', backgroundColor: navColor === 'dashboard' ? 'rgb(252 237 174)' : 'transparent' }}>
                            <img src='./dashboard.png' style={{ width: '10%' }} />
                            <NavLink className='dark:text-amber-500 ml-4' to='/dashboard' onClick={() => { setNavColor('dashboard') }}>Dashboard</NavLink>
                        </div>

                        <div style={{ display: 'flex', height: '8vh', justifyContent: 'center', padding: '2.5vh', backgroundColor: navColor === 'report' ? 'rgb(252 237 174)' : 'transparent' }}>
                            <img src='./report.png' style={{ width: '10%' }} />
                            <NavLink className='dark:text-amber-500 ml-4' to='/report' onClick={() => { setNavColor('report') }}>Report</NavLink>
                        </div>

                    </div>
                    <button className='bg-cyan-200 h-8 mt-6 text-cyan-600' onClick={() => { handleThemeSwitch() }}>{theme}</button>
                    <p className='mt-2 ml-28 dark:text-white' onClick={() => { handleLogOut() }}>Log out</p>
                </div>
            </div>
            <div style={{ width: '22%' }} />
        </>
    )
}