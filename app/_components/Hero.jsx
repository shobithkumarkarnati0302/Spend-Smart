import React from "react";
import Image from "next/image";

function Hero() {
  return (
    <section className="bg-gray-100 border-gray-600 flex items-center flex-col gap-0">
      {" "}
      {/* Removed extra space above Hero */}
      <div className="mx-auto max-w-screen-xl -mt-20 px-4 py-16 lg:flex lg:h-screen lg:items-center border-10 border-gray-600">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Manage Your Expenses
            <br />
            <strong className="font-extrabold text-primary sm:block">
              Control Your Money.
            </strong>
          </h1>
          <p className="mt-2 text-lg sm:text-xl/relaxed">
            <i>Start Creating Your Budget with ❝ Spend Smart❞</i>
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <a
              className="block w-auto rounded-xl bg-primary px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-secondary hover:text-black focus:ring-3 focus:outline-hidden sm:w-auto"
              href="/sign-in"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
      <img
        src="./dashboard.png"
        alt=""
        width={1200}
        height={800}
        className="-mt-32 mb-56"
      />
    </section>
  );
}

export default Hero;
