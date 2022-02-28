import BigNumber from 'bignumber.js'
import { getPmoonVaultContract } from 'utils/contractHelpers'

const cakeVaultContract = getPmoonVaultContract()

const fetchVaultUser = async (account: string) => {
  try {
    const userContractResponse = await cakeVaultContract.userInfo(account)
    return {
      isLoading: false,
      userShares: new BigNumber(userContractResponse.shares.toString()).toJSON(),
      lastDepositedTime: userContractResponse.lastDepositedTime.toString(),
      lastUserActionTime: userContractResponse.lastUserActionTime.toString(),
      pmoonAtLastUserAction: new BigNumber(userContractResponse.pmoonAtLastUserAction.toString()).toJSON(),
    }
  } catch (error) {
    return {
      isLoading: true,
      userShares: null,
      lastDepositedTime: null,
      lastUserActionTime: null,
      pmoonAtLastUserAction: null,
    }
  }
}

export default fetchVaultUser
