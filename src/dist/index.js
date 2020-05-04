'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var commander = require('commander');
var fsExtra = require('fs-extra');
var path = require('path');
var path__default = _interopDefault(path);
var inquirer = _interopDefault(require('inquirer'));
var fs = _interopDefault(require('fs'));
var logSymbols = _interopDefault(require('log-symbols'));
var chalk = _interopDefault(require('chalk'));
var ora = _interopDefault(require('ora'));
var metalsmith = _interopDefault(require('metalsmith'));
var ejs = _interopDefault(require('ejs'));

var rootPath = fsExtra.realpathSync(process.cwd());
var packageInfo = fsExtra.readJsonSync(path.resolve(__dirname, '../../package.json'));
var downloadDirectory = process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE'] + "/.template";

var Template = /** @class */ (function () {
    function Template(name, url, description) {
        this.name = name + description;
        this.value = url;
    }
    return Template;
}());
var parentTemplate = new Template('parent project', 'https://github.com:finoer/fino#master', '基座模版');
var childTemplate = new Template('child project', 'https://github.com:finoer/fino-child-vue#master', '子项目模版');
var templateList = [
    parentTemplate,
    childTemplate
];

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var download = require('download-git-repo');
/**
 * @func  clone the code repository remotely
 * @param target project name
 * @param templateUrl code repository
 */
function downloadRepo(target, templateUrl) {
    target = path__default.join(downloadDirectory || '.', target);
    console.log('taget ------', target);
    return new Promise(function (resolve, reject) {
        var spinner = ora("\u6B63\u5728\u4E0B\u8F7D\u9879\u76EE\u6A21\u677F\uFF0C\u6E90\u5730\u5740\uFF1A" + templateUrl);
        spinner.start();
        download(templateUrl, target, { clone: true }, function (err) {
            if (err) {
                spinner.fail();
                reject(err);
            }
            else {
                spinner.succeed();
                resolve(target);
            }
        });
    });
}

function generate(context) {
    var _this = this;
    // user input array
    var metadata = context.metadata;
    // download catalog
    var src = context.downloadTemp;
    // target directory
    var dest = './' + context.root;
    if (!src) {
        return Promise.reject(new Error("\u65E0\u6548\u7684sourse: " + src));
    }
    return new Promise(function (resolve, reject) {
        // render template
        metalsmith(process.cwd())
            .source(src)
            .metadata(metadata)
            .destination(dest)
            .clean(false)
            .use(function (files, metalsmith, done) {
            // get user input
            var meta = metalsmith.metadata();
            // merge files and render template
            Object.keys(files).forEach(function (fileName) { return __awaiter(_this, void 0, void 0, function () {
                var content;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            content = files[fileName].contents.toString();
                            if (!((fileName.includes('js') || fileName.includes('json')) && content.includes('<%'))) return [3 /*break*/, 2];
                            return [4 /*yield*/, new Promise(function (resolve) {
                                    resolve(ejs.render(content, meta));
                                })];
                        case 1:
                            content = _a.sent();
                            _a.label = 2;
                        case 2:
                            // process into buffer
                            files[fileName].contents = Buffer.from(content);
                            return [2 /*return*/];
                    }
                });
            }); });
            done(null, files, metalsmith);
        }).build(function (err) {
            err ? reject(err) : resolve();
        });
    });
}

/**
 * download template
 * @param next Destination folder
 * @param url repo url
 */
function download$1(next, url) {
    next.then(function (root) {
        if (root !== '.') {
            fs.mkdirSync(root);
        }
        // clone template project
        return downloadRepo(root, url).then(function (target) {
            return {
                root: root,
                name: root,
                downloadTemp: target
            };
        }).then(function (context) {
            // ask the user for information
            inquirer.prompt([
                {
                    name: 'projectName',
                    message: 'project name',
                    default: context.name
                },
                {
                    name: 'author',
                    message: 'author',
                    default: 'yueqi'
                },
                {
                    name: 'description',
                    message: 'description for project',
                    default: "A project named " + context.name
                }
            ]).then(function (answers) {
                var metaData = __assign(__assign({}, context), { metadata: __assign({}, answers) });
                console.log(logSymbols.success, chalk.green('创建成功:)'));
                console.log();
                console.log(chalk.green('cd ' + context.root + '\nnpm install\nnpm run serve'));
                return generate(metaData);
            }).catch(function () {
                console.log(logSymbols.error, chalk.green('创建失败:('));
            });
        });
    });
}

/**
 * create a template project
 * @param options project name
 */
function create(options) {
    // get project name
    var projectName = options;
    // prompt the user to select a template
    inquirer.prompt([
        {
            type: 'list',
            name: 'template',
            choices: templateList,
            message: 'plase choise a template to create project'
        }
    ]).then(function (answer) {
        // locate the generated directory genDirecty(projectName)
        var next = Promise.resolve(projectName);
        if (next) {
            // download template
            download$1(next, answer.template);
        }
    });
}

var program = new commander.Command('fino-cli');
program.version(packageInfo.version);
program
    .command('create <project-name>')
    .alias('c')
    .description('create a fino project')
    .action(function (projectName) {
    create(projectName);
})
    .parse(process.argv);
