import { Link, useNavigate } from "react-router-dom";
import {FolderGit,History,Home,InfoIcon,LogOut,MessageSquareMore,Package2,PanelLeft,PencilRuler,User,} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {Tooltip,TooltipContent,TooltipProvider,TooltipTrigger,} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import Dashboard from "./sub-components/Dashboard.jsx";
import { clearAllUserErrors } from "../Store/Slices/UserSlice";
import AddProject from "../pages/sub-components/AddProject.jsx";
import Account from "./sub-components/Account.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Store/Slices/UserSlice";
import { toast } from "react-toastify";
import Message from "./sub-components/Message.jsx";
import AddTimeline from "./sub-components/AddTimeline.jsx";
import AddSkill from "./sub-components/AddSkill.jsx";
import AddAbout from "./sub-components/AddAbout.jsx";

const HomePage = () => {
  const [active, setActive] = useState("Dashboard");
  const { isAuthenticated, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged Out!");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated, error, dispatch, navigateTo]);

  return (
    <div className="flex min-h-screen md:w-full w-fit flex-col bg-muted/40">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-14 flex-col border-r border-gray-300 bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-5">
          <Link className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
            <Package2 className="h-6 w-6 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>

          {/* Dashboard */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Dashboard"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  } transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Dashboard")}
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Add Project */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Add Project"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  } transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Add Project")}
                >
                  <FolderGit className="h-5 w-5" />
                  <span className="sr-only">Add Project</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Project</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Add Skill */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "AddSkill"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  } transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("AddSkill")}
                >
                  <PencilRuler className="h-5 w-5" />
                  <span className="sr-only">Add Skill</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Skill</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Add Timeline */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Add Timeline"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  } transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Add Timeline")}
                >
                  <History className="h-5 w-5" />
                  <span className="sr-only">Add Timeline</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Timeline</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Messages */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "message"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  } transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("message")}
                >
                  <MessageSquareMore className="h-5 w-5" />
                  <span className="sr-only">Message</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
           {/* Account */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "AddAbout"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  } transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("AddAbout")}
                >
                  <InfoIcon className="h-5 w-5" />
                  <span className="sr-only">About</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">About</TooltipContent>
            </Tooltip>
          </TooltipProvider>


          {/* Account */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Account"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  } transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Account")}
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Account</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>

        {/* Logout Button */}
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Logout</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      
      <header
        className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-gray-300 bg-blue-400
            w-full px-4 py-3 h-14 sm:h-20 sm:px-6 sm:py-4 max-[900px]:h-[100px] ">
        
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>

         
          <SheetContent
            side="left"
            className="sm:max-w-xs bg-white text-black border-r border-gray-900 shadow-lg"
          >
            <nav className="grid gap-6 text-lg font-medium px-6 py-8">
              <Link
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Acme Inc</span>
              </Link>

             
              <Link
                href="#"
                className={`flex items-center gap-4 px-2.5 ${
                  active === "Dashboard"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActive("Dashboard")}
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "Add Project"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActive("Add Project")}
              >
                <FolderGit className="h-5 w-5" />
                Add Project
              </Link>
              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "AddSkill"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActive("AddSkill")}
              >
                <PencilRuler className="h-5 w-5" />
                AddSkill
              </Link>
              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "Account"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActive("Account")}
              >
                <User className="h-5 w-5" />
                Account
              </Link>      
              

               <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "AddAbout"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActive("AddAbout")}
              >
                <User className="h-5 w-5" />
                 About
              </Link>


              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "Timeline"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActive("Timeline")}
              >
                <History className="h-5 w-5" />
                Timeline
              </Link>
              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "AddAbout"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActive("AddAbout")}
              >
                <History className="h-5 w-5" />
                AddAbout
              </Link>
              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "message"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActive("message")}
              >
                <MessageSquareMore className="h-5 w-5" />
                Message
              </Link>
              <button
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Welcome Text and Avatar */}
        <div className="flex items-center justify-between ml-8 gap-2 w-full px-2 sm:px-6 ">
          <h1 className="truncate text-base sm:text-2xl md:text-3xl font-medium ml-2 min-w-0">
            Welcome Back, {user?.fullName}
          </h1>

          {user?.avatar?.url ? (
            <img
              src={user.avatar.url}
              alt="avatar"
              className="flex-shrink-0 rounded-full object-cover w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
            />
          ) : (
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gray-300 text-gray-600 text-lg sm:text-xl">
              ?
            </div>
          )}
        </div>
      </header>

      {/* Main Content based on active state */}
      {(() => {
        switch (active) {
          case "Dashboard":
            return <Dashboard />;
          case "Add Project":
            return <AddProject />;
          case "AddSkill":
            return <AddSkill />;
          case "Add Timeline":
            return <AddTimeline />;
          case "AddAbout":
            return <AddAbout />;
          case "message":
            return <Message />;
          case "Account":
            return <Account />;
          default:
            return <Dashboard />;
        }
      })()}
    </div>
  );
};

export default HomePage;
