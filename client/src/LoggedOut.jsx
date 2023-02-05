import { Route, Routes } from "react-router-dom";
import LoggedOutNav from './LoggedOutNav';

export default function LoggedOut() {
    return (
        <div>
            <LoggedOutNav />
            <Routes>
                <Route path="/" element={<AllJobs />} />
            </Routes>
        </div>
    )
}