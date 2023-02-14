
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
        <div style={{ display: 'flex', gap: '5vw', width: '40vw', height: '12vw' }} className='bg-white rounded-lg drop-shadow-lg border-amber-100 hover:border-cyan-200 border-4 dark:bg-slate-800 dark:border-white dark:drop-shadow-white'>
            <div style={{ marginTop: '2.5vh', marginLeft: '2vw', display: 'flex', flexDirection: 'column', gap: '1vw', width: '41%' }}>
                <h2 className='text-2xl font-semibold dark:text-amber-300 '>{job.job_title}</h2>
                <h3 className='font-semibold text-cyan-400 dark:text-white'>{job.company}</h3>
                <p className='dark:text-white text-amber-500'>{job.location}</p>
            </div>
            <div style={{ marginTop: '4vh' }}>
                {connectionName !== null &&
                    <p>Connection : {connectionName}</p>
                }
                {!connectionName &&
                    <button onClick={() => { setShowConnections(!showConnections) }} style={{ marginLeft: '8vw' }} className="inline-block px-8 py-2 bg-amber-300 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-amber-400 hover:shadow-lg focus:bg-amber-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-400 active:shadow-lg transition duration-150 ease-in-out" >Add referral</button>
                }

                {showConnections &&
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
                }

                <button onClick={() => { setShowDate(!showDate) }} style={{ marginTop: '7vh', marginLeft: '8vw', width: '10vw', textDecoration: 'underline' }}>Mark as Applied</button>
            </div>
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