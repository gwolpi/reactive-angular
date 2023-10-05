export interface Currency {
	code: string;
	name: string;
	symbol: string;
}

export type Currencies = Currency[];

export namespace Currency {
	export const currencyMap: Record<string, Currency> = {
		USD: {
			code: 'USD',
			name: 'US Dollar',
			symbol: '$',
		},
		GBP: {
			code: 'GBP',
			name: 'British Pound',
			symbol: '£',
		},
		JPY: {
			code: 'JPY',
			name: 'Japanese Yen',
			symbol: '¥',
		},
	}
	export const currencies: Currencies = Object.values(currencyMap);
	export function getSymbol(code: string): string {
		return currencyMap[code]?.symbol ?? '?';
	}
}

