import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout"
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../requestMethods"
import { Link, useNavigate } from "react-router-dom"
import { clearCart } from "../redux/cartRedux";
import { removeItemCart } from "../redux/apiCalls";

const KEY = process.env.REACT_APP_STRIPE

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  a{
    text-decoration: none;
  }
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {

  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user.currentUser)
  // const order = useSelector((state) => state.order)

  const [stripeToken, setStripeToken] = useState(null)
  
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const onToken = (token) =>{
    setStripeToken(token)
  }

  // useEffect(() => {
  //   const getOrder = async () => {
  //     try {
  //       const res = await publicRequest.get("/products/find/" + id)
  //       setProduct(res.data)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getOrder()
  // }, [id])

  useEffect(() => {
    const makeRequest = async() => {
      try {
        if(user){
          const res = await userRequest.post("/checkout/payment", {
            tokenId: stripeToken.id,
            amount: cart.total * 100
          })
          navigate("/success", {stripeData: res.data, 
            products: cart,
          })
          dispatch(clearCart())
        }
        else{
          navigate("/failed")
        }

      } catch (error) {
        console.log(error);
      }
    }
    
      if (stripeToken && cart.total) {
        makeRequest();
      }
       
  }, [stripeToken, cart.total, navigate, dispatch, cart])

  // const removeItem = () =>{

  // }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton> <Link to={`/products/woman`}>CONTINUE SHOPPING</Link></TopButton>
          <TopTexts>
          
            <TopText>Shopping Bag({cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          {/* <TopButton type="filled">CHECKOUT NOW</TopButton> */}
        </Top>
        <Bottom>
          <Info>
            {cart.products.map(product => {
              
              return(

            <Product key={product._id} >
              <ProductDetail>
                <Image src={product.img} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {product.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {product._id}
                  </ProductId>
                  <ProductColor color={product.color} />
                  <ProductSize>
                    <b>Size:</b> {product.size[1]}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>{product.quantity}</ProductAmount>
                  <Remove />
                  {/* <Remove onClick={() => handleQuantity("dec", product._id)} style={{cursor: "pointer"}} />
                  <ProductAmount>{ quantity}</ProductAmount>
                  <Add onClick={() => handleQuantity("asc", product._id)} style={{cursor: "pointer"}} /> */}
                </ProductAmountContainer>
                <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                <div style={{border: "2px solid red"}} onClick={() => removeItemCart(dispatch)}>Delete</div>
              </PriceDetail>
            </Product>
              
              )})}

            <Hr />
            
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout 
              name="Ecom shop"
              image="https://www.pngarts.com/files/8/App-Store-Icon-Pink-PNG-High-Quality-Image.png"
              billingAddress
              shippingAddress
              description={`Your total is $ ${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
              onClick={() => dispatch(clearCart())}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
