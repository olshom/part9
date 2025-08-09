import {useEffect, useState} from 'react'
import {type Entry, type ValidationError} from "./types.ts";
import {getAllEntries, createEntry} from "./entryService.ts"
import axios from "axios";

function App() {

    const [entries, setEntries] = useState<Entry[]>([{
        "id": 4,
        "date": "2017-05-11",
        "weather": "sunny",
        "visibility": "good",
        "comment": "I almost failed the landing but I survived"
    }])
    const [date, setDate] = useState('')
    const [weather, setWeather] = useState('')
    const [visibility, setVisibility] = useState('')
    const [comment, setComment] = useState('')
    const [errorMessage, setErrorMessage] = useState<string[]>([])

    useEffect(() => {
        getAllEntries().then(data => {
            setEntries(data)
        })
    }, [])

    const entryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault()
        createEntry({
            date, weather, visibility, comment
        }).then(data => setEntries(entries.concat(data)))
            .catch((error: unknown) => {
                if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
                    console.log(error.response?.data)
                    console.error(error.response);
                    if (error.response !== undefined && error.response.data !== undefined) {
                        const errorMessages = error.response?.data.error.map(e => e.message)
                        setErrorMessage(errorMessages);
                        setTimeout(() => {
                        setErrorMessage([])
                        }, 5000)
                    }
                }
            });
        setDate('')
        setWeather('')
        setVisibility('')
        setComment('')
    }

    return (
        <>
            <h1>Add new entry</h1>
            {errorMessage.map(message => <li style={{ color: 'red' }}>{message}</li>)}
            <form onSubmit={entryCreation}>
                date<input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
            /><br/>
                weather
                <fieldset>
                    <div onChange={(event:React.ChangeEvent<HTMLInputElement>)=>setWeather(event.target.value)}>
                    <input type="radio" id="sunny" name="weather" value="sunny"/>
                    <label htmlFor="sunny">sunny</label>

                    <input type="radio" id="rainy" name="weather" value="rainy"/>
                    <label htmlFor="rainy">rainy</label>

                    <input type="radio" id="cloudy" name="weather" value="cloudy"/>
                    <label htmlFor="cloudy">cloudy</label>

                    <input type="radio" id="stormy" name="weather" value="stormy"/>
                    <label htmlFor="stormy">stormy</label>

                    <input type="radio" id="windy" name="weather" value="windy"/>
                    <label htmlFor="windy">windy</label>
                    </div>
                </fieldset>
                visibility
                <fieldset>
                    <div onChange={(event:React.ChangeEvent<HTMLInputElement>)=>setVisibility(event.target.value)}>
                    <input type="radio" id="great" name="visibility" value="great"/>
                    <label htmlFor="great">great</label>

                    <input type="radio" id="good" name="visibility" value="good"/>
                    <label htmlFor="good">good</label>

                    <input type="radio" id="ok" name="visibility" value="ok"/>
                    <label htmlFor="ok">ok</label>

                    <input type="radio" id="poor" name="visibility" value="poor"/>
                    <label htmlFor="poor">poor</label>
                    </div>
                </fieldset>
                comment<input
                value={comment}
                onChange={(event) => setComment(event.target.value)}
            />
                <button type="submit">add</button>
            </form>
            <h1>Diary entries</h1>
            <ul>
                {entries.map(e =>
                    <li key={e.id}>
                        <h2>{e.date}</h2>
                        <p>weather: {e.weather}</p>
                        <p>visibility: {e.visibility}</p>
                    </li>)}
            </ul>
        </>
    )
}

export default App
