import { useState, useEffect } from 'react'
import InterviewCard from './InterviewCard'

export default function Interviews({ currentUser }) {

    const [interviews, setInterviews] = useState([])
    const [completed, setCompleted] = useState(false)

    useEffect(() => {
        const request = async () => {
            let req = await fetch(`http://127.0.0.1:3000/users/${currentUser.id}/interviews`)
            let res = await req.json()
            setInterviews(res)
            console.log(interviews)
        }
        request()
    }, [])

    const scheduledInterviews = interviews.filter(interview => { return !interview.completed })
    const completedInterviews = interviews.filter(interview => { return interview.completed })

    return (
        <div style={{ overflowY: 'scroll', paddingRight: '15vw' }}>
            <div style={{ display: 'flex' }}>
                <div className='ml-12 mt-8'>
                    <h1 className=" font-semibold text-left text-4xl dark:text-white">My Interviews</h1>
                    <p className='mt-4 dark:text-white'>Good luck to you, {currentUser.username} !</p>
                </div>
                <div style={{ marginLeft: '10vw', marginTop: '5vw', display: 'flex', gap: '4vw', marginBottom: '1vw' }}>
                    <button onClick={() => { setCompleted(false) }} className="inline-block px-10 py-2 bg-amber-300 text-white font-medium text-s leading-tight uppercase rounded-full shadow-md hover:bg-amber-400 hover:shadow-lg focus:bg-amber-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-400 active:shadow-lg transition duration-150 ease-in-out">Upcoming</button>
                    <button onClick={() => { setCompleted(true) }} className="inline-block px-10 py-2.5 bg-cyan-300 text-white font-medium text-s leading-tight uppercase rounded-full shadow-md hover:bg-cyan-400 hover:shadow-lg focus:bg-cyan-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-400 active:shadow-lg transition duration-150 ease-in-out">Completed</button>
                </div>
            </div>
            <div style={{ marginLeft: '12vw', marginTop: '5vh', display: 'flex', flexDirection: 'column', gap: '3vw', paddingBottom: '6vh' }}>
                {
                    (completed ? (completedInterviews) : (scheduledInterviews)).map((interview) => {
                        return (
                            < InterviewCard interview={interview} setInterviews={setInterviews} currentUser={currentUser} interviews={interviews} />
                        )
                    })
                }
            </div>
        </div >
    )
}

