import * as Web3 from 'web3'
import contractJSON from '../../contract/artifacts/contracts/BridgeFabric.sol/BridgeFabric.json'

export const OrderPaid = 'Paid, payment failed'
export const BalanceNotEnough = 'Your balance is insufficient'
export const PaySuccess = 'Payment successful'
export const StakeNodeSuccess = 'stake node successful'
export const SetNodePriceSuccess = 'set node price successful'

export const Error = 'Error parsing failed'

export const _connect = async() => {
  if (window.ethereum != null) {
    try {
      await window.ethereum.send('eth_requestAccounts')
      console.log(window.ethereum)
      const web3 = await new Web3(window.ethereum)
      const accounts = await web3.eth.getAccounts()
      console.log(accounts[0])
    } catch (error) {
      // err
    }
  } else {
    alert('Please install Metamask')
  }
}

const networks = {
  dev: {
    httpProvider: 'https://polygon-mumbai.infura.io/v3/2e6f863f2aca453ca82f6f7de72bed42'
  }
}

const contractAddress = '0x7Acd8C9B8f1dDe7d9E624d029622D541689b94d6'

const web3Init = async() => {
  let web3 = ''
  if (typeof window.ethereum !== 'undefined') {
  // if (typeof web3 !== 'undefined') {
    web3 = await new Web3(window.ethereum)
  } else {
    // set the provider you want from Web3.providers
    web3 = await new Web3(new Web3.providers.HttpProvider(networks.dev.httpProvider))
  }
  return web3
}

export const getNodePrice = async() => {
  const web3 = await web3Init()
  const accounts = await web3.eth.getAccounts()
  web3.eth.defaultAccount = accounts[0]
  const account = accounts[0]
  const abi = contractJSON
  const sbs = new web3.eth.Contract(abi, contractAddress, account)
  const nodes = await getNodes()
  if (!nodes || !nodes.length) {
    return
  }

  const nodePrices = []
  for (let i = 0; i < nodes.length; i++) {
    nodePrices.push({
      node: nodes[i],
      price: await sbs.methods.getNodePrice(nodes[i]).call()
    })
  }

  return nodePrices
}

export const getNodes = async() => {
  const web3 = await web3Init()
  const accounts = await web3.eth.getAccounts()
  web3.eth.defaultAccount = accounts[0]
  const account = accounts[0]
  const abi = contractJSON
  const contract = new web3.eth.Contract(abi, contractAddress, account).methods
  const nodes = await contract.getNodes().call()
  return nodes
}

export const stakeNode = async(node) => {
  const web3 = await web3Init()
  const accounts = await web3.eth.getAccounts()
  web3.eth.defaultAccount = accounts[0]
  const account = accounts[0]
  const abi = contractJSON
  const contract = new web3.eth.Contract(abi, contractAddress, account).methods
  try {
    const transaction = await contract.stake(node).call()
    await transaction.wait()
  } catch (error) {
    return handleErrorMsg(error)
  }
  return StakeNodeSuccess
}

export const setNodePrice = async(node, amount) => {
  const web3 = await web3Init()
  const accounts = await web3.eth.getAccounts()
  web3.eth.defaultAccount = accounts[0]
  const account = accounts[0]
  const abi = contractJSON
  const contract = new web3.eth.Contract(abi, contractAddress, account).methods
  try {
    const transaction = await contract.addPrice(node, amount).call()
    await transaction.wait()
  } catch (error) {
    return handleErrorMsg(error)
  }
  return SetNodePriceSuccess
}

export const countBuy = async(host, actor, count) => {
  const web3 = await web3Init()
  const accounts = await web3.eth.getAccounts()
  web3.eth.defaultAccount = accounts[0]
  const account = accounts[0]
  const abi = contractJSON
  const contract = new web3.eth.Contract(abi, contractAddress, account).methods
  try {
    const transaction = await contract.countBuy(host, actor, count).call()
    await transaction.wait()
  } catch (error) {
    return handleErrorMsg(error)
  }
  return PaySuccess
}

export const countCurrent = async(host, actor) => {
  const web3 = await web3Init()
  const accounts = await web3.eth.getAccounts()
  web3.eth.defaultAccount = accounts[0]
  const account = accounts[0]
  const abi = contractJSON
  const contract = new web3.eth.Contract(abi, contractAddress, account).methods
  const count = await contract.countCurrent(host, actor).call()
  return count
}

const handleErrorMsg = async(error) => {
  if (error.data !== undefined && error.data.message !== undefined) {
    return error.data.message
  } else if (error.message !== undefined) {
    return error.message
  } else if (error.error !== undefined && error.error.message !== undefined) {
    return error.error.message
  } else {
    return Error
  }
}

// =====

export const getBalance = async() => {
  const web3 = await web3Init()
  const accounts = await web3.eth.getAccounts()
  web3.eth.defaultAccount = accounts[0]
  const account = accounts[0]
  const abi = contractJSON.abi
  const sbs = new web3.eth.Contract(abi, contractAddress, account)
  const x = await sbs.methods.balanceOf(account).call()
  console.log(x)
}

export const getWallet = async(uid) => {
  const web3 = await web3Init()
  const accounts = await web3.eth.getAccounts()
  web3.eth.defaultAccount = accounts[0]
  const account = accounts[0]
  const abi = contractJSON.abi
  const sbs = new web3.eth.Contract(abi, contractAddress, account)
  const walletAddress = await sbs.methods.getWallet(uid).call()
  console.log(walletAddress)
  return walletAddress
}

export const bindWallet = async(uid) => {
  const web3 = await web3Init()
  const accounts = await web3.eth.getAccounts()
  web3.eth.defaultAccount = accounts[0]
  const account = accounts[0]
  const abi = contractJSON.abi
  const sbs = new web3.eth.Contract(abi, contractAddress, account)
  await sbs.methods.bindWallet(uid).send({ from: accounts[0] })
  getBalance()
}

export const changeWallet = async(uid) => {
  const web3 = await web3Init()
  const accounts = await web3.eth.getAccounts()
  web3.eth.defaultAccount = accounts[0]
  const account = accounts[0]
  const abi = contractJSON.abi
  const sbs = new web3.eth.Contract(abi, contractAddress, account)
  console.log(accounts[0])
  await sbs.methods.changeWallet(uid).send({ from: accounts[0] })
  getBalance()
}

export const payOrder = async(uuid, price) => {
  const web3 = await web3Init()
  const accounts = await web3.eth.getAccounts()
  web3.eth.defaultAccount = accounts[0]
  const account = accounts[0]
  const abi = contractJSON.abi
  const sbs = new web3.eth.Contract(abi, contractAddress, account)
  sbs.handleRevert = true
  if (await getOrder(uuid) === true) {
    return OrderPaid
  }
  try {
    await sbs.methods.clientOrder(uuid, price).send({ from: accounts[0] })
  } catch (error) {
    console.log(error)
    return 'Payment failed'
  }
  return 'ok'
}

export const getOrder = async(uuid) => {
  const web3 = await web3Init()
  const accounts = await web3.eth.getAccounts()
  web3.eth.defaultAccount = accounts[0]
  const account = accounts[0]
  const abi = contractJSON.abi
  const sbs = new web3.eth.Contract(abi, contractAddress, account)
  const x = await sbs.methods.checkOrder(uuid).call()
  console.log(uuid, x)
  return x
}
