import axios from "axios";
import {useState} from "react";

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

    function fetchData() {
        axios.get("https://reqres.in/api/users").then((response) => {
            setData(response.data.data)
        })
    }

    console.log(data)

  return (
    <>
        <button onClick={fetchData}>Fetch Data</button>
        <ul>
            {data.map((person: Person) => {
                return <li key={person.id}>{person.first_name} {person.last_name}</li>
            })}
        </ul>
    </>
  )
}

export default App
