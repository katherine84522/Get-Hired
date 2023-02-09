import { useEffect, useState } from 'react'
import ConnectionCard from './ConnectionCard'

export default function Connections({ currentUser }) {

    const [connections, setConnections] = useState([])
    const [recruiters, setRecruiters] = useState(false)
    const [addForm, setAddForm] = useState(false)
    const [url, setUrl] = useState('')
    const [isRecruiter, setIsRecruiter] = useState(false)



    useEffect(() => {
        const request = async () => {
            let req = await fetch(`http://127.0.0.1:3000/users/${currentUser.id}/connections`)
            let res = await req.json()
            setConnections(res)
        }
        request()
    }, [])

    const handleUrl = (e) => {
        setUrl(e.target.value)
    }

    const handleAdd = async (e) => {
        e.preventDefault()
        let req = await fetch(`http://127.0.0.1:3000/connections`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: currentUser.id,
                recruiter: isRecruiter,
                link: url
            })
        });
        let res = await req.json()
        console.log(res)
    }

    const handleChecked = () => {
        setIsRecruiter(!isRecruiter)
        console.log(isRecruiter)
    }

    const filterRecruiters = connections.filter(connection => { return connection.recruiter === true })

    return (
        <div>
            <h2>My Network</h2>
            <div style={{ display: 'flex' }}>
                <button onClick={() => { setAddForm(!addForm) }}>Add a connection</button>
                <button onClick={() => { setRecruiters(false) }}>All</button>
                <button onClick={() => { setRecruiters(true) }}>Recruiter</button>
            </div>
            {addForm &&
                <form onSubmit={(e) => { handleAdd(e) }}>
                    <input type='text' placeholder='Linkedin Profile Link' value={url} onChange={handleUrl} />
                    <input type='checkbox' checked={isRecruiter} onChange={handleChecked} />
                    <label>recruiter</label>
                    <input type='submit' />
                </form>
            }

            {recruiters ?
                (
                    filterRecruiters.map((connection) => {
                        return (
                            <ConnectionCard connection={connection} setConnections={setConnections} connections={connections} setRecruiters={setRecruiters} />
                        )
                    })
                ) :
                (
                    connections.map((connection) => {
                        return (
                            <ConnectionCard connection={connection} setConnections={setConnections} connections={connections} setRecruiters={setRecruiters} />
                        )
                    })
                )
            }
        </div>
    )
}