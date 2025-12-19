import Header from "@/components/custom/Header";
import React, { useEffect } from "react";
import heroSnapshot from "@/assets/heroSnapshot.png";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaCircle, FaInfoCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { startUser } from "../../Services/login.js";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "@/features/user/userFeatures.js";

function HomePage() {
  const user = useSelector((state) => state.editUser.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    window.open(
      "https://github.com/sahidrajaansari/Ai-Resume-Builder",
      "_blank"
    );
  };

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await startUser();
        if (response.statusCode === 200) {
          dispatch(addUserData(response.data));
        } else {
          dispatch(addUserData(""));
        }
      } catch (error) {
        console.log("Error fetching user ->", error.message);
        dispatch(addUserData(""));
      }
    };
    fetchResponse();
  }, []);

  const handleGetStartedClick = () => {
    if (user) navigate("/dashboard");
    else navigate("/auth/sign-in");
  };

  return (
    <>
      <Header user={user} />

      {/* Hero Section with Animated Gradient Background */}
      <section className="relative flex items-center justify-center h-screen overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-purple-500 to-pink-500 animate-gradient-x blur-3xl opacity-50 z-0"></div>

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-snug">
            Build{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500">
              a professional resume
            </span>{" "}
            for your next job opportunity
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-8">
            AI-powered resumes that help you shine faster and smarter.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={handleGetStartedClick}
              className="px-8 py-3 rounded-2xl bg-white text-gray-900 font-semibold hover:scale-105 transform transition-all shadow-lg"
            >
              Get Started
            </Button>

            <Button
              variant="outline"
              onClick={handleClick}
              className="px-8 py-3 rounded-2xl border-white text-dark hover:bg-white hover:text-gray-900 transition-all shadow-sm"
            >
              Learn More
            </Button>
          </div>
            
      
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 ">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/70">
            &copy; 2024 AI-Resume-Builder. All rights reserved.
          </p>
          <Button
            variant="secondary"
            onClick={handleClick}
            className="flex items-center gap-2"
          >
            <FaGithub className="w-4 h-4" /> GitHub
          </Button>
        </div>
      </footer>

      {/* Animated Gradient CSS */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 300% 300%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </>
  );
}

export default HomePage;
