import { useState, useEffect, useRef } from "react";
import iconSearch from "../../assets/Dashboard/iconSearch.svg";
import iconNotifications from "../../assets/Dashboard/iconNotifications.svg";
function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const notificationRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleNotificationDropdown = () => {
        setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
            setIsNotificationDropdownOpen(false);
        }
    };

    useEffect(() => {
        // Thêm sự kiện lắng nghe khi component được mount
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Xóa sự kiện lắng nghe khi component unmount
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return ( 
        <>
        <div className="bg-white border-b px-14 py-5">
            <div className="flex justify-end gap-10">
                <img src={iconSearch} alt="Search" />
                <div className="relative inline-block text-left" ref={notificationRef}>
                    <img
                        className="cursor-pointer"
                        src={iconNotifications}
                        alt="Notifications"
                        onClick={toggleNotificationDropdown}
                    />
                    {isNotificationDropdownOpen && (
                        <div className="absolute right-0 z-10 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div role="none">
                                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#003F62] hover:text-white rounded">
                                    Thông báo 1
                                </div>
                                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#003F62] hover:text-white rounded">
                                    Thông báo 2
                                </div>
                                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#003F62] hover:text-white rounded">
                                    Thông báo 3
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="relative inline-block text-left" ref={dropdownRef}>
                    <div>
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center space-x-2 text-gray-700"
                        >
                            <span>Admin</span>
                            <svg
                                className="-mr-1 ml-2 h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute right-0 z-10 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div role="none">
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm hover:bg-[#003F62] hover:text-white rounded"
                                >
                                    Logout
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
     );
}

export default Navbar;