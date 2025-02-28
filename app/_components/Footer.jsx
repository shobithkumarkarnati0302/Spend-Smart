import React from "react";

function footer() {
  return (
    <footer className="bg-gray-50 ">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-teal-600 sm:justify-start">
            <img src="./logo3.png" alt="" width={200} height={380}/>
          </div>

          <p className="mt-4 text-center text-sm text-primary lg:mt-0 lg:text-right">
            <b>Copyright &copy; 2025. All rights reserved - Shobith Kumar</b>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default footer;
