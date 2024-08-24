import Image from "next/image";
import NavBar from "./components/NavBar";
import Web3Display from "./components/Web3Display";


export default function Home() {
  // const web3 = new Web3(window.ethereum);
  // var blockNumber = web3.eth.blockNumber;
  return (
    <div>
      <NavBar/>
      <Web3Display/>
    </div>
  );
}
