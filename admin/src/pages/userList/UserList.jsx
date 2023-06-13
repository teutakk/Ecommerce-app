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

  // const ss = useSelector()
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
    // console.log(users[3]?.isAdmin)

  }, [])

  // const mapped = users.map((user) => {
  //   return user
  // })

  // const handleDelete = (id) => {
  //   // setData(data.filter((item) => item.id !== id));
  //   try {
  //     const res = userRequest.delete(`/users/${id}`)
  //   } catch (error) {
      
  //   }

  // };
  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        {
          return (
            <div className="userListUser">
              <img className="userListImg" src="https://www.pngarts.com/files/5/User-Avatar-PNG-Image.png" alt="" />
              {params.row.title}
            </div>
          );
      }

      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
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
                {/* <DeleteOutline
                  className="userListDelete"
                  // onClick={() => handleDelete(params.row._id)}
                /> */}
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
