import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import { useEffect, useState } from "react";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /* border: 2px solid red; */
`;

const Products = ({cat, filters, sort, search}) => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [searchProducts, setSearchProducts] = useState([]);

  useEffect(() => {
    const getProducts = async ()=>{
      try { 
        
        const res = await axios.get(
          cat 
            ? `http://localhost:5000/api/products?category=${cat}` 
            : "http://localhost:5000/api/products");

            setProducts(res.data)

      } catch (error) {
        console.log(error)
      }
    }
    getProducts()
  },[cat])

  useEffect(() => {
    cat && setFilteredProducts(
      products.filter((item) => 
        Object.entries(filters).every(([key, value]) => 
          item[key].includes(value)
      )
    )
  )
  },[products, cat, filters, search])
  
  // useEffect(() => {
  //   cat && setSearchProducts(
  //     products.filter((item) => {
  //       Object.entries(search).every(([key, value]) => 
  //         item[key].includes(value)
  //       )
  //     })
  //   )
  // }, [searchProducts])

  useEffect(() =>{
    if(sort === "Newest"){
      setFilteredProducts(prev =>
        [...prev].sort(
            (a, b) => a.createdAt - b.createdAt
          )
      );
    }else if(sort === "asc"){
      setFilteredProducts(prev =>
        [...prev].sort(
            (a, b) => a.price - b.price
          )
      );
    }else {
      setFilteredProducts(prev =>
        [...prev].sort(
            (a, b) => b.price - a.price
          )
      );
    }
  }, [sort])

  return (
    <Container>
      {cat 
        ? filteredProducts.map((item) => ( <Product item={item} key={item.id} />)) 
        : products.slice(4, 9).map((item) => ( <Product item={item} key={item.id} /> ))}
    </Container>
  );
};

export default Products;
