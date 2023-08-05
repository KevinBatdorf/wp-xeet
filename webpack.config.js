const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const VirtualModulesPlugin = require('webpack-virtual-modules');

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
				import '../src/front/vercel/TweetInfo.tsx';
				import '../src/front/vercel/TweetActions.tsx';
				ReactDOM.render(<Tweet />, document.getElementById('root'));
				`,
		}),
	],
};
