import { useEffect, useState } from "react";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Update the HTML element class based on the mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <section className="mt-5 sm:mt-[3rem] w-full md:w-[700px] lg:w-[800px] mx-auto">
      <div className="flex justify-between items-center px-5 sm:px-8">
        <h1 className="text-2xl font-bold dark:text-white">devfinder</h1>
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="flex items-center space-x-2 text-sm sm:text-base font-bold dark:text-gray-300"
        >
          <span>{darkMode ? "Light" : "Dark"}</span>
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </section>
  );
};

export default Navbar;
