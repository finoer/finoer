import path from 'path'
import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'

// 定位包所在的目录
const packagesDir = path.resolve(__dirname, 'packages');
const packageDir = path.resolve(packagesDir, process.env.TARGET)

const name = path.basename(packageDir);
const resolve = p => path.resolve(packageDir, p);
const pkg = require(resolve(`package.json`))
const packageOptions = pkg.buildOptions || {}

const entryFile = `src/index.ts`


let outputConfigs = {
    esm: {
        file: resolve(`dist/${name}.esm-browser.js`),
        format: `es`
    },
    cjs: {
        file: resolve(`dist/${name}.cjs.js`),
        format: `cjs`
    },
    global: {
        file: resolve(`dist/${name}.global.js`),
        format: `iife`
    },
}

// 默认打包方法
const defaultFormats = ['esm', 'cjs']
const packageFormats = packageOptions.formats || defaultFormats
const packageConfigs = packageFormats.map(format => createConfig(outputConfigs[format]))

export default packageConfigs

function createConfig(output, plugins = []) {
    return {
        input: resolve(entryFile),
        output,
        plugins: [
            json({
              namedExports: false
            }),
            typescript({
                tsconfig: path.resolve(__dirname, 'tsconfig.json'),
                tsconfigOverride: {
                  compilerOptions: {
                    sourceMap: output.sourcemap,
                  },
                  exclude: ['**/__tests__', 'test-dts']
                }
            })
        ]
    }
}
