import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { userRequest } from '../requestMethods'

const UpdateTest = () => {

    const [inputs, setInputs] = useState({})
    const [team, setTeam] = useState({})
    const [confirmDelete, setConfirmDelete] = useState(false)

    
    const navigate = useNavigate()
    const location = useLocation()
    const ekipaId = location.pathname.split("/")[2]

    //handle all inputs with one function
    const handleChange = (e) => {
        setInputs((prev) => {
            return{...prev, [e.target.name]: e.target.value}
        })
    }

    //get team by id to update it
    useEffect(() => {
        const getTeam = async (req, res) => {
          try {
            const res = await userRequest.get(`ekipa/find/${ekipaId}`)
            setTeam(res.data)
          } catch (error){
            console.log(error)
          }
        }
        getTeam()
    
    }, [])
    
    //Update Ekipen
    const updateEkipa = async(ekipa) => {
        try {
            const res = await userRequest.put(`ekipa/${ekipaId}`, ekipa)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = (e) => {
        e.preventDefault()

        const elements = {...inputs}

        updateEkipa(elements)

    }
    //-----

    const handleDelete = async () => {
        try {
            if(confirmDelete){
                userRequest.delete(`/ekipa/${ekipaId}`)
                navigate("/test2/")
            }
            else{
                setConfirmDelete(true)
            }
        } catch (error) {
            
        }
    }
  return (
        <div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft" style={{display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                        <label>EMRI:</label>
                        <input name="emri" type="text" placeholder={team.emri} onChange={handleChange} />
                        <label>QYTETI:</label>
                        <input name="qyteti" type="text" placeholder={team.qyteti} onChange={handleChange}/>
                        <label>LIGA-ID:</label>
                        <input name="liga" type="text" placeholder={team.liga}  onChange={handleChange}/>
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
                        <p className="deleteTxt" style={{color: "red", cursor: "pointer", margin:"0 auto", width:"fit-content"}}>Delete Team</p>
                        </div> 
                    }
                </form>
                <Link to="/test2">go back</Link>
            </div>
        </div>
  )
}

export default UpdateTest