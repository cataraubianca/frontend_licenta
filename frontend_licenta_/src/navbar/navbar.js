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
import logo from '../images/logomic.png';
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
            <CustomLink to="/home/home" className={navStyles.differentnavbarlink} id="home-tab"><img style={{ width: '100px', height: '80px' }} src={logo} alt="Logo" /></CustomLink>
            </li>

            <li>
              <CustomLink to="/mission/mission" className="nav-link">Our mission</CustomLink>
            </li> 

            <li>
              <CustomLink to="/findapet/findapet" className="nav-link">Find a pet</CustomLink>
            </li> 

            <li>
              <CustomLink to="/swipe/swipe" className="nav-link">Swipe</CustomLink>
            </li> 
            <li>
              <CustomLink to="/setforadoption/setforadoption" className="nav-link">Set for adoption</CustomLink>
            </li>
            <li>
              <CustomLink to="/shelters/shelters" className="nav-link">Shelters</CustomLink>
            </li>
            { String(role) == 'admin' ?<li>
              <CustomLink to="/admin/admin" className="nav-link">Admin</CustomLink>
            </li> : null}
            <li>
              <CustomLink to="/contactus/contactus" className="nav-link">Contact us</CustomLink>
            </li>
            {token ? <li>
              <CustomLink to="/favorites/favorites" className="nav-link" >	&#10084;</CustomLink>
            </li>:null}
            {token ? <li>
              <CustomLink to="/yourpets/yourpets" className="nav-link" >	Your pets</CustomLink>
            </li>:null}
            {/* {token?.role=='Admin' ? <li>
              <CustomLink to="/AdminPage" id="admin-page-tab">AdminPage</CustomLink>
            </li> : null}  */}
          </ul>

        </div>
        <div className={navStyles.title}>
          {token ? <button id="logout-button" className={navStyles.loginbttn}>
          <Link to="/profile/profile" className="profile-tab">Profile</Link>
          </button>: <button id="logout-button" className={navStyles.loginbttn} onClick={() => setModalOpen(true)}>Authentication</button>}
        </div>
        {modalOpen && <Modal setOpenModal={setModalOpen} />}
      </nav>
    </div>
  );
}