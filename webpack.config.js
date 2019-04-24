
const webpack = require('webpack');
const path = require('path');

let devmode = false;
let cssmode = false;

if(process.env.NODE_ENV === 'release'){
    console.log('🍶 release build');
}else{
    devmode = 'inline-source-map';
    cssmode = true;
    console.log('☕ debug build');
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        script: './script.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/js'),
        publicPath: './',
        filename: 'gnode.js',
        library: 'gnode',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/env']
                        ]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['raw-loader']
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        openPage: 'sample.html',
        open: true,
        port: 9090,
        publicPath: '/js/',
        watchContentBase: true
    },
    cache: true,
    devtool: devmode
};
