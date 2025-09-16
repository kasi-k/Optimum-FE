import React from "react";
import NavBar from "../../component/NavBar";

const SubscriptionPlans = () => {
  return (
    <>
      <NavBar title="Subscription" pagetitle="Subscription Plans" />
      <div className=" font-layout-font  overflow-auto">
<div className="flex justify-between items-center dark:text-white text-black mx-2 py-2 mt-2 font-extralight text-sm">
  <div>
    <p className="font-bold text-lg">Change the Plan</p>
    <p>You can upgrade the plan here</p>
  </div>
  <div>
    <p className="font-extrabold text-lg">Current Plan:Basic</p>
    <p className="text-sm">Expired on:30th Aug,2025</p>
  </div>
</div>
        <div className="flex  p-2 gap-2">
          <div className=" dark:bg-layout-dark bg-layout-light rounded-2xl dark:text-white text-black hover:border-[3px] hover:border-[#F391FB] shadow-md p-4 w-1/2 ">
            <h2 className=" text-2xl text-center font-normal py-2 mt-4">Starter Plan</h2>
            <div className="grid  items-center justify-center">
              <p className="text-4xl text-center  font-semibold py-4">
                ₹60,000/-{" "}
                <span className="text-sm font-extralight ">6 Months</span>
              </p>

              <p className="text-center font-medium text-xl mb-2">Features:</p>
              <ul className="space-y-4 text-base font-light pt-2 ">
                <li>Lorem ipsum dolor sit amet consectetur</li>
                <li>Lorem ipsum dolor sit amet consectetur</li>
                <li>Lorem ipsum dolor sit amet consectetur</li>
                <li>Lorem ipsum dolor sit amet consectetur</li>
                <li>Lorem ipsum dolor sit amet consectetur</li>
                <li>Lorem ipsum dolor sit amet consectetur</li>
              </ul>
              <button className="bg-select_layout-dark cursor-pointer text-black text-center font-normal py-1.5 px-6 rounded my-8 mx-auto">
                Upgrade
              </button>
            </div>
          </div>

          <div className=" dark:bg-layout-dark bg-layout-light dark:text-white text-black rounded-2xl hover:border-[3px] hover:border-[#F391FB] shadow-md p-4 w-1/2">
            <h2 className=" text-center text-2xl font-medium py-2 mt-4">Yearly Plan</h2>
            <div className="grid  items-center justify-center ">
              <p className="text-4xl text-center  font-semibold py-4">
                ₹1,00,000/-{" "}
                <span className="text-sm font-extralight">Year</span>
              </p>

              <p className="text-center font-medium text-xl mb-2">Features:</p>
              <ul className="space-y-4 text-base font-light pt-2 ">
                <li>Lorem ipsum dolor sit amet consectetur</li>
                <li>Lorem ipsum dolor sit amet consectetur</li>
                <li>Lorem ipsum dolor sit amet consectetur</li>
                <li>Lorem ipsum dolor sit amet consectetur</li>
                <li>Lorem ipsum dolor sit amet consectetur</li>
                <li>Lorem ipsum dolor sit amet consectetur</li>
              </ul>
              <button className="bg-select_layout-dark cursor-pointer text-black text-center font-normal py-1.5 px-6 rounded  mx-auto my-8">
                Upgrade
              </button>
            </div>
          </div>
          <div className="  dark:bg-layout-dark  bg-layout-light dark:text-white text-black rounded-2xl hover:border-[3px] hover:border-[#F391FB] shadow-md p-4 w-1/2">
            <h2 className="text-2xl text-center font-medium py-2 mt-4">Lifetime Plan</h2>
            <div className="grid  items-center justify-center ">
              <p className="text-4xl text-center  font-semibold py-4">
                ₹2,00,000/-{" "}
                <span className="text-sm font-extralight">Lifetime</span>
              </p>

              <p className="text-center font-medium text-xl mb-2">Features:</p>
              <ul className="space-y-4 text-base font-light pt-2 ">
                <li>Lorem ipsum dolor sit amet consectetur</li>
                <li>Lorem ipsum dolor sit amet consectetur</li>
                <li>Lorem ipsum dolor sit amet consectetur</li>
                <li>Lorem ipsum dolor sit amet consectetur</li>
                <li>Lorem ipsum dolor sit amet consectetur</li>
                <li>Lorem ipsum dolor sit amet consectetur</li>
              </ul>
              <button className="bg-select_layout-dark cursor-pointer text-black text-center font-normal py-1.5 px-6 rounded my-8 mx-auto ">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPlans;
