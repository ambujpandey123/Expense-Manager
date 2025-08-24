import { useState } from "react"
import { addUser, finduser } from "../utils/indexDB";
import { useNavigate } from "react-router-dom";
import {
  AnimateFromDownBtn,
  AnimateFromLeft,
  AnimateFromRight,
  AnimateLogo
}
  from "./motion/animation";

export default function Example() {
  const [username, setUserName] = useState("");
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const [cpassword, setUserCPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  async function signup() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!username || !email || !password || !cpassword) {
      setErrorMsg("All fields are required.");
      return;
    }

    // Regex email validation
    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (password !== cpassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setErrorMsg(""); // Clear any previous error messages

    try {
      const user = await finduser(email);

      if (user && user.length > 0) {
        setErrorMsg("User with this email already exists.");
        return;
      }

      await addUser(username, email, password);
      
      localStorage.setItem('currentUserEmail', email);
      setUserName("");
      setUserEmail("");
      setUserPassword("");
      setUserCPassword("");
      navigate("/");
    } catch (error) {
      setErrorMsg("An error occurred during signup. Please try again.");
      console.error("Signup error:", error);
    }
  }
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <AnimateLogo>
            <img
              alt="Your Company"
              src="logo.png"
              className="mx-auto h-14 w-auto"
            />
          </AnimateLogo>
          <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create a new account
          </h2>
        </div>

        <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-3 " onSubmit={e => e.preventDefault()}>
            <AnimateFromLeft>
              <div>
                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    autoComplete="username"
                    placeholder="Jone Doe"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    className="border-2 border-neutral-400 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </AnimateFromLeft>
            <AnimateFromRight>
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
            </AnimateFromRight>

            <AnimateFromLeft>

              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setUserPassword(e.target.value)}
                  className="border-2 border-neutral-400 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </AnimateFromLeft>
            <AnimateFromRight>
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="cpassword"
                  name="cpassword"
                  type="password"
                  required
                  autoComplete="confirm-password"
                  placeholder="Confirm password"
                  value={cpassword}
                  onChange={(e) => setUserCPassword(e.target.value)}
                  className="border-2 border-neutral-400 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </AnimateFromRight>
            {errorMsg.length > 0 && <p className="text-center text-red-400 ">{errorMsg}</p>}
            <AnimateFromDownBtn>
              <div className="mt-7">
                <button
                  className=" flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => signup()}
                >
                  Sign up
                </button>
              </div>
            </AnimateFromDownBtn>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already a member?{' '}
            <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
