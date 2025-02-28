import { ethers } from 'ethers';

// Web3 connection helper
export async function connectWallet(): Promise<string | null> {
  if (!window.ethereum) {
    console.error('No Ethereum provider found');
    return null;
  }
  
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    return accounts[0];
  } catch (error) {
    console.error('Error connecting to wallet:', error);
    return null;
  }
}

// Example of fetching contract information
export async function fetchContractStorage(contractAddress: string): Promise<number> {
  if (!window.ethereum) return 0;
  
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    contractAddress,
    ['function getAvailableStorage() view returns (uint256)'],
    provider
  );
  
  try {
    return await contract.getAvailableStorage();
  } catch (error) {
    console.error('Error fetching contract storage:', error);
    return 0;
  }
}

// IPFS utilities
export async function getIpfsUrl(cid: string): Promise<string> {
  return `https://gateway.ipfs.io/ipfs/${cid}`;
}

// Encryption utilities
export async function generateEncryptionKey(): Promise<string> {
  const key = await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );
  
  const exported = await window.crypto.subtle.exportKey('raw', key);
  const exportedKeyBuffer = new Uint8Array(exported);
  return Array.from(exportedKeyBuffer)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// JWT helpers
export function parseJwt(token: string): any {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const decoded = parseJwt(token);
  if (!decoded) return true;
  return decoded.exp * 1000 < Date.now();
}