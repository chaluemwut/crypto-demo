'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import instance from "../api/instance";

export default function Dashboard() {
    const router = useRouter();
    const [coins, setCoins] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token == undefined) {
            router.replace('/')
        }
        instance.get('/user-coin/list').then((res) => {
            setCoins(res.data)
        })
    }, [])

    return (<div>
        <div>
            {coins.map((e) => <div>{e['address']} {e['currency']}</div>)}
        </div>
    </div>);
}