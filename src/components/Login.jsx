import { useState } from "react";
import { loginuser } from "../utils/indexDB";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  async function login() {
    if (!email || !password) {
      setErrorMsg("all field are requred");
      return
    }

    setErrorMsg("");
    const user = await loginuser(email,password);
    console.log("user: "+user);
    
    if (user.length>0) {
      console.log("login success",email,password,user);
      localStorage.setItem('currentUserEmail', email);
      setUserEmail("");
      setUserPassword("");
      navigate("/");
    }
    else {
      setErrorMsg("invalid credentials");
      return;
    }
  }
  return (
    <>

      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="logo.png"
            className="mx-auto h-14 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={e => e.preventDefault()} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="xyz@gmail.com"
                  value={email}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="border-2 border-neutral-400 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="current-password"
                  value={password}
                  onChange={(e) => setUserPassword(e.target.value)}
                  className="border-2 border-neutral-400 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            {errorMsg.length > 0 && <p className="text-center text-red-400 ">{errorMsg}</p>}
            <div>
              <button
                onClick={() => login()}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
