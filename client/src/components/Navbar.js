import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, userSelector } from "../features/user/userSlice";
import decode from "jwt-decode";

function Navbar() {
  const { userInfo, userToken } = useSelector(userSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userToken) {
      const decodedToken = decode(userToken);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout());
      }
    }
  }, [dispatch, userToken]);

  return (
    <nav className="sticky bg-white px-4 py-3 top-0 z-50 mb-5 flex flex-row items-center justify-between shadow-md">
      <Link to="/">
        <h2 className="text-4xl text-blue-900 text-center">Tasks Lab</h2>
      </Link>
      <div>
        {userInfo ? (
          <div className="nav-item p-2">
            <p>{userInfo.name}</p>
            <Link to="/auth">
              <button className="" onClick={() => dispatch(logout())}>
                logout
              </button>
            </Link>
          </div>
        ) : (
          <Link to="/auth">
            <button className="">login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
