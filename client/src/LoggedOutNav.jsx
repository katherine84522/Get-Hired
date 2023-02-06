import { NavLink } from 'react-router-dom';

export default function LoggedOutNav() {


    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
            <NavLink to='/signup'>Sign up</NavLink>
            <p>or</p>
            <NavLink to='/login'>Log in</NavLink>
        </div>
    )
}