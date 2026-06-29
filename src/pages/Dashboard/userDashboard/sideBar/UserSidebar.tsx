import { Outlet } from "react-router-dom";
import UserDashNavbar from "../Dash_components/UserDashNavbar";
function UserSidebar() {
  return (
    <>
      <UserDashNavbar Outlet={<Outlet />} />
    </>
  );
}

export default UserSidebar;
