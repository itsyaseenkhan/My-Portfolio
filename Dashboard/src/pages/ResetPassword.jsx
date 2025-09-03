import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  resetPassword,
  clearAllForgotResetPassErrors,
} from "../Store/Slices/forgotResetPasswordSlice";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResetPassword = () => {
    dispatch(resetPassword(token, password, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotResetPassErrors());
    }

    if (message) {
      toast.success(message);
      setTimeout(() => {
        navigate("/Login");
      }, 1500);
    }
  }, [dispatch, error, message, navigate]);

  return (
    <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2 bg-gray-50">
      {/* Form Section */}
      <div className="flex items-center justify-center px-6 py-10 sm:px-8 lg:px-12 bg-white shadow-lg">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Reset Password
            </h1>
            <p className="text-sm sm:text-base text-gray-500">
              Set a new password below
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-1">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-lg"
              />
            </div>

            {!loading ? (
              <Button
                className="w-full rounded-lg py-2 text-base font-semibold"
                onClick={handleResetPassword}
              >
                Reset Password
              </Button>
            ) : (
              <SpecialLoadingButton content="Resetting Your Password" />
            )}
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex items-center justify-center bg-gray-100 p-6 sm:p-10">
        <img
          src="https://res.cloudinary.com/dtddd5qh3/image/upload/v1755254883/computer-security-with-login-password-padlock_rvwkx7.jpg"
          alt="Reset Password Illustration"
          className="w-full max-w-md sm:max-w-lg object-contain rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
