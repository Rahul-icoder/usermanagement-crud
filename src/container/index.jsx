import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CreateUSer from "../pages/CreateUser";
import UserList from "../pages/UserList";

const Container = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<UserList />} />
        <Route path="/createuser" element={<CreateUSer />} />
      </Routes>
    </Router>
  )
}

export default Container