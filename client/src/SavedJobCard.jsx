
import { useState, useEffect } from 'react'
import ApplyForm from './ApplyForm'


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
        <div style={{ display: 'flex', width: '40vw', height: '12vw' }} className='bg-white rounded-lg drop-shadow-lg border-amber-100 hover:border-cyan-200 border-4 dark:bg-stone-900 dark:border-2 dark:border-stone-800'>
            <div style={{ marginTop: '2.5vh', marginLeft: '2vw', display: 'flex', flexDirection: 'column', gap: '1vw', width: '70%' }}>
                <h2 className='text-2xl font-semibold dark:text-amber-300 '>{job.job_title}</h2>
                <h3 className='font-semibold text-cyan-400 dark:text-white'>{job.company}</h3>
                <p className='dark:text-white text-amber-500'>{job.location}</p>
            </div>
            <div style={{ marginTop: '4vh', width: '100%' }}>
                {connectionName !== null &&
                    <div className='ml-24'>
                        <p>Connection : {connectionName}</p>
                    </div>
                }
                {!connectionName &&
                    <button onClick={() => { setShowConnections(!showConnections) }} style={{ marginLeft: '8vw' }} className="inline-block px-8 py-2 mr-2 bg-amber-300 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-amber-400 hover:shadow-lg focus:bg-amber-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-400 active:shadow-lg transition duration-150 ease-in-out" >Add referral</button>
                }

                {showConnections &&
                    <div style={{ position: 'fixed', zIndex: 1, height: '100%', width: '100%', top: 0, right: 0, left: 0, bottom: 0 }}>
                        <div style={{ position: 'absolute', backgroundColor: 'rgb(8 145 178)', width: '25vw', minHeight: '10vh', marginLeft: '20vw', borderRadius: '10px' }}>
                            <form onSubmit={(e) => { handleConnection(e) }} style={{ marginTop: '2vh', marginLeft: '6vw' }}>
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
                                <div style={{ display: 'flex', gap: '4vw', marginTop: '2vh', marginLeft: '1vw', marginBottom: '1vh' }}>
                                    <button type="submit" style={{ color: 'white' }}>Add</button>
                                    <p onClick={() => { setShowConnections(false) }} style={{ color: 'white' }}>Close</p>
                                </div>
                            </form>
                        </div>
                    </div>
                }

                <button onClick={() => { setShowDate(!showDate) }} style={{ marginTop: '7vh', marginLeft: '8vw', width: '10vw', textDecoration: 'underline' }} className='dark:text-cyan-200'>Mark as Applied</button>
            </div>
            {showDate &&
                < ApplyForm handleApplied={handleApplied} today={today} setToday={setToday} setShowDate={setShowDate} handleDateChange={handleDateChange} today1={today1} futureDate={futureDate} />
            }
        </div>
    )
}