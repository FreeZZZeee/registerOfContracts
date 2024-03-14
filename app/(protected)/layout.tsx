"use client"

import { useEffect } from "react";
import { Navbar } from "./_components/navbar";
import { useSession } from "next-auth/react";
import { useIdleTimer } from 'react-idle-timer'
import { logout } from "@/actions/logout";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    const { data: session, update } = useSession();
    const CHECK_SESSION_EXP_TIME = 300000; // 5 mins
    const SESSION_IDLE_TIME = 300000; // 5 mins 

    const onUserIdle = () => {
        //   console.log('IDLE');
    };

    const onUserActive = () => {
        //   console.log('ACTIVE');
    };

    const { isIdle } = useIdleTimer({
        onIdle: onUserIdle,
        onActive: onUserActive,
        timeout: SESSION_IDLE_TIME, //milliseconds
        throttle: 500
    });

    useEffect(() => {
        const checkUserSession = setInterval(() => {
            const expiresTimeTimestamp = Math.floor(new Date(session?.expires || '').getTime());
            const currentTimestamp = Date.now();
            const timeRemaining = expiresTimeTimestamp - currentTimestamp;
            let localContracts;

            // If the user session will expire before the next session check
            // and the user is not idle, then we want to refresh the session
            // on the client and request a token refresh on the backend
            if (!isIdle() && timeRemaining < CHECK_SESSION_EXP_TIME) {
                update(); // extend the client session

                // request refresh of backend token here

            } else if (timeRemaining < 0) {
                // session has expired, logout the user and display session expiration message                
                typeof window !== 'undefined' ? localContracts = JSON.parse(localStorage.getItem('contracts') as any) : null;

                if (localContracts) {
                    localStorage.removeItem('contracts');
                }

                logout();
            }
        }, CHECK_SESSION_EXP_TIME);

        return () => {
            clearInterval(checkUserSession);
        };
    }, [update]);

    return (
        <div className="h-full w-full flex flex-col gap-y-10 items-center 
        bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 relative">
            <Navbar />
            {children}
        </div>
    );
}

export default ProtectedLayout;