import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js'

import { Bar } from 'react-chartjs-2'
import { useState, useEffect } from 'react'

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

export default function Dashboard({ currentUser }) {

    const [sevenDates, setSevenDates] = useState([])
    const [applications, setApplications] = useState([])

    useEffect(() => {

        const dates = []
        const now = new Date()

        for (let i = 6; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            dates.push(`${month}/${day}`);
        }
        setSevenDates(dates)

        const request = async () => {
            let req = await fetch(`http://127.0.0.1:3000/users/${currentUser.id}/jobs`)
            let res = await req.json()

            setApplications(res)
        }
        request()

    }, [])

    const today = new Date();
    const past7Days = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const filteredApplications = applications.filter(application => {
        return (
            application.applied === true &&
            new Date(application.applied_date) >= past7Days
        );
    });

    console.log('filteredApplications', filteredApplications)

    const groupedApplications = filteredApplications.reduce((acc, application) => {
        const date = application.applied_date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(application);
        return acc;
    }, {});

    console.log('groupedApplications', groupedApplications)

    const totalApplicationsPerDay = Object.values(groupedApplications).map(applications => {
        return applications.length;
    }).reverse();

    console.log('totalApplicationsPerDay', totalApplicationsPerDay)



    const data = {
        labels: sevenDates,
        datasets: [
            {
                label: 'Total Jobs Applied',
                data: totalApplicationsPerDay,
                backgroundColor: 'aqua'
            }
        ]
    }

    let options = {
        plugins: {
            legend: {
                display: false,
            }
        }
        , transitions: {
            show: {
                animations: {
                    x: {
                        from: 0
                    },
                    y: {
                        from: 0
                    }
                }
            },
            hide: {
                animations: {
                    x: {
                        to: 0
                    },
                    y: {
                        to: 0
                    }
                }
            }
        }
        , scales: {
            y: {
                grace: '5%',
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div
                style={
                    {
                        padding: '20px',
                        width: '50%',
                        height: '50%',
                    }
                }
            >
                <h3>Total Jobs Applied</h3>
                <Bar
                    data={data}
                    options={options}
                ></Bar>
            </div>
        </div>
    )
}