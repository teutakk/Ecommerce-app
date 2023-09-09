import React, { useEffect } from 'react'
import { Link, useLocation} from 'react-router-dom'
import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/apiCalls";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userRequest } from '../requestMethods';
// import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  margin-bottom: 12px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Liga1 = () => {

    const [inputs, setInputs] = useState({})
    const notify = () => toast.success("Registering League Successful!");
    const notifyErr = () => toast.error("Registering League Failed!");

    const handleChange = (e) => {

        setInputs((prev) => {
    
          return{...prev, [e.target.name]: e.target.value}
    
        })    
      }
    const createLiga = async (liga) => {
        try {
    
          const res = await userRequest.post("/liga/postLiga", liga)
            notify()
        } catch (error) {
            notifyErr()
          console.log(error);
        }
      }
      const handleClick = (e) => {
        try {
            e.preventDefault()
            const data = {...inputs}
    
            createLiga(data) 
            // notify()
            console.log(data)
        } catch (error) {
            // notifyErr()
            console.log("Error is: " + error);
        }
      }
   
  return (
    <Container>
    <Wrapper>
      <Title>CREATE LIGA</Title>
      <Form>
        
        <Input placeholder="liga" 
          name="emri"
          type='text'
          onChange={handleChange}
          required
        />
        <span></span>
        <Input placeholder="shteti" 
          type="text"
          name="shteti"
          onChange={handleChange}
          required
        />
     
        <Button onClick={handleClick}>
          Create Liga
        </Button>    
        <ToastContainer />       
      </Form>
      <div style={{textDecoration:"underline"}}><Link to="/getliga">Go To Liga</Link></div>
    </Wrapper>
  </Container>
  )
}

export default Liga1