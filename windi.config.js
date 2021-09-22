import { defineConfig } from 'windicss/helpers';
import colors from 'windicss/colors';
import plugin from 'windicss/plugin';

export default defineConfig({
	darkMode: 'class', // or 'media'
	theme: {
		extend: {
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px'
			},
			colors: {
				coolgray: colors.coolGray,
				gray: colors.trueGray,
				light: colors.light,
				dark: colors.dark,
				lightblue: colors.lightBlue,
				blue: colors.blue,
				indigo: colors.indigo,
				red: colors.rose,
				fuchsia: colors.fuchsia,
				pink: colors.pink,
				rose: colors.rose,
				green: colors.green,
				teal: colors.teal,
				cyan: colors.cyan,
				purple: colors.violet,
				orange: colors.orange,
				yellow: colors.yellow,
				lime: colors.lime,
				taupe: '#B7B1A8',
				osiyoblue: '#676A81',
				cinred: '#b63838',
				lightgray: '#e3e3e3'
			},
			fontFamily: {
				open: ['Open Sans', 'sans-serif'],
				opencon: ['Open Sans Condensed', 'sans-serif'],
				cormorant: ['Cormorant', 'serif'],
				sans: ['Graphik', 'sans-serif'],
				serif: ['Merriweather', 'serif']
			},
			extend: {
				spacing: {
					128: '32rem',
					144: '36rem'
				},
				borderRadius: {
					'4xl': '2rem'
				}
			}
		}
	},
	plugins: [
		plugin(({ addUtilities }) => {
			const newUtilities = {
				'.skew-10deg': {
					transform: 'skewY(-10deg)'
				},
				'.skew-15deg': {
					transform: 'skewY(-15deg)'
				}
			};
			addUtilities(newUtilities);
		}),
		plugin(({ addComponents }) => {
			const buttons = {
				'.btn': {
					padding: '.5rem 1rem',
					borderRadius: '.25rem',
					fontWeight: '600'
				},
				'.btn-blue': {
					backgroundColor: '#3490dc',
					color: '#fff',
					'&:hover': {
						backgroundColor: '#2779bd'
					}
				},
				'.btn-red': {
					backgroundColor: '#e3342f',
					color: '#fff',
					'&:hover': {
						backgroundColor: '#cc1f1a'
					}
				}
			};
			addComponents(buttons);
		}),
		plugin(({ addDynamic, variants }) => {
			addDynamic(
				'skew',
				({ Utility, Style }) => {
					return Utility.handler
						.handleStatic(Style('skew'))
						.handleNumber(0, 360, 'int', (number) => `skewY(-${number}deg)`)
						.createProperty('transform');
				},
				variants('skew')
			);
		}),
		require('windicss/plugin/filters'),
		require('windicss/plugin/forms'),
		require('windicss/plugin/aspect-ratio'),
		require('windicss/plugin/line-clamp'),
		require('windicss/plugin/typography')({
			modifiers: ['DEFAULT', 'sm', 'lg', 'red']
		})
	]
});
