import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import SelectUser from "./SelectUser";
import {useForm} from 'react-hook-form'

export default function PostModal({toggle, isOpen, save, changeUser, loading}) {

    const {register, handleSubmit} = useForm();

    return <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader className={'bg-dark text-white'}>Add new Post</ModalHeader>

        <ModalBody className={'bg-dark text-white'}>
            <form onSubmit={handleSubmit(save)} id={'post-form'}>
                <input type="text" placeholder={'Title'} className={'form-control my-3'} name={'title'}
                       {...register('title')}/>
                <SelectUser name={'user'} onChange={changeUser}/>
                <textarea placeholder={'Body . . .'} className={'form-control my-3'} name={'body'}
                          {...register('body')}/>
            </form>
        </ModalBody>

        <ModalFooter className={'bg-dark text-white'}>
            <button className={'btn btn-success mx-5'} type={'submit'} form={'post-form'} disabled={loading}>Save
            </button>
            <button className={'btn btn-danger'} type={'button'} onClick={toggle}>Cancel</button>
        </ModalFooter>
    </Modal>
}