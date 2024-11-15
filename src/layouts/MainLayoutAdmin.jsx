import { Outlet } from "react-router-dom";
import Header from "../common/Header/Header"
import HeaderAdmin from "../common/HeaderAdmin/HeaderAdmin";


const MainLayoutAdmin = () => {
    return (
      <div className='main-layout-admin'>
        <div className='layout-content-admin'>
          <div className='outlet-admin'>
            <div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    )
  }
  export default MainLayoutAdmin