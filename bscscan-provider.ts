import type { Networkish } from '@ethersproject/networks';

import * as providers from '@ethersproject/providers';

import { Logger } from '@ethersproject/logger';
import { version } from 'ethers';

import dotenv = require('dotenv');

const { parsed } = dotenv.config({
  path: `${process.cwd()}/.env`,
});
process.env = { ...parsed, ...process.env };

const logger = new Logger(version);

const defaultApiKey = process.env.API_KEY;

export class BscscanProvider extends providers.EtherscanProvider {
  constructor(networkName?: 'mainnet' | 'testnet', apiKey?: string) {
    let network: Networkish = 'invalid';
    switch (networkName) {
      case 'mainnet':
        network = {
          name: 'bsc-mainnet',
          chainId: 0x38,
        };
        break;
      case 'testnet':
        network = {
          name: 'bsc-testnet',
          chainId: 0x61,
        };
        break;
    }

    super(network, apiKey || defaultApiKey);
  }

  getBaseUrl(): string {
    switch (this.network ? this.network.name : 'invalid') {
      case 'bsc-mainnet':
        return 'http://api.bscscan.com';
      case 'bsc-testnet':
        return 'http://api-testnet.bscscan.com';
    }

    return logger.throwArgumentError('unsupported network', 'network', name);
  }

  isCommunityResource(): boolean {
    return this.apiKey === defaultApiKey;
  }
}
