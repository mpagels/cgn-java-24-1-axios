import axios from "axios";
import {useEffect, useState} from "react";
import "./App.css"

type Person = {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    url: string,
    avatar: string
}

function App() {

    const [data, setData] = useState<Person[]>([]);
    const [page, setPage] = useState<number>(1)
    const [name, setName] = useState<string>("")
    const [job, setJob] = useState<string>("")

    function updatePage(number: number) {
        setPage(number)
    }

    useEffect(() => {
        fetchData(page)
    }, [page])


    function fetchData(page: number) {
        axios.get("https://reqres.in/api/users?page=" + page).then((response) => {
            setData(response.data.data)
        }).catch(error => {
            console.log(error.message)
        })
    }

    console.log(data)

    function postData() {
        axios.post("https://reqres.in/api/users", { name: name, job: job}).then(response => console.log(response))
    }

  return (
    <>
        {data.length === 0 ? <h1>NO DATA</h1>: <ul>
            {data.map((person: Person) => {
                return <li key={person.id}>{person.first_name} {person.last_name}</li>
            })}
        </ul>}

        <ul className={"pagination"}><li className={"item"} onClick={() => updatePage(1)}> 1</li><li className={"item"} onClick={() => updatePage(2)}>2</li></ul>
        <label>Name</label>
        <input type={"text"} onChange={(event) => setName(event.target.value)} value={name}/>
        <label>Job</label>
        <input type={"text"} onChange={(event) => setJob(event.target.value)} value={job}/>
        <button onClick={postData}>Abschicken</button>

    </>
  )
}

export default App
