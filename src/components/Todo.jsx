export default function Todo({item}) {

    return <div className={'container'}>
        <div className="row my-3 bg-dark text-white px-5 rounded-pill">
            <hr/>
            <div className="col-md-1"><input type="checkbox" defaultChecked={item.completed} id={'checkbox/' + item.id}
                                             className={'form-check-input'}/>
            </div>
            <div className="col-md-5"><h5><label htmlFor={'checkbox/' + item.id}>{item.title}</label></h5></div>
            <hr/>
        </div>
    </div>
}