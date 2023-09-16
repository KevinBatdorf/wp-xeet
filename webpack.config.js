const fs = require('fs');
const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const VirtualModulesPlugin = require('webpack-virtual-modules');

const directoryPath = path.resolve(__dirname, './src/front/vercel');
const tsxFiles = fs
	.readdirSync(directoryPath)
	.filter((file) => file.endsWith('.tsx'));

let importStatementsString = '';
tsxFiles.forEach((file) => {
	importStatementsString += `import '../src/front/vercel/${file}';\n`;
});

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry(),
		xeet: './virtual/xeet.tsx',
	},
	plugins: [
		...defaultConfig.plugins,
		new VirtualModulesPlugin({
			'virtual/xeet.tsx': `
				import ReactDOM from 'react-dom';
				import { Tweet } from 'react-tweet';
				${importStatementsString}
				ReactDOM.render(<Tweet />, document.getElementById('root'));
				`,
		}),
	],
};
