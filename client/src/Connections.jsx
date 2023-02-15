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
                    <div style={{ position: 'fixed', zIndex: 1, height: '100%', width: '100%', top: 0, right: 0, left: 0, bottom: 0 }}>
                        <div style={{ position: 'absolute', backgroundColor: 'rgb(8 145 178)', width: '25vw', minHeight: '10vh', marginLeft: '20vw', borderRadius: '10px', marginTop: '20%', marginLeft: '40vw' }}>
                            <form onSubmit={(e) => { handleAdd(e) }} className='mt-5 ml-5'>
                                <input type='text' placeholder='Linkedin Profile Link' value={url} onChange={handleUrl} className='ml-14 mb-4 mt-4' /><br />
                                <input type='text' value={contact} onChange={handleContact} placeholder='Contact Info' className='ml-14 mb-4 mt-4' /><br />
                                <input type='checkbox' checked={isRecruiter} onChange={handleChecked} className='ml-24 mb-4' />
                                <label className='ml-2 text-white'>recruiter</label><br />
                                <input type='submit' style={{ backgroundColor: 'orange', width: '5vw', textAlign: 'center', borderRadius: '10px', color: 'white', marginLeft: '8vw', marginTop: '2vh' }} />
                                <div style={{ display: 'flex' }}>
                                    <p onClick={() => { setAutomate(false) }} className='ml-16 mb-4 mt-5 text-white'>Add Manually</p>
                                    <p onClick={() => { setAddForm(false) }} className='ml-8 mb-4 mt-5 text-white'>Close</p>
                                </div>
                            </form>
                        </div>
                    </div>
                    :
                    <div style={{ position: 'fixed', zIndex: 1, height: '100%', width: '100%', top: 0, right: 0, left: 0, bottom: 0 }}>
                        <div style={{ position: 'absolute', backgroundColor: 'rgb(8 145 178)', width: '25vw', minHeight: '10vh', marginLeft: '20vw', borderRadius: '10px', marginTop: '15%', marginLeft: '40vw' }}>
                            <form onSubmit={(e) => { handleManual(e) }} className='mt-8 ml-16'>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5vh', width: '16vw' }}>
                                    <input type='text' value={connectionName} onChange={handleName} placeholder='Name' /><br />

                                    <input type='text' value={connectionCompany} onChange={handleCompany} placeholder='Company' /><br />

                                    <input type='text' value={connectionPosition} onChange={handlePosition} placeholder='Position' /><br />

                                    <input type='text' value={contact} onChange={handleContact} placeholder='Contact Info' /><br />
                                </div >
                                <input type='checkbox' checked={isRecruiter} onChange={handleChecked} className='ml-16' />
                                <label className='ml-2 text-white'>recruiter</label><br />
                                <input type='submit' style={{ backgroundColor: 'orange', width: '5vw', textAlign: 'center', borderRadius: '10px', color: 'white', marginTop: '3vh', marginLeft: '5vw' }} />
                                <div style={{ display: 'flex' }}>
                                    <p onClick={() => { setAutomate(true) }} className='mb-4 mt-5 text-white'>Add with Linkedin URL</p>
                                    <p onClick={() => { setAddForm(false) }} className='ml-8 mb-4 mt-5 text-white' >Close</p>
                                </div>
                            </form>
                        </div>
                    </div>
                )

            }


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