import axios from "axios";
import {useEffect, useState} from "react";


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


    useEffect(() => {
        fetchData()
    }, [])


    function fetchData() {
        axios.get("https://reqres.in/api/users").then((response) => {
            setData(response.data.data)
        }).catch(error => {
            console.log(error.message)
        })
    }

    console.log(data)

  return (
    <>
        {data.length === 0 ? <h1>NO DATA</h1>: <ul>
            {data.map((person: Person) => {
                return <li key={person.id}>{person.first_name} {person.last_name}</li>
            })}
        </ul>}

    </>
  )
}

export default App
