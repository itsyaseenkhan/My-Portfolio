import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-sm text-gray-500">Here's your full personal profile</p>
        </div>

        {/* Profile & Resume Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Profile Image */}
          <div>
            <Label className="text-gray-600">Profile Picture</Label>
            <div className="w-full mt-2">
              <img
                src={user?.avatar?.url}
                alt="Avatar"
                className="w-full h-64 object-cover rounded-lg border"
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-600">Resume (PDF)</Label>
            <div className="w-full mt-2">
              {user?.resume?.url ? (
                <iframe
                  src={user.resume.url}
                  title="Resume PDF"
                  className="w-full h-64 object-cover rounded-lg border"
                ></iframe>
              ) : (
                <div className="w-full h-64 border flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
                  Resume not uploaded
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <Label>Full Name</Label>
            <Input disabled value={user.fullName} />
          </div>
          <div>
            <Label>Email</Label>
            <Input disabled value={user.email} />
          </div>
          <div>
            <Label>Phone</Label>
            <Input disabled value={user.Phone} />
          </div>
          <div className="md:col-span-2">
            <Label>About Me</Label>
            <Textarea disabled className="resize-none" rows={4} value={user.AboutMe} />
          </div>
          <div >
            <Label>Typewriter</Label>
            <Textarea disabled  value={user.typewriterText} />
          </div>
          <div>
            <Label>Portfolio URL</Label>
            <Input disabled value={user.portfolioURL} />
          </div>
          <div>
            <Label>Github URL</Label>
            <Input disabled value={user.githubUrl } />
          </div>
          <div>
            <Label>LinkedIn URL</Label>
            <Input disabled value={user.linkedInURL} />
          </div>
          <div>
            <Label>Instagram URL</Label>
            <Input disabled value={user.instagramURL} />
          </div>
          <div className="md:col-span-2">
            <Label>Facebook URL</Label>
            <Input disabled value={user.facebookURL} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
