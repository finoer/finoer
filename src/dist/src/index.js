var _this = this;
import * as tslib_1 from "tslib";
import { Command } from 'commander';
import { packageInfo } from './lib/paths';
import create from './create';
var program = new Command('fino-cli');
program.version(packageInfo.version);
program.usage('<project-name>').parse(process.argv);
program
    .command('create <project-name>', 'create fino project')
    .action(function (projectName, options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        create(projectName, options);
        return [2 /*return*/];
    });
}); })
    .parse(process.argv);
