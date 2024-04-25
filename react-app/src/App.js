import React,{useState} from 'react'
import Home from "./components/Home";
import Login from "./components/Login"
import Navbar from './components/Navbar';
import AddProduct from './components/Addproduct';
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Signup from './components/Signup';
import Shop from './components/Shop';
import Chat from './components/Chat';
import ProductDetails from './components/ProductDetails';
function App(){
  const [searchTerm, setSearchTerm] = useState('');
  const [path,setPath]=useState("home");
  const navchange=(arg)=>{
    setPath(arg);
  }
  const setKeyword=(keyword)=>{
    setSearchTerm(keyword);
  }
  const [curproduct,SetCurProduct]=useState([]);
  const changeProduct=(product)=>{
    SetCurProduct(product);
  }
    return (
        <Router>
      <Navbar path={path} setKeyword={setKeyword}/>
      <div style={{paddingTop:"65px"}}>
      <img src="background.jpg" alt="" className='background'/>
      <Routes>
        {/* giving keys to components call is essential because only then react will re-render components */}
        <Route exact path="/" element={<Home navchange={navchange}/>}>
        </Route>     
        <Route exact path="/login" element={<Login/>}>
        </Route> 
        <Route exact path="/signup" element={<Signup path={path} navchange={navchange}/>}>
        </Route>    
        <Route exact path="/addproduct" element={<AddProduct  navchange={navchange}/>}>
        </Route>     
        <Route exact path="/shop" element={<Shop  path={path} navchange={navchange}  searchTerm={searchTerm} changeProduct={changeProduct}/>}>
        </Route>     
        <Route exact path="/chat" element={<Chat />}>
        </Route>
        <Route exact path="/productdetails" element={<ProductDetails curproduct={curproduct}/>}>
        </Route>
      </Routes>
      </div>
      </Router>
    );
}

export default App;
