"use client"
import React from "react";
import { SignInButton, SignUpButton, useUser, UserButton } from '@clerk/clerk-react';

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <header className="border-b border-gray-600 w-full">
      <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 flex flex-col md:flex-row md:items-center md:justify-between">
        {/* <div className="text-center md:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
            Spend Smart
            <p className="mt-1.5 text-sm sm:text-base text-black">
              Your Money, Your Control.
            </p>
          </h1>
        </div> */}
        <div className="flex justify-center text-teal-600 sm:justify-start">
            <img src="./logo3.png" alt="" width={300} 
        height={380}/>
          </div>
        <div className="mt-4 md:mt-0 flex justify-center md:justify-end">
          {isSignedIn ? (
            <UserButton className="mr-4 text-sm sm:text-base text-black" variant="secondary" size="small">
              {user.email}
            </UserButton>
          ) : (
            <>
              <SignInButton>
                <button
                  className="flex items-center gap-2 rounded-xl border text-white border-gray-200 px-4 sm:px-5 py-2 sm:py-3 bg-primary transition hover:bg-secondary hover:text-black focus:ring-3 focus:outline-hidden"
                  type="button"
                >
                  <span className="text-sm sm:text-base font-medium">Get Started</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </button>
              </SignInButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
