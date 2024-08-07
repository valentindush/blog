"use client"

import Link from "next/link";
import { useAuth } from "../utils/providers/AuthProvider";
import { FiLogOut, FiUser } from 'react-icons/fi';
import { useState } from 'react';

export default function HeaderNav() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="px-8 py-4 shadow-md shadow-gray-200 flex items-center justify-between w-full sticky top-0 bg-white backdrop-blur-sm z-10">
            <Link href={'/'} className="font-bold text-xl text-gray-600">
                BLOG APP
            </Link>
            <div className="flex items-center space-x-4">
                {user ? (
                    <div className="relative flex items-center gap-3">
                      <Link href="/home" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                        Manage
                    </Link>
                        <button
                            onClick={toggleMenu}
                            className="flex items-center bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-300"
                        >
                            <FiUser className="text-gray-600 mr-2" />
                            <span className="text-gray-800 font-medium">{user.username}</span>
                        </button>
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-[10rem] w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                                <div className="p-4 border-b border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <FiUser className="text-gray-600" />
                                        <div>
                                            <p className="font-semibold text-gray-800">{user.username}</p>
                                            <p className="text-sm text-gray-600">{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center py-2 px-4 text-red-600 hover:bg-red-100 transition duration-300"
                                >
                                    <FiLogOut className="mr-2" /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link href="/auth/login" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                        Sign in
                    </Link>
                )}
            </div>
        </div>
    );
}
