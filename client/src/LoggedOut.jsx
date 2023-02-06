import { Route, Routes } from "react-router-dom";
import LoggedOutNav from './LoggedOutNav';
import AllJobs from './AllJobs';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

export default function LoggedOut({ setCurrentUser, setIsAuthenticated }) {
    return (
        <div style={{ display: 'flex' }}>
            <LoggedOutNav />
            <Routes>
                <Route path="/" element={<AllJobs />} />
                <Route path="/signup" element={<SignupForm setCurrentUser={setCurrentUser} setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/login" element={<LoginForm setCurrentUser={setCurrentUser} setIsAuthenticated={setIsAuthenticated} />} />
            </Routes>
        </div>
    )
}