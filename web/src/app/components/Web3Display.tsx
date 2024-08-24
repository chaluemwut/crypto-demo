'use client';
import { useEffect, useState } from 'react'
import { Web3 } from 'web3'
const moment = require('moment');

export default function Web3Display() {
    const [strLastBlock, setStrLastBlock] = useState('');

    useEffect(() => {
        fetchWeb3LastBlock()
    }, [])

    const fetchWeb3LastBlock = async () => {
        const web3 = new Web3()
        const latestBlock = await web3.eth.getBlockNumber()
        const block = await web3.eth.getBlock(latestBlock)
        const timestamp = Number(block['timestamp']) * 1000;
        const formattedDate = moment(timestamp).format('MMMM-DD-YYYY hh:mm:ss A');
        setStrLastBlock(`writing ${formattedDate} +UTC block number is ${latestBlock}`)
    }



    return (<div>
        <div>
            <h1 className='text-center text-2xl'>{strLastBlock}</h1>
        </div>
    </div>)
}