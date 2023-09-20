import { ethers } from 'ethers';
import erc721Abi from './abi/erc721-abi.json';

export class EtherErc721Util {
	private contractAddress: string;

	private abi = erc721Abi;

	constructor(contractAddress: string) {
		this.contractAddress = contractAddress;
	}

	async getMintPrice(signer: ethers.JsonRpcSigner): Promise<bigint> {
		const contract = new ethers.Contract(
			this.contractAddress,
			this.abi,
			signer
		);
		const result = await contract.mintPrice();
		return BigInt(result);
	}
}
