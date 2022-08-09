export const StakingABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddr",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_printmsg",
        type: "string",
      },
    ],
    name: "printMsg",
    type: "event",
  },
  {
    inputs: [],
    name: "idoTokenBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAddr",
        type: "address",
      },
    ],
    name: "isAlreadyStaked",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAdd",
        type: "address",
      },
    ],
    name: "maturityDate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ownerAddr",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_stakeAmount",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_stakeDurationIndex",
        type: "uint8",
      },
    ],
    name: "poolStake",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "toWallet",
        type: "address",
      },
    ],
    name: "retrieveBEP20TokenStuck",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_apyPercent_1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_apyPercent_2",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_apyPercent_3",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_apyPercent_4",
        type: "uint256",
      },
    ],
    name: "setApyPercent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_maturityTime_1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maturityTime_2",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maturityTime_3",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maturityTime_4",
        type: "uint256",
      },
    ],
    name: "setMaturityTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAdd",
        type: "address",
      },
    ],
    name: "stakeTimeRemaining",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "stakersDataset",
    outputs: [
      {
        internalType: "uint256",
        name: "stackDuration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "stackAmount",
        type: "uint256",
      },
      {
        internalType: "uint40",
        name: "deposit_time",
        type: "uint40",
      },
      {
        internalType: "uint256",
        name: "apy",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalStaked",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
