import {
  Routes,
  Route,
} from "react-router-dom";
import CreateUSer from "../pages/CreateUser";
import UserList from "../pages/UserList";
import {AiOutlineHome} from "react-icons/ai"
import {useNavigate} from "react-router-dom";
import {IconButton } from '@chakra-ui/react'
import UserImages from '../pages/UserImages';
const Container = () => {
  const navigate = useNavigate()
  return (
    <>
      <IconButton
          ml="4"
          mt="4"
          isRounded={true}
          size="sm"
          icon={<AiOutlineHome style={{fontSize:'1.2rem',color:'red'}}/>}
          onClick={()=>navigate('/')}
      />
      <Routes>
        <Route exact path="/" element={<UserList />} />
        <Route path="/createuser" element={<CreateUSer />} />
        <Route path="/userimages/:userId" element={<UserImages />} />
      </Routes>
    </>
  )
}

export default Container