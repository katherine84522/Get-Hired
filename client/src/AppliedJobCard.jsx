import { useState, useEffect } from 'react'

export default function AppliedJobCard({ job, setAppliedJobs, currentUser }) {

    const [showReferred, setShowReferred] = useState(false)
    const [showInterview, setShowInterview] = useState(false)
    const [interviewDate, setInterviewDate] = useState(new Date().toISOString().slice(0, 10))
    const [interviewTime, setInterviewTime] = useState('')
    const [virtual, setVirtual] = useState(true)
    const [address, setAddress] = useState(null)


    useEffect(() => {
        const request = async () => {
            let req = await fetch(`http://127.0.0.1:3000/jobs/${job.id}`)
            let res = await req.json()
            if (res.referred) { setShowReferred(true) }
        }
        request()
    }, [])



    const handleReferred = async () => {
        let req = await fetch(`http://127.0.0.1:3000/jobs/${job.id}/referral`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                referred: true
            })
        });
        let res = await req.json()
        console.log(res)
        setShowReferred(true)
    }

    const handleDateChange = (e) => {
        const date = new Date(e.target.value)
        setInterviewDate(date.toISOString().slice(0, 10))
        console.log(interviewDate)
    }


    const handleTimeChange = (e) => {
        let value = e.target.value;
        let hours = value.substr(0, 2);
        let minutes = value.substr(3, 2);
        let period = value.substr(6, 2);

        if (hours === "12") {
            hours = "00";
        }
        if (period === "PM" && hours !== "12") {
            hours = (parseInt(hours, 10) + 12).toString();
        }

        const formattedTime = `${hours}:${minutes}`;
        setInterviewTime(formattedTime);
    }

    const handleAddress = (e) => {
        setAddress(e.target.value)
        console.log(address)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        let req = await fetch(`http://127.0.0.1:3000/jobs/${job.id}/interview`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                interview: true
            })
        });
        let res = await req.json()
        console.log(res)


        let req2 = await fetch(`http://127.0.0.1:3000/users/${currentUser.id}/jobs`)
        let res2 = await req2.json()
        const filterApplied = res2.filter(job => { return job.applied === true && !job.interview })
        setAppliedJobs(filterApplied)
        setShowInterview(false)

        let req3 = await fetch(`http://127.0.0.1:3000/interviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: interviewDate,
                time: interviewTime,
                round: 1,
                user_id: currentUser.id,
                job_id: job.id,
                emailed: false,
                completed: false,
                virtual,
                address
            })
        });
        let res3 = await req3.json()
        console.log(res3)

    }


    return (
        <div>
            <h2>{job.job_title}</h2>
            <h3>{job.company}</h3>
            <h3>Applied on {job.applied_date}</h3>
            {job.connection !== null &&
                <div>
                    {showReferred ?
                        <p>Referred by {job.connection.name}</p>
                        :
                        <p>Connection: {job.connection.name}</p>
                    }
                    {!showReferred &&
                        <div style={{ display: 'flex' }}>
                            <p>not yet referred</p>
                            <button onClick={() => { handleReferred() }}>Referred</button>
                        </div>
                    }
                </div>
            }
            <button onClick={() => { setShowInterview(!showInterview) }}>Invited to Interview</button>
            {showInterview &&
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <label>Interview date and time:</label>
                    <input type="date" value={interviewDate} onChange={handleDateChange} />
                    <input type="time" value={interviewTime} onChange={handleTimeChange} />
                    <p onClick={() => { setVirtual(true) }}>Virtual</p>
                    <p onClick={() => { setVirtual(false) }}>In-Person</p>
                    <label>Address:</label>
                    <input type="text" value={address} onChange={handleAddress} />
                    <input type='submit' />
                </form>

            }
        </div>
    )
}
