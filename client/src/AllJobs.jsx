import { useEffect, useState } from 'react'
import PostingCard from './PostingCard'

export default function AllJobs({ isAuthenticated, currentUser }) {
    const [postings, setPostings] = useState([])
    const [selectedOption, setSelectedOption] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const request = async () => {
            let req = await fetch('http://127.0.0.1:3000/postings')
            let res = await req.json()
            const filteredPostings = res.filter(posting => {
                return !posting.deleted.includes(currentUser.id);
            });
            setPostings(filteredPostings)
        }
        request()
    }, [])

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value)
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const filteredPostings = selectedOption === 'all' ? postings.filter((posting) => posting.company.toLowerCase().includes(searchTerm.toLowerCase())) : postings.filter((posting) => posting[selectedOption] && posting.name.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div>
            <h1>New Jobs</h1>
            <div>
                <select value={selectedOption} onChange={handleOptionChange}>
                    <option value="all">All</option>
                    <option value="js">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="react">React</option>
                    <option value="ruby">Ruby</option>
                </select>
                <input type="text" placeholder="Search by company name" value={searchTerm} onChange={handleSearch} />
                {
                    filteredPostings.map((posting) => {
                        return (
                            <PostingCard posting={posting} isAuthenticated={isAuthenticated} currentUser={currentUser} setPostings={setPostings} />
                        )
                    })
                }
            </div>
        </div>
    )
}
