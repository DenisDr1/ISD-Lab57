const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
    entry: {
        index: path.join(__dirname, 'src', 'index.js'),
        second_page: path.join(__dirname, 'src', 'second_page.js'), // Додайте шлях до другого файлу JS
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js', // Використовуйте [name] для вибору імені з файлу входу
        assetModuleFilename: path.join('images', '[name].[ext]'),
    },
    module: {
        rules: [
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                   type: 'asset/resource',
                   generator: {
                     filename: path.join('fonts', '[name].[ext]'),
                   }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: path.join('fonts', '[name].[ext]'),
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                 type: 'asset/resource',
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.pug'),
            filename: 'index.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'second_page.pug'),
            filename: 'second_page.html',
            chunks: ['second_page'],
        }),
        new FileManagerPlugin ({
            events: {
                onStart: {
                    delete: ['dist'],
                }
            }
        }),
        new MiniCssExtractPlugin ({
            filename: '[name].css',
        })
    ],
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        port: 9000,
    },
    optimization: {
        minimizer: [
         new ImageMinimizerPlugin({
           minimizer: {
             implementation: ImageMinimizerPlugin.imageminMinify,
              options: {
                plugins: [
                  ['gifsicle', { interlaced: true }],
                  ['jpegtran', { progressive: true }],
                  ['optipng', { optimizationLevel: 5 }],
                 ['svgo', { name: 'preset-default' }],
                ],
              },
            },
          }),
       ],
     },
};