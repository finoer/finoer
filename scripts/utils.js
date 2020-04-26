const fs = require('fs')
const chalk = require('chalk')

const path = require('path');
const args = require('minimist')(process.argv.slice(2))

const targets = (exports.targets = fs.readdirSync('packages').filter(f => {
    if (!fs.statSync(`packages/${f}`).isDirectory()) {
        return false
    }
    const pkg = require(`../packages/${f}/package.json`)
    if (pkg.private && !pkg.buildOptions) {
        return false
    }
    return true
}))

function fuzzyMatchTarget(partialTargets, includeAllMatching) {
    const matched = []
    partialTargets.forEach(partialTarget => {

        for (const target of targets) {
            if (target.match(partialTarget)) {
                matched.push(target)
                console.log('matched', matched)

                if (!includeAllMatching) {
                    break
                }
            }
        }
    })
    if (matched.length) {
        return matched
    } else {
        console.log()
        console.error(
            `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
                `Target ${chalk.underline(partialTargets)} not found!`
            )}`
        )
        console.log()

        process.exit(1)
    }
}

function getTargetPath(args, fileName) {

    const target = args._.length ? fuzzyMatchTarget(args._)[0] : 'finoer-core'

    // 定位包所在的目录
    const packagesDir = path.resolve(__dirname, '../packages');
    const packageDir = path.resolve(packagesDir, target)
    const resolve = p => path.resolve(packageDir, p);

    const configFile = resolve(fileName);

    return configFile
}

module.exports = {
    getTargetPath,
    fuzzyMatchTarget
}
