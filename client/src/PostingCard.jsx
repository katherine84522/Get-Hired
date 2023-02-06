import { useDispatch } from "react-redux"
import { changeValue } from './features/posting'
import { useEffect } from 'react'

export default function PostingCard({ posting, isAuthenticated }) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(changeValue({ job_title: posting.job_title, company: posting, link: posting.link, location: posting.location, js: posting.js, python: posting.python, ruby: posting.ruby, react: posting.react }))
    }, [])


    return (
        <div>
            <h3>{posting.job_title}</h3>
            {isAuthenticated &&
                <div>
                    <button>Applied</button>
                    <button>Save</button>
                </div>
            }
        </div>
    )
}