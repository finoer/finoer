


export class Template {
  name: string;
  value: string;

  constructor(name: string, url: string, description: string) {
    this.name = name + description;
    this.value = url;
  }
}
const parentTemplate = new Template('parent project', 'https://github.com/finoer/fino#master', '基座模版')
const childTemplate = new Template('child project', 'https://github.com/finoer/fino-child-vue#master', '子项目模版')


export const templateList: Template[] = [
  parentTemplate,
  childTemplate
]
