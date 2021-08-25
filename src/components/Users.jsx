import {useState, useEffect} from "react";
import {doGet} from "../Service";

export default function Users() {

    const [users, setUsers] = useState([])

    async function getUsers() {
        const res = await doGet('/users')
        setUsers(res)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className={'mt-5'}>
            <h1 className={'text-center my-5'}>Users from jsonplaceholder 👥 </h1>
            <table className={'table table-dark table-striped table-hover table-bordered text-center'}>
                <thead>
                <tr>
                    <th>Number</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Website</th>
                    <th>Company name</th>
                </tr>
                </thead>
                <tbody>
                {users.map(item => <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.address.street + ' ' + item.address.suite + ' ' + item.address.city}</td>
                    <td>{item.phone}</td>
                    <td>{item.website}</td>
                    <td>{item.company.name}</td>
                </tr>)}
                </tbody>
            </table>
        </div>
    )
}