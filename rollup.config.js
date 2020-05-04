import typescript from 'rollup-plugin-typescript2'
import sourceMaps from "rollup-plugin-sourcemaps";
import json from '@rollup/plugin-json'
const path = require('path')

const pkg = require('./package.json')

const name = pkg.name

let filePath = path.resolve(__dirname, './src/dist')

const tsconfig = path.resolve(__dirname, 'tsconfig.json')

module.exports =  {
    input: `src/index.ts`,
    output: [
        {
            file: `${filePath}/index.js`,
            format: `cjs`,
            sourceMaps: true
        },
    ],  
    watch: {
        include: 'src/**',
    },
    plugins: [
        json({
            namedExports: false
        }),
        // Compile TypeScript files
        typescript({ 
            tsconfig: tsconfig,
            useTsconfigDeclarationDir: true,
            clean: true,
            abortOnError: true
        }),
        sourceMaps()
    ]
}