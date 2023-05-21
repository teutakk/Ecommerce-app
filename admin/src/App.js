import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";

const App = () => {
const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user).currentUser?.isAdmin
// console.log(admin);
// const admin = 
  return (
    <Router>
      <Routes>
        <Route path="/login" element={ <Login />}></Route>
      </Routes>
      { admin && (
      <>
        <Topbar />
        <div className="container">
          <Sidebar />
         {
         admin === true ? 

          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/users" element={<UserList />}></Route>
            <Route path="/user/:userId" element={<User />}></Route>
            <Route path="/newUser" element={<NewUser />}> </Route>
            <Route path="/products" element={<ProductList />}></Route>
            <Route path="/product/:productId" element={<Product />}></Route>
            <Route path="/newproduct" element={ <NewProduct />}></Route>
          </Routes>
          : null
          }
        </div>
      </>
      )}
    </Router>
  );
}

export default App;
