import { NavLink, useNavigate } from 'react-router-dom';

export default function LoggedInNav({ setIsAuthenticated, currentUser, setTheme, handleThemeSwitch, theme }) {

    const navigate = useNavigate()

    const handleLogOut = () => {
        setIsAuthenticated(false)
        navigate('/')
    }



    return (
        <>
            <div className='dark:bg-stone-800 bg-white' style={{ position: 'fixed', height: '100vh', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', width: '22%' }}>
                <div className='mt-16' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.4vw' }}>
                    <br />
                    <p className='dark:text-white'>Good luck to you!</p>
                    <br />
                    <p className='-mt-5 mb-10 dark:text-white '> {currentUser.username}</p>
                    <NavLink className='dark:text-white' to='/'>All Jobs</NavLink>
                    <br />
                    <NavLink className='dark:text-white' to='/myjobs'>My Jobs</NavLink>
                    <br />
                    <NavLink className='dark:text-white' to='/connections'>Network</NavLink>
                    <br />
                    <NavLink className='dark:text-white' to='/interviews'>Interviews</NavLink>
                    <br />
                    <NavLink className='dark:text-white' to='/calendar'>Calendar</NavLink>
                    <br />
                    <NavLink className='dark:text-white' to='/dashboard'>Dashboard</NavLink>
                    <br />
                    <NavLink className='dark:text-white' to='/report'>Report</NavLink>
                    <br />
                    <button className='dark:text-white mt-10' onClick={() => { handleThemeSwitch() }}>{theme} Mode</button>
                    <p className='mt-2 dark:text-white' onClick={() => { handleLogOut() }}>Log out</p>
                </div>
            </div>
            <div style={{ width: '22%' }} />
        </>
    )
}