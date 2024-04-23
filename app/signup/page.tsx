import React from "react";

type Props = {};

function page({}: Props) {


  
  return (
    <div className="grid h-screen w-screen place-items-center bg-slate-800 px-4 text-sm font-medium">
      <div className="w-full max-w-sm rounded-lg bg-slate-700/30 shadow">
        <form className="p-4 md:p-5 lg:p-6">
          <div className="grid gap-y-3">
            <input
              className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400"
              placeholder="Username"
            />
            <input
              className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400"
              placeholder="email@example.com"
            />
            <input
              className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400"
              placeholder="Password"
            />
            <button className="flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-300 transition hover:text-purple-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-envelope"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"
                  fill="#cbd5e1"
                ></path>
              </svg>
              Sign Up with Email
            </button>
            <div className=" flex items-center space-x-20 mx-20">
              <a href="/login" className="text-[#F7AB0A]">
                Login
              </a>
              <a href="/#" className="text-[#F7AB0A]">
                Home
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
