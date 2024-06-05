const fg = require('fast-glob')
const path = require('node:path')
const root = process.cwd()
const fsp = require('node:fs/promises')

export async function run() {
  const folder = 'src/ui/'
  const isHyphen = false /** 生成的模板中的使用是 true ? a-affix : AAfix */
  const url = path.resolve(root, folder)
  const entry = await fg(['**/*.json'], { dot: true, cwd: url })
  // console.log({ entry })
 
  for(const relative of entry){
    const realUrl = path.resolve(url, relative)
    const jsonStr = await fsp.readFile(realUrl,'utf8')
    try {
      const json = JSON.parse(jsonStr)
      if(!json.props)
        continue
      for(const k in json.props){
        const value = json.props[k]
        if(!value.type)
          continue
        if(!/(['"][^"']*['"]\s*\|)+/gm.test(value.type))
          continue
        
      }
    } catch (error) {
      continue
    }
    console.log({json})
  }
}
run()
