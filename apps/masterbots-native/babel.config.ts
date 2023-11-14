module.exports = function (api: { cache: (arg0: boolean) => void }) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: ['@babel/plugin-proposal-export-namespace-from', require.resolve('expo-router/babel')],
	}
}
