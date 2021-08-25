import {useEffect, useState} from "react";
import {doGet, doPost} from "../Service";
import SelectUser from "./SelectUser";
import PostModal from "./PostModal";

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function Posts({history}) {

    function userFilter(userId) {
        return data.filter(item => (item.userId === parseInt(userId)) || userId === '')
    }

    const [data, setData] = useState([])
    const [posts, setPosts] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [user, setUser] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getPosts()
    }, [])

    async function getPosts() {
        const res = await doGet('/posts')
        setPosts([...res])
        setData([...res])
    }

    async function savePost(data) {
        const res = await doPost('/posts', data)
        setLoading(false)
        setModalVisible(false)
        toast.success('Data saved !')
        setPosts(prev => {
            prev.unshift(res)
            return [...prev]
        })
        setData(prev => {
            prev.unshift(res)
            return [...prev]
        })
    }

    function onSubmit(data) {
        setLoading(true)
        data.user = user
        savePost(data)
    }

    function openOnePost(id) {
        history.push('/posts/' + id)
    }

    function onChangeUser(userId) {
        const res = userFilter(userId)
        setPosts(res)
    }

    function toggleModal() {
        setModalVisible(p => !p)
    }

    function changeUser(id) {
        setUser(id)
    }

    return (
        <div className={'mt-5 posts-page'}>
            <ToastContainer/>
            <h1 className={'text-center my-5'}>Posts from jsonplaceholder 📝 </h1>
            <div className="container text-center">
                <div className="row">
                    <button className={'btn btn-dark'} onClick={toggleModal}>Add new Post</button>
                </div>
                <div className="row my-5">
                    <div className="col-md-3">
                        <SelectUser onChange={onChangeUser}/>
                    </div>
                </div>
                <div className="row">
                    {
                        posts.map(item => <div key={item.id} className={'col-md-3 my-4'}>
                            <div className="card post-card" onClick={() => openOnePost(item.id)}>
                                <div className="card-header bg-dark text-white">{item.title}</div>
                                <div className="card-body" style={{backgroundColor: 'whitesmoke'}}>{item.body}</div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
            <PostModal loading={loading} toggle={toggleModal} isOpen={modalVisible} save={onSubmit}
                       changeUser={changeUser}/>
        </div>
    )
}