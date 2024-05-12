'use client'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { userType } from '@/app/constants/type';
const userContext = createContext<userType|null>(null);

export const UserData = ({ children }: { children: React.ReactNode }) => {
    const session = useSession();
    const id = session.data?.user?.id;
    const [userData, setUserData] = useState<userType|null>(null);
    const [initialLoad, setInitialLoad] = useState<boolean>(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const response = await axios.get(`/api/profiler/${id}`);
                    console.log(response.data);
                    setUserData(response.data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        // if (initialLoad || userData) {
            // fetchData();
            // setInitialLoad(false);
        // }
        if (id && !userData) {
            fetchData();
        }
        
    }, [id,userData]);

    return (
        <userContext.Provider value={userData}>
            {children}
        </userContext.Provider>
    );
};

export const useUser = () => useContext(userContext);
