import { Currency, ETHER, Token } from '@soy-libs/sdk2'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return 'CLO'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
