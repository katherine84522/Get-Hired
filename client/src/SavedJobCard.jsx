
import { useState } from 'react'

export default function SavedJobCard({ job, currentUser, setSavedJobs }) {


    const [showDate, setShowDate] = useState(false)
    const [today, setToday] = useState(true)
    const [futureDate, setFutureDate] = useState(new Date().toISOString().slice(0, 10))

    const currentday = new Date();
    const today1 = new Date().toISOString().split('T')[0];

    const handleDateChange = (e) => {
        const date = new Date(e.target.value)
        setFutureDate(date.toISOString().slice(0, 10))
        console.log(futureDate)
    }


    const handleApplied = async (e) => {
        e.preventDefault();
        setShowDate(false)

        let appliedDate
        if (today) {
            appliedDate = currentday.toISOString();
        } else {
            appliedDate = futureDate
        }

        let req3 = await fetch(`http://127.0.0.1:3000/jobs/${job.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                applied: true,
                saved: false,
                applied_date: appliedDate
            })
        });
        let res3 = await req3.json()
        console.log(res3)

        let req2 = await fetch(`http://127.0.0.1:3000/users/${currentUser.id}/jobs`)
        let res2 = await req2.json()
        const filterSaved = res2.filter(job => { return job.saved === true })
        setSavedJobs(filterSaved)

    }




    return (
        <div>
            <h2>{job.job_title}</h2>
            <h3>{job.company}</h3>
            {/* <p>{job.location}</p> */}
            <button onClick={() => { setShowDate(true) }}>Applied</button>
            {showDate &&
                <form onSubmit={(e) => { handleApplied(e) }}>
                    <label>When did you apply?</label>
                    <p onClick={() => { setToday(true) }}>Today</p>
                    <p onClick={() => { setToday(false) }}>Not Today</p>
                    {!today &&
                        <input type="date" max={today1} value={futureDate} onChange={(e) => { handleDateChange(e) }} />
                    }
                    <input type='submit' />
                </form>
            }
        </div>
    )
}