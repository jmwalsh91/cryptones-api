
export const validateSymbol = async (symbol: string): Promise<boolean> => {
   const validSymbols: string[] = ['SOL', 'BTC', 'ETH', 'DOT', 'ALGO']
    const isValid: boolean = validSymbols.some(validToken => validToken === symbol)
    return isValid
}

export const validateInterval = async (symbol: string): Promise<boolean> => {
    const validSymbols: string[] = ['1min', '5min', '15min', '30min', '60min']
     const isValid: boolean = validSymbols.some(validToken => validToken === symbol)
     return isValid
 }