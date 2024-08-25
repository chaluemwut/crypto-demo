'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import instance from "../api/instance";
import Image from 'next/image'
import NavBar from "../components/NavBar";

export default function Dashboard() {
    const router = useRouter();
    const [coins, setCoins] = useState([])
    const [address, setAddress] = useState('')
    const [coinSelectName, setCoinSelectName] = useState('ethereum')
    const [isLoad, setLoad] = useState(false)

    const coinList = [
        {
            'name': 'ethereum',
            'image': require('../../../images/ethereum.svg')
        },
        {
            'name': 'btc',
            'image': require('../../../images/btc.svg')
        },
        {
            'name': 'polygon',
            'image': require('../../../images/polygon.svg')
        },
        {
            'name': 'stargaze',
            'image': require('../../../images/stargaze.png')
        }
    ]

    const fetchData = () => {
        setLoad(true)
        instance.get('/user-coin/list').then((res) => {
            setCoins(res.data)
            setLoad(false)
        })
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token == undefined) {
            router.replace('/')
        }
        fetchData()
    }, [])

    const coinImage = (id: string, size: number = 64) => {
        const img = coinList.find((e) => e['name'] == id)?.image
        return <Image src={img} alt={id} width={size} height={size} />
    }

    const onAddTracker = async () => {
        const res = await instance.post('/user-coin/save', { network: coinSelectName, address: address })
        fetchData()
    }

    const handleInput = (e: { target: { name: any; value: any; }; }) => {
        setAddress(e.target.value);
    }

    return (<div>
        {isLoad && <div>
            <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center" style={{ background: "rgba(0, 0, 0, 0.3)" }}>
                <div className="bg-white border py-2 px-5 rounded-lg flex items-center flex-col">
                    <div className="loader-dots block relative w-20 h-5 mt-2">
                        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-gray-500 text-xs font-medium mt-2 text-center">
                        Connecting to client...
                    </div>
                </div>
            </div>
        </div>}

        <NavBar/>

        <div style={{ marginLeft: '5%', marginRight: '5%', marginTop: '1%' }}>
            <div className="grid grid-rows-1 grid-flow-col gap-4">
                {coinList.map((e) => {
                    return <div style={{ cursor: 'pointer' }} onClick={() => setCoinSelectName(e['name'])}>
                        <div>{coinImage(e['name'])}</div>
                        <div className={(e['name'] == coinSelectName) ? 'text-blue-600' : 'text-blue-600/50'} style={{ marginTop: '10px' }}>
                            {e['name']}</div>
                    </div>
                })}
            </div>
        </div>
        <div style={{ marginLeft: '5%', marginRight: '5%', marginTop: '20px' }}>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Address
                </label>
                <input
                    value={address}
                    onChange={handleInput}
                    type="text" id="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0x2260fac5e5542a773aa44fbcfedf7c193bc2c599" required />
            </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
                onClick={onAddTracker}
                className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Add tracker
            </button>
        </div>
        <div>
            <div style={{ marginLeft: '5%', marginRight: '5%', marginTop: '20px' }} className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3" style={{ textAlign: 'center' }}>
                                Logo
                            </th>
                            <th scope="col" className="px-6 py-3" style={{ textAlign: 'center' }}>
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3" style={{ textAlign: 'center' }}>
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3" style={{ textAlign: 'center' }}>
                                Profit/loss
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {coins.map((e) => {
                            return <tr>
                                <td>
                                    <center>{coinImage(e['coinName'], 16)}</center>
                                </td>
                                <td style={{ textAlign: 'center' }}>{e['coinName']}</td>
                                <td style={{ textAlign: 'center' }}>{e['price']}</td>
                                <td style={{ textAlign: 'center' }} className={(Number(e['profitLoss']) < 0) ? 'text-rose-600' : 'text-green-600'}>{e['profitLoss']}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    </div>);
}