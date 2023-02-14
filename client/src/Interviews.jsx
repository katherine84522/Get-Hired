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
        <div>
            <div>
                <button onClick={() => { setCompleted(false) }}>Upcoming</button>
                <button onClick={() => { setCompleted(true) }}>Completed</button>
            </div>
            <div>
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

