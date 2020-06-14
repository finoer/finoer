/**
* clone template project list
*
* @param name - project name
* @param value - project url
* @param description - project description
*/
export class Template {
  // 项目名称
  public name: string;
  // 项目地址
  public value: string;

  constructor(name: string, url: string, description: string) {
    this.name = name + description;
    this.value = url;
  }
}


const parentTemplate = new Template('parent project', 'https://github.com:finoer/fino-base#dev', '基座模版')
const childTemplate = new Template('child project', 'https://github.com:finoer/fino-child-vue#master', '子项目模版')

export const templateList: Template[] = [
  parentTemplate,
  childTemplate
]



