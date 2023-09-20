import { ethers } from 'ethers';
import erc20Abi from './abi/erc20-abi.json';

export class EtherErc20Util {
	private contractAddress: string;

	private abi = erc20Abi;

	constructor(contractAddress: string) {
		this.contractAddress = contractAddress;
	}

	async balanceOf(signer: ethers.JsonRpcSigner): Promise<bigint> {
		const contract = new ethers.Contract(
			this.contractAddress,
			this.abi,
			signer
		);
		const result = await contract.balanceOf(signer?.address);
		return BigInt(result);
	}

	async increaseAllowance(
		signer: ethers.JsonRpcSigner,
		amount: bigint,
		toAddress: string
	) {
		const contract = new ethers.Contract(
			this.contractAddress,
			this.abi,
			signer
		);
		try {
			const result = await contract.increaseAllowance(toAddress, amount);
			console.log(result);
		} catch (e) {
			console.log(e);
		}
	}

	async decreaseAllowance(
		signer: ethers.JsonRpcSigner,
		amount: bigint,
		toAddress: string
	) {
		const contract = new ethers.Contract(
			this.contractAddress,
			this.abi,
			signer
		);
		try {
			const result = await contract.decreaseAllowance(toAddress, amount);
			console.log(result);
		} catch (e) {
			console.log(e);
		}
	}

	async getAllowance(
		signer: ethers.JsonRpcSigner,
		fromAddress: string,
		toAddress: string
	) {
		const contract = new ethers.Contract(
			this.contractAddress,
			this.abi,
			signer
		);

		const result = await contract.allowance(fromAddress, toAddress);
		return BigInt(result);
	}
}
