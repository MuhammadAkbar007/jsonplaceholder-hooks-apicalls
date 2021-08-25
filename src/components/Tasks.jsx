import {useEffect, useState} from "react";
import {doGet} from "../Service";
import Todo from "./Todo";
import SelectUser from "./SelectUser";

export default function Tasks() {

    const [tasks, setTasks] = useState([])
    const [data, setData] = useState([])
    const [completed, setCompleted] = useState(false)
    const [currentUser, setCurrentUser] = useState('')
    const [page, setPage] = useState(1)

    function filterTasks(userId, completed, page) {
        return data.filter((item, index) => (item.userId == userId || !userId) && (item.completed === completed) &&
            (index >= (page - 1) * 10 && index < page * 10))
    }

    async function getTasks() {
        const res = await doGet('/todos')
        setTasks(res.filter((item, index) => index >= 0 && index < 10))
        setData(res)
    }

    useEffect(() => {
        getTasks()
    }, [])

    function onChangeUserSelect(userId) {
        const res = filterTasks(userId, completed, page)
        setCurrentUser(userId)
        setTasks(res)
    }

    function handleCheck(event) {
        setCompleted(event.target.checked)
        const res = filterTasks(currentUser, event.target.checked, page)
        setTasks(res)
    }

    function reset() {
        setTasks(data)
        setCurrentUser('')
        setPage(1)
    }

    function onPrev() {
        setPage(p => p - 1)
    }

    function onNext() {
        setPage(p => p + 1)
    }

    useEffect(() => {
        const res = filterTasks(currentUser, completed, page)
        setTasks(res)
    }, [page])

    return (
        <div className={'mt-5'}>
            <h1 className={'text-center my-5'}>Tasks from jsonplaceholder 🔖 </h1>
            <div className="row my-5">
                <div className="col-md-3">
                    <SelectUser onChange={onChangeUserSelect}/>
                </div>
                <div className="col-md-3 mx-5">
                    <label className={'mx-5'}>
                        <b>Completed</b>
                        <input type="checkbox" className={'form-check-input mx-5'} onChange={handleCheck}
                               checked={completed}/>
                    </label>
                </div>
                <div className="col-md-1">
                    <button className={'btn btn-dark'} onClick={reset}>reset</button>
                </div>
            </div>
            {tasks.map(item => <Todo key={item.id} item={item}/>)}
            <div className="row my-5">
                <div className="col-md-5">
                    <button className={'btn btn-warning float-end'} onClick={onPrev}>{'<< '}prev</button>
                </div>
                <div className="col-md-2 text-center">
                    <h1>{page}</h1>
                </div>
                <div className="col-md-5">
                    <button className={'btn btn-info'} onClick={onNext}>{'>> '}next</button>
                </div>
            </div>
        </div>
    )
}