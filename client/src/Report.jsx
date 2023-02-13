
import { LinkedinShareButton, LinkedinIcon, EmailShareButton, EmailIcon } from 'react-share';


export default function Report() {

    const img = '../public/TopSkills.png'
    const shareUrl = 'https://imgur.com/3AYBrVg'

    const handleEmailClick = () => {
        window.open(`mailto:?subject=Most%20Needed%20Skills&body=Here%20are%20the%20top%205%20skills%20that%20are%20needed%20in%20the%20last%20job%20openings!%0A%0A1.%20Python%202.%20JAVA%203.%20SQL%204.%20AWS%205.%20JavaScript%0A%0AYou%20can%20click%20this%20link%20to%20see%20the%20full%20list%20of%20most%20needed%20skills:%20${shareUrl}`);
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <h2>Most Needed Skills</h2>
            <h3>Analyzed from 1500+ Linkedin Software Engineer Job Postings in the U.S.</h3>
            <div >
                <img src={img} style={{ width: '70vw' }} />
            </div>
            <LinkedinShareButton url={shareUrl}>
                <LinkedinIcon size={40} />
            </LinkedinShareButton>
            <EmailShareButton onClick={() => { handleEmailClick }}>
                < EmailIcon size={40} />
            </EmailShareButton>
        </div>
    )
}