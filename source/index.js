'use strict'

const detectIndentation = require('detect-indentation')

/**
 * Removes indentation from the source string
 * @param {string} source
 * @param {number} [iterations=1] - how many indentation iterations do we wish to remove? use 0 for all
 * @returns {string}
 * @throws {error} mixed spaces and tabs - thrown by: https://github.com/bevry/detect-indentation
 * @throws {error} indentation is uneven - thrown by: https://github.com/bevry/detect-indentation
 */
function removeIndentation (source, iterations = 1) {
	const indentation = detectIndentation(source)
	if (!indentation) return source
	const regexString = indentation.replace(/\t/g, '\\t')
	const regex = new RegExp(`^${regexString}`, 'gm')

	let result, lastResult = source
	if (iterations === 0) {
		lastResult = source
		while (true) {
			result = lastResult.replace(regex, '')
			if (result === lastResult) {
				break
			}
			lastResult = result
		}
	}
	else {
		for (let i = 0; i < iterations; i++) {
			lastResult = result = lastResult.replace(regex, '')
		}
	}

	return result
}

module.exports = removeIndentation
