import { useState } from 'react'

export default function AppliedJobCard({ job }) {

    const [showRefer, setShowRefer] = useState(false)
    const [url, setUrl] = useState('')

    const handleRefer = () => {
        setShowRefer(!showRefer)
    }
    ``

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     console.log(url)

    // }

    return (
        <div>
            <h2>{job.job_title}</h2>
            <h3>{job.company}</h3>
            <h3>Applied on {job.applied_date}</h3>
            {job.connection !== null &&
                <div>
                    <p>Connection: {job.connection.name}</p>
                    <p>not yet referred</p>
                    <button onClick={() => { handleRefer() }}>Update</button>
                </div>
            }

        </div>
    )
}

{/* <form onSubmit={(e) => { handleSubmit(e) }}>
    <input type='text' value={url} onChange={handleChange} />
    <input type='submit' />
</form> */}