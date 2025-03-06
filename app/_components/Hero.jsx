import React from "react";
import Image from "next/image";

function Hero() {
  return (
    <section className="bg-gray-100 flex flex-col lg:gap-6 items-center px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-screen-xl flex flex-col items-center text-center">
        {/* Text Section */}
        <div className="max-w-2xl">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Manage Your Expenses
            <br />
            <strong className="font-extrabold text-primary sm:block">
              Control Your Money.
            </strong>
          </h1>
          <p className="mt-2 text-lg sm:text-xl">
            <i>Start Creating Your Budget with ❝ Spend Smart❞</i>
          </p>
          <div className="mt-4 flex justify-center">
            <a
              className="rounded-xl bg-primary px-8 py-3 text-sm font-medium text-white shadow-md transition duration-300 hover:bg-secondary hover:text-black"
              href="http://localhost:3000/dashboard"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="mt-8 w-full flex justify-center">
          <Image
            src="/dashboard.png"
            alt="Dashboard Preview"
            width = {2000}
            height = {1200}
            className="w-full max-w-md sm:max-w-lg lg:max-w-4xl h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
