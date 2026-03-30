import { useState } from "react";
import { LayoutDashboard, Users, FileText, Tag, BarChart3, Wallet, Building2, TrendingUp, FileCheck, DollarSign, UserPlus, Target, Plus, Search, Phone, Mail, Edit, Trash2, Filter, Calendar, Dumbbell, Clock, Check, Download, CreditCard, ArrowUpRight, Calculator, Repeat, MapPin, ArrowLeft, ChevronRight } from "lucide-react";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import FranqueadoApp from "./FranqueadoApp";
import ProfessorApp from "./ProfessorApp";

const T = { primary:"#00BFB3", secondary:"#808080", bg:"#F8F9FA", card:"#fff", sidebar:"#1A1D21", sidebarActive:"#2D3239", sidebarBorder:"#2D3239", border:"#E5E7EB", muted:"#F3F4F6", mutedFg:"#6B7280", fg:"#111827", fgLight:"#374151", inputBg:"#F9FAFB", green:"#10B981", greenBg:"#ECFDF5", red:"#EF4444", redBg:"#FEF2F2", yellow:"#F59E0B", yellowBg:"#FFFBEB", purple:"#8B5CF6", radius:"12px", rsm:"8px" };

// === DATA ===
const UNITS = [
  { id:"centro", name:"Slim Fit - Centro", addr:"Rua Principal, 123 - Centro", phone:"(11) 98765-4321", email:"centro@slimfit.com.br", mgr:"João Silva", alunos:125, contratos:112, receita:42500, leads:48, conv:"78%", pct:0 },
  { id:"barra", name:"Slim Fit - Barra", addr:"Av. das Américas, 5000 - Barra", phone:"(11) 98765-4322", email:"barra@slimfit.com.br", mgr:"Maria Santos", alunos:98, contratos:89, receita:38200, leads:35, conv:"72%", pct:5 },
  { id:"norte", name:"Slim Fit - Norte", addr:"Rua Norte, 456 - Zona Norte", phone:"(11) 98765-4323", email:"norte@slimfit.com.br", mgr:"Pedro Costa", alunos:119, contratos:104, receita:35800, leads:42, conv:"75%", pct:-3 },
];
const UOPTS = [{ value:"all", label:"Todas as Unidades" }, ...UNITS.map(u=>({ value:u.id, label:u.name }))];
const COLLABS = [
  { name:"João Silva", role:"Gerente", unit:"centro", email:"joao@slimfit.com.br", phone:"(11) 98765-1234", av:"JS" },
  { name:"Maria Santos", role:"Gerente", unit:"barra", email:"maria@slimfit.com.br", phone:"(11) 98765-1235", av:"MS" },
  { name:"Pedro Costa", role:"Gerente", unit:"norte", email:"pedro@slimfit.com.br", phone:"(11) 98765-1236", av:"PC" },
  { name:"Ana Paula", role:"Secretária", unit:"centro", email:"ana@slimfit.com.br", phone:"(11) 98765-1237", av:"AP" },
  { name:"Carlos Eduardo", role:"Professor", unit:"centro", email:"carlos@slimfit.com.br", phone:"(11) 98765-1238", av:"CE" },
  { name:"Juliana Oliveira", role:"Professora", unit:"barra", email:"juliana@slimfit.com.br", phone:"(11) 98765-1239", av:"JO" },
  { name:"Lucas Mendes", role:"Professor", unit:"norte", email:"lucas@slimfit.com.br", phone:"(11) 98765-1240", av:"LM" },
  { name:"Fernanda Lima", role:"Secretária", unit:"norte", email:"fernanda@slimfit.com.br", phone:"(11) 98765-1241", av:"FL" },
  { name:"Ricardo Alves", role:"Professor", unit:"barra", email:"ricardo@slimfit.com.br", phone:"(11) 98765-1242", av:"RA" },
];
const ALUNOS_DATA = [
  { id:"AL-001", name:"Ana Paula Silva", unit:"centro", plano:"Slim 3x + Circ 2x", value:"R$ 389/mês", start:"01/01/2026", status:"Ativo", pay:"Em dia" },
  { id:"AL-002", name:"Carlos Eduardo", unit:"barra", plano:"Free 2x", value:"R$ 149/mês", start:"15/01/2026", status:"Ativo", pay:"Em dia" },
  { id:"AL-003", name:"Juliana Oliveira", unit:"norte", plano:"Slim 4x + Circ 3x", value:"R$ 520/mês", start:"10/02/2026", status:"Ativo", pay:"Pendente" },
  { id:"AL-004", name:"Roberto Ferreira", unit:"centro", plano:"Free 1x", value:"R$ 99/mês", start:"05/12/2025", status:"Cancelado", pay:"—" },
  { id:"AL-005", name:"Mariana Torres", unit:"barra", plano:"Slim 2x + Circ 1x", value:"R$ 289/mês", start:"20/01/2026", status:"Ativo", pay:"Em dia" },
  { id:"AL-006", name:"Thiago Souza", unit:"norte", plano:"Slim 3x", value:"R$ 379/mês", start:"08/01/2026", status:"Ativo", pay:"Em dia" },
  { id:"AL-007", name:"Camila Rocha", unit:"centro", plano:"Free 3x + Circ 2x", value:"R$ 408/mês", start:"12/02/2026", status:"Ativo", pay:"Pendente" },
];

// === UI ATOMS ===
const Bdg = ({children,v="primary"})=>{const s={primary:{b:`${T.primary}12`,c:T.primary},secondary:{b:"#F3F4F6",c:T.secondary},green:{b:T.greenBg,c:T.green},red:{b:T.redBg,c:T.red},yellow:{b:T.yellowBg,c:T.yellow}};const st=s[v]||s.primary;return <span style={{fontSize:12,padding:"4px 12px",borderRadius:999,backgroundColor:st.b,color:st.c,fontWeight:600,whiteSpace:"nowrap"}}>{children}</span>};

const MC = ({icon:I,value,label,change,up,color=T.primary})=>(
  <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:"16px 18px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
      <div style={{width:40,height:40,borderRadius:10,backgroundColor:`${color}12`,display:"flex",alignItems:"center",justifyContent:"center"}}><I size={20} color={color}/></div>
      {change&&<span style={{fontSize:11,padding:"2px 7px",borderRadius:6,backgroundColor:up?T.greenBg:T.redBg,color:up?T.green:T.red,fontWeight:600,display:"flex",alignItems:"center",gap:2}}><ArrowUpRight size={11} style={{transform:up?"none":"rotate(90deg)"}}/>{change}</span>}
    </div>
    <h3 style={{fontSize:22,fontWeight:700,margin:"0 0 2px",color:T.fg,letterSpacing:"-0.02em"}}>{value}</h3>
    <p style={{fontSize:12,color:T.mutedFg,margin:0}}>{label}</p>
  </div>
);

const PBtn=({children,onClick,icon:I,small,sec})=><button onClick={onClick} style={{display:"flex",alignItems:"center",gap:7,padding:small?"7px 14px":"9px 20px",backgroundColor:sec?T.card:T.primary,color:sec?T.fg:"#fff",borderRadius:T.rsm,border:sec?`1px solid ${T.border}`:"none",fontSize:small?13:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{I&&<I size={small?15:17}/>}{children}</button>;
const GBtn=({children,color=T.primary,onClick,full})=><button onClick={onClick} style={{flex:full?1:undefined,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"7px 12px",backgroundColor:`${color}08`,color,borderRadius:T.rsm,border:`1px solid ${color}20`,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{children}</button>;
const SI=({placeholder,value,onChange})=><div style={{position:"relative",flex:1}}><Search size={17} color={T.mutedFg} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}/><input type="text" placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",padding:"9px 14px 9px 38px",backgroundColor:T.inputBg,borderRadius:T.rsm,border:`1px solid ${T.border}`,fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/></div>;
const Sel=({value,onChange,options,icon:I})=><div style={{position:"relative"}}>{I&&<I size={16} color={T.mutedFg} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}/>}<select value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",padding:`9px 14px 9px ${I?38:14}px`,backgroundColor:T.inputBg,borderRadius:T.rsm,border:`1px solid ${T.border}`,fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box",appearance:"none"}}>{options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select></div>;
const SelL=({value,onChange,options,label})=><div><label style={{display:"block",fontSize:12,fontWeight:600,marginBottom:5,color:T.fgLight}}>{label}</label><select value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",padding:"9px 14px",backgroundColor:T.inputBg,borderRadius:T.rsm,border:`1px solid ${T.border}`,fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box",appearance:"none"}}>{options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select></div>;
const NI=({label,value,onChange,prefix,suffix})=><div>{label&&<label style={{display:"block",fontSize:12,fontWeight:600,marginBottom:5,color:T.fgLight}}>{label}</label>}<div style={{position:"relative"}}>{prefix&&<span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:13,color:T.mutedFg,fontWeight:600}}>{prefix}</span>}<input type="number" value={value} onChange={e=>onChange(Number(e.target.value))} style={{width:"100%",padding:`9px ${suffix?36:14}px 9px ${prefix?36:14}px`,backgroundColor:T.inputBg,borderRadius:T.rsm,border:`1px solid ${T.border}`,fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/>{suffix&&<span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:13,color:T.mutedFg,fontWeight:600}}>{suffix}</span>}</div></div>;
const TI=({label,placeholder})=><div><label style={{display:"block",fontSize:12,fontWeight:600,marginBottom:5,color:T.fgLight}}>{label}</label><input type="text" placeholder={placeholder} style={{width:"100%",padding:"9px 14px",backgroundColor:T.inputBg,borderRadius:T.rsm,border:`1px solid ${T.border}`,fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/></div>;

const PH=({title,sub,action,back})=><div style={{marginBottom:20}}>{back&&<button onClick={back} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:T.primary,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",padding:0,marginBottom:8}}><ArrowLeft size={16}/>Voltar</button>}<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><h1 style={{fontSize:22,fontWeight:700,margin:"0 0 3px",color:T.fg}}>{title}</h1><p style={{fontSize:13,color:T.mutedFg,margin:0}}>{sub}</p></div>{action}</div></div>;

const Tbl=({headers,rows})=><div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{backgroundColor:T.muted}}>{headers.map((h,i)=><th key={i} style={{padding:"10px 16px",textAlign:"left",fontSize:11,fontWeight:700,color:T.mutedFg,textTransform:"uppercase",letterSpacing:"0.05em"}}>{h}</th>)}</tr></thead><tbody>{rows}</tbody></table></div>;
const Td=({children,bold,color})=><td style={{padding:"10px 16px",fontSize:13,fontWeight:bold?600:400,color:color||T.fg}}>{children}</td>;
const TB=({tabs,active,onChange})=><div style={{display:"flex",gap:3,background:T.muted,borderRadius:T.rsm,padding:3,marginBottom:16}}>{tabs.map(t=><button key={t.id} onClick={()=>onChange(t.id)} style={{padding:"7px 16px",borderRadius:6,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",backgroundColor:active===t.id?T.card:"transparent",color:active===t.id?T.primary:T.mutedFg,boxShadow:active===t.id?"0 1px 3px rgba(0,0,0,0.08)":"none"}}>{t.label}</button>)}</div>;
const Logo=()=> <img src="data:image/png;base64,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" alt="SlimFit" style={{height:36}}/>;
const rc=r=>["Gerente","Professor","Professora"].includes(r)?T.primary:T.secondary;

// === DASHBOARD ===
const DashPage=()=>{
  const [u,sU]=useState("all"),[p,sP]=useState("30d");
  const sd=[{m:"Set",v:58,l:88,c:42},{m:"Out",v:67,l:102,c:51},{m:"Nov",v:72,l:115,c:58},{m:"Dez",v:69,l:98,c:49},{m:"Jan",v:78,l:128,c:64},{m:"Fev",v:82,l:142,c:71}];
  return <div>
    <PH title="Dashboard - Franqueadora" sub="Visão financeira consolidada"/>
    <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:12,marginBottom:16,display:"flex",gap:10}}>
      <Sel value={u} onChange={sU} icon={Filter} options={UOPTS}/><Sel value={p} onChange={sP} icon={Calendar} options={[{value:"7d",label:"7 dias"},{value:"30d",label:"30 dias"},{value:"90d",label:"90 dias"},{value:"year",label:"Ano"}]}/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
      <MC icon={DollarSign} value="R$ 125.4k" label="Vendas Totais" change="+12.5%" up color={T.green}/>
      <MC icon={Users} value="342" label="Alunos Ativos" change="+8.2%" up/>
      <MC icon={UserPlus} value="156" label="Leads" change="+18.5%" up/>
      <MC icon={Target} value="62,5%" label="Conversão" change="+7.8%" up/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
      <MC icon={CreditCard} value="R$ 189" label="Ticket Médio" change="+3.2%" up/>
      <MC icon={FileCheck} value="285" label="Contratos" change="+5.1%" up/>
      <MC icon={Dumbbell} value="89" label="Aulas Exp." change="+15.3%" up/>
      <MC icon={FileText} value="18" label="Cancelamentos" color={T.secondary}/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:14,marginBottom:16}}>
      <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:20}}>
        <h3 style={{fontSize:15,fontWeight:600,margin:"0 0 12px"}}>Vendas Mensais (R$ mil)</h3>
        <ResponsiveContainer width="100%" height={220}><AreaChart data={sd}><defs><linearGradient id="cV" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={T.primary} stopOpacity={0.2}/><stop offset="95%" stopColor={T.primary} stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/><XAxis dataKey="m" stroke={T.mutedFg} fontSize={11}/><YAxis stroke={T.mutedFg} fontSize={11}/><Tooltip/><Area type="monotone" dataKey="v" stroke={T.primary} fill="url(#cV)" strokeWidth={2.5} name="Vendas"/></AreaChart></ResponsiveContainer>
      </div>
      <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:20}}>
        <h3 style={{fontSize:15,fontWeight:600,margin:"0 0 12px"}}>Leads vs Conversões</h3>
        <ResponsiveContainer width="100%" height={220}><BarChart data={sd}><CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/><XAxis dataKey="m" stroke={T.mutedFg} fontSize={11}/><YAxis stroke={T.mutedFg} fontSize={11}/><Tooltip/><Legend/><Bar dataKey="l" fill={T.primary} name="Leads" radius={[4,4,0,0]}/><Bar dataKey="c" fill={`${T.primary}50`} name="Conv." radius={[4,4,0,0]}/></BarChart></ResponsiveContainer>
      </div>
    </div>
    <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,overflow:"hidden"}}>
      <div style={{padding:"12px 16px",borderBottom:`1px solid ${T.border}`}}><h3 style={{fontSize:15,fontWeight:600,margin:0}}>Desempenho por Unidade</h3></div>
      <Tbl headers={["Unidade","Alunos","Vendas","Conversão","Status"]} rows={UNITS.map((u,i)=><tr key={i} style={{borderTop:`1px solid ${T.border}`}}><Td bold>{u.name}</Td><Td>{u.alunos}</Td><Td bold color={T.primary}>R$ {u.receita.toLocaleString("pt-BR")}</Td><Td color={T.green}>{u.conv}</Td><Td><Bdg v="green">Ativa</Bdg></Td></tr>)}/>
    </div>
  </div>;
};

// === UNIDADES ===
const UnidadesPage=({onNav})=>{
  const [show,setShow]=useState(false);
  return <div>
    <PH title="Unidades" sub="Gerencie as unidades franqueadas" action={<PBtn icon={Plus} onClick={()=>setShow(true)}>Nova Unidade</PBtn>}/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
      {UNITS.map(u=>(
        <div key={u.id} onClick={()=>onNav(u.id)} style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,overflow:"hidden",cursor:"pointer",transition:"box-shadow 0.15s"}}>
          <div style={{padding:"16px 18px",borderBottom:`1px solid ${T.border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:38,height:38,borderRadius:10,background:`${T.primary}12`,display:"flex",alignItems:"center",justifyContent:"center"}}><Building2 size={18} color={T.primary}/></div>
                <div><h3 style={{fontSize:15,fontWeight:700,margin:0}}>{u.name}</h3><p style={{fontSize:12,color:T.mutedFg,margin:"2px 0 0"}}>{u.mgr}</p></div>
              </div>
              <Bdg v="green">Ativa</Bdg>
            </div>
            <div style={{fontSize:12,color:T.mutedFg,display:"flex",alignItems:"center",gap:5}}><MapPin size={12}/>{u.addr}</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",padding:"12px 18px"}}>
            {[{v:u.alunos,l:"Alunos",c:T.primary},{v:u.contratos,l:"Contratos",c:T.green},{v:`R$${(u.receita/1000).toFixed(0)}k`,l:"Receita",c:T.primary},{v:u.conv,l:"Conv.",c:T.green}].map((m,i)=>(
              <div key={i} style={{textAlign:"center"}}><div style={{fontSize:17,fontWeight:700,color:m.c}}>{m.v}</div><div style={{fontSize:9,color:T.mutedFg,fontWeight:600,textTransform:"uppercase"}}>{m.l}</div></div>
            ))}
          </div>
          <div style={{padding:"8px 18px 12px",display:"flex",alignItems:"center",justifyContent:"center",gap:4,fontSize:13,color:T.primary,fontWeight:600}}>Ver detalhes <ChevronRight size={15}/></div>
        </div>
      ))}
      <div onClick={()=>setShow(true)} style={{background:"transparent",borderRadius:T.radius,border:`2px dashed ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8,cursor:"pointer",minHeight:220}}>
        <div style={{width:44,height:44,borderRadius:12,background:`${T.primary}12`,display:"flex",alignItems:"center",justifyContent:"center"}}><Plus size={22} color={T.primary}/></div>
        <span style={{fontSize:13,color:T.mutedFg,fontWeight:600}}>Criar Unidade</span>
      </div>
    </div>
    {show&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:50}}>
      <div style={{background:T.card,borderRadius:T.radius,padding:24,width:"100%",maxWidth:560,margin:16}}>
        <h2 style={{fontSize:20,fontWeight:700,margin:"0 0 18px"}}>Nova Unidade</h2>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <TI label="Nome da Unidade" placeholder="Ex: Slim Fit - Moema"/>
          <TI label="Endereço Completo" placeholder="Rua, número, bairro, cidade"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <TI label="CNPJ" placeholder="00.000.000/0000-00"/>
            <TI label="Telefone" placeholder="(00) 00000-0000"/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <TI label="E-mail" placeholder="email@slimfit.com.br"/>
            <TI label="Responsável (Gerente)" placeholder="Nome completo"/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <NI label="% Ajuste Valor Base" value={0} onChange={()=>{}} suffix="%"/>
            <TI label="Horário Funcionamento" placeholder="06h - 22h"/>
          </div>
        </div>
        <div style={{display:"flex",gap:10,marginTop:20}}>
          <button onClick={()=>setShow(false)} style={{flex:1,padding:10,backgroundColor:T.muted,color:T.fg,borderRadius:T.rsm,border:"none",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Cancelar</button>
          <button onClick={()=>setShow(false)} style={{flex:1,padding:10,backgroundColor:T.primary,color:"#fff",borderRadius:T.rsm,border:"none",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Criar Unidade</button>
        </div>
      </div>
    </div>}
  </div>;
};

// === UNIT DETAIL ===
const UnitDetail=({uid,onBack})=>{
  const [tab,setTab]=useState("overview");
  const unit=UNITS.find(u=>u.id===uid); if(!unit) return null;
  const uCollabs=COLLABS.filter(c=>c.unit===uid);
  const uAlunos=ALUNOS_DATA.filter(a=>a.unit===uid);
  const shortName=unit.name.split(" - ")[1];
  return <div>
    <PH title={unit.name} sub={`${unit.addr} · ${unit.mgr}`} back={onBack}/>
    <TB tabs={[{id:"overview",label:"Visão Geral"},{id:"relatorios",label:"Relatórios"},{id:"colaboradores",label:"Colaboradores"},{id:"alunos",label:"Alunos"}]} active={tab} onChange={setTab}/>
    {tab==="overview"&&<div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
        <MC icon={Users} value={String(unit.alunos)} label="Alunos" change="+8%" up/><MC icon={FileCheck} value={String(unit.contratos)} label="Contratos" change="+5%" up/>
        <MC icon={DollarSign} value={`R$ ${(unit.receita/1000).toFixed(1)}k`} label="Receita" change="+12%" up color={T.green}/><MC icon={Target} value={unit.conv} label="Conversão" change="+2%" up/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:18}}>
          <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px"}}>Vendas — {shortName}</h3>
          <ResponsiveContainer width="100%" height={180}><BarChart data={[{m:"Set",v:18},{m:"Out",v:22},{m:"Nov",v:24},{m:"Dez",v:21},{m:"Jan",v:26},{m:"Fev",v:Math.round(unit.receita/1000)}]}><CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/><XAxis dataKey="m" fontSize={11} stroke={T.mutedFg}/><YAxis fontSize={11} stroke={T.mutedFg}/><Tooltip/><Bar dataKey="v" fill={T.primary} radius={[4,4,0,0]} name="R$ mil"/></BarChart></ResponsiveContainer>
        </div>
        <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:18}}>
          <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px"}}>Informações</h3>
          <div style={{display:"flex",flexDirection:"column",gap:10,fontSize:13}}>
            {[["Endereço",unit.addr],["Telefone",unit.phone],["E-mail",unit.email],["Responsável",unit.mgr],["Ajuste preço",`${unit.pct>=0?"+":""}${unit.pct}%`]].map(([l,v],i)=><div key={i} style={{display:"flex",justifyContent:"space-between"}}><span style={{color:T.mutedFg}}>{l}</span><span style={{fontWeight:600}}>{v}</span></div>)}
          </div>
        </div>
      </div>
    </div>}
    {tab==="relatorios"&&<div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
        <MC icon={UserPlus} value={String(unit.leads)} label="Leads" change="+10%" up/><MC icon={Target} value={unit.conv} label="Conversão" change="+2%" up/>
        <MC icon={DollarSign} value={`R$ ${(unit.receita/1000).toFixed(1)}k`} label="Receita" change="+12%" up color={T.green}/><MC icon={Repeat} value="94%" label="Renovação" change="+3%" up color={T.green}/>
      </div>
      <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:18}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><h3 style={{fontSize:14,fontWeight:600,margin:0}}>Leads vs Conversões — {shortName}</h3><PBtn small icon={Download} sec>Exportar</PBtn></div>
        <ResponsiveContainer width="100%" height={220}><BarChart data={[{m:"Set",l:28,c:14},{m:"Out",l:32,c:18},{m:"Nov",l:38,c:22},{m:"Dez",l:30,c:16},{m:"Jan",l:42,c:24},{m:"Fev",l:unit.leads,c:Math.round(unit.leads*0.5)}]}><CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/><XAxis dataKey="m" fontSize={11} stroke={T.mutedFg}/><YAxis fontSize={11} stroke={T.mutedFg}/><Tooltip/><Legend/><Bar dataKey="l" fill={T.primary} name="Leads" radius={[4,4,0,0]}/><Bar dataKey="c" fill={T.green} name="Conv." radius={[4,4,0,0]}/></BarChart></ResponsiveContainer>
      </div>
    </div>}
    {tab==="colaboradores"&&<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
      {uCollabs.map((c,i)=><div key={i} style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:18}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <div style={{width:38,height:38,borderRadius:"50%",backgroundColor:rc(c.role),display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:600,fontSize:12}}>{c.av}</div>
          <div><h3 style={{fontSize:14,fontWeight:600,margin:"0 0 3px"}}>{c.name}</h3><Bdg v={rc(c.role)===T.primary?"primary":"secondary"}>{c.role}</Bdg></div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:5,fontSize:12,color:T.mutedFg}}>
          <div style={{display:"flex",alignItems:"center",gap:5}}><Mail size={12}/>{c.email}</div>
          <div style={{display:"flex",alignItems:"center",gap:5}}><Phone size={12}/>{c.phone}</div>
        </div>
      </div>)}
    </div>}
    {tab==="alunos"&&<div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,overflow:"hidden"}}>
      <Tbl headers={["Código","Aluno","Plano","Valor","Status"]} rows={uAlunos.map(a=><tr key={a.id} style={{borderTop:`1px solid ${T.border}`}}><Td bold color={T.primary}>{a.id}</Td><Td bold>{a.name}</Td><Td color={T.mutedFg}>{a.plano}</Td><Td bold>{a.value}</Td><Td><Bdg v={a.status==="Ativo"?"green":"secondary"}>{a.status}</Bdg></Td></tr>)}/>
    </div>}
  </div>;
};

// === ALUNOS (with unit filter) ===
const AlunosPage=()=>{
  const [s,sS]=useState(""),[uf,sUf]=useState("all"),[sf,sSf]=useState("all");
  const f=ALUNOS_DATA.filter(a=>{const ms=a.name.toLowerCase().includes(s.toLowerCase())||a.id.toLowerCase().includes(s.toLowerCase());return ms&&(uf==="all"||a.unit===uf)&&(sf==="all"||a.status.toLowerCase()===sf)});
  return <div>
    <PH title="Alunos" sub="Report de alunos, métricas e quantidades" action={<PBtn icon={Plus}>Novo Aluno</PBtn>}/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
      <MC icon={Users} value="342" label="Alunos Ativos" change="+8.2%" up/><MC icon={UserPlus} value="28" label="Novos este Mês" change="+12%" up/><MC icon={FileText} value="18" label="Cancelamentos" color={T.red}/><MC icon={CreditCard} value="R$ 189" label="Ticket Médio" change="+3.2%" up/>
    </div>
    <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:10,marginBottom:16,display:"flex",gap:8}}>
      <SI placeholder="Buscar nome ou código..." value={s} onChange={sS}/>
      <Sel value={uf} onChange={sUf} icon={Building2} options={UOPTS}/>
      <Sel value={sf} onChange={sSf} icon={Filter} options={[{value:"all",label:"Todos"},{value:"ativo",label:"Ativos"},{value:"cancelado",label:"Cancelados"}]}/>
    </div>
    <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,overflow:"hidden"}}>
      <Tbl headers={["Código","Aluno","Unidade","Plano","Valor","Início","Status","Pagamento"]} rows={f.map(a=>{const un=UNITS.find(u=>u.id===a.unit)?.name.split(" - ")[1]||a.unit;return <tr key={a.id} style={{borderTop:`1px solid ${T.border}`}}><Td bold color={T.primary}>{a.id}</Td><Td bold>{a.name}</Td><Td color={T.mutedFg}>{un}</Td><Td>{a.plano}</Td><Td bold>{a.value}</Td><Td color={T.mutedFg}>{a.start}</Td><Td><Bdg v={a.status==="Ativo"?"green":"secondary"}>{a.status}</Bdg></Td><Td><Bdg v={a.pay==="Em dia"?"green":a.pay==="Pendente"?"yellow":"secondary"}>{a.pay}</Bdg></Td></tr>})}/>
    </div>
  </div>;
};

// === CONTRATOS — Calculator with base prices + unit % ===
const ContratosPage=()=>{
  const [showCalc,setShow]=useState(false);
  const [fQ,sFQ]=useState(0),[sQ,sSQ]=useState(0),[cQ,sCQ]=useState(0);
  const [bFree,sBF]=useState(99),[bSlim,sBS]=useState(149),[bCirc,sBC]=useState(89);
  const [agend,sAgend]=useState("7"),[repo,sRepo]=useState("48h");
  const [adj,sAdj]=useState(()=>{const o={};UNITS.forEach(u=>{o[u.id]={free:u.pct,slim:u.pct,circ:u.pct}});return o});
  const setA=(uid,tp,v)=>sAdj(p=>({...p,[uid]:{...p[uid],[tp]:Number(v)}}));

  const mult=[0,1,1.8,2.5,3.1];
  const cB=(base,qty)=>qty===0?0:Math.round(base*mult[qty]);
  const bF=cB(bFree,fQ), bS=cB(bSlim,sQ), bC=cB(bCirc,cQ);
  const baseT=bF+bS+bC;
  const uFin=(uid)=>{const a=adj[uid]||{free:0,slim:0,circ:0};return Math.round(bF*(1+a.free/100))+Math.round(bS*(1+a.slim/100))+Math.round(bC*(1+a.circ/100))};

  const contracts=[
    {id:"CT-001",nm:"Plano Slim Básico",combo:"Slim 2x",base:"R$ 269",al:45},
    {id:"CT-002",nm:"Plano Completo",combo:"Slim 3x + Circ 2x",base:"R$ 538",al:82},
    {id:"CT-003",nm:"Plano Free Start",combo:"Free 2x",base:"R$ 179",al:38},
    {id:"CT-004",nm:"Plano Premium",combo:"Slim 4x + Circ 3x + Free 1x",base:"R$ 857",al:24},
  ];

  const PctIn=({value,onChange})=>(
    <div style={{display:"flex",alignItems:"center",gap:2}}>
      <button onClick={()=>onChange(value-1)} style={{width:22,height:22,borderRadius:4,border:`1px solid ${T.border}`,background:T.muted,cursor:"pointer",fontSize:13,fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",color:T.fg,padding:0}}>{"−"}</button>
      <input type="number" value={value} onChange={e=>onChange(Number(e.target.value))} style={{width:40,textAlign:"center",padding:"2px 0",borderRadius:4,border:`1px solid ${T.border}`,fontSize:12,fontWeight:700,fontFamily:"inherit",outline:"none",color:value>0?T.red:value<0?T.green:T.fg,background:T.inputBg}}/>
      <span style={{fontSize:11,fontWeight:700,color:T.mutedFg}}>%</span>
      <button onClick={()=>onChange(value+1)} style={{width:22,height:22,borderRadius:4,border:`1px solid ${T.border}`,background:T.muted,cursor:"pointer",fontSize:13,fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",color:T.fg,padding:0}}>{"+"}</button>
    </div>
  );

  const FreqB=({n,active,onClick,price,color})=>(
    <button onClick={onClick} style={{flex:1,padding:"7px 2px",borderRadius:6,border:active?`2px solid ${color}`:`1px solid ${T.border}`,background:active?`${color}12`:T.card,color:active?color:T.mutedFg,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",flexDirection:"column",alignItems:"center",gap:1}}>
      <span>{n===0?"\u2014":`${n}x`}</span>
      {n>0&&price>0&&<span style={{fontSize:9,opacity:0.7}}>R${price}</span>}
    </button>
  );

  const Step=({n,label})=>(
    <div style={{fontSize:12,fontWeight:700,color:T.mutedFg,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10,display:"flex",alignItems:"center",gap:6}}>
      <span style={{width:20,height:20,borderRadius:6,background:T.primary,color:"#fff",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800}}>{n}</span>{label}
    </div>
  );

  return <div>
    <PH title="Contratos" sub="Modelos de contrato \u2014 aplica para todas as unidades com ajuste individual" action={<PBtn icon={Plus} onClick={()=>setShow(true)}>Novo Contrato</PBtn>}/>

    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:18}}>
      <MC icon={FileCheck} value="285" label="Contratos Ativos" change="+5.1%" up/>
      <MC icon={Users} value="220" label="Alunos Vinculados" change="+8%" up/>
      <MC icon={DollarSign} value="R$ 83.6k" label="Receita Contratos" change="+12%" up color={T.green}/>
      <MC icon={Repeat} value="92%" label="Renovacao" change="+2.3%" up color={T.green}/>
    </div>

    <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,overflow:"hidden"}}>
      <div style={{padding:"14px 18px",borderBottom:`1px solid ${T.border}`}}><h3 style={{fontSize:15,fontWeight:600,margin:0}}>Contratos Cadastrados</h3></div>
      <Tbl headers={["Codigo","Plano","Combinacao","Valor Base","Alunos","Status"]} rows={contracts.map(c=> <tr key={c.id} style={{borderTop:`1px solid ${T.border}`}}><Td bold color={T.primary}>{c.id}</Td><Td bold>{c.nm}</Td><Td color={T.mutedFg}>{c.combo}</Td><Td bold color={T.primary}>{c.base}/mes</Td><Td>{c.al}</Td><Td><Bdg v="green">Ativo</Bdg></Td></tr>)}/>
    </div>

    {/* ===== MODAL ===== */}
    {showCalc&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:50}} onClick={e=>{if(e.target===e.currentTarget)setShow(false)}}>
      <div style={{background:T.bg,borderRadius:T.radius,width:"100%",maxWidth:780,maxHeight:"92vh",overflow:"auto",margin:16}}>

        <div style={{padding:"18px 24px",borderBottom:`1px solid ${T.border}`,background:T.card,borderRadius:`${T.radius} ${T.radius} 0 0`,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:2}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:38,height:38,borderRadius:10,background:`${T.primary}12`,display:"flex",alignItems:"center",justifyContent:"center"}}><Calculator size={20} color={T.primary}/></div>
            <div><h2 style={{fontSize:18,fontWeight:700,margin:0}}>Novo Contrato</h2><p style={{fontSize:12,color:T.mutedFg,margin:0}}>Configure o plano para todas as unidades</p></div>
          </div>
          <button onClick={()=>setShow(false)} style={{background:T.muted,border:"none",width:30,height:30,borderRadius:8,cursor:"pointer",fontSize:18,fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",color:T.fg}}>{"\u00d7"}</button>
        </div>

        <div style={{padding:"20px 24px",display:"flex",flexDirection:"column",gap:20}}>

          {/* STEP 1 */}
          <div>
            <Step n="1" label="Valor Base por Tipo de Aula (1x/semana)"/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
              {[{l:"Aula Free",v:bFree,s:sBF,c:T.yellow},{l:"Aula Slim",v:bSlim,s:sBS,c:T.primary},{l:"Circuito",v:bCirc,s:sBC,c:T.purple}].map(x=>(
                <div key={x.l} style={{background:`${x.c}08`,border:`1px solid ${x.c}30`,borderRadius:T.rsm,padding:16,textAlign:"center"}}>
                  <div style={{fontSize:11,fontWeight:700,color:x.c,textTransform:"uppercase",marginBottom:8}}>{x.l}</div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
                    <span style={{fontSize:14,fontWeight:700,color:T.mutedFg}}>R$</span>
                    <input type="number" value={x.v} onChange={e=>x.s(Number(e.target.value))} style={{width:80,textAlign:"center",padding:"8px 4px",borderRadius:8,border:`2px solid ${x.c}40`,fontSize:22,fontWeight:800,fontFamily:"inherit",outline:"none",color:x.c,background:"#fff"}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 2 */}
          <div>
            <Step n="2" label="Frequencia Semanal"/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
              {[{l:"Aulas Free",val:fQ,set:sFQ,base:bFree,c:T.yellow},{l:"Aulas Slim",val:sQ,set:sSQ,base:bSlim,c:T.primary},{l:"Circuito",val:cQ,set:sCQ,base:bCirc,c:T.purple}].map(g=>(
                <div key={g.l} style={{background:T.muted,borderRadius:T.rsm,padding:12}}>
                  <div style={{fontSize:11,fontWeight:700,color:T.fg,marginBottom:6,display:"flex",alignItems:"center",gap:4}}><Dumbbell size={13} color={g.c}/>{g.l}</div>
                  <div style={{display:"flex",gap:4}}>
                    {[0,1,2,3,4].map(n=> <FreqB key={n} n={n} active={g.val===n} onClick={()=>g.set(n)} price={cB(g.base,n)} color={g.c}/>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Base Total */}
          <div style={{background:T.card,borderRadius:T.rsm,border:`1px solid ${T.border}`,padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:T.mutedFg,textTransform:"uppercase"}}>Valor Base do Contrato</div>
              <div style={{fontSize:12,color:T.fgLight,marginTop:1}}>{[fQ>0&&("Free "+fQ+"x = R$"+bF),sQ>0&&("Slim "+sQ+"x = R$"+bS),cQ>0&&("Circ "+cQ+"x = R$"+bC)].filter(Boolean).join("  +  ")||"Selecione acima"}</div>
            </div>
            <div style={{fontSize:28,fontWeight:800,color:T.fg}}>R$ {baseT>0?baseT.toFixed(2).replace(".",","):"0,00"}<span style={{fontSize:12,fontWeight:500,color:T.mutedFg}}> /mes</span></div>
          </div>

          {/* STEP 3 — Per unit per class % */}
          <div>
            <Step n="3" label="Ajuste por Unidade (% sobre cada tipo de aula)"/>
            <div style={{background:T.card,borderRadius:T.rsm,border:`1px solid ${T.border}`,overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:"130px 1fr 1fr 1fr 100px",background:T.muted,padding:"10px 14px",gap:6}}>
                <div style={{fontSize:10,fontWeight:700,color:T.mutedFg}}>UNIDADE</div>
                <div style={{fontSize:10,fontWeight:700,color:T.yellow,textAlign:"center"}}>% FREE</div>
                <div style={{fontSize:10,fontWeight:700,color:T.primary,textAlign:"center"}}>% SLIM</div>
                <div style={{fontSize:10,fontWeight:700,color:T.purple,textAlign:"center"}}>% CIRCUITO</div>
                <div style={{fontSize:10,fontWeight:700,color:T.fg,textAlign:"center"}}>FINAL</div>
              </div>
              {UNITS.map(u=>{const a=adj[u.id]||{free:0,slim:0,circ:0};const fin=uFin(u.id);const diff=fin-baseT;return (
                <div key={u.id} style={{display:"grid",gridTemplateColumns:"130px 1fr 1fr 1fr 100px",padding:"12px 14px",borderTop:`1px solid ${T.border}`,alignItems:"center",gap:6}}>
                  <div><div style={{fontSize:13,fontWeight:700}}>{u.name.split(" - ")[1]}</div><div style={{fontSize:10,color:T.mutedFg}}>{u.mgr}</div></div>
                  <div style={{display:"flex",justifyContent:"center"}}><PctIn value={a.free} onChange={v=>setA(u.id,"free",v)}/></div>
                  <div style={{display:"flex",justifyContent:"center"}}><PctIn value={a.slim} onChange={v=>setA(u.id,"slim",v)}/></div>
                  <div style={{display:"flex",justifyContent:"center"}}><PctIn value={a.circ} onChange={v=>setA(u.id,"circ",v)}/></div>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontSize:16,fontWeight:800,color:diff===0?T.primary:diff>0?T.red:T.green}}>R$ {baseT>0?fin:"0"}</div>
                    {diff!==0&&baseT>0&&<div style={{fontSize:10,color:diff>0?T.red:T.green,fontWeight:600}}>{diff>0?"+":""}R${diff}</div>}
                  </div>
                </div>
              )})}
            </div>
          </div>

          {/* STEP 4 — Rules */}
          <div>
            <Step n="4" label="Regras do Contrato"/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <SelL label="Agendamento Antecipado" value={agend} onChange={sAgend} options={[{value:"24h",label:"24h antes"},{value:"48h",label:"48h antes"},{value:"7",label:"7 dias antes"},{value:"14",label:"14 dias antes"}]}/>
              <SelL label="Reposicao de Aulas" value={repo} onChange={sRepo} options={[{value:"24h",label:"Ate 24h antes"},{value:"48h",label:"Ate 48h antes"},{value:"sem",label:"Sem reposicao"},{value:"mensal",label:"1 reposicao/mes"}]}/>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{padding:"16px 24px",borderTop:`1px solid ${T.border}`,background:T.card,borderRadius:`0 0 ${T.radius} ${T.radius}`,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",bottom:0,zIndex:2}}>
          <button onClick={()=>setShow(false)} style={{padding:"10px 24px",background:T.muted,color:T.fg,borderRadius:T.rsm,border:"none",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Cancelar</button>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{textAlign:"right"}}><div style={{fontSize:10,color:T.mutedFg,fontWeight:600}}>VALOR BASE</div><div style={{fontSize:20,fontWeight:800,color:T.fg}}>R$ {baseT>0?baseT.toFixed(2).replace(".",","):"0,00"}/mes</div></div>
            <button onClick={()=>setShow(false)} style={{padding:"10px 24px",background:baseT>0?T.primary:T.muted,color:baseT>0?"#fff":T.mutedFg,borderRadius:T.rsm,border:"none",fontSize:14,fontWeight:600,cursor:baseT>0?"pointer":"default",fontFamily:"inherit",opacity:baseT>0?1:0.6}}>Criar Contrato</button>
          </div>
        </div>
      </div>
    </div>}
  </div>;
};

// === DESCONTOS ===
const DescontosPage=()=>{
  const [s,sS]=useState("");
  const ds=[{code:"BEMVINDO2026",type:"Percentual",val:"20%",desc:"Boas-vindas",usage:"15/100",valid:"31/03/2026",st:"Ativo"},{code:"AMIGOFIT",type:"Fixo",val:"R$ 50",desc:"Indicação",usage:"28/50",valid:"31/12/2026",st:"Ativo"},{code:"ANUAL10",type:"Percentual",val:"10%",desc:"Plano anual",usage:"42/200",valid:"31/12/2026",st:"Ativo"},{code:"VERAO2025",type:"Percentual",val:"15%",desc:"Verão",usage:"100/100",valid:"28/02/2026",st:"Expirado"}];
  return <div>
    <PH title="Descontos e Vouchers" sub="Cupons de desconto e vouchers" action={<PBtn icon={Plus}>Novo Desconto</PBtn>}/>
    <SI placeholder="Buscar cupom..." value={s} onChange={sS}/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginTop:14}}>
      {ds.map((d,i)=><div key={i} style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:20}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:40,height:40,borderRadius:10,backgroundColor:`${T.primary}12`,display:"flex",alignItems:"center",justifyContent:"center"}}><Tag size={20} color={T.primary}/></div>
            <div><span style={{fontSize:15,fontWeight:700,color:T.primary}}>{d.code}</span><p style={{fontSize:12,color:T.mutedFg,margin:0}}>{d.desc}</p></div>
          </div>
          <Bdg v={d.st==="Ativo"?"green":"secondary"}>{d.st}</Bdg>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
          {[["Tipo",d.type],["Valor",d.val],["Uso",d.usage],["Validade",d.valid]].map(([l,v],j)=><div key={j}><span style={{fontSize:11,color:T.mutedFg}}>{l}</span><p style={{fontWeight:600,margin:"2px 0 0",fontSize:13}}>{v}</p></div>)}
        </div>
        <div style={{display:"flex",gap:8}}><GBtn full>Editar</GBtn><GBtn full color={T.secondary}>Desativar</GBtn></div>
      </div>)}
    </div>
  </div>;
};

// === RELATÓRIOS (Tabbed) ===
const RelatoriosPage=()=>{
  const [tab,setTab]=useState("leads"),[uf,sUf]=useState("all");
  const ld=[{m:"Set",l:88,c:42},{m:"Out",l:102,c:51},{m:"Nov",l:115,c:58},{m:"Dez",l:98,c:49},{m:"Jan",l:128,c:64},{m:"Fev",l:142,c:71}];
  return <div>
    <PH title="Relatórios" sub="Visualize métricas e exporte dados" action={<PBtn icon={Download}>Exportar PDF</PBtn>}/>
    <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:10,marginBottom:14,display:"flex",gap:10,alignItems:"center"}}><Sel value={uf} onChange={sUf} icon={Filter} options={UOPTS}/><PBtn small icon={Download} sec>Baixar</PBtn></div>
    <TB tabs={[{id:"leads",label:"Leads"},{id:"desempenho",label:"Desempenho"},{id:"vendas",label:"Vendas"},{id:"contratos",label:"Contratos"},{id:"financeiro",label:"Financeiro"}]} active={tab} onChange={setTab}/>
    {tab==="leads"&&<div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
        <MC icon={UserPlus} value="142" label="Leads" change="+10.9%" up/><MC icon={Target} value="71" label="Conversões" change="+10.9%" up/><MC icon={Dumbbell} value="89" label="Aulas Exp." change="+15.3%" up/><MC icon={Users} value="50%" label="Taxa Conv." change="+2.1%" up/>
      </div>
      <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:18}}>
        <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px"}}>Leads vs Conversões</h3>
        <ResponsiveContainer width="100%" height={240}><BarChart data={ld}><CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/><XAxis dataKey="m" stroke={T.mutedFg} fontSize={11}/><YAxis stroke={T.mutedFg} fontSize={11}/><Tooltip/><Legend/><Bar dataKey="l" fill={T.primary} name="Leads" radius={[4,4,0,0]}/><Bar dataKey="c" fill={T.green} name="Conversões" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer>
      </div>
    </div>}
    {tab==="desempenho"&&<div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,overflow:"hidden"}}>
      <Tbl headers={["Unidade","Alunos","Novos","Cancel.","Receita","Conv."]} rows={UNITS.map((u,i)=><tr key={i} style={{borderTop:`1px solid ${T.border}`}}><Td bold>{u.name}</Td><Td>{u.alunos}</Td><Td color={T.green}>+{Math.round(u.alunos*0.08)}</Td><Td color={T.red}>{Math.round(u.alunos*0.03)}</Td><Td bold color={T.primary}>R$ {u.receita.toLocaleString("pt-BR")}</Td><Td color={T.green}>{u.conv}</Td></tr>)}/>
    </div>}
    {tab==="vendas"&&<div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
        <MC icon={DollarSign} value="R$ 82k" label="Vendas Fev" change="+5.1%" up color={T.green}/><MC icon={TrendingUp} value="R$ 125.4k" label="Vendas Trim." change="+12.5%" up/><MC icon={CreditCard} value="R$ 189" label="Ticket Médio" change="+3.2%" up/>
      </div>
      <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:18}}>
        <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px"}}>Vendas por Mês (R$ mil)</h3>
        <ResponsiveContainer width="100%" height={240}><BarChart data={[{m:"Set",v:58},{m:"Out",v:67},{m:"Nov",v:72},{m:"Dez",v:69},{m:"Jan",v:78},{m:"Fev",v:82}]}><CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/><XAxis dataKey="m" stroke={T.mutedFg} fontSize={11}/><YAxis stroke={T.mutedFg} fontSize={11}/><Tooltip/><Bar dataKey="v" fill={T.primary} name="R$ mil" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer>
      </div>
    </div>}
    {tab==="contratos"&&<div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
        <MC icon={FileCheck} value="285" label="Ativos" change="+5.1%" up/><MC icon={FileText} value="18" label="Cancelados" color={T.red}/><MC icon={Repeat} value="92%" label="Renovação" change="+2.3%" up color={T.green}/>
      </div>
      <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,overflow:"hidden"}}>
        <Tbl headers={["Contrato","Combinação","Alunos","Receita/mês","Status"]} rows={[["Plano Slim Básico","Slim 2x","45","R$ 12.105"],["Plano Completo","Slim 3x + Circ 2x","82","R$ 44.116"],["Plano Free Start","Free 2x","38","R$ 6.802"],["Plano Premium","Slim 4x + Circ 3x + Free 1x","24","R$ 20.568"]].map((r,i)=><tr key={i} style={{borderTop:`1px solid ${T.border}`}}><Td bold>{r[0]}</Td><Td color={T.mutedFg}>{r[1]}</Td><Td>{r[2]}</Td><Td bold color={T.primary}>{r[3]}</Td><Td><Bdg v="green">Ativo</Bdg></Td></tr>)}/>
      </div>
    </div>}
    {tab==="financeiro"&&<div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
        <MC icon={DollarSign} value="R$ 125.4k" label="Entradas" change="+12.5%" up color={T.green}/><MC icon={Wallet} value="R$ 55k" label="Saídas" color={T.red}/><MC icon={TrendingUp} value="R$ 70.4k" label="Resultado" change="+18%" up/><MC icon={CreditCard} value="56%" label="Margem" change="+3%" up/>
      </div>
      <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:18}}>
        <h3 style={{fontSize:14,fontWeight:600,margin:"0 0 12px"}}>Entradas vs Saídas (R$ mil)</h3>
        <ResponsiveContainer width="100%" height={240}><BarChart data={[{m:"Set",e:98,s:45},{m:"Out",e:112,s:48},{m:"Nov",e:105,s:47},{m:"Dez",e:128,s:52},{m:"Jan",e:118,s:50},{m:"Fev",e:125,s:55}]}><CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/><XAxis dataKey="m" stroke={T.mutedFg} fontSize={11}/><YAxis stroke={T.mutedFg} fontSize={11}/><Tooltip/><Legend/><Bar dataKey="e" fill={T.green} name="Entradas" radius={[4,4,0,0]}/><Bar dataKey="s" fill={T.red} name="Saídas" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer>
      </div>
    </div>}
  </div>;
};

// === COLABORADORES (with unit filter) ===
const ColabPage=()=>{
  const [s,sS]=useState(""),[uf,sUf]=useState("all");
  const f=COLLABS.filter(c=>(uf==="all"||c.unit===uf)&&(s===""||c.name.toLowerCase().includes(s.toLowerCase())));
  return <div>
    <PH title="Colaboradores" sub="Equipe de todas as unidades" action={<PBtn icon={Plus}>Novo Colaborador</PBtn>}/>
    <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:10,marginBottom:16,display:"flex",gap:8}}>
      <SI placeholder="Buscar colaborador..." value={s} onChange={sS}/>
      <Sel value={uf} onChange={sUf} icon={Building2} options={UOPTS}/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
      {f.map((c,i)=>{const un=UNITS.find(u=>u.id===c.unit)?.name||c.unit;return <div key={i} style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,padding:18}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <div style={{width:38,height:38,borderRadius:"50%",backgroundColor:rc(c.role),display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:600,fontSize:12}}>{c.av}</div>
          <div><h3 style={{fontSize:14,fontWeight:600,margin:"0 0 3px"}}>{c.name}</h3><Bdg v={rc(c.role)===T.primary?"primary":"secondary"}>{c.role}</Bdg></div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:5,fontSize:12,color:T.mutedFg}}>
          <div style={{display:"flex",alignItems:"center",gap:5}}><Building2 size={12}/>{un}</div>
          <div style={{display:"flex",alignItems:"center",gap:5}}><Mail size={12}/>{c.email}</div>
          <div style={{display:"flex",alignItems:"center",gap:5}}><Phone size={12}/>{c.phone}</div>
        </div>
        <div style={{borderTop:`1px solid ${T.border}`,paddingTop:12,marginTop:12,display:"flex",gap:6}}>
          <GBtn full><Edit size={13}/> Editar</GBtn><GBtn color={T.red}><Trash2 size={13}/></GBtn>
        </div>
      </div>})}
    </div>
  </div>;
};

// === FINANCEIRO ===
const FinPage=()=>{
  const gf=[{d:"Aluguel - Centro",v:8500},{d:"Aluguel - Barra",v:7200},{d:"Aluguel - Norte",v:6800},{d:"Salários",v:28000},{d:"Software",v:1200},{d:"Contabilidade",v:2500}];
  const gv=[{d:"Manutenção Equip.",v:3200,dt:"25/02"},{d:"Marketing Digital",v:4500,dt:"20/02"},{d:"Limpeza",v:800,dt:"15/02"}];
  const ef=[{d:"Contratos Ativos (285 alunos)",v:53865},{d:"Personal Training (45)",v:15750}];
  const tGF=gf.reduce((a,b)=>a+b.v,0),tGV=gv.reduce((a,b)=>a+b.v,0),tEF=ef.reduce((a,b)=>a+b.v,0),res=tEF-tGF-tGV;
  const Sec=({title,color,items,showDt,total})=>(
    <div style={{background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,overflow:"hidden"}}>
      <div style={{padding:"12px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h3 style={{fontSize:14,fontWeight:600,margin:0,display:"flex",alignItems:"center",gap:7}}><div style={{width:7,height:7,borderRadius:"50%",background:color}}/>{title}</h3>
        <PBtn small icon={Plus}>Adicionar</PBtn>
      </div>
      {items.map((it,i)=><div key={i} style={{padding:"9px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:13}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}><span>{it.d}</span>{showDt&&it.dt&&<span style={{fontSize:11,color:T.mutedFg}}>· {it.dt}</span>}</div>
        <span style={{fontWeight:700,color}}>{color===T.green?"+ ":"- "}R$ {it.v.toLocaleString("pt-BR",{minimumFractionDigits:2})}</span>
      </div>)}
      <div style={{padding:"10px 18px",background:T.muted,display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:13}}><span>Total</span><span style={{color}}>R$ {total.toLocaleString("pt-BR",{minimumFractionDigits:2})}</span></div>
    </div>
  );
  return <div>
    <PH title="Financeiro" sub="Gestão de entradas e saídas"/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
      <MC icon={DollarSign} value={`R$ ${(tEF/1000).toFixed(1)}k`} label="Entradas Fixas" color={T.green}/><MC icon={Wallet} value={`R$ ${(tGF/1000).toFixed(1)}k`} label="Gastos Fixos" color={T.red}/><MC icon={Wallet} value={`R$ ${(tGV/1000).toFixed(1)}k`} label="Gastos Var." color={T.yellow}/><MC icon={TrendingUp} value={`R$ ${(res/1000).toFixed(1)}k`} label="Resultado" color={res>0?T.green:T.red} change={res>0?"+positivo":"negativo"} up={res>0}/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
      <Sec title="Entradas Fixas" color={T.green} items={ef} total={tEF}/>
      <Sec title="Gastos Fixos" color={T.red} items={gf} total={tGF}/>
    </div>
    <Sec title="Gastos Variáveis" color={T.yellow} items={gv} showDt total={tGV}/>
    <div style={{marginTop:14,background:T.card,borderRadius:T.radius,border:`1px solid ${T.border}`,overflow:"hidden"}}>
      <div style={{padding:"12px 18px",borderBottom:`1px solid ${T.border}`}}><h3 style={{fontSize:14,fontWeight:600,margin:0,display:"flex",alignItems:"center",gap:7}}><div style={{width:7,height:7,borderRadius:"50%",background:T.primary}}/>Receita por Contratos</h3></div>
      <Tbl headers={["Contrato","Alunos","Valor Unit.","Receita Total"]} rows={[["Plano Slim Básico","45","R$ 269/mês","R$ 12.105"],["Plano Completo","82","R$ 538/mês","R$ 44.116"],["Plano Free Start","38","R$ 179/mês","R$ 6.802"],["Plano Premium","24","R$ 857/mês","R$ 20.568"]].map((r,i)=><tr key={i} style={{borderTop:`1px solid ${T.border}`}}><Td bold>{r[0]}</Td><Td>{r[1]}</Td><Td color={T.mutedFg}>{r[2]}</Td><Td bold color={T.primary}>{r[3]}</Td></tr>)}/>
    </div>
  </div>;
};

// === MAIN APP ===
const navItems=[
  {id:"dashboard",icon:LayoutDashboard,label:"Dashboard"},
  {id:"unidades",icon:Building2,label:"Unidades"},
  {id:"alunos",icon:Users,label:"Alunos"},
  {id:"contratos",icon:FileText,label:"Contratos"},
  {id:"descontos",icon:Tag,label:"Descontos"},
  {id:"relatorios",icon:BarChart3,label:"Relatórios"},
  {id:"colaboradores",icon:Users,label:"Colaboradores"},
  {id:"financeiro",icon:Wallet,label:"Financeiro"},
];

export default function App(){
  const [view,setView]=useState("franqueadora");
  const [pg,sPg]=useState("dashboard");
  const [detailUnit,setDU]=useState(null);

  const goUnit=(uid)=>{setDU(uid);sPg("unit-detail")};
  const backFromUnit=()=>{setDU(null);sPg("unidades")};

  if(view==="franqueado") return <FranqueadoApp onSwitch={()=>setView("franqueadora")}/>;
  if(view==="professor") return <ProfessorApp onSwitch={()=>setView("franqueadora")}/>;

  const pages={
    dashboard:<DashPage/>,
    unidades:<UnidadesPage onNav={goUnit}/>,
    "unit-detail":<UnitDetail uid={detailUnit} onBack={backFromUnit}/>,
    alunos:<AlunosPage/>,
    contratos:<ContratosPage/>,
    descontos:<DescontosPage/>,
    relatorios:<RelatoriosPage/>,
    colaboradores:<ColabPage/>,
    financeiro:<FinPage/>,
  };

  return <div style={{display:"flex",height:"100vh",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",background:T.bg}}>
    <aside style={{width:240,backgroundColor:T.sidebar,display:"flex",flexDirection:"column",flexShrink:0}}>
      <div style={{padding:"18px 20px",borderBottom:`1px solid ${T.sidebarBorder}`}}><Logo/></div>
      <div style={{padding:"8px 8px 0",display:"flex",flexDirection:"column",gap:4}}>
        <button onClick={()=>setView("franqueado")} style={{display:"flex",alignItems:"center",gap:8,width:"100%",padding:"8px 12px",background:`${T.primary}15`,color:T.primary,border:`1px solid ${T.primary}30`,borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}><Building2 size={14}/>Visao Franqueado</button>
        <button onClick={()=>setView("professor")} style={{display:"flex",alignItems:"center",gap:8,width:"100%",padding:"8px 12px",background:"#8B5CF615",color:"#8B5CF6",border:"1px solid #8B5CF630",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}><Dumbbell size={14}/>Visao Professor</button>
      </div>
      <div style={{padding:"6px 0 0",fontSize:10,fontWeight:700,color:"#555",textTransform:"uppercase",letterSpacing:"0.1em",paddingLeft:20,marginTop:10,marginBottom:3}}>Franqueadora</div>
      <nav style={{flex:1,overflowY:"auto",padding:"2px 8px"}}>
        {navItems.map(item=>{const isA=pg===item.id||(pg==="unit-detail"&&item.id==="unidades");
          return <button key={item.id} onClick={()=>{sPg(item.id);if(item.id!=="unidades")setDU(null)}} style={{display:"flex",alignItems:"center",gap:11,width:"100%",padding:"9px 12px",backgroundColor:isA?T.sidebarActive:"transparent",color:isA?T.primary:"#9CA3AF",border:"none",cursor:"pointer",borderRadius:8,fontSize:13,fontWeight:isA?600:400,fontFamily:"inherit",marginBottom:1,borderLeft:isA?`3px solid ${T.primary}`:"3px solid transparent"}}><item.icon size={17}/><span>{item.label}</span></button>})}
      </nav>
      <div style={{padding:"12px 14px",borderTop:`1px solid ${T.sidebarBorder}`}}>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <div style={{width:34,height:34,borderRadius:8,background:`${T.primary}30`,display:"flex",alignItems:"center",justifyContent:"center",color:T.primary,fontWeight:700,fontSize:12}}>A</div>
          <div><p style={{fontSize:13,fontWeight:600,margin:0,color:"#E5E7EB"}}>Admin Geral</p><p style={{fontSize:11,color:"#6B7280",margin:0}}>Franqueadora</p></div>
        </div>
      </div>
    </aside>
    <main style={{flex:1,overflowY:"auto",padding:"22px 26px"}}>{pages[pg]}</main>
  </div>;
}
