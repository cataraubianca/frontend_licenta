import { Link, useMatch, useResolvedPath } from "react-router-dom";
import navStyles from "./navbar.module.css";
// import {getToken,deleteToken } from "../utils/storage"
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from "../ModalLogin/Modal";
import { getToken, deleteToken } from "../utils/token";
import jwt from "jwt-decode";
import { _get } from "../utils/api";

export default function Navbar() {
//   const history = useNavigate();
  //const [token, setToken] = useState(() => {
  //  return jwt(getToken("token")) || ""
  //});
  const [token, setToken] = useState(() => {
    const storedToken = getToken("token");
    return storedToken ? jwt(storedToken) : null;
  });
  
  const [isTokenExists, setIsTokenExists] = useState(!!getToken());
  const [modalOpen, setModalOpen] = useState(false);
  const [role, setRole] = useState();
  const history = useNavigate();
  const handleLogOut = () => {
     deleteToken();
     setIsTokenExists(false);
     
    // history("/");
  }

  function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    );
  }

  const getRole = async (id) => {
    await _get(`http://localhost:3001/users/user-role/${id}`).then((shelters) => {
      if(shelters){
        setRole(shelters.data)
      }else{console.log("No resp")}
    }).catch ((e) =>{
      console.log(e)
    })
}
  useEffect(()=>{
    setIsTokenExists(!!getToken())
    if(getToken("token")){setRole(getRole(jwt(getToken("token")).id));}
  },[token])
  return (
    <div style={{ backgroundColor: "#f1f4f9", color: "#f1f4f9", width:"100%", floar:"none" }}>
      <nav className={navStyles.navbar}>
        
        <div className={navStyles.navbarlinks}>
          <ul>
            <li>
              <CustomLink to="/home/home" className={navStyles.differentnavbarlink} id="home-tab">Page name🐾</CustomLink>
            </li>

            <li>
              <CustomLink to="/findapet/findapet" id="profile-tab">Find a pet</CustomLink>
            </li> 

            <li>
              <CustomLink to="/setforadoption/setforadoption" id="profile-tab">Set for adoption</CustomLink>
            </li>
            <li>
              <CustomLink to="/shelters/shelters" id="profile-tab">Shelters</CustomLink>
            </li>
            { String(role) == 'admin' ?<li>
              <CustomLink to="/admin/admin" id="profile-tab">Admin</CustomLink>
            </li> : null}
            <li>
              <CustomLink to="/contactus/contactus" id="profile-tab">Contact us</CustomLink>
            </li>
            {token ? <li>
              <CustomLink to="/favorites/favorites" id="profile-tab" >	&#10084;</CustomLink>
            </li>:null}
            {token ? <li>
              <CustomLink to="/yourpets/yourpets" id="profile-tab" >	Your pets</CustomLink>
            </li>:null}
            {/* {token?.role=='Admin' ? <li>
              <CustomLink to="/AdminPage" id="admin-page-tab">AdminPage</CustomLink>
            </li> : null}  */}
            
          </ul>

         
        </div>
        <div className={navStyles.title}>
          {token ? <button id="logout-button" className={navStyles.loginbttn} onClick={() => handleLogOut()}>Logout</button>: <button id="logout-button" className={navStyles.loginbttn} onClick={() => setModalOpen(true)}>Authentication</button>}
        </div>
        {modalOpen && <Modal setOpenModal={setModalOpen} />}
      </nav>
    </div>
  );
}