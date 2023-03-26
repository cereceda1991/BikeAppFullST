import React, { useEffect } from 'react'
import '../styles/AddUser.css'

const AddUser = ({ setAlertSuccesfully, infoNewUser, setInfoNewUser, infoEditUser, setInfoEditUser }) => {

    const handleClose = () => {
        setInfoNewUser()
        setInfoEditUser()
        setAlertSuccesfully(false)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, []);



    return (
        <div className='container__Add'>
            <div className='card__add-msg'>
                <div onClick={handleClose} className='close__add-msg'>✖</div>
                <div className='check__add-msg'><i className='bx bxs-check-circle' /></div>

                <p>User information has been updated successfully</p>


                <button className='buttom__agree' onClick={handleClose}>Agree</button>
            </div>
        </div>
    )
}

export default AddUser
