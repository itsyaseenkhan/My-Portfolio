import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from 'react-router-dom'; // ✅ Added useNavigate
import { Button } from "@/components/ui/button";
import SpecialLoadingButton from './SpecialLoadingButton';
import { clearAllUserErrors, resetProfile, updateProfile, getUser } from '../../Store/Slices/UserSlice';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Initialize navigate hook
  const { user, loading, error, isUpdated, message } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    Phone: "",
    AboutMe: "",
    portfolioURL: "",
    githubUrl: "",
    typewriterText: "",
    linkedInURL: "",
    instagramURL: "",
    facebookURL: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        Phone: user.Phone || "",
        AboutMe: user.AboutMe || "",
        typewriterText: user.typewriterText || "",
        portfolioURL: user.portfolioURL || "",
        githubUrl: user.githubUrl !== "undefined" ? user.githubUrl : "",
        linkedInURL: user.linkedInURL !== "undefined" ? user.linkedInURL : "",
        instagramURL: user.instagramURL !== "undefined" ? user.instagramURL : "",
        facebookURL: user.facebookURL !== "undefined" ? user.facebookURL : "",
      });
      setAvatarPreview(user.avatar?.url || "");
      setResumePreview(user.resume?.url || "");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setResumePreview(reader.result);
          setResume(file);
        }
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please upload a PDF file for your resume");
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const profileData = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      profileData.append(key, value);
    });
    
    if (avatar) profileData.append("avatar", avatar);
    if (resume) profileData.append("resume", resume);

    dispatch(updateProfile(profileData));  
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    if (isUpdated) {
      toast.success(message || "Profile updated successfully");
      dispatch(getUser());
      dispatch(resetProfile());
      navigate("/"); 
    }
  }, [dispatch, error, isUpdated, message, navigate]); 

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Update Profile</h1>
          <p className="text-sm text-gray-500">Update your profile information</p>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="avatar" className="text-gray-600">Profile Picture</Label>
              <div className="w-full mt-2">
                <img
                  src={avatarPreview || "/avatarHolder.jpg"}
                  alt="Avatar"
                  className="w-full h-64 object-cover rounded-lg border"
                />
                <div className="mt-2">
                  <Input 
                    id="avatar"
                    type="file" 
                    accept="image/*"
                    onChange={avatarHandler} 
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="resume" className="text-gray-600">Resume (PDF)</Label>
              <div className="w-full mt-2">
                {resumePreview ? (
                  <>
                    <iframe
                      src={resumePreview}
                      title="Resume PDF"
                      className="w-full h-64 object-cover rounded-lg border"
                    />
                    <Link
                      to={user?.resume?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                    >
                      View Resume
                    </Link>
                  </>
                ) : (
                  <div className="w-full h-64 border flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
                    Resume not uploaded
                  </div>
                )}
                <div className="mt-2">
                  <Input 
                    id="resume"
                    type="file" 
                    accept="application/pdf"
                    onChange={resumeHandler} 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName"
                type="text" 
                name="fullName"
                value={formData.fullName} 
                onChange={handleChange} 
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email" 
                name="email"
                value={formData.email} 
                onChange={handleChange} 
                required
              />
            </div>
            <div>
              <Label htmlFor="Phone">Phone</Label>
              <Input 
                id="Phone"
                type="tel" 
                name="Phone"
                value={formData.Phone} 
                onChange={handleChange} 
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="aboutMe">About Me</Label>
              <Textarea 
                id="aboutMe"
                name="AboutMe"
                value={formData.AboutMe} 
                onChange={handleChange} 
                rows={4}
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="typewriterText">Typewriter Text</Label>
              <Input
                id="typewriterText"
                type="text"
                name="typewriterText"
                value={formData.typewriterText}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="portfolioURL">Portfolio URL</Label>
              <Input 
                id="portfolioURL"
                type="url" 
                name="portfolioURL"
                value={formData.portfolioURL} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input 
                id="githubUrl"
                type="url" 
                name="githubUrl"
                value={formData.githubUrl} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <Label htmlFor="linkedInURL">LinkedIn URL</Label>
              <Input 
                id="linkedInURL"
                type="url" 
                name="linkedInURL"
                value={formData.linkedInURL} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <Label htmlFor="instagramURL">Instagram URL</Label>
              <Input 
                id="instagramURL"
                type="url" 
                name="instagramURL"
                value={formData.instagramURL} 
                onChange={handleChange} 
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="facebookURL">Facebook URL</Label>
              <Input 
                id="facebookURL"
                type="url" 
                name="facebookURL"
                value={formData.facebookURL} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="pt-4">
            {!loading ? (
              <Button type="submit" className="w-full">
                Update Profile
              </Button>
            ) : (
              <SpecialLoadingButton content={"Updating..."} className="w-full" />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
