import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { Search } from "@material-ui/icons";

import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import axios from "axios";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;


const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  width: fit-content;
`;

const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: "50px" })}
`;

const ProductList = () => {

  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState("newest")
  const [query, setQuery] = useState("")
  const [product, setProduct] = useState([])

  useEffect(() => {

    const getProducts = async () => {
      try {
        const res = await publicRequest.get(`/products/`)
        setProduct(res.data)
      } catch (error) {
        console.log(error);
      }
    }
      getProducts()
  }, [])


  const search = (product) => {
    return product.filter((item) => item.title.toLowerCase().includes(query))
  }

  useEffect(() => {
    if(query.length === 0 || query.length > 2) {

      const filteredProduct = search(product);
      
      setProduct(filteredProduct);
     
      console.log(filteredProduct)
    } 
    
  }, [query]);

  const handleFilters = (e) =>{
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]:value
    })
  }
  // console.log(filters);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Products</Title>
      {/* <SearchContainer>
            <Input 
              placeholder="Search" 
              name="search" 
              onChange={(e) => setQuery(e.target.value)} 
            />
            <Search style={{ color: "gray", fontSize: 16, position:"relative" }} >
            </Search>
      </SearchContainer> */}
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>
              Color
            </Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={e => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products search={search(product)} cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
