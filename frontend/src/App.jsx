import axios from 'axios'
import { useEffect, useState } from 'react'
import './styles/App.css'
import AddUser from './components/AddUser'
import DeleteUser from './components/DeleteUser'
import FormUser from './components/FormUser'
import UserCard from './components/UserCard'
import EmptyInfo from './components/EmptyInfo'
import Loading from './components/Loading'

function App() {

  const [users, setUsers] = useState()
  const [updateInfo, setUpdateInfo] = useState()

  const [showForm, setShowForm] = useState(false)
  const [showEmptyInfo, setShowEmptyInfo] = useState(false)
  const [alertSuccesfully, setAlertSuccesfully] = useState(false)
  const [showDeleteUser, setShowDeleteUser] = useState(false)
  const [intoLoading, setIntoLoading] = useState(true)
  const [deletedUser, setDeletedUser] = useState({});
  const [infoNewUser, setInfoNewUser] = useState({})
  const [infoEditUser, setInfoEditUser] = useState({})

  const getAllUsers = () => {
    const url = "http://localhost:3000/api/v1/users"
    axios.get(url)
      .then(res => setUsers(res.data.users))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllUsers();
    setTimeout(() => {
      setIntoLoading(false);
    }, 3000);
  }, []);


  console.log(users);

  const createNewUser = (data) => {
    const url = 'http://localhost:3000/api/v1/users'
    axios.post(url, data)
      .then(res => {
        console.log(res.data)
        setInfoNewUser(res.data.users)
        getAllUsers()
        setAlertSuccesfully(true)
      })
      .catch(err => console.log(err))
  }

  const deleteUserById = (id) => {
    const url = `http://localhost:3000/api/v1/users/${id}`
    axios.delete(url)
      .then(res => {
        console.log(`User ${id} is deleted sucessfully`)
        getAllUsers()
        setShowDeleteUser(true)
      })
      .catch(err => console.log(err))
  }

  const updateUserById = (id, data) => {
    const url = `http://localhost:3000/api/v1/users/${id}`
    const userData = { email: data.email, name: data.name }
    axios.patch(url, data)
      .then(res => {
        getAllUsers()
        setUpdateInfo()
        setInfoEditUser(res.data)
        setAlertSuccesfully(true)
      })
      .catch(err => console.log(err))
  }

  const handleShow = () => {
    setShowForm(true);
  };

  return (

    <div className="App">
      {intoLoading ? <Loading /> :
        <div>
          <div className='card_tittle'>
            <h1>Biker's App </h1>
            <button className='add__user' onClick={handleShow}> <i className='bx bx-user-plus bx-flip-horizontal add__icon' />Add New User</button>
          </div>
          {showForm &&
            <FormUser
              createNewUser={createNewUser}
              updateInfo={updateInfo}
              updateUserById={updateUserById}
              setShowForm={setShowForm}
              setUpdateInfo={setUpdateInfo}
              setShowEmptyInfo={setShowEmptyInfo}
            />
          }
          {showDeleteUser && <DeleteUser
            showDeleteUser={showDeleteUser}
            setShowDeleteUser={setShowDeleteUser}
            deletedUser={deletedUser}
          />}
          {alertSuccesfully &&
            <AddUser
              setAlertSuccesfully={setAlertSuccesfully}
              infoNewUser={infoNewUser}
              setInfoNewUser={setInfoNewUser}
              infoEditUser={infoEditUser}
              setInfoEditUser={setInfoEditUser}
            />
          }
          {showEmptyInfo &&
            <EmptyInfo
              setShowEmptyInfo={setShowEmptyInfo}
              setShowForm={setShowForm}
            />}
          <div className='container__users'>
            {users
              ?.sort((a, b) => b.id - a.id)
              .map(user => (
                <UserCard
                  key={user.id}
                  user={user}
                  deleteUserById={deleteUserById}
                  setUpdateInfo={setUpdateInfo}
                  setShowForm={setShowForm}
                  setShowDeleteUser={setShowDeleteUser}
                  setDeletedUser={setDeletedUser}
                />
              ))
            }
          </div>
          <div className='footer__info'>
            <p>
              <a className='linkedin' href='https://www.linkedin.com/in/maxcereceda/' target={'_blank'}><i className='bx bxl-linkedin-square' /></a>
              <a className='linkedin' href='https://www.facebook.com/maxcereceda/' target={'_blank'}><i className='bx bxl-facebook-square' /></a>

            </p>
            <span>Copyright © 2023 All rights reserved.</span>
          </div>
        </div>}
    </div>
  )
}

export default App
