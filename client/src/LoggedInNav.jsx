import { NavLink, useNavigate } from 'react-router-dom';

export default function LoggedInNav({ setIsAuthenticated, currentUser, setTheme, handleThemeSwitch, theme }) {

    const navigate = useNavigate()

    const handleLogOut = () => {
        setIsAuthenticated(false)
        navigate('/')
    }



    return (
        <>
            <div className='dark:bg-stone-800 bg-white' style={{ zIndex: 2, position: 'fixed', height: '100vh', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', width: '22%' }}>
                <div className='mt-16' style={{ display: 'flex', flexDirection: 'column', gap: '0.5vw' }}>
                    <div>
                        <img src='./logo.png' style={{ width: '70%', marginLeft: '14%', marginTop: '-10%' }} />
                    </div>
                    <br />
                    <div className='ml-20 mt-4' style={{ display: 'flex', flexDirection: 'column', gap: '0.5vw' }}>
                        <div style={{ display: 'flex' }}>
                            <img src='./alljobs.png' style={{ width: '10%' }} />
                            <NavLink className='dark:text-white ml-4' to='/'>All Jobs</NavLink>
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <img src='./myjobs.png' style={{ width: '10%' }} />
                            <NavLink className='dark:text-white ml-4' to='/myjobs'>My Jobs</NavLink>
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <img src='./connections.png' style={{ width: '10%' }} />
                            <NavLink className='dark:text-white ml-4' to='/connections'>Network</NavLink>
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <img src='./interviews.png' style={{ width: '10%' }} />
                            <NavLink className='dark:text-white ml-4' to='/interviews'>Interviews</NavLink>
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <img src='./calendar.png' style={{ width: '10%' }} />
                            <NavLink className='dark:text-white ml-4' to='/calendar'>Calendar</NavLink>
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <img src='./dashboard.png' style={{ width: '10%' }} />
                            <NavLink className='dark:text-white ml-4' to='/dashboard'>Dashboard</NavLink>
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <img src='./report.png' style={{ width: '10%' }} />
                            <NavLink className='dark:text-white ml-4' to='/report'>Report</NavLink>
                        </div>
                        <br />
                    </div>
                    <button className='bg-cyan-200 h-8 mt-6 text-cyan-600' onClick={() => { handleThemeSwitch() }}>{theme} Mode</button>
                    <p className='mt-2 ml-28 dark:text-white' onClick={() => { handleLogOut() }}>Log out</p>
                </div>
            </div>
            <div style={{ width: '22%' }} />
        </>
    )
}