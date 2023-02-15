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
            if (isAuthenticated) {
                const filteredPostings = res.filter(posting => {
                    return !posting.deleted.includes(currentUser.id);
                });
                setPostings(filteredPostings)
            } else {
                setPostings(res)
            }

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
            <div style={{ display: 'flex' }}>
                <div className='ml-12 mt-8'>
                    <h1 className=" font-semibold text-left text-4xl dark:text-white">New Jobs</h1>
                    {isAuthenticated &&
                        <p className='mt-4 dark:text-white'>Good luck to you, {currentUser.username} !</p>
                    }
                </div>
                <label className='ml-28 mt-12 dark:text-white font-semibold text-lg' >Search by company name: </label>
                <input className='mt-12 ml-4 drop-shadow-lg h-7' type="text" value={searchTerm} onChange={handleSearch} />
                <label className='mt-12 ml-8 dark:text-white font-semibold text-lg'>Search by skill:</label>
                <select className='ml-6 mt-12 drop-shadow-lg h-7' value={selectedOption} onChange={handleOptionChange}>
                    <option value="all">All</option>
                    <option value="js">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="react">React</option>
                    <option value="ruby">Ruby</option>
                </select>
            </div>
            <div className='ml-56 pt-16' style={{ display: 'flex', flexDirection: 'column', gap: '2vw', marginTop: '-2vh' }}>
                {
                    filteredPostings.map((posting) => {
                        return (
                            <PostingCard posting={posting} isAuthenticated={isAuthenticated} currentUser={currentUser} setPostings={setPostings} />
                        )
                    })
                }
            </div>
        </div >
    )
}
