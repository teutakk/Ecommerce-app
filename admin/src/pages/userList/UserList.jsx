import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux"
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";

 const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("/users/")
        setUsers(res.data)
      } catch (error){
        console.log(error)
      }
    }
    getUsers()

  }, [])

  
  const columns = [
    { field: "_id", headerName: "ID", width: 230 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        const isAdmin = users.find(user => user.isAdmin);
        {
          return (
            <div className="userListUser">
               {/* {users.map(user => (
                  <img
                    key={user._id}
                    className="userListImg"
                    src={user.isAdmin ? "https://www.pngarts.com/files/5/User-Avatar-PNG-Image.png" : "https://www.pngarts.com/files/5/User-Avatar-PNG-Background-Image.png"}
                    alt={user.isAdmin ? "Admin" : "User"}
                  />
                ))} */}
              { <img className="userListImg" src="https://www.pngarts.com/files/5/User-Avatar-PNG-Image.png" alt="" /> }
              {params.row.title}
            </div>
          );
      }

      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
            return (
              <>
                <Link to={"/users/" + params.row._id}>
                  <button className="userListEdit">Edit</button>
                </Link>
              </>
            );
      },
    },
  ]

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId = {(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}

export default UserList
