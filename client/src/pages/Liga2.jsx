import React, { useEffect, useState } from 'react'
import { userRequest } from '../requestMethods'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search} from '@material-ui/icons';

const Liga2 = () => {

    const [data, setData] = useState([])
    
    const navigate = useNavigate()

    useEffect(() => {
        const getLiga = async() => {
            try {
                const res = await userRequest.get("/liga/")
                setData(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getLiga()
    }, [])

  

  return (
    <div >
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", fontSize:"40px"}}>LIGA DATA</div>

        {data.map((item) => {
            const onClick = () => {
                navigate(`/getliga/${item._id}`);
            }
            return(
                <div style={{border:"2px solid #ddd"}}>
                    <p>ID: {item._id}</p>
                    <p>EMRI: {item.emri}</p>
                    <p>SHTETI: {item.shteti}</p>
                    {/* <p>LIGA-ID: {item.liga}</p> */}
                    <div style={{display:"flex"}}>
                        <div onClick={onClick} style={{backgroundColor:"navy",
                                                    color:"#fff", 
                                                    width:"fit-content", 
                                                    display:"flex", 
                                                    alignItems:"center",
                                                    padding:"7px 9px",
                                                    fontSize:"13px",
                                                    borderRadius:"20px",
                                                    cursor:"pointer"
                                                    }}>
                            Update
                        </div>
                        <Link to="/testliga" style={{backgroundColor:"navy",
                                                    color:"#fff", 
                                                    width:"fit-content", 
                                                    display:"inline", 
                                                    alignItems:"center",
                                                    padding:"7px 9px",
                                                    fontSize:"13px",
                                                    borderRadius:"20px",
                                                    cursor:"pointer",
                                                    textDecoration:"none"
                                                    }}>
                            Create
                        </Link>
                    </div>
                </div>
            )
        })}
       
    </div>
  )
}

export default Liga2