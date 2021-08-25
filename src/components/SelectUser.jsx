import {useEffect, useState} from "react";
import {doGet} from "../Service";

export default function SelectUser({onChange, name}) {

    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState('')

    async function getUsers() {
        const users = await doGet('/users')
        setUsers(users)
    }

    useEffect(() => {
        getUsers()
    }, [])

    function onchangeSelect(event) {
        let id = event.target.value
        let id1 = id === '' ? '' : parseInt(id)
        setCurrentUser(id1)
        if (onChange)
        onChange(id1)
    }

    return <select className={'form-control'} value={currentUser} onChange={onchangeSelect} name={name}>
        <option value="">All users . . . 👨‍👨‍👦‍👦</option>
        {users.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}
    </select>
}