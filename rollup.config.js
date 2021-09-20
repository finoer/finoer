/* eslint-disable @typescript-eslint/consistent-type-definitions */
const path = require('path')
const typescript = require('rollup-plugin-typescript2')
const sourceMaps = require("rollup-plugin-sourcemaps")
const json = require('@rollup/plugin-json')

const pkg = require('./package.json')

const name = pkg.name

let filePath = path.resolve(__dirname, 'dist')

const tsconfig = path.resolve(__dirname, 'tsconfig.json')

module.exports =  {
  input: "./src/index.ts",
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
