import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearAllUserErrors } from "../Store/Slices/UserSlice";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { loading, isAuthenticated, error } = useSelector((state) => state.user);

  const handleLogin = () => {
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, error, navigateTo]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-sm text-white space-y-6 border border-white/20">
        
        {/* User Image */}
        <div className="flex justify-center">
          <img
            src="https://res.cloudinary.com/dtddd5qh3/image/upload/v1755129530/yk-white-logo_kxqc1p.png"
            alt="User Avatar"
            className="w-28 h-28 rounded-full border-4 border-white/30 shadow-lg object-cover"
          />
        </div>

        {/* Heading */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold tracking-wide">Welcome Back</h1>
          <p className="text-gray-300 text-sm">Login to continue your journey</p>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 border border-gray-400/40 rounded-lg px-3 py-2 focus-within:border-purple-400 transition">
          <FaEnvelope className="text-gray-300" />
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent w-full outline-none text-white placeholder-gray-400"
          />
        </div>

        {/* Password */}
        <div className="flex items-center gap-3 border border-gray-400/40 rounded-lg px-3 py-2 focus-within:border-purple-400 transition">
          <FaLock className="text-gray-300" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent w-full outline-none text-white placeholder-gray-400"
          />
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end text-sm">
          <Link to="/password/forgot" className="text-purple-300 hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        {loading ? (
          <Button disabled className="w-full bg-purple-500/50 text-white">
            Logging In...
          </Button>
        ) : (
          <Button
            onClick={handleLogin}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white transition"
          >
            Login
          </Button>
        )}

        
      </div>
    </div>
  );
};

export default Login;
