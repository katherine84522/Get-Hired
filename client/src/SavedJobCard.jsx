
import { useState, useEffect } from 'react'

export default function SavedJobCard({ job, currentUser, setSavedJobs, setReferralAdded, referralAdded, setAppliedJobs }) {


    const [showDate, setShowDate] = useState(false)
    const [today, setToday] = useState(true)
    const [futureDate, setFutureDate] = useState(new Date().toISOString().slice(0, 10))
    const [showConnections, setShowConnections] = useState(false)
    const [connections, setConnections] = useState([])
    const [selectedValue, setSelectedValue] = useState("no connection selected")
    const [connectionName, setConnectionName] = useState(null)




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
        const filterApplied = res2.filter(job => { return job.applied === true })
        setAppliedJobs(filterApplied)

    }



    useEffect(() => {
        const request = async () => {
            let req = await fetch(`http://127.0.0.1:3000/users/${currentUser.id}/connections`)
            let res = await req.json()
            console.log(res)
            setConnections(res)

            let req2 = await fetch(`http://127.0.0.1:3000/jobs/${job.id}`)
            let res2 = await req2.json()
            console.log(res2)
            if (res2.connection !== null) {
                setConnectionName(res2.connection.name)
            }
        }
        request()
    }, [])

    const handleSelected = (e) => {
        setSelectedValue(e.target.value)
        console.log(selectedValue)
    }


    const handleConnection = async (e) => {
        e.preventDefault()
        let req = await fetch(`http://127.0.0.1:3000/jobs/${job.id}/connection`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                connection_id: selectedValue
            })
        });
        let res = await req.json()
        console.log(res)
        setConnectionName(res.connection.name)
        setShowConnections(false)

    }

    return (
        <div>
            <h2>{job.job_title}</h2>
            <h3>{job.company}</h3>
            {/* <p>{job.location}</p> */}
            {connectionName !== null &&
                <p>Connection : {connectionName}</p>
            }
            {!connectionName &&
                <button onClick={() => { setShowConnections(!showConnections) }}>Add referral</button>
            }
            <button onClick={() => { setShowDate(!showDate) }}>Applied</button>
            {showConnections &&
                <div>
                    <form onSubmit={(e) => { handleConnection(e) }}>
                        <select value={selectedValue} onChange={handleSelected}>
                            <option value="" default selected>Select a connection</option>
                            {
                                connections.map((connection) => {
                                    return (
                                        <option value={connection.id}>{connection.name}</option>
                                    )
                                })
                            }
                        </select>
                        <button type="submit">Add</button>
                    </form>

                </div>

            }
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