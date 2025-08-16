import { useEffect, useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { finduser } from '../utils/indexDB';
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { AnimateLogo } from './motion/animation';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Login', href: '/login' },
  { name: 'Signup', href: '/signup' },

]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUser] = useState([]);

  useEffect(() => {
    async function loaduser() {
      const userEmail = localStorage.getItem('currentUserEmail');
      if (userEmail) {
        const user = await finduser(userEmail);
        setUser(user[0]);
      }
    }
    loaduser();
  }, []);

  return (
    <div className="bg-white shadow-xl">
      <header className="inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <AnimateLogo>
              <img
                
                alt="Expense"
                src="./logo.png"
                className="h-14 w-auto"
              />
              </AnimateLogo>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="font-semibold text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="/login" className="text-sm font-semibold text-gray-900 flex items-center">
              {userData.email ? <div>
                <p className='font-semibold text-lg text-center'>{userData.name} </p>
                <p>{userData.email} </p>
              </div> : "Log in"}
              <span className={userData.email ? "text-3xl" : ""} aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden ">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-slate-200 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 transition-all duration-300">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <AnimateLogo>
                <img
                  alt="Expense"
                  src="logo.png"
                  className="h-8 w-auto"
                />
                </AnimateLogo>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {userData?.email ? userData.email : "Log in"}
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  )
}