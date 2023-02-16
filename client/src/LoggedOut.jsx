import { Route, Routes } from "react-router-dom";
import LoggedOutNav from './LoggedOutNav';
import AllJobs from './AllJobs';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

export default function LoggedOut({ setCurrentUser, setIsAuthenticated, setTheme, handleThemeSwitch, theme }) {
    return (
        <div style={{ display: 'flex', height: '100vh', width: 'auto' }}>
            <LoggedOutNav setTheme={setTheme} handleThemeSwitch={handleThemeSwitch} theme={theme} />
            <Routes>
                <Route path="/" element={<AllJobs />} />
                <Route path="/signup" element={<SignupForm setCurrentUser={setCurrentUser} setIsAuthenticated={setIsAuthenticated} theme={theme} />} />
                <Route path="/login" element={<LoginForm setCurrentUser={setCurrentUser} setIsAuthenticated={setIsAuthenticated} theme={theme} />} />
            </Routes>
        </div>
    )
}