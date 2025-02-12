'use client';
import React,{useEffect} from 'react';
import "../../globals.css";
import Header from './Components/Header';
import Footer from './Components/Footer';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RootLayout = ({ children }) => {
    const router = useRouter();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'admin') {
            router.push('/');
        }
    }, []);
    
    return (
        <html lang="en">
            <body className="font-sans antialiased">
                <div className="min-h-screen flex flex-col">
                    <Header />
                    <div className="flex flex-1">
                        <aside className="w-40 bg-gray-800 text-white p-4 border-r">
                            <nav>
                                <ul>
                                    <li className="mb-4">
                                        <Link href="/admin" className="text-gray-400 hover:text-white">Dashboard</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href="/admin/categories" className="text-gray-400 hover:text-white">Categories</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href="/admin/products" className="text-gray-400 hover:text-white">Products</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href="/admin/orders" className="text-gray-400 hover:text-white">Orders</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href="#" className="text-gray-400 hover:text-white">Customers</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href="#" className="text-gray-400 hover:text-white">Reports</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href="#" className="text-gray-400 hover:text-white">Settings</Link>
                                    </li>
                                </ul>
                            </nav>
                        </aside>
                        <main className="w-full bg-gray-100 dark:bg-gray-800 dark:text-white">
                            {children}
                        </main>
                    </div>
                    <Footer />
                </div>
            </body>
        </html>
    );
};

export default RootLayout;