import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Signup } from './signup/signup';
import { PetResources } from './petresources/petresources';
import { Login } from './login/login';
import { HowItWorks } from './howitworks/howitworks';
import FindAPet  from './findapet/findapet.jsx';
import { Home } from './home/home';
import { GetInvolved } from './getinvolved/getinvolved';
import SinglePet from './findapet/singlepet';
import { SetForAdoption } from './setforadoption/setforadoption';
import { Shelters } from './shelters/shelters';
import { Bot } from './bot/bot';
import { Admin } from './admin/admin';
import AdvancedSearch from './advancedsearch/advancedsearch';
import Favorites from './favorites/favorites';
import YourPets from './yourpets/yourpets';
import EditPet from './yourpets/editpet';
import { ContactUs } from './contactus/contactus';
function App() {
  return (
    <>
 <>
    <Router>
        <Routes>
          <Route exact path="/signup/signup" element={<Signup/>}/>
          <Route exact path="/login/login" element={<Login />} />
          <Route exact path="/howitworks/howitworks" element={<HowItWorks />} />
          <Route exact path="/home/home" element={<Home />} />
          <Route exact path="/findapet/findapet" element={<FindAPet/>}/>
          <Route exact path="" element={<Home />} />
					<Route path='findapet/:productId' element={<SinglePet />} />
          <Route path='editpet/:productId' element={<EditPet />} />
          <Route exact path='advancedSearch/advancedSearch' element={<AdvancedSearch/>}/>
          <Route exact path="/setforadoption/setforadoption" element={<SetForAdoption/>}/>
          <Route exact path="/shelters/shelters" element={<Shelters/>}/>
          <Route exact path="/bot/bot" element={<Bot/>}/>
          <Route exact path="/admin/admin" element={<Admin/>}/>
          <Route exact path="/favorites/favorites" element={<Favorites/>}/>
          <Route exact path="/yourpets/yourpets" element={<YourPets/>}/>
          <Route exact path="/contactus/contactus" element={<ContactUs/>}/>
        </Routes>
      </Router>
      </>
    </>
  );
}

export default App;
