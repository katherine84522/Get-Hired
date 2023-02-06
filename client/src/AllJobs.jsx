import { useEffect, useState } from 'react'
import PostingCard from './PostingCard'


export default function AllJobs({ isAuthenticated }) {

    const [postings, setPostings] = useState([])


    useEffect(() => {
        const request = async () => {
            let req = await fetch('http://127.0.0.1:3000/postings')
            let res = await req.json()
            setPostings(res)
        }
        request()
    }, [])

    return (
        <div>
            <h1>New Jobs</h1>
            <div>
                {
                    postings.map((posting) => {
                        return (
                            < PostingCard posting={posting} isAuthenticated={isAuthenticated} />
                        )
                    })

                }
            </div>
        </div>
    )
}