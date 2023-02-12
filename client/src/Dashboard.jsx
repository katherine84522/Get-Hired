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
    const [lastFourWeeks, setLastFourWeeks] = useState([])
    const [applications, setApplications] = useState([])
    const [connections, setConnections] = useState([])
    const [isLastWeek, setIsLastWeek] = useState(true)
    const [weeklyInterviews, setWeeklyInterviews] = useState([])


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

        const generateWeeks = () => {
            const currentDate = new Date();
            const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
            const weeksArray = [];

            for (let i = 0; i < 4; i++) {
                const weekStart = new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate() - 7 * i);
                const weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6);

                weeksArray.push(`${weekStart.getMonth() + 1}/${weekStart.getDate()} - ${weekEnd.getMonth() + 1}/${weekEnd.getDate()}`);
            }

            return weeksArray.reverse();
        };

        const weeks = generateWeeks();
        console.log(weeks);
        setLastFourWeeks(weeks)


        const request = async () => {
            let req = await fetch(`http://127.0.0.1:3000/users/${currentUser.id}/jobs`)
            let res = await req.json()

            setApplications(res)
        }
        request()

        const request2 = async () => {
            let req = await fetch(`http://127.0.0.1:3000/users/${currentUser.id}/connections`)
            let res = await req.json()

            setConnections(res)
        }
        request2()

        const request3 = async () => {
            let req = await fetch(`http://127.0.0.1:3000/users/${currentUser.id}/interviews`)
            let res = await req.json()

            setWeeklyInterviews(res)
        }
        request3()


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


    const getJobsAppliedPerWeek = data => {
        const currentDate = new Date();
        const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
        const weeksArray = [];

        for (let i = 0; i < 4; i++) {
            const weekStart = new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate() - 7 * i);
            const weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6);

            const weekStartTimestamp = weekStart.getTime();
            const weekEndTimestamp = weekEnd.getTime();

            let count = 0;
            data.forEach(item => {
                const appliedTimestamp = new Date(item.applied_date).getTime();
                if (appliedTimestamp >= weekStartTimestamp && appliedTimestamp <= weekEndTimestamp) {
                    count++;
                }
            });

            weeksArray.push(count);
        }

        return weeksArray.reverse();
    };

    const jobsAppliedPerWeek = getJobsAppliedPerWeek(applications);
    console.log(jobsAppliedPerWeek);

    console.log(totalApplicationsPerDay)

    const sumTotalJobs = (arr) => {
        let sum = 0
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i]
        }
        return sum
    }

    const sumOfWeeklyApplications = sumTotalJobs(totalApplicationsPerDay)

    const sumOfMonthlyApplications = sumTotalJobs(jobsAppliedPerWeek)

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

    const last4WeeksData = {
        labels: lastFourWeeks,
        datasets: [
            {
                label: 'Total Jobs Applied',
                data: jobsAppliedPerWeek,
                backgroundColor: 'teal'
            }
        ]
    }

    function getLastWeekConnections(connections) {
        let recentConnections = [];
        let sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        for (let i = 0; i < connections.length; i++) {
            let connection = connections[i];
            let connectionDate = new Date(connection.created_at);
            if (connectionDate >= sevenDaysAgo) {
                recentConnections.push(connection);
            }
        }

        return recentConnections;
    }

    const lastWeekConnections = getLastWeekConnections(connections)

    console.log(lastWeekConnections)

    function getLastMonthConnections(connections) {
        let recentConnections = [];
        let oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        for (let i = 0; i < connections.length; i++) {
            let connection = connections[i];
            let connectionDate = new Date(connection.created_at);
            if (connectionDate >= oneMonthAgo) {
                recentConnections.push(connection);
            }
        }

        return recentConnections;
    }

    const lastMonthConnections = getLastMonthConnections(connections)
    console.log(lastMonthConnections)


    function countInterviews(interviews) {
        const result = [];
        const today = new Date();
        let currentWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        for (let i = 0; i < 4; i++) {
            let weekStart = new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), currentWeekStart.getDate() - 7 * i);
            let weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6);
            let count = 0;
            for (let interview of interviews) {
                if (interview.completed === true) {
                    let interviewDate = new Date(interview.date);
                    if (interviewDate >= weekStart && interviewDate <= weekEnd) {
                        count++;
                    }
                }
            }
            result.push(count);
            // `${weekStart.getMonth() + 1}/${weekStart.getDate()}-${weekEnd.getMonth() + 1}/${weekEnd.getDate()}: ${count} interviews`
        }
        return result;
    }

    const interviews = countInterviews(weeklyInterviews).reverse()

    console.log(interviews)

    const last4WeeksInterviews = {
        labels: lastFourWeeks,
        datasets: [
            {
                label: 'Total Jobs Applied',
                data: interviews,
                backgroundColor: 'orange'
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
                <h3>{sumOfWeeklyApplications} Jobs Applied in Last 7 Days</h3>
                <Bar
                    data={data}
                    options={options}
                ></Bar>
            </div>
            <div
                style={
                    {
                        padding: '20px',
                        width: '50%',
                        height: '50%',
                    }
                }
            >
                <h3>{sumOfMonthlyApplications} Jobs Applied in Last 4 Weeks</h3>
                <Bar
                    data={last4WeeksData}
                    options={options}
                ></Bar>
            </div>
            <div>
                <h3>New Connections</h3>
                <button onClick={() => { setIsLastWeek(true) }}>Added in last 7 days</button>
                <button onClick={() => { setIsLastWeek(false) }}>Added in the Last Month</button>
                <div>
                    {
                        (isLastWeek ? lastWeekConnections : lastMonthConnections).map((connection) => {
                            return (
                                <div style={{ display: 'flex' }}>
                                    <p style={{ paddingRight: 10 }}>{connection.name} ·</p>
                                    <p>{connection.position} at {connection.company}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div style={
                {
                    padding: '20px',
                    width: '50%',
                    height: '50%',
                }
            }>
                <h3>Interviews in Last 4 Weeks</h3>
                <Bar
                    data={last4WeeksInterviews}
                    options={options}
                ></Bar>
            </div>
        </div>
    )
}