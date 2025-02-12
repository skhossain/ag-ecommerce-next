'use client';
import axios from "axios";
import React,{useEffect,useState} from 'react';

export function getCookie(name) {
    if (typeof document === 'undefined') return undefined; // Ensure it's client-side
    let value = `; ${document.cookie}`;
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const cookieValue = parts.pop();
        if (cookieValue) {
            return cookieValue.split(';').shift();
        }
    }
    return undefined; // Return undefined if the cookie is not found
}

export function getHeaders(){
    const [token, setToken] = useState(null);
    
    useEffect(() => { 
      setToken(localStorage.getItem('token'));
    }, []);
    const getHeaders = {
        headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
        },
        withCredentials: true
      }; 
    return getHeaders;
}


export function SetCookie(){
    let url = process.env.NEXT_PUBLIC_API_URL;
    if (!url) {
        console.error('NEXT_PUBLIC_API_URL is not defined in .env file');
        return undefined;
    }
    if (url.includes('/api')) {
        url = url.replace('/api', ''); // Remove '/api' if it exists
    }
    axios.get(`${url}/sanctum/csrf-cookie`, { withCredentials: true });

    const csrfToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];

    // Include the CSRF token in the request headers
    axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
}