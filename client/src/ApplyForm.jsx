export default function ApplyForm({ handleApplied, setToday, setShowDate, handleDateChange, today, today1, futureDate }) {

    return (
        <div style={{ position: 'fixed', zIndex: 3, height: '100%', width: '100%', top: 0, right: 0, left: 0, bottom: 0, color: 'white' }}>
            <div style={{ position: 'absolute', backgroundColor: 'rgb(8 145 178)', width: '25vw', minHeight: '15vh', marginLeft: '20vw', zIndex: 2, borderRadius: '10px' }}>
                <form onSubmit={(e) => { handleApplied(e) }} style={{ marginLeft: '2vw', marginTop: '2vh' }}>
                    <label className='font-semibold'>When did you apply?</label>
                    <div style={{ display: 'flex', gap: '3vw', marginLeft: '3vw', marginTop: '2vh', marginBottom: '2vh' }}>
                        <div onClick={() => { setToday(true) }} style={{ backgroundColor: 'orange', width: '5vw', textAlign: 'center', borderRadius: '10px' }}>Today</div>
                        <div onClick={() => { setToday(false) }} style={{ backgroundColor: 'cyan', width: '7vw', textAlign: 'center', borderRadius: '10px', color: 'black' }}>Not Today</div>
                    </div>
                    {!today &&
                        <input type="date" max={today1} value={futureDate} onChange={(e) => { handleDateChange(e) }} style={{ marginLeft: '5vw' }} />
                    }
                    <div style={{ display: 'flex', gap: '3vw', marginLeft: '5vw', marginTop: '2vh', marginBottom: '2vh', textDecoration: 'underline' }}>
                        <input type='submit' />
                        <p onClick={() => { setShowDate(false) }}>Cancel</p>
                    </div>
                </form>

            </div>
        </div>
    )
}