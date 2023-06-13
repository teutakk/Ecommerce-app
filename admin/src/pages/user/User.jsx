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

  const userId = location.pathname.split("/")[2]
  const [user, setUser] = useState()


  const navigate = useNavigate()
       
    
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

  // const [desc, setDesc] = useState("")
  // const [title, setTitle] = useState("")
  // const [price, setPrice] = useState(0)
  // const [ inputs, setInputs] = useState({})


  // const handleChange = (e) => {
  //   setInputs((prev) => {
  //     return{...prev, [e.target.name]: e.target.value}
  //   })
  // }

  // const update = () => {
  //   updateProducts(productId, )
  // }
  const handleDelete = () => {
    try {
      const res = userRequest.delete(`/users/${userId}`)
      navigate("/users")
    } catch (error) {
      
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
            {/* <span className="userShowTitle">Account Details</span> */}
            {/* <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">annabeck99</span>
            </div> */}
            {/* <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div> */}
            <span className="userShowTitle">Contact Details</span>
            {/* <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div> */}
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.email}</span>
            </div>
            {/* <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div> */}
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
                  placeholder={user?.username}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user?.email}
                  className="userUpdateInput"
                />
              </div>
              {/* <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                />
              </div> */}
              {/* <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                />
              </div> */}
            </div>
            <div className="userUpdateRight">
              {/* <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div> */}
              <button className="userUpdateButton">Update</button>
              <DeleteOutline onClick={handleDelete} style={{color: "red"}} />

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
