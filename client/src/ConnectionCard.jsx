
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
        <div>
            <h3>{connection.name}</h3>
            <p>{connection.company}</p>
            <p>{connection.position}</p>
            <p>Contact Info: {connection.contact}</p>
            <a href={connection.link}>Linkedin Profile</a>
            <button onClick={() => { handleDelete() }}>Delete Connection</button>
        </div>
    )
}