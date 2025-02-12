'use client';
import React,{useEffect} from 'react';
import "../../globals.css";
import Header from './Components/Header';
import Footer from './Components/Footer';
import { useRouter } from 'next/navigation';

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
                                        <a href="/admin/dashboard" className="text-gray-400 hover:text-white">Dashboard</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="/admin/categories" className="text-gray-400 hover:text-white">Categories</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="/admin/products" className="text-gray-400 hover:text-white">Products</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="/admin/orders" className="text-gray-400 hover:text-white">Orders</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="/admin/customers" className="text-gray-400 hover:text-white">Customers</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="/admin/reports" className="text-gray-400 hover:text-white">Reports</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="/admin/settings" className="text-gray-400 hover:text-white">Settings</a>
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