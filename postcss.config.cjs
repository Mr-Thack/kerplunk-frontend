
const tailwindcss = require('tailwindcss');
const tailwindcssNesting = require('tailwindcss/nesting')
const autoprefixer = require('autoprefixer')

const config = {
	plugins: [//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
    //But others, like autoprefixer, need to run after,
  	tailwindcssNesting(),
		tailwindcss(), //Some plugins, like tailwindcss/nesting, need to run before Tailwind, tailwindcss(), //But others, like autoprefixer, need to run after, autoprefixer, autoprefixer]
		autoprefixer()
	]
};

module.exports = config;
