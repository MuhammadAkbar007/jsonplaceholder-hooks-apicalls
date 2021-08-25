import {useEffect, useState} from "react";
import {doGet} from "../Service";

export default function OnePost({match}) {

    const [post, setPost] = useState('')
    const [user, setUser] = useState('')

    useEffect(() => {
        getOnePost(match.params.id)
    }, [])

    async function getOnePost(id) {
        const onePost = await doGet('/posts/' + id)
        setPost(onePost)
        const postUser = await doGet('/users/' + onePost.userId)
        setUser(postUser)
    }

    return <div className={'container'}>
        <div className="row mt-5">
            <div className="col-md-3">
                <div className="card">
                    <div className="card-header">{user.name}</div>
                    <div className="card-body">{user.phone}</div>
                </div>
            </div>
            <div className="col-md-9">
                <div className="card">
                    <div className="card-header">{post.id + '. ' + post.title}</div>
                    <div className="card-body">{post.body}</div>
                </div>
            </div>
        </div>
    </div>
}