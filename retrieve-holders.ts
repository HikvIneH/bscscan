import { ethers } from 'ethers';
import { address } from './address';
import { BscscanProvider } from './bscscan-provider';
import { abi } from './abi';

class RetrieveHolders {
  async get(): Promise<any> {
    const contractToken = '0x250b211ee44459dad5cd3bca803dd6a7ecb5d46c';

    const provider = new BscscanProvider('mainnet');

    const contract = new ethers.Contract(contractToken, abi, provider);

    for (let i = 0; i < address.length; i++) {
      const addr = address[i];
      const balances = await contract.balanceOf(addr);

      console.log(`${addr} ${balances}`);
    }
  }
}

const start = new RetrieveHolders();
start.get();
