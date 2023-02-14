import { useEffect, useState } from 'react'
import ConnectionCard from './ConnectionCard'

export default function Connections({ currentUser }) {

    const [connections, setConnections] = useState([])
    const [recruiters, setRecruiters] = useState(false)
    const [addForm, setAddForm] = useState(false)
    const [url, setUrl] = useState('')
    const [isRecruiter, setIsRecruiter] = useState(false)
    const [contact, setContact] = useState('')
    const [waiting, setWaiting] = useState(false)
    const [automate, setAutomate] = useState(true)
    const [connectionName, setConnectionName] = useState('')
    const [connectionCompany, setConnectionCompany] = useState('')
    const [connectionPosition, setConnectionPosition] = useState('')


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
        setAddForm(false)
        setWaiting(true)
        e.preventDefault()
        let req = await fetch(`http://127.0.0.1:3000/connections`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: currentUser.id,
                recruiter: isRecruiter,
                link: url,
                contact
            })
        });
        let res = await req.json()
        console.log(res)
        setWaiting(false)
        setConnections([res, ...connections])
        console.log(connections)

    }

    const handleChecked = () => {
        setIsRecruiter(!isRecruiter)
        console.log(isRecruiter)
    }

    const filterRecruiters = connections.filter(connection => { return connection.recruiter === true })

    const handleContact = (e) => {
        setContact(e.target.value)
        console.log(contact)
    }

    const handleName = (e) => {
        setConnectionName(e.target.value)
        console.log(connectionName)
    }
    const handleCompany = (e) => {
        setConnectionCompany(e.target.value)
        console.log(connectionCompany)
    }

    const handlePosition = (e) => {
        setConnectionPosition(e.target.value)
        console.log(connectionPosition)
    }

    const handleManual = async (e) => {
        setAddForm(false)
        e.preventDefault()
        let req = await fetch(`http://127.0.0.1:3000/connections_manual`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: currentUser.id,
                recruiter: isRecruiter,
                name: connectionName,
                company: connectionCompany,
                position: connectionPosition,
                contact
            })
        });
        let res = await req.json()
        console.log(res)
        setConnections([res, ...connections])
        console.log(connections)

    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div className='ml-12 mt-8'>
                    <h2 className=" font-semibold text-left text-4xl dark:text-white">My Network</h2>
                    <p className='mt-4 dark:text-white'>Good luck to you, {currentUser.username} !</p>
                </div>
                <div style={{ display: 'flex', marginLeft: '15vw', gap: '3vw', marginTop: '2vw', marginBottom: '2vw' }}>
                    <button onClick={() => { setRecruiters(false) }} className="inline-block px-10 py-2 bg-amber-300 text-white font-medium text-s leading-tight uppercase rounded-full shadow-md hover:bg-amber-400 hover:shadow-lg focus:bg-amber-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-400 active:shadow-lg transition duration-150 ease-in-out">All</button>
                    <button onClick={() => { setRecruiters(true) }} className="inline-block px-10 py-2.5 bg-cyan-300 text-white font-medium text-s leading-tight uppercase rounded-full shadow-md hover:bg-cyan-400 hover:shadow-lg focus:bg-cyan-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-400 active:shadow-lg transition duration-150 ease-in-out">Recruiter</button>
                    <button onClick={() => { setAddForm(!addForm) }} className="inline-block px-10 py-2.5 bg-white text-black font-medium text-s leading-tight uppercase rounded-full shadow-md hover:bg-neutral-300 hover:shadow-lg focus:bg-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-400 active:shadow-lg transition duration-150 ease-in-out">Add</button>
                </div>
            </div>
            {addForm &&
                (automate ?
                    <form onSubmit={(e) => { handleAdd(e) }}>
                        <input type='text' placeholder='Linkedin Profile Link' value={url} onChange={handleUrl} /><br />
                        <input type='checkbox' checked={isRecruiter} onChange={handleChecked} />
                        <label>recruiter</label><br />
                        <label>Contact Info:</label>
                        <input type='text' value={contact} onChange={handleContact} /><br />
                        <input type='submit' />
                        <p onClick={() => { setAutomate(false) }}>Add Manually</p>
                    </form>
                    :
                    <form onSubmit={(e) => { handleManual(e) }}>
                        <label>Name:</label>
                        <input type='text' value={connectionName} onChange={handleName} /><br />
                        <label>Company:</label>
                        <input type='text' value={connectionCompany} onChange={handleCompany} /><br />
                        <label>Position:</label>
                        <input type='text' value={connectionPosition} onChange={handlePosition} /><br />
                        <label>Contact Info:</label>
                        <input type='text' value={contact} onChange={handleContact} /><br />
                        <input type='checkbox' checked={isRecruiter} onChange={handleChecked} />
                        <label>recruiter</label><br />
                        <input type='submit' />
                        <p onClick={() => { setAutomate(true) }}>Add with Linkedin URL</p>
                    </form>
                )}


            {waiting &&
                <div>
                    <p>Getting the info...</p>
                </div>
            }
            <div className="mt-10" style={{ display: 'flex', flexDirection: 'column', gap: '3vw' }}>
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
        </div>
    )
}