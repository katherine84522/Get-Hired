import { Route, Routes } from "react-router-dom";
import LoggedInNav from './LoggedInNav'
import AllJobs from './AllJobs'
import MyJobs from './MyJobs'
import Connections from './Connections'
import Interviews from './Interviews'
import Calendar from './Calendar'
import Dashboard from './Dashboard'
import Report from './Report'

export default function LoggedIn({ setIsAuthenticated, isAuthenticated, currentUser }) {
    return (
        <div style={{ display: 'flex' }}>
            <LoggedInNav setIsAuthenticated={setIsAuthenticated} currentUser={currentUser} />
            <Routes>
                <Route path="/" element={<AllJobs isAuthenticated={isAuthenticated} currentUser={currentUser} />} />
                <Route path="/myjobs" element={<MyJobs currentUser={currentUser} />} />
                <Route path="/connections" element={<Connections currentUser={currentUser} />} />
                <Route path="/interviews" element={<Interviews currentUser={currentUser} />} />
                <Route path="/calendar" element={<Calendar currentUser={currentUser} />} />
                <Route path="/dashboard" element={<Dashboard currentUser={currentUser} />} />
                <Route path="/report" element={<Report currentUser={currentUser} />} />
            </Routes>
        </div>
    )
}