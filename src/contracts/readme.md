# Contracts

Store your contract ABIs or other deployment details in this folder.

## Standard Contracts

- `FileStorage.sol`: Handles access control and storage verification
- `TokenRegistry.sol`: Manages payment and subscription tracking
- `OrganizationRegistry.sol`: Manages organization membership and permissions

## Usage

Import ABI files into your frontend to interact with deployed contracts:

```javascript
import FileStorageABI from './abis/FileStorage.json';
```

## Development

Deploy contracts using Hardhat or Truffle to test networks before production.