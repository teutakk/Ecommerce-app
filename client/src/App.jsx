import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Test from "./pages/Test";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import Failed from "./pages/Failed";
import CategoriesPage from "./pages/CategoriesPage";
import ScrollToTop from "./ScrollToTop";
import Test2 from "./pages/Test2";
import UpdateTest from "./pages/UpdateTest";
import Liga1 from "./pages/Liga1";
import Liga2 from "./pages/Liga2";
import UpdateLiga from "./pages/UpdateLiga";

const App = () => {
  const user  = useSelector(state => state.user.currentUser);
  // // const user = false
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/products/:category" element={<ProductList />}></Route>
        <Route path="/product/:id" element={<Product />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/categories" element={<CategoriesPage />}></Route>
        <Route path="/success" element={<Success />}></Route>
        <Route path="/failed" element={<Failed />}></Route>
        <Route path="/login" element={ user ? <Navigate to="/"/> : <Login />}></Route>
        <Route path="/register" element={ user ? <Navigate to="/"/> : <Register />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/test2" element={<Test2 />}></Route>
        <Route path="/test2/:id" element={<UpdateTest />}></Route>
        <Route path="/testliga" element={<Liga1 />}></Route>
        <Route path="/getliga" element={<Liga2 />}></Route>
        <Route path="/getliga/:id" element={<UpdateLiga />}></Route>

        {/* <Route path="/test2" element={<Test2 />}></Route>
        <Route path="/test2/:id" element={<UpdateTest />}></Route> */}


      </Routes>
    </Router>
  );
};

export default App;