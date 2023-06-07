import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/apiCalls";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";


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

const Register = () => {

  const notify = () => toast.success("Registering User Successful!");
  const notifyErr = () => toast.error("Registering User Failed!");

  const {isFetching, error} = useSelector((state) => state.user)

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault()
    registerUser(dispatch, {email, username, password})
  }
  const onClick = (e) => {
    error ? notifyErr() : notify()
 
    handleClick(e);
  }
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          
          <Input placeholder="username" 
            onChange={(e) => setUsername(e.target.value) }
            required
          />
          <span></span>
          <Input placeholder="email" type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input placeholder="password" 
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* <Input placeholder="confirm password" /> */}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={onClick} disabled={isFetching}>
            Create
          </Button>           
          <ToastContainer  />
        </Form>
        <Link style={{color:"#111", textDecoration:"none", display: "flex"}} 
              to="/login">Already have an account?
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Register;
