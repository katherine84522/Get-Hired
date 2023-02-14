import { useEffect, useState } from 'react'


import SavedJobCard from './SavedJobCard'
import AppliedJobCard from './AppliedJobCard'

export default function MyJobs({ currentUser, isAuthenticated }) {

    const [savedJobs, setSavedJobs] = useState([])
    const [appliedJobs, setAppliedJobs] = useState([])
    const [saved, setSaved] = useState(true)
    const [referralAdded, setReferralAdded] = useState(false)


    useEffect(() => {
        const request = async () => {
            let req = await fetch(`http://127.0.0.1:3000/users/${currentUser.id}/jobs`)
            let res = await req.json()
            const filterSaved = res.filter(job => { return job.saved === true })
            setSavedJobs(filterSaved)
            const filterApplied = res.filter(job => { return job.applied === true && !job.interview })
            setAppliedJobs(filterApplied)
            console.log(filterApplied)
            // console.log(savedJobs)
        }
        request()
    }, [])




    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div className='ml-12 mt-12'>
                    <h1 className=" font-semibold text-left text-4xl dark:text-white">My Jobs</h1>
                    {isAuthenticated &&
                        <p className='mt-4 dark:text-white'>Good luck to you, {currentUser.username} !</p>
                    }
                </div>
                <div style={{ marginLeft: '10vw', marginTop: '5vw', display: 'flex', gap: '4vw', marginBottom: '1vw' }}>
                    <button onClick={() => { setSaved(true) }} className="inline-block px-10 py-2 bg-amber-300 text-white font-medium text-s leading-tight uppercase rounded-full shadow-md hover:bg-amber-400 hover:shadow-lg focus:bg-amber-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-400 active:shadow-lg transition duration-150 ease-in-out">Saved</button>
                    <button onClick={() => { setSaved(false) }} className="inline-block px-10 py-2.5 bg-cyan-300 text-white font-medium text-s leading-tight uppercase rounded-full shadow-md hover:bg-cyan-400 hover:shadow-lg focus:bg-cyan-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-400 active:shadow-lg transition duration-150 ease-in-out">Applied</button>
                </div>
            </div>
            <div className='ml-56 pt-20' style={{ display: 'flex', flexDirection: 'column', gap: '2vw', marginTop: '-4vh' }}>
                {saved ? (
                    savedJobs.map((job) => {
                        return (
                            < SavedJobCard job={job} currentUser={currentUser} setSavedJobs={setSavedJobs} setReferralAdded={setReferralAdded} referralAdded={referralAdded} setAppliedJobs={setAppliedJobs} />
                        )
                    })
                ) : (
                    appliedJobs.map((job) => {
                        return (
                            < AppliedJobCard job={job} currentUser={currentUser} setAppliedJobs={setAppliedJobs} />
                        )
                    })
                )
                }
            </div>

        </div>
    )
}