import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const stakeFarm = async (lpContract, localFarmAddress, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  // if (pid === 0) {
  //   const tx = await masterChefContract.enterStaking(value, options)
  //   const receipt = await tx.wait()
  //   return receipt.status
  // }

  const tx = await lpContract.transfer(localFarmAddress, value, options)
  const receipt = await tx.wait()
  return receipt.status
}

export const unstakeFarm = async (localFarmContract, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  // if (pid === 0) {
  //   const tx = await masterChefContract.leaveStaking(value, options)
  //   const receipt = await tx.wait()
  //   return receipt.status
  // }

  const tx = await localFarmContract.withdraw(value, options)
  const receipt = await tx.wait()
  return receipt.status
}

export const harvestFarm = async (lpContract, localFarmAddress) => {
  // if (pid === 0) {
  //   const tx = await await masterChefContract.leaveStaking('0', options)
  //   const receipt = await tx.wait()
  //   return receipt.status
  // }

  const tx = await lpContract.transfer(localFarmAddress, '0', options)
  const receipt = await tx.wait()

  return receipt.status
}
