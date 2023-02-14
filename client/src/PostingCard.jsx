
import { useState } from 'react'

export default function PostingCard({ posting, isAuthenticated, currentUser, setPostings }) {

    const [showDate, setShowDate] = useState(false)
    const [today, setToday] = useState(true)
    const [futureDate, setFutureDate] = useState(new Date().toISOString().slice(0, 10))

    const currentday = new Date();


    const handleDateChange = (e) => {
        const date = new Date(e.target.value)
        setFutureDate(date.toISOString().slice(0, 10))
        // console.log(futureDate)
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
        // console.log(res)

        let req2 = await fetch("http://127.0.0.1:3000/postings")
        let res2 = await req2.json()
        const filteredPostings = res2.filter(posting => {
            return !posting.deleted.includes(currentUser.id);
        });
        setPostings(filteredPostings)
        // console.log(filteredPostings)


        let appliedDate = currentday.toISOString()
        if (!today) {
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
                applied_date: appliedDate,
                link: posting.link,
                company: posting.company,
                job_title: posting.job_title,
                referred: false,
                interview: false
            })
        });
        let res3 = await req3.json()
        // console.log(res3)


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
                location: posting.location,
                referred: false,
                interview: false
            })
        });
        let res3 = await req3.json()
        console.log(res3)


    }

    const today1 = new Date().toISOString().split('T')[0];

    const title_length = posting.job_title.length

    return (
        <div className='bg-white rounded-lg drop-shadow-lg hover:bg-yellow-100' style={{ display: 'flex', height: '20vh', width: '87%' }}>
            <div className='mt-2 ml-10' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '40%', gap: '2vh' }}>
                {title_length < 30 ?
                    <h3 className='text-xl font-bold text-amber-400'>{posting.job_title}</h3>
                    :
                    <h3 className='text-xl font-bold text-amber-400'>Software Engineer</h3>
                }
                <p className='font-semibold'>{posting.company}</p>
                <p>{posting.location}</p>
            </div>
            <div style={{ width: '60%', marginLeft: '2.5vw' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1vw', marginTop: '7vh', marginRight: '1vw' }}>
                    <div style={{ display: 'flex', gap: '1vw' }}>
                        {posting.js && <p>JavaScript✅</p>}
                        {posting.react && <p>ReactJS✅</p>}
                        {posting.ruby && <p>Ruby✅</p>}
                        {posting.python && <p>Python✅</p>}
                    </div>
                    {isAuthenticated &&
                        <div style={{ display: 'flex', gap: '2vw', justifyContent: 'right', marginRight: '1vw', marginTop: '1.5vw' }}>
                            <p onClick={() => { setShowDate(!showDate) }} >Applied</p>
                            <p onClick={() => { handleSave() }} >Save</p>
                        </div>
                    }
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
        </div>
    )
}