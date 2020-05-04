import * as tslib_1 from "tslib";
import inquirer from 'inquirer';
import { templateList } from '../lib/templateList';
export default function create(context, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            // 获取模版， 选择模版
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'template',
                    choices: templateList,
                    message: 'Choose template you want'
                }
            ]).then(function (answer) {
                console.log('answer----', answer);
            });
            console.log('开始创建项目-----------', options);
            Object.assign({}, context);
            return [2 /*return*/];
        });
    });
}
