import React from 'react'
import loading from './../assets/loading.gif'
import '../styles/Loading.css'

const Loading = () => {
    return (
        <div className='container__loading'>
            <h1>Biker's App</h1>
            <img className='icon__user' src={loading} />
        </div>
    )
}

export default Loading