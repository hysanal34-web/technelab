const fs=require('fs'), matter=require('gray-matter')
const dir='src/content/makaleler'
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.mdx'))
console.log('dosya sayısı:', files.length)
let pub=0; const drafts=[]
for(const f of files){
  const {data}=matter(fs.readFileSync(dir+'/'+f,'utf8'))
  if(data.status==='draft'){drafts.push(f)} else {pub++}
}
console.log('published:', pub)
console.log('draft:', drafts)
