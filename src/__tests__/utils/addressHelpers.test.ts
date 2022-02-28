import { getAddress } from 'utils/addressHelpers'

describe('getAddress', () => {
  const address = {
    820: '0xC9E0c4FB9f9C37d239C703BFB6DfE49C31361bd1',
    20729: '0xC9E0c4FB9f9C37d239C703BFB6DfE49C31361bd1',
  }

  it(`get address for mainnet (chainId 820)`, () => {
    process.env.REACT_APP_CHAIN_ID = '820'
    const expected = address[820]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for testnet (chainId 20729)`, () => {
    process.env.REACT_APP_CHAIN_ID = '20729'
    const expected = address[97]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for any other network (chainId 31337)`, () => {
    process.env.REACT_APP_CHAIN_ID = '31337'
    const expected = address[820]
    expect(getAddress(address)).toEqual(expected)
  })
})
