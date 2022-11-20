import { Web3Storage } from 'web3.storage'
import request from `./request.js`

const VUE_APP_WEB3STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGU5RThiYzBGNUQzZjFmNDRmN2I2NkI3NmJkRDQ5YzZCOGUwMDkxMjAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njg4NTU4OTI3MDEsIm5hbWUiOiJmZXZtIn0.kja3kVHLmf9rw9pKSzAVrSZATCnso7_emOf3CfT7SRQ'

function getAccessToken() {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  const token = VUE_APP_WEB3STORAGE_TOKEN
  return token
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}

export async function get(cid) {
  const client = makeStorageClient()
  const res = await client.get(cid)
  if (!res.ok) {
    throw new Error(`failed to get ${cid}`)
  }
  const files = await res.files()
  for (const file of files) {
    console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
    debugger
  }
}

export async function getFromIPFSIO(cid) {
    request()
}

export function makeFileObjects(obj) {
  // You can create File objects from a Blob of binary data
  // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!
//   const obj = { hello: 'world' }
  const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })

  const files = [
    new File([blob], 'description.json')
  ]
  return files
}

export async function storeFiles(files) {
  const client = makeStorageClient()
  const cid = await client.put(files)
  console.log('stored files with cid:', cid)
  return cid
}

export async function storeObj(obj) {
  const client = makeStorageClient()
  const files = makeFileObjects(obj)
  const cid = await client.put(files)
  console.log('stored files with cid:', cid)
  return cid
}

async function checkStatus(cid) {
  const client = makeStorageClient()
  const status = await client.status(cid)
  console.log(status)
  if (status) {
    // your code to do something fun with the status info here
  }
}

// replace with your own CID to see info about your uploads!
checkStatus('bafybeidu62bhmkp6me4itdiqw6qxasl3xrnlcmfvc4zph5xax4o3cxzr5q')

get('bafybeidu62bhmkp6me4itdiqw6qxasl3xrnlcmfvc4zph5xax4o3cxzr5q')
