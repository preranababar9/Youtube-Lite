import React, { useContext, useState } from "react";

//Importing components and hooks from the "react-router-dom" library
import { Link, useLocation, useNavigate } from "react-router-dom";
// component uses useLocation to access the current location information
// and display the pathname and query parameters.

// images are imported from image folder
import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";

// Importing various icons from different libraries
import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

import { Context } from "../context/contextApi";

// Importing a custom Loader component
import Loader from "../shared/loader";

//// Creating a functional component named Header
const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");//iniatialized with 
    //empty strings

    const { loading, mobileMenu, setMobileMenu } = useContext(Context);

    const navigate = useNavigate();

    // Defining a function 'searchQueryHandler' that takes an event parameter
    const searchQueryHandler = (event) => {

/*// Checking if the event is triggered by the "Enter" key or a "searchButton"
 event and if the searchQuery has a length greater than 0*/
        if (
            (event?.key === "Enter" || event === "searchButton") &&
            searchQuery?.length > 0
        ) {
/*If the conditions are met, navigating to a new URL path based on the searchQuery*/
            navigate(`/searchResult/${searchQuery}`);
        }
    };

    const mobileMenuToggle = () => {
        setMobileMenu(!mobileMenu);
    };

    // pathname represents the current URL path
    const { pathname } = useLocation();
    const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

/*Uses the optional chaining (?.) to safely access properties, preventing errors 
if pathname is undefined.
pathname?.split("/") splits the pathname into an array using "/" as a separator.
.filter(Boolean) removes any empty strings from the array.
.?[0] takes the first element of the resulting array.
The pageName variable now holds the first part of the URL path, which might be 
interpreted as the name of the current page or route.
const pageName = pathname?.split("/")?.filter(Boolean)?.[0];*/

    //html part and styling using tailwind css
    return (
        <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-black dark:bg-black">
            {loading && <Loader />}

    <div className="flex h-5 items-center">
        {pageName!== "video" && (
             <div
               className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
                onClick={mobileMenuToggle}
                 >
                 {mobileMenu ? (
                  <CgClose className="text-white text-xl" />
                 ) : (
                  <SlMenu className="text-white text-xl" />
                    )}
                    </div>
                )}
                <Link to="/" className="flex h-5 items-center">
                    <img
                        className="h-full hidden md:block"
                        src={ytLogo}
                        alt="Youtube"
                    />
                    <img
                        className="h-full md:hidden"
                        src={ytLogoMobile}
                        alt="Youtube"
                    />
                </Link>
            </div>
            <div className="group flex items-center">
                <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
                    <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
                        <IoIosSearch className="text-white text-xl" />
                    </div>
                    <input
                        type="text"
                        className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyUp={searchQueryHandler}
                        placeholder="Search"
                        value={searchQuery}
                    />
                </div>
                <button
                    className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]"
                    onClick={() => searchQueryHandler("searchButton")}
                >
                    <IoIosSearch className="text-white text-xl" />
                </button>
            </div>
            <div className="flex items-center">
                <div className="hidden md:flex">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                        <RiVideoAddLine className="text-white text-xl cursor-pointer" />
                    </div>
                    <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                        <FiBell className="text-white text-xl cursor-pointer" />
                    </div>
                </div>
                <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4">
                    <img src="https://xsgames.co/randomusers/assets/avatars/female/67.jpg" />
                </div>
            </div>
        </div>
    );
};

export default Header;