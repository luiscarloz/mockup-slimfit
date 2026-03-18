import { useState } from "react";
import { LayoutDashboard, Users, CalendarDays, UserPlus, Wallet, Award, CreditCard, Shield, TrendingUp, FileCheck, DollarSign, Target, Plus, Search, Phone, Mail, Edit, Trash2, Filter, Calendar, Dumbbell, Clock, Check, Download, ArrowUpRight, Bell, AlertTriangle, ChevronRight, Eye, UserCheck, XCircle, RefreshCw, ArrowRight, ArrowLeft, Save, BarChart3, MessageSquare, ClipboardList } from "lucide-react";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const T={primary:"#00BFB3",secondary:"#808080",bg:"#F8F9FA",card:"#fff",sidebar:"#1A1D21",sidebarActive:"#2D3239",sidebarBorder:"#2D3239",border:"#E5E7EB",muted:"#F3F4F6",mutedFg:"#6B7280",fg:"#111827",fgLight:"#374151",inputBg:"#F9FAFB",green:"#10B981",greenBg:"#ECFDF5",red:"#EF4444",redBg:"#FEF2F2",yellow:"#F59E0B",yellowBg:"#FFFBEB",purple:"#8B5CF6",blue:"#3B82F6",radius:"12px",rsm:"8px"};

const Bdg=({children,v="primary"})=>{const s={primary:{b:`${T.primary}12`,c:T.primary},secondary:{b:"#F3F4F6",c:T.secondary},green:{b:T.greenBg,c:T.green},red:{b:T.redBg,c:T.red},yellow:{b:T.yellowBg,c:T.yellow},blue:{b:"#EFF6FF",c:T.blue},purple:{b:"#F3E8FF",c:T.purple}};const st=s[v]||s.primary;return <span style={{fontSize:11,padding:"3px 10px",borderRadius:999,backgroundColor:st.b,color:st.c,fontWeight:600,whiteSpace:"nowrap"}}>{children}</span>};
const MC=({icon:I,value,label,change,up,color=T.primary,sub})=>(<div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:"16px 18px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}><div style={{width:40,height:40,borderRadius:10,backgroundColor:`${color}12`,display:"flex",alignItems:"center",justifyContent:"center"}}><I size={20} color={color}/></div>{change&&<span style={{fontSize:11,padding:"2px 7px",borderRadius:6,backgroundColor:up?T.greenBg:T.redBg,color:up?T.green:T.red,fontWeight:600,display:"flex",alignItems:"center",gap:2}}><ArrowUpRight size={11} style={{transform:up?"none":"rotate(90deg)"}}/>{change}</span>}</div><h3 style={{fontSize:22,fontWeight:700,margin:"0 0 2px",color:T.fg}}>{value}</h3><p style={{fontSize:12,color:T.mutedFg,margin:0}}>{label}</p>{sub&&<p style={{fontSize:11,color:T.mutedFg,margin:"3px 0 0",opacity:0.7}}>{sub}</p>}</div>);
const PBtn=({children,onClick,icon:I,small,sec,disabled})=> <button onClick={onClick} disabled={disabled} style={{display:"flex",alignItems:"center",gap:7,padding:small?"7px 14px":"9px 20px",backgroundColor:sec?T.card:disabled?T.muted:T.primary,color:sec?T.fg:disabled?T.mutedFg:"#fff",borderRadius:T.rsm,border:sec?`1px solid ${T.border}`:"none",fontSize:small?13:14,fontWeight:600,cursor:disabled?"default":"pointer",fontFamily:"inherit",opacity:disabled?0.6:1}}>{I&&<I size={small?15:17}/>}{children}</button>;
const GBtn=({children,color=T.primary,onClick,full})=> <button onClick={onClick} style={{flex:full?1:undefined,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"7px 12px",backgroundColor:`${color}08`,color,borderRadius:T.rsm,border:`1px solid ${color}20`,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{children}</button>;
const PH=({title,sub,action})=> <div style={{marginBottom:20}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><h1 style={{fontSize:22,fontWeight:700,margin:"0 0 3px",color:T.fg}}>{title}</h1><p style={{fontSize:13,color:T.mutedFg,margin:0}}>{sub}</p></div>{action}</div></div>;
const Tbl=({headers,rows})=> <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{backgroundColor:T.muted}}>{headers.map((h,i)=> <th key={i} style={{padding:"10px 16px",textAlign:"left",fontSize:11,fontWeight:700,color:T.mutedFg,textTransform:"uppercase",letterSpacing:"0.05em"}}>{h}</th>)}</tr></thead><tbody>{rows}</tbody></table></div>;
const Td=({children,bold,color})=> <td style={{padding:"10px 16px",fontSize:13,fontWeight:bold?600:400,color:color||T.fg}}>{children}</td>;
const TB=({tabs,active,onChange})=> <div style={{display:"flex",gap:3,background:T.muted,borderRadius:T.rsm,padding:3,marginBottom:16}}>{tabs.map(t=> <button key={t.id} onClick={()=>onChange(t.id)} style={{padding:"7px 16px",borderRadius:6,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",backgroundColor:active===t.id?T.card:"transparent",color:active===t.id?T.primary:T.mutedFg,boxShadow:active===t.id?"0 1px 3px rgba(0,0,0,0.08)":"none"}}>{t.label}</button>)}</div>;
const Sel=({value,onChange,options,icon:I,label})=> <div>{label&&<label style={{display:"block",fontSize:12,fontWeight:600,marginBottom:5,color:T.fgLight}}>{label}</label>}<div style={{position:"relative"}}>{I&&<I size={16} color={T.mutedFg} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}/>}<select value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",padding:`9px 14px 9px ${I?38:14}px`,backgroundColor:T.inputBg,borderRadius:T.rsm,border:`1px solid ${T.border}`,fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box",appearance:"none"}}>{options.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}</select></div></div>;
const TI=({label,placeholder,value,onChange})=> <div><label style={{display:"block",fontSize:12,fontWeight:600,marginBottom:5,color:T.fgLight}}>{label}</label><input type="text" placeholder={placeholder} value={value||""} onChange={e=>onChange&&onChange(e.target.value)} style={{width:"100%",padding:"9px 14px",backgroundColor:T.inputBg,borderRadius:T.rsm,border:`1px solid ${T.border}`,fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/></div>;
const NI=({label,value,onChange,prefix})=> <div>{label&&<label style={{display:"block",fontSize:12,fontWeight:600,marginBottom:5,color:T.fgLight}}>{label}</label>}<div style={{position:"relative"}}>{prefix&&<span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:13,color:T.mutedFg,fontWeight:600}}>{prefix}</span>}<input type="number" value={value} onChange={e=>onChange(Number(e.target.value))} style={{width:"100%",padding:`9px 14px 9px ${prefix?36:14}px`,backgroundColor:T.inputBg,borderRadius:T.rsm,border:`1px solid ${T.border}`,fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/></div></div>;
const Modal=({title,sub,onClose,children,footer})=> <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:50}} onClick={e=>{if(e.target===e.currentTarget)onClose()}}><div style={{background:T.bg,borderRadius:T.radius,width:"100%",maxWidth:600,maxHeight:"90vh",overflow:"auto",margin:16}}><div style={{padding:"18px 22px",borderBottom:`1px solid ${T.border}`,background:T.card,borderRadius:`${T.radius} ${T.radius} 0 0`,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:2}}><div><h2 style={{fontSize:17,fontWeight:700,margin:0}}>{title}</h2>{sub&&<p style={{fontSize:12,color:T.mutedFg,margin:0}}>{sub}</p>}</div><button onClick={onClose} style={{background:T.muted,border:"none",width:30,height:30,borderRadius:8,cursor:"pointer",fontSize:18,fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",color:T.fg}}>{"\u00d7"}</button></div><div style={{padding:22,display:"flex",flexDirection:"column",gap:14}}>{children}</div>{footer&&<div style={{padding:"14px 22px",borderTop:`1px solid ${T.border}`,background:T.card,borderRadius:`0 0 ${T.radius} ${T.radius}`,display:"flex",justifyContent:"flex-end",gap:10,position:"sticky",bottom:0,zIndex:2}}>{footer}</div>}</div></div>;
const Logo=()=> <svg viewBox="0 0 180 40" width="130" height="30"><text x="0" y="30" fontFamily="Arial,sans-serif" fontWeight="300" fontSize="32" fill="#808080" letterSpacing="-1">slim</text><text x="75" y="30" fontFamily="Arial,sans-serif" fontWeight="300" fontSize="32" fill="#00BFB3" letterSpacing="-1">fit</text><circle cx="82" cy="8" r="3" fill="#00BFB3"/><text x="120" y="38" fontFamily="Arial,sans-serif" fontWeight="400" fontSize="10" fill="#808080" letterSpacing="3">STUDIO</text></svg>;

const SI=({placeholder,value,onChange})=> <div style={{position:"relative",flex:1}}><Search size={16} color={T.mutedFg} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)"}}/><input type="text" placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",padding:"8px 12px 8px 34px",backgroundColor:T.inputBg,borderRadius:T.rsm,border:`1px solid ${T.border}`,fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/></div>;

const PROFS=["Ana Costa","Julia Santos","Carlos Eduardo"];
const STAGES=[{id:"lead",label:"Lead",c:T.blue},{id:"exp",label:"Aula Exp.",c:T.primary},{id:"comp",label:"Compareceu",c:T.purple},{id:"follow",label:"Follow-up",c:T.yellow},{id:"contrato",label:"Contrato",c:T.green}];
const ORIGINS=["Instagram","Indicacao","Google","Evento","Acao Off","Site","Outro"];

// === 1. DASHBOARD ===
const DashPage=()=>{
  const [p,sP]=useState("30d");
  const sd=[{m:"Set",v:18,l:28,c:14},{m:"Out",v:22,l:32,c:18},{m:"Nov",v:24,l:38,c:22},{m:"Dez",v:21,l:30,c:16},{m:"Jan",v:26,l:42,c:24},{m:"Fev",v:28,l:48,c:27}];
  return <div>
    <PH title="Dashboard - Slim Fit Centro" sub="Painel operacional da unidade"/>
    <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:12,marginBottom:16,display:"flex",gap:10,alignItems:"center"}}>
      <Sel value={p} onChange={sP} icon={Calendar} options={[{value:"7d",label:"7 dias"},{value:"30d",label:"30 dias"},{value:"90d",label:"90 dias"},{value:"year",label:"Ano"}]}/>
      <div style={{marginLeft:"auto",display:"flex",gap:8}}>
        <div style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",background:T.yellowBg,borderRadius:T.rsm,fontSize:12,fontWeight:600,color:T.yellow}}><Bell size={14}/>3 tarefas</div>
        <div style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",background:T.redBg,borderRadius:T.rsm,fontSize:12,fontWeight:600,color:T.red}}><AlertTriangle size={14}/>5 inadimpl.</div>
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:14}}>
      <MC icon={DollarSign} value="R$ 42.5k" label="Vendas" change="+8.2%" up color={T.green}/><MC icon={FileCheck} value="112" label="Contratos Ativos" change="+5%" up/><MC icon={XCircle} value="3" label="Cancelados" color={T.red}/><MC icon={Users} value="125" label="Clientes Ativos" change="+6%" up/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:14}}>
      <MC icon={DollarSign} value="R$ 189" label="Ticket Medio" change="+3.2%" up/><MC icon={UserPlus} value="48" label="Leads" change="+15%" up/><MC icon={Dumbbell} value="32" label="Aulas Exp." change="+10%" up/><MC icon={Target} value="78%" label="Conversao" change="+2%" up/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:14}}>
      <MC icon={Check} value="94%" label="Adimplentes" color={T.green} sub="118 de 125"/><MC icon={AlertTriangle} value="5" label="Inadimplentes" color={T.red} sub="4%"/><MC icon={RefreshCw} value="92%" label="Renovacao" change="+2.3%" up color={T.green}/><MC icon={TrendingUp} value="3.2%" label="Churn" color={T.yellow} sub="4 / 125"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:14}}>
      <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:18}}><h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px"}}>Vendas (R$ mil)</h3><ResponsiveContainer width="100%" height={200}><AreaChart data={sd}><defs><linearGradient id="cV2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={T.primary} stopOpacity={0.2}/><stop offset="95%" stopColor={T.primary} stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/><XAxis dataKey="m" stroke={T.mutedFg} fontSize={11}/><YAxis stroke={T.mutedFg} fontSize={11}/><Tooltip/><Area type="monotone" dataKey="v" stroke={T.primary} fill="url(#cV2)" strokeWidth={2.5} name="Vendas"/></AreaChart></ResponsiveContainer></div>
      <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:18}}><h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px"}}>Leads vs Conversoes</h3><ResponsiveContainer width="100%" height={200}><BarChart data={sd}><CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/><XAxis dataKey="m" fontSize={11} stroke={T.mutedFg}/><YAxis fontSize={11} stroke={T.mutedFg}/><Tooltip/><Legend/><Bar dataKey="l" fill={T.primary} name="Leads" radius={[4,4,0,0]}/><Bar dataKey="c" fill={T.green} name="Conv." radius={[4,4,0,0]}/></BarChart></ResponsiveContainer></div>
    </div>
  </div>;
};

// === 2. GRADE HORARIA (with functional Nova Aula modal) ===
const GradePage=()=>{
  const [show,setShow]=useState(false);
  const [nDay,sND]=useState("Seg");const [nHour,sNH]=useState("07:00");const [nType,sNT]=useState("slim");const [nProf,sNP]=useState(PROFS[0]);const [nCap,sNC]=useState(6);
  const week=["Seg","Ter","Qua","Qui","Sex","Sab"];
  const hours=["07:00","08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00","18:00","19:00"];
  const [classes,setCl]=useState({
    "Seg-07:00":{t:"Slim",p:"Ana Costa",cap:6,cur:5},"Seg-08:00":{t:"Circuito",p:"Ana Costa",cap:6,cur:4},"Seg-09:00":{t:"Free",p:"Julia Santos",cap:6,cur:6},
    "Ter-07:00":{t:"Free",p:"Julia Santos",cap:6,cur:2},"Ter-08:00":{t:"Slim",p:"Ana Costa",cap:6,cur:5},"Ter-14:00":{t:"Slim",p:"Ana Costa",cap:6,cur:4},
    "Qua-07:00":{t:"Slim",p:"Ana Costa",cap:6,cur:3},"Qua-08:00":{t:"Free",p:"Julia Santos",cap:6,cur:5},"Qua-15:00":{t:"Circuito",p:"Julia Santos",cap:6,cur:2},
    "Qui-07:00":{t:"Free",p:"Julia Santos",cap:6,cur:4},"Qui-08:00":{t:"Slim",p:"Ana Costa",cap:6,cur:5},"Qui-16:00":{t:"Slim",p:"Carlos Eduardo",cap:6,cur:1},
    "Sex-07:00":{t:"Slim",p:"Ana Costa",cap:6,cur:5},"Sex-08:00":{t:"Free",p:"Julia Santos",cap:6,cur:4},"Sex-09:00":{t:"Slim",p:"Ana Costa",cap:6,cur:6},
    "Sab-08:00":{t:"Circuito",p:"Ana Costa",cap:6,cur:5},"Sab-09:00":{t:"Slim",p:"Julia Santos",cap:6,cur:3},
  });
  const typeC={Slim:T.primary,Free:T.yellow,Circuito:T.purple};
  const addAula=()=>{const k=`${nDay}-${nHour}`;setCl(p=>({...p,[k]:{t:nType==="slim"?"Slim":nType==="free"?"Free":"Circuito",p:nProf,cap:nCap,cur:0}}));setShow(false)};
  return <div>
    <PH title="Grade Horaria" sub="Grade semanal fixa - intervalo 10min - capacidade parametrizavel" action={<PBtn icon={Plus} onClick={()=>setShow(true)}>Nova Aula</PBtn>}/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
      <MC icon={CalendarDays} value={String(Object.keys(classes).length)} label="Aulas/Semana"/><MC icon={Users} value="6" label="Cap. Max Padrao"/><MC icon={Clock} value="10 min" label="Intervalo"/>
    </div>
    <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:"70px repeat(6,1fr)",borderBottom:`1px solid ${T.border}`}}>
        <div style={{padding:10,background:T.muted,fontSize:11,fontWeight:700,color:T.mutedFg,textAlign:"center"}}>Hora</div>
        {week.map(d=> <div key={d} style={{padding:10,background:T.muted,fontSize:12,fontWeight:700,color:T.fg,textAlign:"center"}}>{d}</div>)}
      </div>
      {hours.map(h=> <div key={h} style={{display:"grid",gridTemplateColumns:"70px repeat(6,1fr)",borderBottom:`1px solid ${T.border}`}}>
        <div style={{padding:"8px 10px",fontSize:12,color:T.mutedFg,fontWeight:600,textAlign:"center",borderRight:`1px solid ${T.border}`}}>{h}</div>
        {week.map(d=>{const k=`${d}-${h}`;const cl=classes[k];const c=cl?typeC[cl.t]||T.primary:null;return <div key={k} style={{padding:3,minHeight:46}}>
          {cl?<div style={{background:`${c}10`,border:`1px solid ${c}30`,borderRadius:6,padding:"5px 7px",fontSize:11,height:"100%"}}>
            <div style={{fontWeight:700,color:c}}>{cl.t}</div>
            <div style={{color:T.mutedFg,fontSize:10,marginTop:1}}>{cl.p.split(" ")[0]} - {cl.cur}/{cl.cap}</div>
            {cl.cur>=cl.cap&&<div style={{fontSize:9,color:T.red,fontWeight:700}}>LOTADA</div>}
          </div>:<div onClick={()=>{sND(d);sNH(h);setShow(true)}} style={{height:"100%",minHeight:40,borderRadius:6,border:`1px dashed ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",opacity:0.4}}><Plus size={14} color={T.mutedFg}/></div>}
        </div>})}
      </div>)}
    </div>
    <div style={{display:"flex",gap:12,marginTop:10}}>
      {[{l:"Slim Fit",c:T.primary},{l:"Free",c:T.yellow},{l:"Circuito",c:T.purple},{l:"Lotada",c:T.red}].map(x=> <div key={x.l} style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:T.mutedFg}}><div style={{width:10,height:10,borderRadius:3,background:`${x.c}30`,border:`1px solid ${x.c}`}}/>{x.l}</div>)}
    </div>
    {show&&<Modal title="Nova Aula" sub="Adicione uma aula na grade semanal" onClose={()=>setShow(false)} footer={<><button onClick={()=>setShow(false)} style={{padding:"9px 20px",background:T.muted,color:T.fg,borderRadius:T.rsm,border:"none",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Cancelar</button><PBtn icon={Check} onClick={addAula}>Adicionar Aula</PBtn></>}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Sel label="Dia da Semana" value={nDay} onChange={sND} options={week.map(d=>({value:d,label:d}))}/>
        <Sel label="Horario" value={nHour} onChange={sNH} options={hours.map(h=>({value:h,label:h}))}/>
      </div>
      <Sel label="Tipo de Aula" value={nType} onChange={sNT} options={[{value:"slim",label:"Slim Fit"},{value:"free",label:"Free"},{value:"circuito",label:"Circuito Slim Fit"}]}/>
      <Sel label="Professora" value={nProf} onChange={sNP} options={PROFS.map(p=>({value:p,label:p}))}/>
      <NI label="Capacidade Maxima" value={nCap} onChange={sNC}/>
      <div style={{background:T.muted,borderRadius:T.rsm,padding:12,fontSize:12,color:T.fgLight}}>
        A aula sera criada em <strong>{nDay} as {nHour}</strong> com <strong>{nType==="slim"?"Slim Fit":nType==="free"?"Free":"Circuito"}</strong> pela prof. <strong>{nProf}</strong> (max {nCap} alunas). Intervalo de 10min aplicado automaticamente.
      </div>
    </Modal>}
  </div>;
};

// === 2.5. ALUNOS ===
const AlunosPage=()=>{
  const [s,sS]=useState("");const [sf,sSf]=useState("all");
  const ALUNOS=[{id:1,name:"Ana Paula Silva",plano:"Slim 3x + Circ 2x",valor:"R$ 520",status:"Ativo",pay:"Em dia",since:"01/06/2025",phone:"(11) 98765-1111"},{id:2,name:"Carlos Eduardo",plano:"Free 2x",valor:"R$ 149",status:"Ativo",pay:"Em dia",since:"15/08/2025",phone:"(11) 98765-2222"},{id:3,name:"Juliana Oliveira",plano:"Slim 4x",valor:"R$ 479",status:"Ativo",pay:"Pendente",since:"10/09/2025",phone:"(11) 98765-3333"},{id:4,name:"Roberto Ferreira",plano:"Free 1x",valor:"R$ 99",status:"Suspenso",pay:"Atrasado",since:"05/03/2025",phone:"(11) 98765-4444"},{id:5,name:"Mariana Torres",plano:"Slim 2x",valor:"R$ 358",status:"Ativo",pay:"Em dia",since:"20/07/2025",phone:"(11) 98765-5555"},{id:6,name:"Thiago Souza",plano:"Slim 3x",valor:"R$ 379",status:"Ativo",pay:"Em dia",since:"08/01/2026",phone:"(11) 98765-6666"}];
  const f=ALUNOS.filter(a=>(s===""||a.name.toLowerCase().includes(s.toLowerCase()))&&(sf==="all"||a.status===sf));
  return <div>
    <PH title="Alunos" sub="Gestao dos alunos da unidade" action={<PBtn icon={Plus}>Novo Aluno</PBtn>}/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
      <MC icon={Users} value="125" label="Ativos" change="+6%" up/><MC icon={XCircle} value="3" label="Suspensos" color={T.yellow}/><MC icon={RefreshCw} value="92%" label="Renovacao" color={T.green} change="+2%" up/><MC icon={TrendingUp} value="3.2%" label="Churn" color={T.red}/>
    </div>
    <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:10,marginBottom:14,display:"flex",gap:8}}>
      <SI placeholder="Buscar aluno..." value={s} onChange={sS}/><Sel value={sf} onChange={sSf} icon={Filter} options={[{value:"all",label:"Todos"},{value:"Ativo",label:"Ativos"},{value:"Suspenso",label:"Suspensos"}]}/>
    </div>
    <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,overflow:"hidden"}}>
      <Tbl headers={["Aluno","Telefone","Plano","Valor","Desde","Status","Pgto"]} rows={f.map(a=> <tr key={a.id} style={{borderTop:`1px solid ${T.border}`}}><Td bold>{a.name}</Td><Td color={T.mutedFg}>{a.phone}</Td><Td>{a.plano}</Td><Td bold>{a.valor}</Td><Td color={T.mutedFg}>{a.since}</Td><Td><Bdg v={a.status==="Ativo"?"green":"yellow"}>{a.status}</Bdg></Td><Td><Bdg v={a.pay==="Em dia"?"green":a.pay==="Pendente"?"yellow":"red"}>{a.pay}</Bdg></Td></tr>)}/>
    </div>
  </div>;
};

// === 3. LEADS - KANBAN ===
const LeadsPage=()=>{
  const [leads,setLeads]=useState([
    {id:1,name:"Camila Rocha",phone:"(11) 98888-1111",origin:"Instagram",stage:"lead",exps:0,date:"16/02",notes:[{d:"16/02",t:"Interessada em Slim 3x, perguntou horarios"}]},
    {id:2,name:"Lucas Mendes",phone:"(11) 98888-2222",origin:"Indicacao",stage:"follow",exps:2,date:"12/02",notes:[{d:"12/02",t:"Fez 2 exp, gostou muito"},{d:"14/02",t:"Enviado proposta Slim 2x"}]},
    {id:3,name:"Patricia Lima",phone:"(11) 98888-3333",origin:"Google",stage:"lead",exps:0,date:"16/02",notes:[]},
    {id:4,name:"Rafael Costa",phone:"(11) 98888-4444",origin:"Evento",stage:"comp",exps:1,date:"10/02",notes:[{d:"10/02",t:"Veio no evento do shopping, experimentou Circuito"}]},
    {id:5,name:"Marina Silva",phone:"(11) 98888-5555",origin:"Instagram",stage:"follow",exps:3,date:"08/02",notes:[{d:"08/02",t:"Fez 3 exp"},{d:"10/02",t:"Pediu desconto, ofereci BEMVINDO2026"}]},
    {id:6,name:"Gustavo Pires",phone:"(11) 98888-6666",origin:"Indicacao",stage:"contrato",exps:2,date:"05/02",notes:[{d:"05/02",t:"Fechou Slim 3x + Circ 2x"}]},
    {id:7,name:"Fernanda Dias",phone:"(11) 98888-7777",origin:"Google",stage:"exp",exps:1,date:"14/02",notes:[]},
    {id:8,name:"Thiago Rocha",phone:"(11) 98888-8888",origin:"Acao Off",stage:"exp",exps:0,date:"15/02",notes:[]},
  ]);
  const [showAdd,setShowAdd]=useState(false);
  const [showDetail,setShowDetail]=useState(null);
  const [newNote,setNewNote]=useState("");
  const [nName,sNN]=useState("");const [nPhone,sNP]=useState("");const [nOrigin,sNO]=useState("Instagram");const [nCep,sNCep]=useState("");

  const move=(id,dir)=>{const si=STAGES.map(s=>s.id);setLeads(p=>p.map(l=>{if(l.id!==id) return l;const ci=si.indexOf(l.stage);const ni=ci+(dir==="next"?1:-1);if(ni<0||ni>=si.length) return l;return {...l,stage:si[ni]}}))};
  const addLead=()=>{if(!nName) return;setLeads(p=>[...p,{id:Date.now(),name:nName,phone:nPhone,origin:nOrigin,stage:"lead",exps:0,notes:[],date:"17/02"}]);sNN("");sNP("");setShowAdd(false)};

  const addNote=(id)=>{if(!newNote)return;setLeads(p=>p.map(l=>l.id===id?{...l,notes:[...(l.notes||[]),{d:"17/02",t:newNote}]}:l));setNewNote("")};
  const dl=showDetail?leads.find(l=>l.id===showDetail):null;

  return <div>
    <PH title="Leads e Conversao" sub="Kanban: mova os leads pelo funil clicando nas setas" action={<PBtn icon={Plus} onClick={()=>setShowAdd(true)}>Novo Lead</PBtn>}/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:16}}>
      {STAGES.map(s=>{const count=leads.filter(l=>l.stage===s.id).length;return <div key={s.id} style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:"10px 14px",textAlign:"center"}}>
        <div style={{fontSize:24,fontWeight:800,color:s.c}}>{count}</div>
        <div style={{fontSize:10,color:T.mutedFg,fontWeight:700,textTransform:"uppercase"}}>{s.label}</div>
      </div>})}
    </div>
    {/* Kanban columns */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,alignItems:"flex-start"}}>
      {STAGES.map(s=>{const stageLeads=leads.filter(l=>l.stage===s.id);const isLast=s.id==="contrato";const isFirst=s.id==="lead";return <div key={s.id}>
        <div style={{background:`${s.c}12`,borderRadius:`${T.rsm} ${T.rsm} 0 0`,padding:"8px 12px",borderBottom:`2px solid ${s.c}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:12,fontWeight:700,color:s.c}}>{s.label}</span>
          <span style={{fontSize:11,fontWeight:700,color:s.c,background:`${s.c}20`,padding:"1px 8px",borderRadius:10}}>{stageLeads.length}</span>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8,padding:"8px 0",minHeight:100}}>
          {stageLeads.map(l=> <div key={l.id} style={{background:T.card,borderRadius:T.rsm,border:`1px solid ${T.border}`,padding:"10px 12px",boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}}>
            <div style={{fontSize:13,fontWeight:700,color:T.fg,marginBottom:3}}>{l.name}</div>
            <div style={{fontSize:11,color:T.mutedFg,marginBottom:2}}>{l.phone}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <Bdg v="secondary">{l.origin}</Bdg>
              <span style={{fontSize:10,color:T.mutedFg}}>{l.exps}/4 exp</span>
            </div>
            <div style={{display:"flex",gap:4}}>
              {!isFirst&&<button onClick={e=>{e.stopPropagation();move(l.id,"prev")}} style={{flex:1,padding:"5px",background:T.muted,border:"none",borderRadius:4,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ArrowLeft size={14} color={T.mutedFg}/></button>}
              {!isLast&&<button onClick={e=>{e.stopPropagation();move(l.id,"next")}} style={{flex:1,padding:"5px",background:`${s.c}12`,border:`1px solid ${s.c}30`,borderRadius:4,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ArrowRight size={14} color={s.c}/></button>}
              {isLast&&<div style={{flex:1,padding:"5px",background:T.greenBg,borderRadius:4,textAlign:"center",fontSize:11,fontWeight:700,color:T.green}}>Convertido</div>}
            </div>
          </div>)}
        </div>
      </div>})}
    </div>
    <div style={{background:`${T.primary}06`,borderRadius:T.rsm,padding:10,marginTop:12,fontSize:11,color:T.fgLight}}>
      <strong>Regras:</strong> Lead frio apos 20 dias | Max 4 aulas experimentais gratuitas | Lembretes: marcacao, lembrete, agradecimento, boas-vindas
    </div>
    {dl&&<Modal wide title={dl.name} sub={`${dl.phone} - ${dl.origin} - ${dl.exps}/4 exp`} onClose={()=>setShowDetail(null)}>
      <div style={{display:"flex",gap:8,marginBottom:4}}>
        <Bdg v="primary">{STAGES.find(s=>s.id===dl.stage)?.label}</Bdg><Bdg v="secondary">{dl.origin}</Bdg><Bdg v="secondary">{dl.exps}/4 experimentais</Bdg>
      </div>
      <div style={{fontSize:12,fontWeight:700,color:T.fg}}>Historico de Anotacoes</div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {(!dl.notes||dl.notes.length===0)&&<div style={{padding:14,background:T.muted,borderRadius:T.rsm,textAlign:"center",fontSize:12,color:T.mutedFg}}>Nenhuma anotacao. Adicione abaixo.</div>}
        {(dl.notes||[]).map((n,i)=> <div key={i} style={{display:"flex",gap:8,padding:"8px 12px",background:T.muted,borderRadius:T.rsm}}><div style={{fontSize:11,color:T.mutedFg,fontWeight:600,flexShrink:0}}>{n.d}</div><div style={{fontSize:12,color:T.fg}}>{n.t}</div></div>)}
      </div>
      <div style={{display:"flex",gap:6}}>
        <div style={{flex:1}}><textarea placeholder="Escreva uma anotacao..." value={newNote} onChange={e=>setNewNote(e.target.value)} rows={2} style={{width:"100%",padding:"8px 12px",backgroundColor:T.inputBg,borderRadius:T.rsm,border:`1px solid ${T.border}`,fontSize:12,fontFamily:"inherit",outline:"none",boxSizing:"border-box",resize:"none"}}/></div>
        <PBtn icon={Plus} onClick={()=>addNote(dl.id)} disabled={!newNote} small>Anotar</PBtn>
      </div>
      <div style={{display:"flex",gap:4}}>{STAGES.map(s=> <div key={s.id} onClick={()=>setLeads(p=>p.map(l=>l.id===dl.id?{...l,stage:s.id}:l))} style={{flex:1,padding:"7px 4px",borderRadius:T.rsm,border:dl.stage===s.id?`2px solid ${s.c}`:`1px solid ${T.border}`,background:dl.stage===s.id?`${s.c}12`:T.card,textAlign:"center",cursor:"pointer"}}><div style={{fontSize:11,fontWeight:700,color:dl.stage===s.id?s.c:T.mutedFg}}>{s.label}</div></div>)}</div>
    </Modal>}

        {showAdd&&<Modal title="Novo Lead" sub="Cadastre um novo lead no funil" onClose={()=>setShowAdd(false)} footer={<><button onClick={()=>setShowAdd(false)} style={{padding:"9px 20px",background:T.muted,color:T.fg,borderRadius:T.rsm,border:"none",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Cancelar</button><PBtn icon={Check} onClick={addLead} disabled={!nName}>Cadastrar Lead</PBtn></>}>
      <TI label="Nome Completo *" placeholder="Nome do lead" value={nName} onChange={sNN}/>
      <TI label="Telefone" placeholder="(00) 00000-0000" value={nPhone} onChange={sNP}/>
      <TI label="CEP" placeholder="00000-000" value={nCep} onChange={sNCep}/>
      <Sel label="Origem do Lead" value={nOrigin} onChange={sNO} options={ORIGINS.map(o=>({value:o,label:o}))}/>
      <div style={{background:T.muted,borderRadius:T.rsm,padding:12,fontSize:12,color:T.fgLight}}>
        O lead sera adicionado na primeira etapa do funil (<strong>Lead</strong>). Voce pode move-lo pelas etapas clicando nas setas do kanban.
      </div>
    </Modal>}
  </div>;
};

// === 4. FINANCEIRO ===
const FinPage=()=>{
  const [tab,sT]=useState("cobrancas");
  const cob=[
    {al:"Ana Paula Silva",pl:"Slim 3x",v:"R$ 379",vc:"05/02",st:"Pago",fm:"Cartao Rec."},
    {al:"Carlos Eduardo",pl:"Free 2x",v:"R$ 149",vc:"05/02",st:"Pago",fm:"PIX"},
    {al:"Juliana Oliveira",pl:"Slim 4x",v:"R$ 520",vc:"05/02",st:"Atrasado",fm:"Boleto",d:12},
    {al:"Roberto Ferreira",pl:"Free 1x",v:"R$ 99",vc:"05/02",st:"Atrasado",fm:"Boleto",d:8},
    {al:"Mariana Torres",pl:"Slim 2x",v:"R$ 289",vc:"10/02",st:"Pago",fm:"Cartao Deb."},
    {al:"Thiago Souza",pl:"Slim 3x",v:"R$ 379",vc:"10/02",st:"Pendente",fm:"Boleto"},
  ];
  return <div>
    <PH title="Financeiro da Unidade" sub="Cobrancas, pagamentos e inadimplencia"/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
      <MC icon={DollarSign} value="R$ 42.5k" label="Receita" change="+8%" up color={T.green}/><MC icon={Check} value="R$ 38.2k" label="Recebido" color={T.green} sub="89.8%"/><MC icon={AlertTriangle} value="R$ 4.3k" label="Inadimplente" color={T.red} sub="5 alunas"/><MC icon={Clock} value="R$ 1.8k" label="A Vencer" color={T.yellow}/>
    </div>
    <TB tabs={[{id:"cobrancas",label:"Cobrancas"},{id:"inadimplentes",label:"Inadimplentes"},{id:"resumo",label:"Receita x Despesa"}]} active={tab} onChange={sT}/>
    {tab==="cobrancas"&&<div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,overflow:"hidden"}}>
      <Tbl headers={["Aluna","Plano","Valor","Venc.","Forma","Status","Acao"]} rows={cob.map((c,i)=> <tr key={i} style={{borderTop:`1px solid ${T.border}`}}><Td bold>{c.al}</Td><Td color={T.mutedFg}>{c.pl}</Td><Td bold>{c.v}</Td><Td color={T.mutedFg}>{c.vc}</Td><Td>{c.fm}</Td><Td><Bdg v={c.st==="Pago"?"green":c.st==="Atrasado"?"red":"yellow"}>{c.st}{c.d?` (${c.d}d)`:""}</Bdg></Td><Td>{c.st!=="Pago"&&<GBtn color={T.green}><Check size={13}/> Baixa</GBtn>}</Td></tr>)}/>
    </div>}
    {tab==="inadimplentes"&&<div><div style={{background:`${T.red}06`,borderRadius:T.rsm,padding:10,marginBottom:12,fontSize:12,color:T.fgLight}}><strong>Regras:</strong> Inadimplente apos 1 dia util | Notificacao + suspensao 7 dias | 2a via automatica</div><div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,overflow:"hidden"}}><Tbl headers={["Aluna","Valor","Dias","Status","Acao"]} rows={cob.filter(c=>c.st==="Atrasado").map((c,i)=> <tr key={i} style={{borderTop:`1px solid ${T.border}`}}><Td bold>{c.al}</Td><Td bold color={T.red}>{c.v}</Td><Td bold color={T.red}>{c.d}d</Td><Td><Bdg v={c.d>=7?"red":"yellow"}>{c.d>=7?"Suspensa":"Notificada"}</Bdg></Td><Td><div style={{display:"flex",gap:4}}><GBtn color={T.green}><Check size={13}/></GBtn><GBtn color={T.blue}><RefreshCw size={13}/></GBtn></div></Td></tr>)}/></div></div>}
    {tab==="resumo"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}><div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:18}}><h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px"}}>Receitas x Despesas</h3><ResponsiveContainer width="100%" height={200}><BarChart data={[{m:"Set",r:38,d:15},{m:"Out",r:40,d:16},{m:"Nov",r:39,d:14},{m:"Dez",r:42,d:17},{m:"Jan",r:41,d:15},{m:"Fev",r:42,d:16}]}><CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/><XAxis dataKey="m" fontSize={11} stroke={T.mutedFg}/><YAxis fontSize={11} stroke={T.mutedFg}/><Tooltip/><Legend/><Bar dataKey="r" fill={T.green} name="Receita (R$k)" radius={[4,4,0,0]}/><Bar dataKey="d" fill={T.red} name="Despesa (R$k)" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer></div><div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:18}}><h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px"}}>Formas de Pagamento</h3><ResponsiveContainer width="100%" height={200}><PieChart><Pie data={[{name:"Cart.Rec",v:45},{name:"PIX",v:25},{name:"Boleto",v:18},{name:"Cart.Deb",v:8},{name:"Dinheiro",v:4}]} dataKey="v" cx="50%" cy="50%" outerRadius={70} label={({name,v})=>`${name} ${v}%`} labelLine={false}>{[T.primary,T.green,T.blue,T.purple,T.yellow].map((c,i)=> <Cell key={i} fill={c}/>)}</Pie></PieChart></ResponsiveContainer></div></div>}
  </div>;
};

// === 5. COMISSAO (editable values) ===
const ComissaoPage=()=>{
  const [metas,setMetas]=useState([
    {ind:"Contratos Fechados",meta:10,atual:8,valor:20},
    {ind:"Leads Convertidas",meta:15,atual:12,valor:10},
    {ind:"Renovacoes",meta:20,atual:22,valor:15},
    {ind:"Aulas Exp. Agendadas",meta:30,atual:28,valor:5},
  ]);
  const setM=(i,field,val)=>setMetas(p=>p.map((m,j)=>j===i?{...m,[field]:Number(val)}:m));
  const total=metas.reduce((a,m)=>a+m.atual*m.valor,0);
  return <div>
    <PH title="Comissao da Secretaria" sub="Ana Paula - Edite metas e valores - Pagamento individual mensal"/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
      <MC icon={Award} value={`R$ ${total}`} label="Comissao do Mes" color={T.green} change="+12%" up/><MC icon={Target} value={`${metas.filter(m=>m.atual>=m.meta).length} de ${metas.length}`} label="Metas Batidas" color={T.primary}/><MC icon={TrendingUp} value={`R$ ${(total*12).toLocaleString("pt-BR")}`} label="Projecao Anual" color={T.primary}/>
    </div>
    <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,overflow:"hidden",marginBottom:16}}>
      <div style={{padding:"14px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><h3 style={{fontSize:14,fontWeight:600,margin:0}}>Indicadores e Comissoes</h3><div style={{fontSize:11,color:T.mutedFg}}>Edite metas e valores diretamente na tabela</div></div>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 2fr 1fr 1fr",padding:"10px 18px",background:T.muted,gap:8}}>
        {["INDICADOR","META","ATUAL","PROGRESSO","R$ / UNID.","COMISSAO"].map(h=> <div key={h} style={{fontSize:10,fontWeight:700,color:T.mutedFg}}>{h}</div>)}
      </div>
      {metas.map((m,i)=>{const pct=Math.round(m.atual/m.meta*100);const hit=m.atual>=m.meta;return <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 2fr 1fr 1fr",padding:"12px 18px",borderTop:`1px solid ${T.border}`,alignItems:"center",gap:8}}>
        <div style={{fontSize:13,fontWeight:600}}>{m.ind}</div>
        <div><input type="number" value={m.meta} onChange={e=>setM(i,"meta",e.target.value)} style={{width:50,padding:"4px 6px",borderRadius:4,border:`1px solid ${T.border}`,fontSize:13,fontWeight:600,fontFamily:"inherit",textAlign:"center",outline:"none"}}/></div>
        <div style={{fontSize:14,fontWeight:700,color:hit?T.green:T.yellow}}>{m.atual}</div>
        <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{flex:1,height:6,background:T.muted,borderRadius:3,overflow:"hidden"}}><div style={{width:`${Math.min(pct,100)}%`,height:"100%",background:hit?T.green:T.yellow,borderRadius:3}}/></div><span style={{fontSize:11,fontWeight:600,color:hit?T.green:T.yellow}}>{pct}%</span></div>
        <div><div style={{display:"flex",alignItems:"center",gap:2}}><span style={{fontSize:11,color:T.mutedFg}}>R$</span><input type="number" value={m.valor} onChange={e=>setM(i,"valor",e.target.value)} style={{width:44,padding:"4px 4px",borderRadius:4,border:`1px solid ${T.border}`,fontSize:13,fontWeight:700,fontFamily:"inherit",textAlign:"center",outline:"none",color:T.primary}}/></div></div>
        <div style={{fontSize:14,fontWeight:700,color:T.green}}>R$ {m.atual*m.valor}</div>
      </div>})}
      <div style={{padding:"12px 18px",background:T.muted,display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:14}}>
        <span>Total Comissao</span><span style={{color:T.green}}>R$ {total}</span>
      </div>
    </div>
    <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:18}}>
      <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px"}}>Evolucao Mensal</h3>
      <ResponsiveContainer width="100%" height={180}><BarChart data={[{m:"Set",v:580},{m:"Out",v:620},{m:"Nov",v:710},{m:"Dez",v:690},{m:"Jan",v:720},{m:"Fev",v:total}]}><CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/><XAxis dataKey="m" fontSize={11} stroke={T.mutedFg}/><YAxis fontSize={11} stroke={T.mutedFg}/><Tooltip/><Bar dataKey="v" fill={T.green} name="Comissao (R$)" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer>
    </div>
  </div>;
};

// === 6. PAGAMENTO PROFESSORES (editable rates) ===
const PagProfPage=()=>{
  const [showAtt,setShowAtt]=useState(null);
  const [profs,setProfs]=useState([
    {name:"Ana Costa",slim:30,free:10,circ:8,rSlim:25,rFree:20,rCirc:30},
    {name:"Julia Santos",slim:20,free:14,circ:8,rSlim:25,rFree:20,rCirc:30},
    {name:"Carlos Eduardo",slim:18,free:10,circ:8,rSlim:22,rFree:18,rCirc:28},
  ]);
  const setR=(i,field,val)=>setProfs(p=>p.map((pr,j)=>j===i?{...pr,[field]:Number(val)}:pr));
  const totalGeral=profs.reduce((a,p)=>a+p.slim*p.rSlim+p.free*p.rFree+p.circ*p.rCirc,0);

  const RateInput=({value,onChange,color})=> <div style={{display:"flex",alignItems:"center",gap:2}}><span style={{fontSize:10,color:T.mutedFg}}>R$</span><input type="number" value={value} onChange={e=>onChange(Number(e.target.value))} style={{width:44,padding:"3px 4px",borderRadius:4,border:`1px solid ${T.border}`,fontSize:13,fontWeight:700,fontFamily:"inherit",textAlign:"center",outline:"none",color}}/></div>;

  return <div>
    <PH title="Pagamento de Professores" sub="Edite o valor por aula de cada professora - Fechamento mensal" action={<PBtn icon={Download} sec>Exportar</PBtn>}/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
      <MC icon={Users} value={String(profs.length)} label="Professoras"/><MC icon={Dumbbell} value={String(profs.reduce((a,p)=>a+p.slim+p.free+p.circ,0))} label="Total Aulas/Mes"/><MC icon={DollarSign} value={`R$ ${totalGeral.toLocaleString("pt-BR")}`} label="Total Folha" color={T.red}/>
    </div>
    {profs.map((p,i)=>{const tot=p.slim*p.rSlim+p.free*p.rFree+p.circ*p.rCirc;return <div key={i} style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,marginBottom:14,overflow:"hidden"}}>
      <div style={{padding:"14px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,borderRadius:"50%",background:`${T.primary}20`,display:"flex",alignItems:"center",justifyContent:"center",color:T.primary,fontWeight:700,fontSize:12}}>{p.name.split(" ").map(n=>n[0]).join("")}</div>
          <div><h3 style={{fontSize:14,fontWeight:700,margin:0}}>{p.name}</h3><span style={{fontSize:11,color:T.mutedFg}}>{p.slim+p.free+p.circ} aulas no mes</span></div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{fontSize:20,fontWeight:800,color:T.primary}}>R$ {tot.toLocaleString("pt-BR")}</div><GBtn color={T.primary} onClick={()=>setShowAtt(i)}><ClipboardList size={13}/> Check-ins</GBtn></div>
      </div>
      {/* Rates table */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)"}}>
        {[{l:"Slim Fit",qty:p.slim,rate:p.rSlim,rKey:"rSlim",c:T.primary},{l:"Free",qty:p.free,rate:p.rFree,rKey:"rFree",c:T.yellow},{l:"Circuito",qty:p.circ,rate:p.rCirc,rKey:"rCirc",c:T.purple}].map(x=> <div key={x.l} style={{padding:"12px 18px",borderRight:`1px solid ${T.border}`}}>
          <div style={{fontSize:11,fontWeight:700,color:x.c,marginBottom:6}}>{x.l}</div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
            <span style={{fontSize:12,color:T.mutedFg}}>Valor/aula:</span>
            <RateInput value={x.rate} onChange={v=>setR(i,x.rKey,v)} color={x.c}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:12,color:T.mutedFg}}>{x.qty} aulas</span>
            <span style={{fontSize:14,fontWeight:700}}>R$ {x.qty*x.rate}</span>
          </div>
        </div>)}
      </div>
    </div>})}
    <div style={{background:T.muted,borderRadius:T.rsm,padding:10,fontSize:11,color:T.fgLight}}>
      <strong>Regras:</strong> Valor por aula varia por tipo e por professora | Aula cancelada pela unidade nao conta | Fechamento mensal
    </div>
  </div>;
};

// === 7. PERMISSOES ===
const PermPage=()=>{
  const [perms,setPerms]=useState([
    {feat:"Cadastrar/Editar Colaboradores",franq:true,sec:false,param:false},
    {feat:"Ver Financeiro Completo",franq:true,sec:false,param:true,on:true},
    {feat:"Cancelar Contratos",franq:true,sec:false,param:true,on:false},
    {feat:"Dar Descontos",franq:true,sec:false,param:true,on:false},
    {feat:"Cadastrar Leads",franq:true,sec:true,param:false},
    {feat:"Gerenciar Grade Horaria",franq:true,sec:true,param:false},
    {feat:"Dar Baixa em Pagamento",franq:true,sec:false,param:true,on:true},
    {feat:"Ver Comissao Propria",franq:true,sec:true,param:false},
    {feat:"Ver Dashboard Completo",franq:true,sec:false,param:false},
    {feat:"Ver Funil e Tarefas",franq:true,sec:true,param:false},
  ]);
  const toggle=(i)=>setPerms(p=>p.map((pm,j)=>j===i?{...pm,on:!pm.on,sec:!pm.on}:pm));
  return <div>
    <PH title="Permissoes" sub="Franqueado configura o que a secretaria pode acessar"/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
      <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:18}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><div style={{width:40,height:40,borderRadius:10,background:`${T.primary}12`,display:"flex",alignItems:"center",justifyContent:"center"}}><Shield size={20} color={T.primary}/></div><div><h3 style={{fontSize:15,fontWeight:700,margin:0}}>Franqueado</h3><p style={{fontSize:12,color:T.mutedFg,margin:0}}>Acesso total</p></div></div><div style={{fontSize:13,color:T.fgLight}}>Todas funcionalidades. Configura permissoes da secretaria.</div></div>
      <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:18}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><div style={{width:40,height:40,borderRadius:10,background:`${T.secondary}12`,display:"flex",alignItems:"center",justifyContent:"center"}}><Users size={20} color={T.secondary}/></div><div><h3 style={{fontSize:15,fontWeight:700,margin:0}}>Secretaria</h3><p style={{fontSize:12,color:T.mutedFg,margin:0}}>Acesso parametrizavel</p></div></div><div style={{fontSize:13,color:T.fgLight}}>Dashboard reduzido (funil + tarefas). Permissoes conforme abaixo.</div></div>
    </div>
    <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,overflow:"hidden"}}>
      <div style={{padding:"14px 18px",borderBottom:`1px solid ${T.border}`}}><h3 style={{fontSize:14,fontWeight:600,margin:0}}>Matriz de Permissoes</h3></div>
      <div style={{display:"grid",gridTemplateColumns:"2.5fr 1fr 1fr 1fr",padding:"10px 18px",background:T.muted,gap:8}}>
        {["FUNCIONALIDADE","FRANQUEADO","SECRETARIA","CONFIG."].map(h=> <div key={h} style={{fontSize:10,fontWeight:700,color:T.mutedFg,textAlign:h!=="FUNCIONALIDADE"?"center":"left"}}>{h}</div>)}
      </div>
      {perms.map((p,i)=> <div key={i} style={{display:"grid",gridTemplateColumns:"2.5fr 1fr 1fr 1fr",padding:"10px 18px",borderTop:`1px solid ${T.border}`,alignItems:"center",gap:8}}>
        <div style={{fontSize:13,fontWeight:500}}>{p.feat}</div>
        <div style={{textAlign:"center"}}><Check size={16} color={T.green}/></div>
        <div style={{textAlign:"center"}}>{(p.sec||(p.param&&p.on))?<Check size={16} color={T.green}/>:p.param?<XCircle size={16} color={T.red}/>:<XCircle size={16} color={T.red}/>}</div>
        <div style={{textAlign:"center"}}>{p.param&&<div onClick={()=>toggle(i)} style={{width:40,height:22,borderRadius:11,background:p.on?T.green:T.muted,border:`1px solid ${p.on?T.green:T.border}`,position:"relative",cursor:"pointer",display:"inline-block",transition:"all 0.2s"}}><div style={{width:18,height:18,borderRadius:9,background:"#fff",position:"absolute",top:1,left:p.on?20:1,transition:"left 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.15)"}}/></div>}</div>
      </div>)}
    </div>
  </div>;
};

// === 8. RELATORIOS ===
const RelatoriosPage=()=>{
  const [tab,sT]=useState("leads");
  const ld=[{m:"Set",leads:28,conv:14,exp:18},{m:"Out",leads:32,conv:18,exp:22},{m:"Nov",leads:38,conv:22,exp:28},{m:"Dez",leads:30,conv:16,exp:20},{m:"Jan",leads:42,conv:24,exp:30},{m:"Fev",leads:48,conv:27,exp:32}];
  return <div>
    <PH title="Relatorios" sub="Todos os relatorios da unidade" action={<PBtn icon={Download}>Exportar PDF</PBtn>}/>
    <TB tabs={[{id:"leads",label:"Leads"},{id:"alunos",label:"Alunos"},{id:"vendas",label:"Vendas"},{id:"financeiro",label:"Financeiro"},{id:"professores",label:"Professores"},{id:"grade",label:"Grade"}]} active={tab} onChange={sT}/>

    {tab==="leads"&&<div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:14}}>
        <MC icon={UserPlus} value="48" label="Leads Total"/><MC icon={Dumbbell} value="32" label="Exp. Agendadas"/><MC icon={UserCheck} value="28" label="Compareceram"/><MC icon={Target} value="27" label="Convertidos"/><MC icon={TrendingUp} value="56%" label="Conversao" color={T.green}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
        <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:16}}><h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px"}}>Funil por Mes</h3><ResponsiveContainer width="100%" height={200}><BarChart data={ld}><CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/><XAxis dataKey="m" fontSize={11} stroke={T.mutedFg}/><YAxis fontSize={11} stroke={T.mutedFg}/><Tooltip/><Legend/><Bar dataKey="leads" fill={T.blue} name="Leads" radius={[4,4,0,0]}/><Bar dataKey="exp" fill={T.primary} name="Exp." radius={[4,4,0,0]}/><Bar dataKey="conv" fill={T.green} name="Conv." radius={[4,4,0,0]}/></BarChart></ResponsiveContainer></div>
        <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:16}}><h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px"}}>Origem dos Leads</h3><ResponsiveContainer width="100%" height={200}><PieChart><Pie data={[{name:"Instagram",v:35},{name:"Indicacao",v:25},{name:"Google",v:20},{name:"Evento",v:12},{name:"Outros",v:8}]} dataKey="v" cx="50%" cy="50%" outerRadius={70} label={({name,v})=>`${name} ${v}%`} labelLine={false}>{[T.purple,T.green,T.blue,T.yellow,T.secondary].map((c,i)=> <Cell key={i} fill={c}/>)}</Pie></PieChart></ResponsiveContainer></div>
      </div>
      <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,overflow:"hidden"}}><div style={{padding:"12px 16px",borderBottom:`1px solid ${T.border}`}}><h3 style={{fontSize:14,fontWeight:600,margin:0}}>Leads com Anotacoes</h3></div>
        <Tbl headers={["Lead","Etapa","Origem","Exp.","Ultima Anotacao"]} rows={[["Camila Rocha","Lead","Instagram","0/4","Interessada em Slim 3x"],["Lucas Mendes","Follow-up","Indicacao","2/4","Enviado proposta"],["Marina Silva","Follow-up","Instagram","3/4","Pediu desconto"]].map((r,i)=> <tr key={i} style={{borderTop:`1px solid ${T.border}`}}><Td bold>{r[0]}</Td><Td><Bdg v="primary">{r[1]}</Bdg></Td><Td>{r[2]}</Td><Td>{r[3]}</Td><Td color={T.fgLight}><span style={{display:"flex",alignItems:"center",gap:4}}><MessageSquare size={12} color={T.mutedFg}/>{r[4]}</span></Td></tr>)}/></div>
    </div>}

    {tab==="alunos"&&<div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
        <MC icon={Users} value="125" label="Ativos"/><MC icon={UserPlus} value="12" label="Novos" change="+8%" up/><MC icon={XCircle} value="3" label="Cancelados" color={T.red}/><MC icon={RefreshCw} value="92%" label="Renovacao" color={T.green}/>
      </div>
      <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:16,marginBottom:14}}><h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px"}}>Evolucao Alunos</h3><ResponsiveContainer width="100%" height={200}><AreaChart data={[{m:"Set",a:105},{m:"Out",a:111},{m:"Nov",a:115},{m:"Dez",a:118},{m:"Jan",a:122},{m:"Fev",a:125}]}><CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/><XAxis dataKey="m" fontSize={11} stroke={T.mutedFg}/><YAxis fontSize={11} stroke={T.mutedFg}/><Tooltip/><Area type="monotone" dataKey="a" stroke={T.primary} fill={`${T.primary}20`} name="Ativos"/></AreaChart></ResponsiveContainer></div>
      <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,overflow:"hidden"}}><div style={{padding:"12px 16px",borderBottom:`1px solid ${T.border}`}}><h3 style={{fontSize:14,fontWeight:600,margin:0}}>Alunos por Plano</h3></div>
        <Tbl headers={["Plano","Alunos","Receita/Mes","% Base"]} rows={[["Slim 3x","42","R$ 15.918","33.6%"],["Slim 2x","28","R$ 7.532","17.7%"],["Free 2x","22","R$ 3.278","17.6%"],["Slim 4x","18","R$ 8.622","14.4%"],["Circuito 2x","15","R$ 2.385","12.0%"]].map((r,i)=> <tr key={i} style={{borderTop:`1px solid ${T.border}`}}><Td bold>{r[0]}</Td><Td>{r[1]}</Td><Td bold color={T.primary}>{r[2]}</Td><Td color={T.mutedFg}>{r[3]}</Td></tr>)}/></div>
    </div>}

    {tab==="vendas"&&<div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:14}}>
        <MC icon={DollarSign} value="R$ 42.5k" label="Vendas Mes" change="+8.2%" up color={T.green}/><MC icon={DollarSign} value="R$ 189" label="Ticket Medio" change="+3.2%" up/><MC icon={FileCheck} value="28" label="Novos Contratos" change="+12%" up/>
      </div>
      <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:16}}><h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px"}}>Vendas por Mes (R$ mil)</h3><ResponsiveContainer width="100%" height={220}><BarChart data={[{m:"Set",v:18},{m:"Out",v:22},{m:"Nov",v:24},{m:"Dez",v:21},{m:"Jan",v:26},{m:"Fev",v:28}]}><CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/><XAxis dataKey="m" fontSize={11} stroke={T.mutedFg}/><YAxis fontSize={11} stroke={T.mutedFg}/><Tooltip/><Bar dataKey="v" fill={T.primary} name="R$ mil" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer></div>
    </div>}

    {tab==="financeiro"&&<div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
        <MC icon={DollarSign} value="R$ 42.5k" label="Entradas" color={T.green}/><MC icon={Wallet} value="R$ 16k" label="Saidas" color={T.red}/><MC icon={TrendingUp} value="R$ 26.5k" label="Resultado" color={T.green}/><MC icon={Target} value="62%" label="Margem"/>
      </div>
      <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:16}}><h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px"}}>Entradas vs Saidas</h3><ResponsiveContainer width="100%" height={220}><BarChart data={[{m:"Set",e:38,s:15},{m:"Out",e:40,s:16},{m:"Nov",e:39,s:14},{m:"Dez",e:42,s:17},{m:"Jan",e:41,s:15},{m:"Fev",e:42,s:16}]}><CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/><XAxis dataKey="m" fontSize={11} stroke={T.mutedFg}/><YAxis fontSize={11} stroke={T.mutedFg}/><Tooltip/><Legend/><Bar dataKey="e" fill={T.green} name="Entradas" radius={[4,4,0,0]}/><Bar dataKey="s" fill={T.red} name="Saidas" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer></div>
    </div>}

    {tab==="professores"&&<div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:14}}>
        <MC icon={Users} value="3" label="Professoras"/><MC icon={Dumbbell} value="126" label="Total Aulas"/><MC icon={DollarSign} value="R$ 3.010" label="Folha Total" color={T.red}/>
      </div>
      <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,overflow:"hidden"}}>
        <Tbl headers={["Professora","Slim","Free","Circuito","Total"]} rows={[["Ana Costa","30x R$25 = R$750","10x R$20 = R$200","8x R$30 = R$240","R$ 1.190"],["Julia Santos","20x R$25 = R$500","14x R$20 = R$280","8x R$30 = R$240","R$ 1.020"],["Carlos Eduardo","18x R$22 = R$396","10x R$18 = R$180","8x R$28 = R$224","R$ 800"]].map((r,i)=> <tr key={i} style={{borderTop:`1px solid ${T.border}`}}><Td bold>{r[0]}</Td><Td color={T.primary}>{r[1]}</Td><Td color={T.yellow}>{r[2]}</Td><Td color={T.purple}>{r[3]}</Td><Td bold color={T.primary}>{r[4]}</Td></tr>)}/>
      </div>
    </div>}

    {tab==="grade"&&<div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
        <MC icon={CalendarDays} value="52" label="Aulas/Sem"/><MC icon={Users} value="78%" label="Ocupacao" color={T.green}/><MC icon={XCircle} value="3" label="Lotadas" color={T.red}/><MC icon={Clock} value="6" label="Cap. Max"/>
      </div>
      <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,overflow:"hidden"}}>
        <Tbl headers={["Tipo","Aulas/Sem","Ocupacao","Lotadas","Professoras"]} rows={[["Slim Fit","28","82%","2","Ana, Julia, Carlos"],["Free","14","74%","1","Julia"],["Circuito","10","68%","0","Ana, Julia"]].map((r,i)=> <tr key={i} style={{borderTop:`1px solid ${T.border}`}}><Td bold>{r[0]}</Td><Td>{r[1]}</Td><Td bold color={T.green}>{r[2]}</Td><Td color={T.red}>{r[3]}</Td><Td color={T.mutedFg}>{r[4]}</Td></tr>)}/>
      </div>
    </div>}
  </div>;
};

// === MAIN ===
const navItems=[
  {id:"dashboard",icon:LayoutDashboard,label:"Dashboard"},
  {id:"grade",icon:CalendarDays,label:"Grade Horaria"},
  {id:"alunos",icon:Users,label:"Alunos"},
  {id:"leads",icon:UserPlus,label:"Leads"},
  {id:"financeiro",icon:Wallet,label:"Financeiro"},
  {id:"comissao",icon:Award,label:"Comissao"},
  {id:"professores",icon:CreditCard,label:"Professores"},
  {id:"relatorios",icon:BarChart3,label:"Relatorios"},
  {id:"permissoes",icon:Shield,label:"Permissoes"},
];
const pages={dashboard: <DashPage/>,grade: <GradePage/>,alunos: <AlunosPage/>,leads: <LeadsPage/>,financeiro: <FinPage/>,comissao: <ComissaoPage/>,professores: <PagProfPage/>,relatorios: <RelatoriosPage/>,permissoes: <PermPage/>};

export default function FranqueadoApp({onSwitch}){
  const [pg,sPg]=useState("dashboard");
  return <div style={{display:"flex",height:"100vh",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",background:T.bg}}>
    <aside style={{width:240,backgroundColor:T.sidebar,display:"flex",flexDirection:"column",flexShrink:0}}>
      <div style={{padding:"18px 20px",borderBottom:`1px solid ${T.sidebarBorder}`}}><Logo/></div>
      {onSwitch&&<div style={{padding:"8px 8px 0"}}>
        <button onClick={onSwitch} style={{display:"flex",alignItems:"center",gap:8,width:"100%",padding:"8px 12px",background:`${T.primary}15`,color:T.primary,border:`1px solid ${T.primary}30`,borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}><ArrowLeft size={14}/>Voltar p/ Franqueadora</button>
      </div>}
      <div style={{padding:"6px 0 0",fontSize:10,fontWeight:700,color:"#555",textTransform:"uppercase",letterSpacing:"0.1em",paddingLeft:20,marginTop:10,marginBottom:3}}>Franqueado / Unidade</div>
      <nav style={{flex:1,overflowY:"auto",padding:"2px 8px"}}>
        {navItems.map(item=>{const isA=pg===item.id;return <button key={item.id} onClick={()=>sPg(item.id)} style={{display:"flex",alignItems:"center",gap:11,width:"100%",padding:"9px 12px",backgroundColor:isA?T.sidebarActive:"transparent",color:isA?T.primary:"#9CA3AF",border:"none",cursor:"pointer",borderRadius:8,fontSize:13,fontWeight:isA?600:400,fontFamily:"inherit",marginBottom:1,borderLeft:isA?`3px solid ${T.primary}`:"3px solid transparent"}}><item.icon size={17}/><span>{item.label}</span></button>})}
      </nav>
      <div style={{padding:"12px 14px",borderTop:`1px solid ${T.sidebarBorder}`}}>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <div style={{width:34,height:34,borderRadius:8,background:`${T.green}30`,display:"flex",alignItems:"center",justifyContent:"center",color:T.green,fontWeight:700,fontSize:12}}>JS</div>
          <div><p style={{fontSize:13,fontWeight:600,margin:0,color:"#E5E7EB"}}>Joao Silva</p><p style={{fontSize:11,color:"#6B7280",margin:0}}>Franqueado - Centro</p></div>
        </div>
      </div>
    </aside>
    <main style={{flex:1,overflowY:"auto",padding:"22px 26px"}}>{pages[pg]}</main>
  </div>;
}
