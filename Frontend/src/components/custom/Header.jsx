import React, { useEffect } from "react";
import logos from "/logos.png";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/Services/login";
import { addUserData } from "@/features/user/userFeatures";

function Header({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("User Found in Header");
    } else {
      console.log("User Not Found in Header");
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.statusCode === 200) {
        dispatch(addUserData(""));
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-between items-center h-24 px-10 shadow-md 
                    relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-purple-500 to-pink-400
                      animate-gradient-slow opacity-30 -z-10"></div>

      {/* Logo */}
      <img src={logos} alt="logo" width={100} height={100} className="relative z-10"/>

      {/* Buttons */}
      {user ? (
        <div className="flex items-center gap-4 relative z-10">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <Link to="/auth/sign-in" className="relative z-10">
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
