import kava from 'kava'
import { equal } from 'assert-helpers'
import removeIndentation from './'

kava.suite('remove-indentation', function (suite, test) {
	const tests = [
		{
			name: 'none',
			args: ['a\nb'],
			output: 'a\nb',
		},
		{
			name: 'spaces: 0, 4',
			args: ['a\n    b'],
			output: 'a\nb',
		},
		{
			name: 'spaces: 0, 4, 8',
			args: ['a\n    b\n        c'],
			output: 'a\nb\n    c',
		},
		{
			name: 'spaces: 4, 4',
			args: ['    a\n    b'],
			output: 'a\nb',
		},
		{
			name: 'spaces: 4, 8',
			args: ['    a\n        b'],
			output: 'a\n    b',
		},
		{
			name: 'spaces: 4, 8 - 2 iterations',
			args: ['    a\n        b', 2],
			output: 'a\nb',
		},
		{
			name: 'spaces: 4, 8 - all',
			args: ['    a\n        b', 0],
			output: 'a\nb',
		},
		{
			name: 'spaces: 4, 8, 12',
			args: ['    a\n        b\n            c'],
			output: 'a\n    b\n        c',
		},
		{
			name: 'spaces: 4, 8, 12 - 2 iterations',
			args: ['    a\n        b\n            c', 2],
			output: 'a\nb\n    c',
		},
		{
			name: 'spaces: 4, 0, 4',
			args: ['    a\nb\n    c'],
			output: 'a\nb\nc',
		},
		{
			name: 'spaces: 8, 4, 8',
			args: ['        a\n    b\n        c'],
			output: '    a\nb\n    c',
		},
		{
			name: 'spaces: 4, 8, 4',
			args: ['    a\n        b\n    c'],
			output: 'a\n    b\nc',
		},
		{
			name: 'tabs: 0, 1',
			args: ['a\n\tb'],
			output: 'a\nb',
		},
		{
			name: 'tabs: 0, 1, 2',
			args: ['a\n\tb\n\t\tc'],
			output: 'a\nb\n\tc',
		},
		{
			name: 'tabs: 1, 1',
			args: ['\ta\n\tb'],
			output: 'a\nb',
		},
		{
			name: 'tabs: 1, 2',
			args: ['\ta\n\t\tb'],
			output: 'a\n\tb',
		},
		{
			name: 'tabs: 1, 2, 3',
			args: ['\ta\n\t\tb\n\t\t\tc'],
			output: 'a\n\tb\n\t\tc',
		},
		{
			name: 'tabs: 1, 2, 3 - 2 iterations',
			args: ['\ta\n\t\tb\n\t\t\tc', 2],
			output: 'a\nb\n\tc',
		},
		{
			name: 'tabs: 1, 2, 3 - all iterations',
			args: ['\ta\n\t\tb\n\t\t\tc', 0],
			output: 'a\nb\nc',
		},
		{
			name: 'tabs: 1, 2, 1',
			args: ['\ta\n\t\tb\n\tc'],
			output: 'a\n\tb\nc',
		},
		{
			name: 'tabs: 1, 0, 1',
			args: ['\ta\nb\n\tc'],
			output: 'a\nb\nc',
		},
		{
			name: 'tabs: 2, 1, 2',
			args: ['\t\ta\n\tb\n\t\tc'],
			output: '\ta\nb\n\tc',
		},
	]
	tests.forEach(function ({ name, args, output }) {
		test(name, function () {
			// @ts-ignore
			equal(removeIndentation(...args), output, name)
		})
	})
})
