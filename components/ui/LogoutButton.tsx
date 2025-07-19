"use client"
import { redirect } from 'next/navigation';
import React from 'react'

const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    redirect("/sign-in");
}

const LogoutButton = () => {
    return (
        <button className='cursor-pointer' onClick={handleLogout}>Logout</button>
    )
}

export default LogoutButton