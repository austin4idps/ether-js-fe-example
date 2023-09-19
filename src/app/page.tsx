'use client'; // This is a client component 👈🏽
import { EtherErc20Util } from '@/util/ether-erc20.util';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export default function Home() {
	// amount
	const [balance, setBalance] = useState<bigint>(BigInt(0));
	const [amount, setAmount] = useState(BigInt(0));
	const [allowance, setAllowance] = useState(BigInt(0));
	// boolean
	const [isConnected, setIsConnected] = useState(false);
	const [hasMetamask, setHasMetamask] = useState(false);
	// signer related
	const [walletAddress, setWalletAddress] = useState<string | null>(null);
	const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);

	useEffect(() => {
		if (typeof window.ethereum !== 'undefined') {
			setHasMetamask(true);
		}
	}, []);

	async function connect() {
		if (typeof window.ethereum !== 'undefined') {
			try {
				await window.ethereum.request({ method: 'eth_requestAccounts' });
				setIsConnected(true);
				const provider = new ethers.BrowserProvider(window.ethereum);
				const signer = await provider.getSigner();
				setSigner(signer);
				setWalletAddress(signer.address);
			} catch (e) {
				console.log(e);
			}
		} else {
			setIsConnected(false);
		}
	}

	async function getBalance() {
		if (!!signer) {
			const contractAddress = '0x5d347E3c00261a6306578DA5c9640D54c97f8C3F';
			const etherUtil = new EtherErc20Util(contractAddress);
			const number = await etherUtil.balanceOf(signer);
			if (number > 0) {
				setBalance(number);
				return balance;
			}
		}
	}

	async function increaseAllowance() {
		if (!!signer) {
			const contractAddress = '0x5d347E3c00261a6306578DA5c9640D54c97f8C3F';
			const etherUtil = new EtherErc20Util(contractAddress);
			await etherUtil.increaseAllowance(signer, amount, contractAddress);
		}
	}

	async function getAllowance() {
		if (!!signer && !!walletAddress) {
			const contractAddress = '0x5d347E3c00261a6306578DA5c9640D54c97f8C3F';
			const etherUtil = new EtherErc20Util(contractAddress);
			const number = await etherUtil.getAllowance(
				signer,
				walletAddress,
				contractAddress
			);
			if (number > 0) {
				setAllowance(number);
				return allowance;
			}
		}
	}
	return (
		<div className="bg-slate-800 h-screen flex items-center justify-center text-white">
			<div className="flex flex-col items-center justify-center ">
				<div className="p-10">
					{hasMetamask ? (
						isConnected ? (
							'Connected! '
						) : (
							<button
								className="border rounded-md cursor-pointer px-1 py-2 bg-blue-600 text-white"
								onClick={() => connect()}
							>
								Connect
							</button>
						)
					) : (
						'Please install metamask'
					)}
				</div>
				<div className="flex items-center justify-center w-full">
					<p className="mr-auto">
						{walletAddress ? (
							<span>
								{walletAddress} | Balance: ${balance.toString()}
							</span>
						) : (
							''
						)}
					</p>
					<p>
						{' '}
						{isConnected ? (
							<button
								className="border rounded-md cursor-pointer px-1 py-2 bg-red-600 ml-4
								"
								onClick={getBalance}
							>
								Get-Balance
							</button>
						) : (
							''
						)}
					</p>
				</div>
				<div className="flex items-center justify-center w-full mt-4">
					{isConnected ? (
						<>
							<label htmlFor="amountInput" className="mr-2">
								Allowance:
							</label>
							<input
								id="amountInput"
								type="number"
								className="mr-auto text-black border rounded-md"
								onChange={(e) => {
									setAmount(BigInt(e.target.value));
								}}
							/>
							<button
								className="border rounded-md cursor-pointer px-1 py-2 bg-red-600"
								onClick={increaseAllowance}
							>
								increaseAllowance
							</button>
						</>
					) : (
						''
					)}
				</div>

				<div className="flex items-center justify-center w-full mt-4">
					<p>
						{walletAddress ? (
							<span>
								{walletAddress} | Allowance: ${allowance.toString()}
							</span>
						) : (
							''
						)}
					</p>
					<p className="mb-4">
						{' '}
						{isConnected ? (
							<button
								className="border rounded-md cursor-pointer px-1 py-2 bg-red-600 ml-4
								"
								onClick={getAllowance}
							>
								Get-Allowance
							</button>
						) : (
							''
						)}
					</p>
				</div>
			</div>
		</div>
	);
}
