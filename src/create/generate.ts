import metalsmith from 'metalsmith'
import ejs from 'ejs'

interface MetaData {
  root: string;
  name: string;
  downloadTemp: string;
  metadata: {
    projectName: string;
    author: string;
    description: string;
  }
}

export default function generate(context: MetaData) {
  // user input array
  let metadata = context.metadata;
  // download catalog
  let src = context.downloadTemp;
  // target directory
  let dest = './' + context.root;

  if(!src) {
      return Promise.reject(new Error(`无效的sourse: ${src}`))
  }

  return new Promise((resolve, reject) => {
    // render template
    metalsmith(process.cwd())
      .source(src)
      .metadata(metadata)
      .destination(dest)
      .clean(false)
      .use((files, metalsmith, done) => {
        // get user input
        const meta = metalsmith.metadata();

        // merge files and render template
        Object.keys(files).forEach(async (fileName) => {

          // get file content
          let content = files[fileName].contents.toString();

          // if it is a template file, replace the slot
          if ((fileName.includes('js') || fileName.includes('json')) && content.includes('<%')) {
            content = await new Promise((resolve) => {
              resolve(ejs.render(content, meta))
            })
          }

          // process into buffer
          files[fileName].contents = Buffer.from(content);
        })

        done(null, files, metalsmith)
      }).build(err => {
        err ? reject(err) : resolve()
      })
    })
}
