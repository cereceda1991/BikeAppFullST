import React, { useEffect } from 'react'
import '../styles/EmptyInfo.css'

const EmptyInfo = ({ setShowEmptyInfo, setShowForm }) => {

    const handleShowEmpty = () => {
        setShowEmptyInfo(false)
        setShowForm(true)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            handleShowEmpty();
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='container__empty'>
            <div className='card__empty'>
                <div onClick={handleShowEmpty} className='close__add-msg'>✖</div>
                <div className='info__alert'><i className='bx bx-info-circle'></i></div>
                <p>You must complete all the requested information</p>
                <button onClick={handleShowEmpty} className='buttom__agree' >Agree</button>
            </div>
        </div>
    )
}

export default EmptyInfo
