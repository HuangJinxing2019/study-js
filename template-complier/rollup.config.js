import babel from 'rollup-plugin-babel'
import serve from "rollup-plugin-serve";
import commonjs from "rollup-plugin-commonjs";

export default {
    input: './src/index.js',
    output: {
        format: 'umd',
        name: 'Vue',
        file: 'dist/umd/vue.js',
        sourcemap: true,
    },
    plugins: [
        babel({
            exclude: 'node_module/**'
        }),
        serve({
            open: true,
            port: 8088,
            contentBase: '',
            openPage: '/index.html'
        }),
        commonjs(),
    ]
}