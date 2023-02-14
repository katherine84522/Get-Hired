
export default function ConnectionCard({ connection, setConnections, setRecruiters, connections }) {

    const handleDelete = async () => {
        let req = await fetch(`http://127.0.0.1:3000/connections/${connection.id}`, {
            method: 'DELETE'
        })
        let res = await req.json()
        console.log(res)

        setConnections(prevState => {
            return [...prevState].filter(person => person.id !== connection.id)
        })
    }

    return (
        <div style={{ display: 'flex', height: '27vh', width: '82%', marginLeft: '15%' }} className='bg-white rounded-lg drop-shadow-lg border-amber-100 hover:border-cyan-200 border-4 dark:bg-slate-800 dark:border-white dark:drop-shadow-white'>
            <div className='mt-8 ml-6' style={{ display: 'flex', flexDirection: 'column', gap: '2vh', width: '35%' }}>
                <h3 className='text-2xl font-semibold dark:text-amber-300'>{connection.name}</h3>
                <p className='font-semibold text-cyan-400 dark:text-white'>{connection.company}</p>
                <p className='dark:text-white text-amber-500'>{connection.position}</p>
                {connection.link &&
                    <>
                        <a href={connection.link} style={{ textDecoration: 'underline' }}>Linkedin Profile</a><br />
                    </>
                }
            </div>
            {connection.jobs && (
                <div className='mt-8 ml-16' style={{ display: 'flex', flexDirection: 'column', gap: '1vh', width: '53%' }}>
                    <p className="font-semibold">Contact Info: {connection.contact}</p>
                    {connection.jobs.some(job => job.referred) && (
                        <p className="font-semibold">Referral: </p>
                    )}
                    {connection.jobs
                        .filter(job => job.referred)
                        .map((job) => (
                            <p>{job.job_title} at {job.company}</p>
                        ))}
                    {connection.jobs.some(job => !job.referred) && (
                        <p className="font-semibold">Potential Referral: </p>
                    )}
                    {connection.jobs
                        .filter(job => !job.referred)
                        .map((job) => (
                            <p>{job.job_title} at {job.company}</p>
                        ))}
                </div>
            )}
            <div style={{ width: '12%' }}>
                <button style={{ marginTop: '21vh', marginLeft: '1vw', color: 'red' }} onClick={() => { handleDelete() }}>Delete</button>
            </div>
        </div>
    )
}