import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";
import {useLocation, useNavigate} from "react-router-dom"
import { useState } from "react";
import { userRequest } from "../../requestMethods";
import { useEffect } from "react";
import { DeleteOutline } from "@material-ui/icons";


export default function User() {
  const location = useLocation()
  const navigate = useNavigate()

  const userId = location.pathname.split("/")[2]
  const [user, setUser] = useState()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [inputs, setInputs] = useState({})
    
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userRequest.get(`/users/find/${userId}`)
        setUser(res.data)
      } catch (error){
        console.log(error)
      }
    }
    getUser()

  }, [])

  const handleChange = (e) => {
    setInputs((prev) => {
      return{...prev, [e.target.name]: e.target.value}
    })
    console.log(inputs)
  }
  const updateUser = async (users) => {
    try {

      const res = await userRequest.put(`/users/${userId}`, users)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = (e) => {
    e.preventDefault()

    try {
      const userData = {...inputs}
      
      updateUser( userData)

    } catch (error) {
      console.log(error);
    }
    
  }
 
  const handleDelete = () => {
    try {
      if (confirmDelete) {

        const res = userRequest.delete(`/users/${userId}`)

        navigate("/users")
      } 
      else{
        setConfirmDelete(true);
      }

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user?.username}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder={user?.username}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder={user?.email}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              
            </div>
            <div className="userUpdateRight">
              <button className="userUpdateButton" onClick={ handleClick }>Update</button>
              {confirmDelete ? 
                <div className="block" >
                  <button className="confirm buttons" onClick={ handleDelete } >Confirm</button>
                  <button className="cancel buttons" onClick={() => setConfirmDelete(false)} >Cancel</button>
                </div>
              :
                <div className="deleteBtn" onClick={handleDelete}>
                  <DeleteOutline style={{color: "#fff"}} />
                  <span className="deleteTxt">Delete User</span>
                </div> 
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
