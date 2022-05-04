// Babel config file. Required due to manual jest use instead of via react-scripts test
module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    env: {
        test: {
            plugins: ["@babel/plugin-transform-runtime"]
        }
    }
};