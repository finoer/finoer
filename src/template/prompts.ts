import { Template, templateList } from '.';

/**
* clone template project list
*
* @param type - type of the prompt
* @param name - he name to use when storing the answer in the answers hash.
* @param message - the question to print
* @param choices - choices array or a function returning a choices array
*/
export class OutroPrompts {
  // type of the prompt.Possible values: input, number, confirm, list, rawlist, expand, checkbox, password, editor
  public type: string;
  // The name to use when storing the answer in the answers hash.
  public name: string;
  // the question to print
  public message: string;
  //  Choices array or a function returning a choices array
  public choices: Template[] | undefined;
  // Default value(s) to use if nothing is entered
  public default?: string | number | boolean ;

  constructor(type: string, name: string, message: string, choices?: Template[], defaultChose?: string | number | boolean) {
    this.type = type;
    this.name = name;
    this.message = message;
    this.choices = choices;
    this.default = defaultChose;
  }
}

export const templatePrompts = new OutroPrompts('list', 'template', 'plase choise a template to create project', templateList);

const projectNamePrompt = new OutroPrompts('input', 'projectname', 'plase input a name for this project');
const projectAuthorPrompt = new OutroPrompts('input', 'projectname', 'plase input a author for this project');
const projectDesPrompt = new OutroPrompts('input', 'projectname', 'plase input a description for this project');

export const projectInfoChose = [projectNamePrompt, projectAuthorPrompt, projectDesPrompt]
