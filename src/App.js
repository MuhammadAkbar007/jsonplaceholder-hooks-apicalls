import {Link, Switch, Route} from "react-router-dom";
import Posts from "./components/Posts";
import Tasks from "./components/Tasks";
import Users from "./components/Users";
import OnePost from "./components/OnePost";
import './App.css'

function App() {
    return (
        <div className={'container mt-5'}>
            <h1>Choose one of these buttons 👇 </h1>
            <br/>
            <hr/>
            <br/>
            <Link to={'/posts'}>
                <button className={'btn btn-success mx-5'}>Posts</button>
            </Link>
            <Link to={'/tasks'}>
                <button className={'btn btn-danger mx-5'}>Tasks</button>
            </Link>
            <Link to={'users'}>
                <button className={'btn btn-info mx-5'}>Users</button>
            </Link>

            <Switch>
                <Route path={'/posts/:id'} component={OnePost}/>
                <Route path={'/posts'} component={Posts}/>
                <Route path={'/tasks'} component={Tasks}/>
                <Route path={'/users'} component={Users}/>
            </Switch>
        </div>
    );
}

export default App;
