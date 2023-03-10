import { NavLink, useNavigate } from 'react-router-dom';

export default function LoggedInNav({ setIsAuthenticated, currentUser }) {

    const navigate = useNavigate()

    const handleLogOut = () => {
        setIsAuthenticated(false)
        navigate('/')
    }

    return (
        <div>
            <p>Good luck to you! {currentUser.username}</p>
            <NavLink to='/'>All Jobs</NavLink>
            <br />
            <NavLink to='/myjobs'>My Jobs</NavLink>
            <br />
            <NavLink to='/connections'>Network</NavLink>
            <br />
            <NavLink to='/interviews'>Interviews</NavLink>
            <br />
            <NavLink to='/calendar'>Calendar</NavLink>
            <br />
            <NavLink to='/dashboard'>Dashboard</NavLink>
            <br />
            <NavLink to='/report'>Report</NavLink>
            <br />
            <p onClick={() => { handleLogOut() }}>Log out</p>
        </div>
    )
}