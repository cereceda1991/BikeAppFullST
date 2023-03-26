import { useEffect } from 'react';
import '../styles/DeletedUser.css'

function DeletedUser({ showDeleteUser, setShowDeleteUser, deletedUser }) {

    const handleCloser = () => {
        setShowDeleteUser(false)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            handleCloser();
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='card__delete-user'>
            {showDeleteUser && (
                <div onClick={handleCloser} className='card__info-Delete'>
                    <div className='close__del-msg'>X</div>
                    <h1 className='check__del-msg'><i className='bx bx-error-alt' /></h1>
                    <p>User <b className='user__removed'>{deletedUser.first_name} {deletedUser.last_name}</b> has been removed </p>
                    <button className='button__DeleteUser' onClick={handleCloser}>Agree</button>
                </div>
            )}
        </div>
    )
}

export default DeletedUser

