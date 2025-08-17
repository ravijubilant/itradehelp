import React, {useEffect, useState} from 'react'
import { createRoot } from 'react-dom/client'
import lunr from 'lunr'

function App(){
  const [idx, setIdx] = useState(null)
  const [meta, setMeta] = useState({docs:[],chunksLength:0})
  const [q, setQ] = useState('How do I deposit via PayNow?')
  const [results, setResults] = useState([])
  const [lang, setLang] = useState('en') // 'en' | 'zh-Hant'

  useEffect(()=>{
    async function load(){
      const [i,m] = await Promise.all([
        fetch('/index.json').then(r=>r.json()),
        fetch('/docs.json').then(r=>r.json())
      ])
      setIdx(lunr.Index.load(i))
      setMeta(m)
    }
    load()
  },[])

  const search = (e)=>{
    e.preventDefault()
    if(!idx || !q) return
    let r = []
    try{
      const raw = idx.search(q)
      r = raw.map(item=>{
        const id=item.ref; const url=id.split('#c')[0]
        const doc = meta.docs.find(d=>d.url===url)
        return { id, url, score:item.score, lastmod: doc?doc.lastmod:null }
      }).slice(0,6)
    }catch{}
    setResults(r)
  }

  const label = (en, zh)=> lang==='zh-Hant'? zh : en

  return (
    <div style={{maxWidth:960, margin:'0 auto', padding:24}}>
      <div style={{background:'#11182a', border:'1px solid #1e2740', borderRadius:16, padding:16}}>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <div style={{width:10,height:10,borderRadius:999,background:'#e70012'}} />
          <div style={{fontWeight:800, fontSize:20}}>iTradeHelp</div>
          <span style={{marginLeft:8,fontSize:12,opacity:.8}}>{label('Prototype','原型')}</span>
          <span style={{marginLeft:'auto'}}>
            <button onClick={()=>setLang(lang==='en'?'zh-Hant':'en')} style={{padding:'8px 12px',borderRadius:10,background:'#1a2240',color:'#fff',border:'1px solid #1e2740'}}>
              {label('繁體中文','English')}
            </button>
          </span>
        </div>

        <form onSubmit={search} style={{display:'flex',gap:8,marginTop:12}}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder={label('Ask about iTrade…','請輸入您的問題…')} style={{flex:1,padding:'12px 14px',borderRadius:12,border:'1px solid #1e2740',background:'#0f172a',color:'#fff'}} />
          <button style={{padding:'12px 14px',borderRadius:12,border:'1px solid #1e2740',background:'#1a2240',color:'#fff'}}>{label('Ask','提問')}</button>
        </form>

        <div style={{marginTop:16}}>
          {results.length===0 && <div style={{opacity:.75}}>{label('Type a question to search the public knowledge base.','輸入問題以搜尋公開知識庫。')}</div>}
          {results.map((r,i)=>(
            <div key={r.id} style={{borderTop:'1px solid #1e2740', paddingTop:12, marginTop:12}}>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <b>{label('Answer candidate','候選答案')} #{i+1}</b>
                <span style={{fontSize:12,opacity:.8}}>{label('Score','分數')}: {r.score.toFixed(2)}</span>
              </div>
              <div style={{marginTop:6}}>
                <a href={r.url} target="_blank" rel="noreferrer" style={{color:'#7dd3fc', textDecoration:'none'}}>{r.url}</a>
              </div>
            </div>
          ))}
        </div>

        <div style={{fontSize:12,opacity:.7,marginTop:12}}>
          {label('This tool provides general information only and does not constitute financial advice. © CGS International. Regulated by MAS.','本工具僅提供一般資訊，並不構成投資建議。© CGS International。受新加坡金融管理局監管。')}
        </div>
      </div>
    </div>
  )
}
createRoot(document.getElementById('root')).render(<App/>)
