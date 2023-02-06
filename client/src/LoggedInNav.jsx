import { NavLink, useNavigate } from 'react-router-dom';

export default function LoggedInNav({ setIsAuthenticated }) {

    const navigate = useNavigate()

    const handleLogOut = () => {
        setIsAuthenticated(false)
        navigate('/')
    }

    return (
        <div>
            <NavLink to='/'>All Jobs</NavLink>
            <br />
            <NavLink to='/myjobs'>My Jobs</NavLink>
            <br />
            <NavLink to='/connections'>Network</NavLink>
            <br />
            <NavLink to='/interviews'>Interviews</NavLink>
            <br />
            <p onClick={() => { handleLogOut() }}>Log out</p>
        </div>
    )
}