import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { userRequest } from '../requestMethods'

const UpdateLiga = () => {

    const [inputs, setInputs] = useState({})
    const [liga, setLiga] = useState({})
    const [confirmDelete, setConfirmDelete] = useState(false)

    
    const navigate = useNavigate()
    const location = useLocation()
    const ligaId = location.pathname.split("/")[2]

    //handle all inputs with one function
    const handleChange = (e) => {
        setInputs((prev) => {
            return{...prev, [e.target.name]: e.target.value}
        })
    }

    //get liga by id to update it
    useEffect(() => {
        const getLiga = async (req, res) => {
          try {
            const res = await userRequest.get(`liga/find/${ligaId}`)
            setLiga(res.data)
          } catch (error){
            console.log(error)
          }
        }
        getLiga()
    
    }, [])
    
    //Update
    const updateLiga = async(liga) => {
        try {
            const res = await userRequest.put(`liga/${ligaId}`, liga)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = (e) => {

        const elements = {...inputs}

        updateLiga(elements)
    }

    const handleDelete = async () => {
        try {
            if(confirmDelete){
                userRequest.delete(`/liga/${ligaId}`)
                navigate("/getliga/")
            }
            else{
                setConfirmDelete(true)
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
        <div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft" style={{display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                        <label>EMRI:</label>
                        <input name="emri" type="text" placeholder={liga.emri} onChange={handleChange} />
                        <label>SHTETI:</label>
                        <input name="qyteti" type="text" placeholder={liga.shteti} onChange={handleChange}/>
                        {/* <label>_ID:</label>
                        <input name="_id" type="text" placeholder={liga._id}  onChange={handleChange}/> */}
                    </div>
                    <div className="productFormRight" style={{display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                        <button className="productButton" onClick={handleClick}>Update</button>
                    </div>
                    {confirmDelete ? 
                        <div className="block" style={{margin:"0 auto", width:"fit-content"}} >
                        <button className="confirm buttons" onClick={ handleDelete } >Confirm</button>
                        <button className="cancel buttons" onClick={() => setConfirmDelete(false)} >Cancel</button>
                        </div>
                    :
                        <div className="deleteBtn" onClick={handleDelete}>
                        {/* <DeleteOutline style={{color: "#fff"}} /> */}
                        <p className="deleteTxt" style={{color: "red", cursor: "pointer", margin:"0 auto", width:"fit-content"}}>Delete Liga</p>
                        </div> 
                    }
                </form>
                <Link to="/getliga">go back</Link>

            </div>
        </div>
  )
}

export default UpdateLiga