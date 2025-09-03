import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearAllUserErrors } from "../Store/Slices/UserSlice";
import { forgotPassword } from "../Store/Slices/forgotResetPasswordSlice";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleForgotPassword = (email) => {
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
    if (message !== null) {
      toast.success(message);
    }
  }, [dispatch, isAuthenticated, error, loading, message, navigateTo]);

  return (
    <div className="w-full min-h-screen flex flex-col lg:grid lg:grid-cols-2">

      {/* Image for Mobile */}
      <div className="flex lg:hidden justify-center items-center bg-gradient-to-b from-indigo-100 to-indigo-200 p-6">
        <img
          src="https://res.cloudinary.com/dtddd5qh3/image/upload/v1755130050/forgot_abx1lu.png"
          alt="Forgot Password"
          className="max-w-xs w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500"
        />
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">Forgot Password</h1>
            <p className="text-gray-500 text-sm">
              Enter your email to receive a password reset link
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
              required
            />
          </div>

          <div className="flex items-center justify-end">
            <Link
              to="/login"
              className="text-sm text-indigo-600 hover:underline"
            >
              Remember your password?
            </Link>
          </div>

          {!loading ? (
            <Button
              onClick={() => handleForgotPassword(email)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
            >
              Forgot Password
            </Button>
          ) : (
            <SpecialLoadingButton content={"Requesting"} />
          )}
        </div>
      </div>

      {/* Image for Desktop */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-b from-indigo-100 to-indigo-200 p-8">
        <img
          src="https://res.cloudinary.com/dtddd5qh3/image/upload/v1755130050/forgot_abx1lu.png"
          alt="Forgot Password"
          className="max-w-lg w-full rounded-3xl shadow-2xl transform hover:scale-110 transition-all duration-500"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
