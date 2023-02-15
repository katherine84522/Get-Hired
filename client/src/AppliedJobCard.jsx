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
        let amPm = value.substr(6, 2);

        if (hours === "12") {
            hours = "00";
        }
        if (amPm === "PM" && hours !== "12") {
            hours = (parseInt(hours, 10) + 12).toString();
        }

        const formattedTime = `${hours}:${minutes}`;
        setInterviewTime(formattedTime);
    };



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
        <div style={{ display: 'flex', gap: '5vw', width: '45vw', height: '14vw' }} className='bg-white rounded-lg drop-shadow-lg border-amber-100 hover:border-cyan-200 border-4 dark:bg-slate-800 dark:border-white dark:drop-shadow-white'>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1vw', marginTop: '2vw', marginLeft: '2vw' }}>
                <h2 className='text-2xl font-semibold dark:text-amber-300 '>{job.job_title}</h2>
                <h3 className='font-semibold text-cyan-400 dark:text-white'>{job.company}</h3>
                <h3 className='dark:text-white text-amber-500'>Applied on {job.applied_date}</h3>
            </div>
            <div style={{ marginTop: '2vw', marginLeft: '2vw' }}>
                {job.connection !== null &&
                    <div>
                        {showReferred ?
                            <p>Referred by {job.connection.name}</p>
                            :
                            <p className='font-semibold' >Connection: {job.connection.name}</p>
                        }
                        {!showReferred &&
                            <div>
                                <p>Status: Not yet referred</p>
                                <button onClick={() => { handleReferred() }} style={{ textDecoration: 'underline' }}>Mark as Referred</button>
                            </div>
                        }
                    </div>
                }
                <button className="inline-block px-8 py-2 mt-7 bg-amber-300 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-amber-400 hover:shadow-lg focus:bg-amber-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-400 active:shadow-lg transition duration-150 ease-in-out" onClick={() => { setShowInterview(!showInterview) }}>Invited to Interview</button>
            </div>
            {showInterview &&
                <div style={{ position: 'fixed', zIndex: 1, height: '100%', width: '100%', top: 0, right: 0, left: 0, bottom: 0 }}>
                    <div style={{ position: 'absolute', backgroundColor: 'rgb(8 145 178)', width: '25vw', minHeight: '10vh', marginLeft: '20vw', borderRadius: '10px' }}>
                        <form onSubmit={(e) => { handleSubmit(e) }} style={{ marginTop: '2vh', marginLeft: '2vw' }}>
                            <label style={{ color: 'white' }} className='font-semibold' >Interview date and time:</label>< br />
                            <input type="date" value={interviewDate} onChange={handleDateChange} style={{ marginRight: '1vw', marginLeft: '1vw', marginBottom: '4vh', marginTop: '2vh' }} />
                            <input type="time" value={interviewTime} onChange={handleTimeChange} />
                            <div style={{ display: 'flex', marginLeft: '4vw', gap: '2vw', marginBottom: '2vh' }}>
                                <p onClick={() => { setVirtual(true) }} style={{ backgroundColor: 'orange', width: '5vw', textAlign: 'center', borderRadius: '10px', color: 'white' }}>Virtual</p>
                                <p onClick={() => { setVirtual(false) }} style={{ backgroundColor: 'cyan', width: '7vw', textAlign: 'center', borderRadius: '10px', color: 'black' }}>In-Person</p>
                            </div>
                            {!virtual &&
                                <>
                                    <label>Address:</label>
                                    <input type="text" value={address} onChange={handleAddress} />< br />
                                </>
                            }
                            <div style={{ display: 'flex', gap: '4vw', color: 'white', textDecoration: 'underline', marginLeft: '5vw', marginBottom: '2vh' }}>
                                <input type='submit' />
                                <p onClick={() => { setShowInterview(false) }}>Close</p>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}
