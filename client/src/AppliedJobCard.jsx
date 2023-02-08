

export default function AppliedJobCard({ job }) {
    return (
        <div>
            <h2>{job.job_title}</h2>
            <h3>{job.company}</h3>
            <h3>Applied on {job.applied_date}</h3>
        </div>
    )
}