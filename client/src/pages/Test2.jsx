import React, { useEffect, useState } from 'react'
import { userRequest } from '../requestMethods'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search} from '@material-ui/icons';

const Test2 = () => {

    const [data, setData] = useState([])
    
    const navigate = useNavigate()

    useEffect(() => {
        const getEkipen = async() => {
            try {
                const res = await userRequest.get("/ekipa/")
                setData(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getEkipen()
    }, [])

  

  return (
    <div >
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", fontSize:"40px"}}>TEAM DATA</div>

        {data.map((item) => {
            const onClick = () => {
                navigate(`/test2/${item._id}`);
            }
            return(
                <div style={{border:"2px solid #ddd"}}>
                    <p>ID: {item._id}</p>
                    <p>EMRI: {item.emri}</p>
                    <p>QYTETI: {item.qyteti}</p>
                    <p>LIGA-ID: {item.liga}</p>
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
                        <Link to="/test" style={{backgroundColor:"navy",
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

export default Test2