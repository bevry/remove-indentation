import detectIndentation from 'detect-indentation'

/**
 * Removes indentation from the source string
 * @param source
 * @param iterations - how many indentation iterations do we wish to remove? use 0 for all
 * @throws {Error} mixed spaces and tabs - thrown by: https://github.com/bevry/detect-indentation
 * @throws {Error} indentation is uneven - thrown by: https://github.com/bevry/detect-indentation
 */
export default function removeIndentation(
	source: string,
	iterations: number = 1
): string {
	// check is indented
	const indentation = detectIndentation(source)
	if (!indentation) return source

	// replace the indentation
	const regexString = indentation.replace(/\t/g, '\\t')
	const regex = new RegExp(`^${regexString}`, 'gm')
	let result = source
	if (iterations === 0) {
		while (true) {
			const next = result.replace(regex, '')
			if (result === next) break
			result = next
		}
	} else {
		for (let i = 0; i < iterations; i++) {
			result = result.replace(regex, '')
		}
	}

	// return the final result
	return result
}
