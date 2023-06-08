import type { SafeEventEmitterProvider } from "@web3auth/base";
import { BigNumber, ethers } from "ethers";

export default class EthereumRpc {
  private provider: SafeEventEmitterProvider;
  private ethersProvider: ethers.providers.Web3Provider;

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider;
    this.ethersProvider = new ethers.providers.Web3Provider(provider);
  }

  async getChainId(): Promise<any> {
    try {
      // Get the connected Chain's ID
      const networkDetails = await this.ethersProvider.getNetwork();
      return networkDetails.chainId;
    } catch (error) {
      throw error.message;
    }
  }

  async getAccounts(): Promise<any> {
    try {
      const signer = this.ethersProvider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();

      return address;
    } catch (error) {
      throw error.message;
    }
  }

  async getBalance(): Promise<BigNumber> {
    try {
      const address = await this.getAccounts();
      const balance = await this.ethersProvider.getBalance(address);

      return balance;
    } catch (error) {
      throw error.message;
    }
  }

  async signMessage() {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      const originalMessage = "YOUR_MESSAGE";

      // Sign the message
      const signedMessage = await signer.signMessage(originalMessage);

      return signedMessage;
    } catch (error) {
      return error as string;
    }
  }

  async getPrivateKey(): Promise<any> {
    try {
      const privateKey = await this.provider.request({
        method: "eth_private_key"
      });

      return privateKey;
    } catch (error) {
      throw error.message;
    }
  }
}
