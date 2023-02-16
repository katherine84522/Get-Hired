
import { useEffect, useState } from 'react'
export default function InterviewCard({ interview, setInterviews, currentUser, interviews }) {

    const [showUpdate, setShowUpdate] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const [nextRound, setNextRound] = useState(false)
    const [interviewDate, setInterviewDate] = useState(new Date().toISOString().slice(0, 10))
    const [interviewTime, setInterviewTime] = useState('')
    const [virtual, setVirtual] = useState(true)
    const [address, setAddress] = useState(null)
    const [invitedNext, setInvitedNext] = useState(true)
    const [time, setTime] = useState('')
    const [isEmailed, setIsEmailed] = useState(false)



    useEffect(() => {
        const request = async () => {
            let req = await fetch(`http://127.0.0.1:3000/interviews/${interview.id}`)
            let res = await req.json()
            // if (!res.completed || !res.invited_next) { setShowUpdate(true) }
            if (res.invited_next) { setInvitedNext(false) }
            setTime(res.time.slice(11, 16))
            if (res.emailed) { setIsEmailed(true) }
        }
        request()
    }, [])

    const handleComplete = async () => {
        let req = await fetch(`http://127.0.0.1:3000/interviews/${interview.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: true
            })
        });
        let res = await req.json()
        console.log(res)

        let req1 = await fetch(`http://127.0.0.1:3000/users/${currentUser.id}/interviews`)
        let res1 = await req1.json()
        setInterviews(res1)
    }

    const handleEmail = () => {
        setEmailSent(!emailSent)
        console.log(emailSent)
    }

    const handleNextRound = () => {
        setNextRound(!nextRound)
        console.log(nextRound)
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

        if (hours === "12") {
            hours = "00";
        }
        if (value.indexOf("PM") !== -1 && hours !== "12") {
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
        if (nextRound) {
            let req = await fetch("http://127.0.0.1:3000/interviews", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: currentUser.id,
                    emailed: emailSent,
                    completed: false,
                    company: interview.job.company,
                    position: interview.job.position,
                    round: interview.round + 1,
                    job_id: interview.job.id,
                    address,
                    virtual,
                    time: interviewTime,
                    date: interviewDate
                })
            });
            let res = await req.json()
            console.log(res)

            setInterviews([...interviews, res])
        }



        let req = await fetch(`http://127.0.0.1:3000/interviews/${interview.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emailed: emailSent,
                invited_next: nextRound
            })
        });
        let res = await req.json()
        console.log(res)

        setShowUpdate(false)
        if (emailSent) { setIsEmailed(true) }
    }





    return (
        <div style={{ display: 'flex', gap: '2vw', width: '50vw', height: '14vw' }} className='bg-white rounded-lg drop-shadow-lg border-amber-100 hover:border-cyan-200 border-4 dark:bg-stone-900 dark:border-2 dark:border-stone-800'>
            <div className='mt-6 ml-7' style={{ width: '35%' }}>
                <p className='text-2xl font-semibold dark:text-amber-300 '>{interview.job.job_title}</p>
                <p className='mt-4 font-semibold text-cyan-400 dark:text-cyan-200'>{interview.job.company}</p>
                <p className='mt-4 dark:text-white text-amber-500'>Round: {interview.round}</p>
            </div>
            <div className='mt-6 ml-3 dark:text-white' style={{ display: 'flex', flexDirection: 'column', gap: '1vh', width: '30%' }}>
                <p className='font-semibold'>Date: {interview.date}</p>
                <p className='font-semibold'>Time: {time}</p>
                <p className='font-semibold'>Type: {interview.virtual ? 'Virtual' : 'In-Person'}</p>
                {!interview.virtual &&
                    <p className='font-semibold'>Address: {interview.address}</p>
                }
                {interview.completed &&
                    <p className='font-semibold dark:text-white'>Email: {isEmailed ? 'Sent' : 'Not yet sent'}</p>
                }
            </div>
            {(!interview.invited_next && interview.completed) &&
                <div style={{ width: '22%', marginTop: '18vh' }}>
                    <button onClick={() => { setShowUpdate(!showUpdate) }} className="mr-2 inline-block px-8 py-2 bg-cyan-300 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-cyan-400 hover:shadow-lg focus:bg-cyan-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-400 active:shadow-lg transition duration-150 ease-in-out">Update</button>
                </div>
            }
            {!interview.completed &&
                <div style={{ width: '22%', marginTop: '18vh' }}>
                    <button onClick={() => { handleComplete() }} style={{ textDecoration: 'underline' }} className='dark:text-amber-200'>Completed</button>
                </div>
            }

            {showUpdate &&
                <div style={{ position: 'fixed', zIndex: 1, height: '100%', width: '100%', top: 0, right: 0, left: 0, bottom: 0 }}>
                    <div style={{ position: 'absolute', backgroundColor: 'rgb(8 145 178)', minWidth: '25vw', minHeight: '12vh', marginLeft: '2vw', borderRadius: '10px' }}>
                        <form onSubmit={(e) => { handleSubmit(e) }} className='mt-4 ml-16'>
                            {!isEmailed &&
                                <>
                                    <label className='text-white mr-4'>Follow-up Email Sent</label>
                                    <input type="checkbox" checked={emailSent} onChange={handleEmail} /><br />
                                </>
                            }
                            {invitedNext &&
                                <>
                                    <label className='text-white mr-4'>Invited to the {interview.round + 1} round</label>
                                    <input type="checkbox" checked={nextRound} onChange={handleNextRound} className='mt-4' />
                                </>
                            }
                            {nextRound &&
                                <>
                                    <div style={{ display: 'flex', marginTop: '1vh', marginRight: '2vw' }}>
                                        <label className='text-white mr-2'>Interview date and time:</label>
                                        <input type="date" value={interviewDate} onChange={handleDateChange} className='mr-2 mb-3' />
                                        <input type="time" value={interviewTime} onChange={handleTimeChange} className='mr-4 mb-3' />
                                        <div>
                                            <p onClick={() => { setVirtual(true) }} className='text-amber-200' style={{ textDecoration: 'underline' }}>Virtual</p>
                                            <p onClick={() => { setVirtual(false) }} className='text-amber-200' style={{ textDecoration: 'underline' }}>In-Person</p>
                                        </div>
                                    </div>
                                    {!virtual &&
                                        <>
                                            <label className='text-white mr-3'>Address:</label>
                                            <input type="text" value={address} onChange={handleAddress} />< br />
                                        </>
                                    }
                                </>
                            }

                            <br />
                            <div style={{ display: 'flex', gap: '2vw' }}>
                                <input type="submit" className="inline-block ml-4 mt-1 mb-3 px-5 py-2 bg-amber-300 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-amber-400 hover:shadow-lg focus:bg-amber-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-400 active:shadow-lg transition duration-150 ease-in-out" />
                                <p onClick={() => { setShowUpdate(false) }} className="mb-3 mt-1 inline-block px-5 py-2 bg-cyan-300 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-cyan-400 hover:shadow-lg focus:bg-cyan-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-400 active:shadow-lg transition duration-150 ease-in-out">Close</p>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}