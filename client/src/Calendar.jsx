import { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    MonthView,
    Appointments,
    WeekView,
    Toolbar,
    ViewSwitcher
} from '@devexpress/dx-react-scheduler-material-ui';




export default function Calendar({ currentUser }) {

    const [events, setEvents] = useState([])

    useEffect(() => {
        const request = async () => {
            let req = await fetch(`http://127.0.0.1:3000/users/${currentUser.id}/interviews`)
            let res = await req.json()
            setEvents(res)
        }
        request()
    }, [])

    const calendarEvents = events.map(data => {

        const time = data.time.slice(11, 16)
        let hour = parseInt(time.split(':')[0], 10) + 1;
        let minute = time.split(':')[1];
        let endTime = `${hour}:${minute}`;

        return {

            startDate: `${data.date}T${time}`,
            endDate: `${data.date}T${endTime}`,
            title: `${data.job.job_title} Interview at ${data.job.company}`
        }
    })



    return (
        <Paper>
            <Scheduler
                data={calendarEvents}
            >
                <ViewState />
                <MonthView
                    startDayHour={9}
                    endDayHour={14}
                />
                <WeekView
                    cellDuration={60}
                    startDayHour={8}
                    endDayHour={18}
                />
                {/* <WeekView.TimeTableCell
                    style={{ height: 40 }} /> */}
                <Toolbar />
                <ViewSwitcher />
                <Appointments />
            </Scheduler>
        </Paper>

    )
}