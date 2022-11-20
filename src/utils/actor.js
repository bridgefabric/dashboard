const abi = require('../../contract/artifacts/contracts/ActorMarket.json')
const ethers = require('ethers')
const w3s = require('./w3s')
export const Success = 'successful'

export const Error = 'Error parsing failed'

const providerInit = async() => {
  let provider = ''
  if (typeof window.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', []) // <- this promps user to connect metamask
  } else {
    // set the provider you want from Web3.providers
    alert('Please install MetaMask')
  }
  return provider
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

const contractAddress = '0x60Af9e11e2b72F87264959A51cb12251fe8B41d5'

export const getActors = async() => {
  const provider = await providerInit()
  const contract = new ethers.Contract(contractAddress, abi, provider)
  const nodes = await getActorCidList()
  if (!nodes || !nodes.length) {
    return
  }

  const actors = []
  for (let i = 0; i < nodes.length; i++) {
    const descCidInfo = await contract.getActor(nodes[i])
    const descCid = descCidInfo.desCid
    const des = await w3s.getFromIPFSIO(descCid)
    // todo get desc form filecoin
    actors.push({
      cid: nodes[i],
      desc: des.data.desc,
      name: des.data.name
    })
  }

  return actors
}

export const getActorCidList = async() => {
  const provider = await providerInit()
  // await provider.send('eth_requestAccounts', [])
  const contract = new ethers.Contract(contractAddress, abi, provider)
  const cids = await contract.getActorIds()
  return cids
}

export const addActor = async(actorCid, descCid) => {
  const provider = await providerInit()
  const signer = provider.getSigner()
  const contract = new ethers.Contract(contractAddress, abi, signer)
  try {
    const transaction = await contract.addActor(actorCid, descCid)
    await transaction.wait()
  } catch (error) {
    return handleErrorMsg(error)
  }
  return Success
}
