
import { useState } from 'react'
import ApplyForm from './ApplyForm'


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
            if (posting.deleted === null) { return posting } else {
                return !posting.deleted.includes(currentUser.id);
            }
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
            if (posting.deleted === null) { return posting } else {
                return !posting.deleted.includes(currentUser.id);
            }
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

    const location_length = posting.location.length
    const handleClick = () => {
        window.open(posting.link, '_blank', 'noreferrer')
    }

    return (
        <div className='bg-white rounded-lg drop-shadow-lg border-amber-100 hover:border-cyan-200 border-4 dark:bg-stone-900 dark:border-2 dark:border-stone-800 dark:drop-shadow-white' style={{ display: 'flex', height: '20vh', width: '87%' }}>
            <div className='mt-2 ml-10' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '40%', gap: '1vh' }}>
                {title_length < 30 ?
                    <h3 className='text-2xl font-semibold dark:text-white mt-2 ' onClick={() => { handleClick() }}>{posting.job_title}</h3>
                    :
                    <h3 className='text-2xl font-semibold dark:text-white mt-2' onClick={() => { handleClick() }}>Software Engineer</h3>
                }
                <p className='font-semibold text-cyan-400 dark:text-cyan-200'>{posting.company}</p>
                {location_length < 27 ?
                    <p className='dark:text-amber-200 text-amber-500 mb-2'>{posting.location}</p>
                    :
                    <p className='dark:text-amber-200 mb-2'>New York, NY</p>
                }
            </div>
            <div style={{ width: '60%', marginLeft: '2.5vw' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1vw', marginTop: '6vh', marginRight: '1vw' }}>
                    <div style={{ display: 'flex', gap: '1vw' }}>
                        {posting.js && <p className='dark:text-white font-semibold'>JavaScript🔆</p>}
                        {posting.react && <p className='dark:text-white font-semibold'>ReactJS🔆</p>}
                        {posting.ruby && <p className='dark:text-white font-semibold'>Ruby🔆</p>}
                        {posting.python && <p className='dark:text-white font-semibold'>Python🔆</p>}
                    </div>
                    {isAuthenticated &&
                        <div style={{ display: 'flex', gap: '2vw', justifyContent: 'right', marginRight: '1vw', marginTop: '1vh' }}>
                            <p onClick={() => { setShowDate(!showDate) }} className="inline-block px-6 py-2 bg-amber-300 text-white font-medium text-s leading-tight uppercase rounded-full shadow-md hover:bg-amber-400 hover:shadow-lg focus:bg-amber-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-400 active:shadow-lg transition duration-150 ease-in-out">Applied</p>
                            <p onClick={() => { handleSave() }} className="inline-block px-8 py-2.5 bg-cyan-300 text-white font-medium text-s leading-tight uppercase rounded-full shadow-md hover:bg-cyan-400 hover:shadow-lg focus:bg-cyan-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-400 active:shadow-lg transition duration-150 ease-in-out" >Save</p>
                        </div>
                    }
                </div>
                {showDate &&
                    < ApplyForm handleApplied={handleApplied} today={today} setToday={setToday} setShowDate={setShowDate} handleDateChange={handleDateChange} today1={today1} futureDate={futureDate} />
                }
            </div>
        </div>
    )
}