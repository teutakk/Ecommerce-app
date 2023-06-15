import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./Success.scss"

const Success = () => {
  const location = useLocation()
  const { stripeData, products, users } = location.state;
  console.log(location);
  return (
    <div >
      <div>{JSON.stringify(products?.products?.img)}</div>
        <div className='top-text'>
            Payment was successful</div>
        <div >
          <div className='user-data'>
            <div >Payment Id: {JSON.stringify(stripeData?.id)}</div>
            <div>Username: {JSON.stringify(stripeData?.billing_details?.name)}</div>
            <div>Email: {JSON.stringify(users?.email)}</div>
          </div>
        
        {/* <div>Product: {JSON.stringify(products)}</div>  */}

        {products.products.map((prod) => {
          return(
            <div className="container" key={prod.title}>
              <ul className="responsive-table">
                <li className="table-header">
                  <div className="col col-1">Product Id</div>
                  <div className="col col-2">Product Name</div>
                  <div className="col col-3">Price</div>
                  <div className="col col-4">Quantity</div>
                </li>
                <li className="table-row">
                  <div className="col col-1" data-label="Product Id">{prod._id}</div>
                  <div className="col col-2" data-label="Product Name">{prod.title}</div>
                  <div className="col col-3" data-label="Price">${prod.price}</div>
                  <div className="col col-4" data-label="Quantity"> {prod.quantity}</div>                 
                </li>
              </ul>
            </div>
          )
        })}
        <div className='total-container'>
          <div className="name">Total</div>
          <div className="product" data-label="Total Price"> ${products.total}</div>
        </div>
  
       </div>
       <Link to="../cart" >Go back to Cart</Link>
    </div>
  )
}

export default Success