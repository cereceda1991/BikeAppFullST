import '../styles/UserCard.css'
import React from 'react'

const UserCard = ({ user, deleteUserById, setUpdateInfo, setShowForm, setShowDeleteUser, setDeletedUser }) => {

    const handleDelete = () => {
        deleteUserById(user.id);
        setDeletedUser(user);
        setShowDeleteUser(true);
    }

    const handleUpdate = () => {
        setUpdateInfo(user)
    }

    const handleShow = () => {
        setShowForm(true);
    };


    return (
        <article className='card__user'>
            <h2 className='user__info'>{user.name} </h2>
            <ul>
                <li><p>Email: </p><span><i className='bx bx-envelope' /> {user.email} </span> </li>
                <li><p> Role:</p><span><i className='bx bx-male-female' /> {user.role} </span></li>
            </ul>
            <div className='container__butttons'>
                <button className='buttton__trash'
                    onClick={() => {
                        handleDelete()
                    }}>
                    <i className='bx bx-trash' />
                </button>
                <button className='button__pencil'

                    onClick={() => {
                        handleUpdate();
                        handleShow();
                    }}>

                    <i className='bx bx-pencil ' /></button>
            </div>
        </article>
    )
}

export default UserCard
