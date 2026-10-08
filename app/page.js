'use client';
import { useMemo, useState } from 'react';
import { buyers, pipelineStages } from '../lib/data';

const nav = ['Dashboard','Buyers','Pipeline','Tasks','CEO View'];

export default function Home() {
  const [page, setPage] = useState('Dashboard');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(buyers[0]);

  const filtered = useMemo(() => buyers.filter(b =>
    [b.name,b.city,b.state,b.buyer,b.email,b.stage].join(' ').toLowerCase().includes(query.toLowerCase())
  ), [query]);

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="wordmark">WEEKEND</div><div className="project">PROJECT BISMILLAH</div></div>
      <nav>{nav.map(item => <button key={item} className={page===item?'active':''} onClick={()=>setPage(item)}>{item}</button>)}</nav>
      <div className="sidebar-foot">Buyer Finder v1</div>
    </aside>

    <main className="main">
      <header className="topbar"><div><h1>{page}</h1><p>WEEKEND wholesale buyer intelligence</p></div><div className="badge">Internal</div></header>

      {page==='Dashboard' && <Dashboard onOpen={(b)=>{setSelected(b);setPage('Buyers')}} />}
      {page==='Buyers' && <Buyers query={query} setQuery={setQuery} filtered={filtered} selected={selected} setSelected={setSelected} />}
      {page==='Pipeline' && <Pipeline />}
      {page==='Tasks' && <Tasks />}
      {page==='CEO View' && <CEO />}
    </main>
  </div>
}

function Dashboard({onOpen}) {
  const cards = [
    ['Total Buyers', buyers.length], ['High Priority', buyers.filter(b=>b.priority==='High').length],
    ['Ready to Contact', buyers.filter(b=>b.stage==='Ready to Contact').length], ['Meetings', 0],
    ['Samples Sent', 0], ['Purchase Orders', 0]
  ];
  return <>
    <section className="metrics">{cards.map(([k,v])=><div className="metric" key={k}><span>{k}</span><strong>{v}</strong></div>)}</section>
    <section className="grid2">
      <div className="panel"><div className="panel-head"><h2>Top buyers</h2><span>Real research data</span></div>
        {buyers.map((b,i)=><button className="buyer-row" key={b.name} onClick={()=>onOpen(b)}><span className="rank">{i+1}</span><span><b>{b.name}</b><small>{b.city}</small></span><span className="score">{b.fit}/10</span></button>)}
      </div>
      <div className="panel"><div className="panel-head"><h2>Today’s tasks</h2><span>3 actions</span></div>
        {[
          'Send WOODstack 6-style line sheet',
          'Call Vinnies Styles for buyer appointment',
          'Email Empxre founder with premium capsule'
        ].map((t,i)=><div className="task" key={t}><input type="checkbox"/><div><b>{t}</b><small>{i===0?'High priority':'Due this week'}</small></div></div>)}
      </div>
    </section>
  </>
}

function Buyers({query,setQuery,filtered,selected,setSelected}) {
  return <section className="buyers-layout">
    <div className="panel list-panel">
      <div className="panel-head"><h2>Buyer database</h2><span>{filtered.length} records</span></div>
      <input className="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search buyers, cities, contacts..."/>
      <div className="table-head"><span>Store</span><span>Stage</span><span>Fit</span></div>
      {filtered.map(b=><button className={`table-row ${selected.name===b.name?'selected':''}`} key={b.name} onClick={()=>setSelected(b)}>
        <span><b>{b.name}</b><small>{b.city}</small></span><span>{b.stage}</span><span>{b.fit}/10</span>
      </button>)}
    </div>
    <BuyerProfile buyer={selected}/>
  </section>
}

function BuyerProfile({buyer}) {
  return <div className="panel profile">
    <div className="profile-head"><div><span className="eyebrow">{buyer.priority} priority</span><h2>{buyer.name}</h2><p>{buyer.city}, {buyer.state}</p></div><div className="fitbox"><b>{buyer.fit}/10</b><span>Fit score</span></div></div>
    <div className="profile-grid">
      <Info label="Buyer / Contact" value={buyer.buyer}/><Info label="Email" value={buyer.email}/>
      <Info label="Phone" value={buyer.phone}/><Info label="Stores" value={buyer.stores}/>
      <Info label="Pipeline Stage" value={buyer.stage}/><Info label="Next Action" value={buyer.next}/>
    </div>
    <div className="divider"/>
    <h3>Products to pitch</h3><p>{buyer.pitch}</p>
    <h3>Biggest opportunity</h3><p>{buyer.opportunity}</p>
    <h3>Biggest risk</h3><p>{buyer.risk}</p>
    <div className="actions"><button className="primary">Mark Contacted</button><button>Schedule Follow-up</button></div>
  </div>
}

function Info({label,value}) { return <div className="info"><span>{label}</span><b>{value}</b></div> }

function Pipeline() {
  return <div className="pipeline">{pipelineStages.map(stage=><div className="column" key={stage}><div className="column-head"><b>{stage}</b><span>{buyers.filter(b=>b.stage===stage).length}</span></div>{buyers.filter(b=>b.stage===stage).map(b=><div className="pipeline-card" key={b.name}><b>{b.name}</b><small>{b.city}</small><p>{b.next}</p></div>)}</div>)}</div>
}

function Tasks() {
  const tasks = [
    ['Send WOODstack line sheet','Today','High'],
    ['Call Vinnies Styles','Today','High'],
    ['Email Empxre Boutique','This week','Medium'],
    ['Ask Clique for menswear buyer','This week','Medium'],
    ['Submit Capsule contact form','This week','Medium']
  ];
  return <div className="panel"><div className="panel-head"><h2>Sales tasks</h2><span>{tasks.length} open</span></div>{tasks.map(t=><div className="taskline" key={t[0]}><input type="checkbox"/><span><b>{t[0]}</b><small>{t[1]}</small></span><em>{t[2]}</em></div>)}</div>
}

function CEO() {
  return <div className="grid2">
    <div className="panel"><h2>What is happening?</h2><p>Five verified high-priority buyers are ready for structured outreach.</p><h2>What is blocked?</h2><p>Direct senior buyer contacts and vendor/payment terms remain unavailable for several accounts.</p></div>
    <div className="panel"><h2>What needs your decision?</h2><p>Approve one edited 6-style capsule and the first-order payment policy.</p><h2>What should happen this week?</h2><p>Contact WOODstack, Vinnies Styles and Empxre Boutique first.</p><div className="callout">Best immediate action: Send WOODstack a six-style line sheet and request the Men’s Apparel Buyer.</div></div>
  </div>
}
