import { CharCode } from "./charCode";

export function compareSubstring(a: string, b: string, aStart: number = 0, aEnd: number = a.length, bStart: number = 0, bEnd: number = b.length): number {
	for (; aStart < aEnd && bStart < bEnd; aStart++, bStart++) {
		const codeA = a.charCodeAt(aStart);
		const codeB = b.charCodeAt(bStart);
		if (codeA < codeB) {
			return -1;
		} else if (codeA > codeB) {
			return 1;
		}
	}
	const aLen = aEnd - aStart;
	const bLen = bEnd - bStart;
	if (aLen < bLen) {
		return -1;
	} else if (aLen > bLen) {
		return 1;
	}
	return 0;
}

export function compareIgnoreCase(a: string, b: string): number {
	return compareSubstringIgnoreCase(a, b, 0, a.length, 0, b.length);
}

export function compareSubstringIgnoreCase(a: string, b: string, aStart: number = 0, aEnd: number = a.length, bStart: number = 0, bEnd: number = b.length): number {

	for (; aStart < aEnd && bStart < bEnd; aStart++, bStart++) {

		let codeA = a.charCodeAt(aStart);
		let codeB = b.charCodeAt(bStart);

		if (codeA === codeB) {
			// equal
			continue;
		}

		if (codeA >= 128 || codeB >= 128) {
			// not ASCII letters -> fallback to lower-casing strings
			return compareSubstring(a.toLowerCase(), b.toLowerCase(), aStart, aEnd, bStart, bEnd);
		}

		// mapper lower-case ascii letter onto upper-case varinats
		// [97-122] (lower ascii) --> [65-90] (upper ascii)
		if (isLowerAsciiLetter(codeA)) {
			codeA -= 32;
		}
		if (isLowerAsciiLetter(codeB)) {
			codeB -= 32;
		}

		// compare both code points
		const diff = codeA - codeB;
		if (diff === 0) {
			continue;
		}

		return diff;
	}

	const aLen = aEnd - aStart;
	const bLen = bEnd - bStart;

	if (aLen < bLen) {
		return -1;
	} else if (aLen > bLen) {
		return 1;
	}

	return 0;
}

export function isAsciiDigit(code: number): boolean {
	return code >= CharCode.Digit0 && code <= CharCode.Digit9;
}

export function isLowerAsciiLetter(code: number): boolean {
	return code >= CharCode.a && code <= CharCode.z;
}

export function isUpperAsciiLetter(code: number): boolean {
	return code >= CharCode.A && code <= CharCode.Z;
}

export function equalsIgnoreCase(a: string, b: string): boolean {
	return a.length === b.length && compareSubstringIgnoreCase(a, b) === 0;
}

export function startsWithIgnoreCase(str: string, candidate: string): boolean {
	const candidateLength = candidate.length;
	if (candidate.length > str.length) {
		return false;
	}

	return compareSubstringIgnoreCase(str, candidate, 0, candidateLength) === 0;
}

/**
 * @returns the length of the common prefix of the two strings.
 */
export function commonPrefixLength(a: string, b: string): number {

	const len = Math.min(a.length, b.length);
	let i: number;

	for (i = 0; i < len; i++) {
		if (a.charCodeAt(i) !== b.charCodeAt(i)) {
			return i;
		}
	}

	return len;
}

/**
 * @returns the length of the common suffix of the two strings.
 */
export function commonSuffixLength(a: string, b: string): number {

	const len = Math.min(a.length, b.length);
	let i: number;

	const aLastIndex = a.length - 1;
	const bLastIndex = b.length - 1;

	for (i = 0; i < len; i++) {
		if (a.charCodeAt(aLastIndex - i) !== b.charCodeAt(bLastIndex - i)) {
			return i;
		}
	}

	return len;
}