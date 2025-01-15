const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'code.js',
        path: path.resolve(__dirname, 'extension'),
        globalObject: 'this',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/, // Правило для обработки всех .ts файлов
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: 'development',
};