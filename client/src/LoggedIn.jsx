import { Route, Routes } from "react-router-dom";
import LoggedInNav from './LoggedInNav'
import AllJobs from './AllJobs'
import MyJobs from './MyJobs'
import Connections from './Connections'
import Interviews from './Interviews'

export default function LoggedIn() {
    return (
        <div>
            <LoggedInNav />
            <Routes>
                <Route path="/" element={<AllJobs />} />
                <Route path="/myjobs" element={<MyJobs />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/interviews" element={<Interviews />} />
            </Routes>
        </div>
    )
}