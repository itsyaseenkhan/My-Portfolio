import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import React, { use, useEffect } from 'react'
import SpecialLoadingButton from './SpecialLoadingButton'
import { useDispatch, useSelector } from 'react-redux'
import {clearAllUserErrors,resetProfile,updatePassword,} from '../../Store/Slices/UserSlice';
import { toast } from 'react-toastify'


const UpdatePassword = () =>{
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('');
 
  const {loading,error,isUpdated,message} =useSelector((state) => state.user);


  const dispatch = useDispatch();
  const handleUpdatePassword =() => {
   dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword));
  };

   useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch , error, isUpdated, ]);



  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Password</h1>
              <p className="text-balance text-muted-foreground">
                Update Your Password
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Current Password</Label>
                <Input
                  type="Password"
                  placeholder='Enter Current Password'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>New Password</Label>
                <Input
                  type="Password"
                  placeholder='Enter New Password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Confirm New Password</Label>
                <Input
                  type="Password"
                  placeholder='Confirm New Password'
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
              {!loading ? (
                <Button
                  onClick={() => handleUpdatePassword()} className="w-full"
                >
                  Update Password
                </Button>
              ) : (
                <SpecialLoadingButton content={"Updating Password"} />
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default UpdatePassword
