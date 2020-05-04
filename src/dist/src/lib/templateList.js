var Template = /** @class */ (function () {
    function Template(name, url, description) {
        this.name = name + description;
        this.value = url;
    }
    return Template;
}());
export { Template };
var parentTemplate = new Template('parent project', 'https://github.com:finoer/fino#master', '基座模版');
export var templateList = [
    parentTemplate
];
