import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaSignInAlt,
  FaUserPlus,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "@/Services/login";

/* ---------------- Reusable Components ---------------- */

const InputField = ({ icon, rightIcon, ...props }) => (
  <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 bg-white/90 px-4 py-3 rounded-xl shadow-md">
    <span className="text-gray-500">{icon}</span>
    <input
      {...props}
      className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
      required
    />
    {rightIcon && <span className="text-gray-500">{rightIcon}</span>}
  </div>
);

const PrimaryButton = ({ loading, text }) => (
  <button
    type="submit"
    className="
      w-full py-3 rounded-xl
      bg-gradient-to-r from-emerald-500 to-teal-500
      text-white font-semibold
      shadow-lg transition
      hover:scale-[1.02]
      active:scale-[0.98]
    "
  >
    {loading ? <Loader2 className="animate-spin mx-auto" /> : text}
  </button>
);

/* ---------------- Main Component ---------------- */

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ---------------- Handlers ---------------- */

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setSignInError("");

    try {
      setLoading(true);
      const res = await loginUser({ email, password });
      if (res?.statusCode === 200) navigate("/");
    } catch (err) {
      setSignInError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setSignUpError("");

    const { fullname } = e.target.elements;

    try {
      setLoading(true);
      const res = await registerUser({
        fullName: fullname.value,
        email,
        password,
      });
      if (res?.statusCode === 201) {
        await handleSignInSubmit(e);
      }
    } catch (err) {
      setSignUpError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div
      className="
        h-screen w-screen overflow-hidden
        grid place-items-center
        bg-gradient-to-br from-emerald-400 via-teal-400 to-purple-500
        px-4
      "
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="
          w-full max-w-md
          grid grid-rows-[auto_1fr_auto]
          backdrop-blur-xl bg-white/30
          border border-white/20
          rounded-2xl shadow-2xl
          p-6 sm:p-8
        "
      >
        {/* Tabs */}
        <div className="grid grid-cols-2 mb-6 bg-white/40 rounded-xl overflow-hidden">
          <button
            onClick={() => setIsSignUp(false)}
            className={`py-3 font-semibold transition ${
              !isSignUp
                ? "bg-white text-emerald-600 shadow"
                : "text-gray-700"
            }`}
          >
            <FaSignInAlt className="inline mr-2" />
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`py-3 font-semibold transition ${
              isSignUp
                ? "bg-white text-emerald-600 shadow"
                : "text-gray-700"
            }`}
          >
            <FaUserPlus className="inline mr-2" />
            Sign Up
          </button>
        </div>

        {/* Forms Area */}
        <div className="relative h-[360px] overflow-hidden">
          {/* Sign Up */}
          <motion.div
            animate={{ x: isSignUp ? 0 : "110%", opacity: isSignUp ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 grid gap-4"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-white">
              Create Account
            </h2>

            <form
              onSubmit={handleSignUpSubmit}
              className="grid gap-4"
            >
              <InputField
                icon={<FaUser />}
                name="fullname"
                placeholder="Full Name"
              />

              <InputField
                icon={<FaUser />}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <InputField
                icon={<FaLock />}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                }
              />

              <PrimaryButton loading={loading} text="Create Account" />
              {signUpError && (
                <p className="text-red-200 text-center text-sm">
                  {signUpError}
                </p>
              )}
            </form>
          </motion.div>

          {/* Sign In */}
          <motion.div
            animate={{ x: isSignUp ? "-110%" : 0, opacity: !isSignUp ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 grid gap-4"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-white">
              Welcome Back
            </h2>

            <form
              onSubmit={handleSignInSubmit}
              className="grid gap-4"
            >
              <InputField
                icon={<FaUser />}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <InputField
                icon={<FaLock />}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                }
              />

              <PrimaryButton loading={loading} text="Login" />
              {signInError && (
                <p className="text-red-200 text-center text-sm">
                  {signInError}
                </p>
              )}
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <p className="text-center text-white text-sm mt-4">
          {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-semibold underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}

export default AuthPage;
