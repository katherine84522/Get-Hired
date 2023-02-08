import { useDispatch } from "react-redux"
import { changeValue } from './features/posting'
import { useState } from 'react'

export default function PostingCard({ posting, isAuthenticated, currentUser, setPostings }) {

    const [showDate, setShowDate] = useState(false)
    const [today, setToday] = useState(true)
    const [futureDate, setFutureDate] = useState(new Date().toISOString().slice(0, 10))

    const currentday = new Date();
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(changeValue({ job_title: posting.job_title, company: posting, link: posting.link, location: posting.location, js: posting.js, python: posting.python, ruby: posting.ruby, react: posting.react }))
    // }, [])

    const handleDateChange = (e) => {
        const date = new Date(e.target.value)
        setFutureDate(date.toISOString().slice(0, 10))
        console.log(futureDate)
    }


    const handleApplied = async (e) => {
        e.preventDefault();
        setShowDate(false)
        let req = await fetch(`http://127.0.0.1:3000/postings/${posting.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deleted: currentUser.id
            })
        });
        let res = await req.json()
        console.log(res)

        let req2 = await fetch("http://127.0.0.1:3000/postings")
        let res2 = await req2.json()
        const filteredPostings = res2.filter(posting => {
            return !posting.deleted.includes(currentUser.id);
        });
        setPostings(filteredPostings)
        console.log(filteredPostings)


        let appliedDate
        if (today) {
            appliedDate = currentday.toISOString();
        } else {
            appliedDate = futureDate
        }


        let req3 = await fetch(`http://127.0.0.1:3000/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                applied: true,
                saved: false,
                user_id: currentUser.id,
                connection_id: null,
                applied_date: appliedDate,
                link: posting.link,
                company: posting.company,
                job_title: posting.job_title,
            })
        });
        let res3 = await req3.json()
        console.log(res3)


    }


    const handleSave = async () => {
        let req = await fetch(`http://127.0.0.1:3000/postings/${posting.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deleted: currentUser.id
            })
        });
        let res = await req.json()
        console.log(res)


        let req2 = await fetch("http://127.0.0.1:3000/postings")
        let res2 = await req2.json()
        const filteredPostings = res2.filter(posting => {
            return !posting.deleted.includes(currentUser.id);
        });
        setPostings(filteredPostings)
        // console.log(filteredPostings)



        let req3 = await fetch(`http://127.0.0.1:3000/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                applied: false,
                saved: true,
                user_id: currentUser.id,
                link: posting.link,
                company: posting.company,
                job_title: posting.job_title,
                location: posting.location
            })
        });
        let res3 = await req3.json()
        console.log(res3)


    }

    const today1 = new Date().toISOString().split('T')[0];


    return (
        <div>
            <h3>{posting.job_title}</h3>
            <p>{posting.company}</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {posting.js && <p>JavaScript✅</p>}
                {posting.react && <p>ReactJS✅</p>}
                {posting.ruby && <p>Ruby✅</p>}
                {posting.python && <p>Python✅</p>}
            </div>
            {isAuthenticated &&
                <div>
                    <p onClick={() => { setShowDate(!showDate) }}>Applied</p>
                    <p onClick={() => { handleSave() }}>Save</p>
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