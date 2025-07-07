import { FC } from "react";
import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { IoMdPeople } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiFolderOpenFill } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../lib/apiRoutes";
import { toast } from "react-toastify";

const Navbar: FC = () => {
  const userProfileImg = null;
  const location = useLocation();
  const isHome = location.pathname === "/";
  const navigate = useNavigate();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged out successfully!");
      navigate("/login");
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong!");
    },
  });
  return (
    <div className="navbar bg-black shadow-sm w-full px-4 h-full">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle ">
            <SlOptions size={25} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center gap-2 flex items-center">
        {/* Home */}
        <Link
          to="/"
          className="bg-neutral-800 p-2 rounded-full cursor-pointer hover:bg-neutral-700 duration-300"
        >
          {isHome ? <GoHomeFill size={30} /> : <GoHome size={30} />}
        </Link>

        {/* Searchbar */}
        <div className="flex-1 w-[25rem]">
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="What do you want to play?"
              className="bg-neutral-800 text-white pl-10 pr-10 py-3 rounded-full w-full hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-white duration-300"
            />
            <div className="absolute inset-y-0 right-3 flex items-center gap-1 text-gray-400 hover:text-white hover:scale-105 duraiton-200 transition-all">
              <Link to="/browse">
                <PiFolderOpenFill
                  size={35}
                  className="border-l border-gray-400 cursor-pointer pl-2"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-end gap-4">
        <Link
          to="/admin"
          className="bg-white text-black px-4 py-1 rounded-full font-medium hover:scale-105 transition-transform cursor-pointer"
        >
          Admin/Artist Dashboard
        </Link>
        <Link to="/notifications" className="btn btn-ghost btn-circle">
          <IoMdNotificationsOutline size={25} />
        </Link>
        <button className="btn btn-ghost btn-circle text-2xl">
          <IoMdPeople />
        </button>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src={userProfileImg || "/avatar-placeholder.png"}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li className="border-t my-2 border-gray-700">
              <button
                onClick={() => logoutMutation()}
                className="font-semibold text-red-500"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
