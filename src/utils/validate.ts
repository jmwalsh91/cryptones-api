
const validate = async (symbol: string): Promise<boolean> => {
   const validSymbols: string[] = ['SOL', 'BTC', 'ETH', 'DOT', 'ALGO']
    const isValid: boolean = validSymbols.some(validToken => validToken === symbol)
    return isValid
}