import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import {useSelector} from "react-redux"
import { Link } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import { useDispatch } from "react-redux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  /* border: 2px solid red; */
  background-color: #c3efef;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

// const SearchContainer = styled.div`
//   border: 0.5px solid lightgray;
//   display: flex;
//   align-items: center;
//   margin-left: 25px;
//   padding: 5px;
// `;

// const Input = styled.input`
//   border: none;
//   ${mobile({ width: "50px" })}
// `;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* margin-right: 50px; */
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {

  const quantity = useSelector(state => state.cart.quantity)
  const logged = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()
  // console.log(quantity);
  // const user = true;

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          {/* <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer> */}
        </Left>
        <Center>
          <Logo><Link style={{ textDecoration: "none", color:"#111" }} to="/">E-Shop</Link></Logo>
        </Center>
        <Right>
          {/* <MenuItem>REGISTER</MenuItem> */}
           {!logged && <MenuItem ><Link style={{ textDecoration: "none", color:"#111" }} to="/login">LOG IN</Link></MenuItem>}
           {!logged && <MenuItem ><Link style={{ textDecoration: "none", color:"#111" }} to="/register">REGISTER</Link></MenuItem>}
           {logged && <MenuItem onClick={() => logout(dispatch)}>LOG OUT</MenuItem> }
          {/* <MenuItem>SIGN IN</MenuItem> */}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
