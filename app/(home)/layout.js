'use client';
import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "react-redux";
import store from "../../store";
import "../globals.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        </Provider>
        
      </body>
    </html>
  );
}
