import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo_L from "../../assets/images/Logo(light).png";
import Logo_D from "../../assets/images/Logo(dark).png";
import { IoEyeOff, IoEye } from "react-icons/io5";
import ThemeToggle from "../../component/ThemeToggle";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="relative font-layout-font flex flex-col justify-center items-center gap-6 dark:bg-overall_bg-dark bg-overall_bg-light  h-screen ">
        <div className=" right-8 absolute top-6 bg-layout-light dark:bg-layout-dark p-1 rounded-full">
          <ThemeToggle />
        </div>
        <div className="dark:bg-layout-dark bg-layout-light dark:text-white text-black w-full max-w-lg p-8 rounded-xl shadow-lg">
          <div className="flex justify-between items-center py-4">
            <div>
              <img src={Logo_D} alt="Logo" className="w-44 hidden dark:block" />
              <img src={Logo_L} alt="Logo" className="w-44 dark:hidden" />
            </div>
            <p className="text-3xl font-bold text-center my-4">Login</p>
          </div>
          <form className="mx-4 mt-4">
            <label className="grid  mb-4">
              Email / Phone Number
              <input
                type="text"
                className=" border-2 dark:border-overall_bg-dark border-[#D0D6FF] outline-none rounded-md py-2 px-2 my-1"
                placeholder="Enter email or phone number"
              />
            </label>

            <label className="grid  relative">
              Password
              <input
                type={showPassword ? "text" : "password"}
                className=" border-2 dark:border-overall_bg-dark border-[#D0D6FF] outline-none rounded-md py-2 px-2  pr-10"
                placeholder="Enter password"
              />
              <span
                className="absolute right-3 top-9 cursor-pointer dark:text-gray-400 text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </span>
            </label>

            {/* <p
              onClick={() => navigate("/forgotpassword")}
              className="text-right text-sm cursor-pointer hover:underline mt-4"
            >
              Forgot Password?
            </p> */}
            <p
              onClick={() => navigate("/dashboard")}
              className=" cursor-pointer bg-select_layout-dark text-black text-center   w-full py-2 my-3 rounded-md text-lg font-semibold transition duration-200 "
            >
              Login
            </p>
          </form>
          {/* <p className="text-center cursor-pointer text-sm py-4">
            Don’t have an account?{" "}
            <span
            onClick={() =>navigate("/")}
              className=" hover:underline font-semibold"
            >
              Sign up
            </span>
          </p> */}
        </div>
      </div>
    </>
  );
};

export default Login;
