import { Route, Routes } from "react-router-dom";
import LoggedInNav from './LoggedInNav'
import AllJobs from './AllJobs'
import MyJobs from './MyJobs'
import Connections from './Connections'
import Interviews from './Interviews'

export default function LoggedIn({ setIsAuthenticated, isAuthenticated, currentUser }) {
    return (
        <div style={{ display: 'flex' }}>
            <LoggedInNav setIsAuthenticated={setIsAuthenticated} currentUser={currentUser} />
            <Routes>
                <Route path="/" element={<AllJobs isAuthenticated={isAuthenticated} currentUser={currentUser} />} />
                <Route path="/myjobs" element={<MyJobs currentUser={currentUser} />} />
                <Route path="/connections" element={<Connections currentUser={currentUser} />} />
                <Route path="/interviews" element={<Interviews currentUser={currentUser} />} />
            </Routes>
        </div>
    )
}