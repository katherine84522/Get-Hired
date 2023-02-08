import { useEffect, useState } from 'react'


import SavedJobCard from './SavedJobCard'
import AppliedJobCard from './AppliedJobCard'

export default function MyJobs({ currentUser }) {

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
            const filterApplied = res.filter(job => { return job.applied === true })
            setAppliedJobs(filterApplied)
            // console.log(savedJobs)
        }
        request()
    }, [])




    return (
        <div>
            <button onClick={() => { setSaved(true) }}>Saved</button>
            <button onClick={() => { setSaved(false) }}>Applied</button>
            {saved ? (
                savedJobs.map((job) => {
                    return (
                        < SavedJobCard job={job} currentUser={currentUser} setSavedJobs={setSavedJobs} setReferralAdded={setReferralAdded} referralAdded={referralAdded} setAppliedJobs={setAppliedJobs} />
                    )
                })
            ) : (
                appliedJobs.map((job) => {
                    return (
                        < AppliedJobCard job={job} currentUser={currentUser} />
                    )
                })
            )
            }

        </div>
    )
}