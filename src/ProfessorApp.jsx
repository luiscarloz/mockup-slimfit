import { useState } from "react";
import { LayoutDashboard, CalendarDays, DollarSign, Dumbbell, Clock, Check, ChevronRight, Users, Star, Download, ArrowUpRight, Menu, X } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const T={primary:"#00BFB3",bg:"#F5F6F8",card:"#fff",sidebar:"#1A1D21",sidebarActive:"#2D3239",sidebarBorder:"#2D3239",border:"#E5E7EB",muted:"#F3F4F6",mutedFg:"#6B7280",fg:"#111827",fgLight:"#374151",green:"#10B981",greenBg:"#ECFDF5",red:"#EF4444",redBg:"#FEF2F2",yellow:"#F59E0B",yellowBg:"#FFFBEB",purple:"#8B5CF6",rsm:"10px"};
const tc={Slim:T.primary,Free:T.yellow,Circuito:T.purple};
const DAYS=["Seg","Ter","Qua","Qui","Sex","Sab"];
const DAY_FULL={"Seg":"Segunda-feira","Ter":"Terça-feira","Qua":"Quarta-feira","Qui":"Quinta-feira","Sex":"Sexta-feira","Sab":"Sábado"};
const CLS=[
  {id:1,day:"Seg",time:"07:00",type:"Slim",cap:6,stu:[{n:"Ana Paula",s:"active",c:"Slim 3x"},{n:"Mariana Torres",s:"active",c:"Flex 5x"},{n:"Thiago Souza",s:"active",c:"Slim 3x"},{n:"Carlos Eduardo",s:"suspended",c:"Slim 2x"},{n:"Juliana Oliveira",s:"active",c:"Slim 4x"}]},
  {id:2,day:"Seg",time:"08:10",type:"Circuito",cap:6,stu:[{n:"Ana Paula",s:"active",c:"Flex 5x"},{n:"Thiago Souza",s:"active",c:"Circ 2x"},{n:"Roberto",s:"active",c:"Circ 3x"},{n:"Camila Rocha",s:"active",c:"Circ 2x"}]},
  {id:3,day:"Seg",time:"09:20",type:"Slim",cap:6,stu:[{n:"Fernanda Dias",s:"active",c:"Slim 2x"},{n:"Gustavo Pires",s:"active",c:"Slim 3x"},{n:"Patricia Lima",s:"experimental",c:"Experimental"}]},
  {id:4,day:"Ter",time:"07:00",type:"Free",cap:6,stu:[{n:"Roberto",s:"active",c:"Flex 5x"},{n:"Camila Rocha",s:"active",c:"Free 2x"}]},
  {id:5,day:"Ter",time:"08:10",type:"Slim",cap:6,stu:[{n:"Ana Paula",s:"active",c:"Slim 3x"},{n:"Mariana Torres",s:"active",c:"Flex 5x"},{n:"Thiago Souza",s:"active",c:"Slim 3x"},{n:"Juliana Oliveira",s:"active",c:"Slim 4x"},{n:"Lucas Mendes",s:"experimental",c:"Experimental"}]},
  {id:6,day:"Ter",time:"14:00",type:"Slim",cap:6,stu:[{n:"Fernanda Dias",s:"active",c:"Slim 2x"},{n:"Gustavo Pires",s:"active",c:"Slim 3x"},{n:"Marina Silva",s:"active",c:"Slim 2x"},{n:"Adriana Lacerda",s:"active",c:"Flex 5x"}]},
  {id:7,day:"Qua",time:"07:00",type:"Slim",cap:6,stu:[{n:"Ana Paula",s:"active",c:"Slim 3x"},{n:"Thiago Souza",s:"active",c:"Slim 3x"},{n:"Juliana Oliveira",s:"active",c:"Slim 4x"}]},
  {id:8,day:"Qua",time:"08:10",type:"Free",cap:6,stu:[{n:"Roberto",s:"active",c:"Flex 5x"},{n:"Camila Rocha",s:"active",c:"Free 2x"},{n:"Fernanda Dias",s:"active",c:"Free 1x"},{n:"Marina Silva",s:"active",c:"Free 2x"},{n:"Thiago Souza",s:"active",c:"Free 2x"}]},
  {id:9,day:"Qui",time:"07:00",type:"Slim",cap:6,stu:[{n:"Ana Paula",s:"active",c:"Slim 3x"},{n:"Mariana Torres",s:"active",c:"Flex 5x"},{n:"Gustavo Pires",s:"active",c:"Slim 3x"},{n:"Juliana Oliveira",s:"active",c:"Slim 4x"},{n:"Adriana Lacerda",s:"active",c:"Flex 5x"},{n:"Thiago Souza",s:"active",c:"Slim 3x"}]},
  {id:10,day:"Qui",time:"08:10",type:"Circuito",cap:6,stu:[{n:"Roberto",s:"active",c:"Circ 3x"},{n:"Camila Rocha",s:"active",c:"Circ 2x"},{n:"Ana Paula",s:"active",c:"Flex 5x"}]},
  {id:11,day:"Sex",time:"07:00",type:"Slim",cap:6,stu:[{n:"Fernanda Dias",s:"active",c:"Slim 2x"},{n:"Gustavo Pires",s:"active",c:"Slim 3x"},{n:"Marina Silva",s:"active",c:"Slim 2x"}]},
  {id:12,day:"Sex",time:"08:10",type:"Free",cap:6,stu:[{n:"Roberto",s:"active",c:"Flex 5x"},{n:"Thiago Souza",s:"active",c:"Free 2x"},{n:"Camila Rocha",s:"active",c:"Free 2x"},{n:"Fernanda Dias",s:"active",c:"Free 1x"}]},
  {id:13,day:"Sab",time:"08:00",type:"Circuito",cap:6,stu:[{n:"Ana Paula",s:"active",c:"Flex 5x"},{n:"Thiago Souza",s:"active",c:"Circ 2x"},{n:"Roberto",s:"active",c:"Circ 3x"},{n:"Camila Rocha",s:"active",c:"Circ 2x"},{n:"Mariana Torres",s:"active",c:"Circ 1x"}]},
];
const tS=CLS.filter(c=>c.type==="Slim").length,tF=CLS.filter(c=>c.type==="Free").length,tC=CLS.filter(c=>c.type==="Circuito").length;

// Hook for responsive
const useW=()=>{const [w,sW]=useState(typeof window!=="undefined"?window.innerWidth:1024);if(typeof window!=="undefined"){window.addEventListener("resize",()=>sW(window.innerWidth))}return w};

// === COMPONENTS ===
const Bdg=({children,v="primary"})=>{const s={primary:{b:`${T.primary}12`,c:T.primary},green:{b:T.greenBg,c:T.green},red:{b:T.redBg,c:T.red},yellow:{b:T.yellowBg,c:T.yellow},purple:{b:"#F3E8FF",c:T.purple},secondary:{b:T.muted,c:T.mutedFg}};const st=s[v]||s.primary;return <span style={{fontSize:11,padding:"3px 10px",borderRadius:999,backgroundColor:st.b,color:st.c,fontWeight:600,whiteSpace:"nowrap"}}>{children}</span>};

const ClassCard=({c,onClick,compact})=> <div onClick={onClick} style={{background:T.card,borderRadius:12,border:`1px solid ${T.border}`,padding:compact?"10px 12px":"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",borderLeft:`4px solid ${tc[c.type]}`,marginBottom:compact?6:8}}>
  <div style={{display:"flex",alignItems:"center",gap:compact?8:12}}>
    {!compact&&<div style={{width:42,height:42,borderRadius:10,background:`${tc[c.type]}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Dumbbell size={18} color={tc[c.type]}/></div>}
    <div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:compact?13:15,fontWeight:700,color:tc[c.type]}}>{c.type}</span>
        <span style={{fontSize:compact?11:13,color:T.mutedFg}}>{c.time}</span>
      </div>
      <div style={{display:"flex",gap:6,marginTop:2,flexWrap:"wrap"}}>
        <span style={{fontSize:12,color:T.mutedFg}}>{c.stu.length}/{c.cap} alunos</span>
        {c.stu.some(s=>s.s==="suspended")&&<span style={{fontSize:10,color:T.red,fontWeight:600}}>! suspenso</span>}
        {c.stu.some(s=>s.s==="experimental")&&<span style={{fontSize:10,color:T.yellow,fontWeight:600}}>&#9733; experimental</span>}
      </div>
    </div>
  </div>
  <ChevronRight size={18} color={T.mutedFg}/>
</div>;

// === 1. HOME ===
const HomePage=({onOpen,isMob})=>{
  const today="Qui";
  const todayCls=CLS.filter(c=>c.day===today);
  const next=todayCls[0];
  return <div style={{padding:isMob?16:24}}>
    <div style={{marginBottom:16}}><h1 style={{fontSize:isMob?18:22,fontWeight:700,margin:0}}>Bom dia, Angela</h1><p style={{fontSize:12,color:T.mutedFg,margin:"2px 0 0"}}>Slim Fit - Asa Sul</p></div>

    {next&&<div style={{background:`linear-gradient(135deg, ${T.primary}, ${T.primary}dd)`,borderRadius:14,padding:isMob?16:20,marginBottom:14,color:"#fff",cursor:"pointer"}} onClick={()=>onOpen(next)}>
      <div style={{fontSize:11,fontWeight:600,opacity:0.8,marginBottom:4}}>PROXIMA AULA</div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:isMob?20:24,fontWeight:800}}>{next.type}</div><div style={{fontSize:13,opacity:0.9,marginTop:2}}>{next.time} - {next.stu.length}/{next.cap} alunos</div></div>
        <div style={{width:44,height:44,borderRadius:12,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronRight size={22}/></div>
      </div>
      {(next.stu.some(s=>s.s==="suspended")||next.stu.some(s=>s.s==="experimental"))&&<div style={{display:"flex",gap:6,marginTop:8}}>
        {next.stu.some(s=>s.s==="suspended")&&<span style={{fontSize:11,padding:"2px 8px",background:"rgba(255,255,255,0.2)",borderRadius:6}}>1 suspenso</span>}
        {next.stu.some(s=>s.s==="experimental")&&<span style={{fontSize:11,padding:"2px 8px",background:"rgba(255,255,255,0.2)",borderRadius:6}}>&#9733; Experimental</span>}
      </div>}
    </div>}

    <div style={{fontSize:14,fontWeight:700,marginBottom:8}}>Hoje - {DAY_FULL[today]} ({todayCls.length} aulas)</div>
    {todayCls.map(c=> <ClassCard key={c.id} c={c} onClick={()=>onOpen(c)} compact={isMob}/>)}

    <div style={{fontSize:14,fontWeight:700,margin:"16px 0 8px"}}>Resumo da Semana</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:12}}>
      {[{l:"Slim",v:tS,c:T.primary},{l:"Free",v:tF,c:T.yellow},{l:"Circuito",v:tC,c:T.purple}].map(x=> <div key={x.l} style={{background:T.card,borderRadius:10,border:`1px solid ${T.border}`,padding:"10px 8px",textAlign:"center"}}>
        <div style={{fontSize:20,fontWeight:800,color:x.c}}>{x.v}</div>
        <div style={{fontSize:10,color:T.mutedFg,fontWeight:600}}>{x.l}</div>
      </div>)}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
      <div style={{background:T.card,borderRadius:10,border:`1px solid ${T.border}`,padding:"10px 14px"}}><div style={{fontSize:20,fontWeight:800}}>{CLS.length}</div><div style={{fontSize:11,color:T.mutedFg}}>Aulas/semana</div></div>
      <div style={{background:T.card,borderRadius:10,border:`1px solid ${T.border}`,padding:"10px 14px"}}><div style={{fontSize:20,fontWeight:800}}>{new Set(CLS.flatMap(c=>c.stu.map(s=>s.n))).size}</div><div style={{fontSize:11,color:T.mutedFg}}>Alunos unicos</div></div>
    </div>
  </div>;
};

// === 2. GRADE ===
const GradePage=({onOpen,isMob})=>{
  const [view,setView]=useState("list");
  const [dayF,setDayF]=useState("all");
  const filtered=dayF==="all"?CLS:CLS.filter(c=>c.day===dayF);
  const grouped={};filtered.forEach(c=>{if(!grouped[c.day])grouped[c.day]=[];grouped[c.day].push(c)});
  const hrs=["07:00","08:10","09:20","10:30","14:00","15:10","16:20"];

  return <div style={{padding:isMob?16:24}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
      <div><h1 style={{fontSize:isMob?18:22,fontWeight:700,margin:0}}>Minha Grade</h1><p style={{fontSize:12,color:T.mutedFg,margin:"2px 0 0"}}>{CLS.length} aulas/semana - 50 min cada</p></div>
      <div style={{display:"flex",gap:3,background:T.muted,borderRadius:8,padding:2}}>
        {["list","grid"].map(v=> <button key={v} onClick={()=>setView(v)} style={{padding:"5px 10px",borderRadius:6,border:"none",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit",background:view===v?T.card:"transparent",color:view===v?T.primary:T.mutedFg}}>{v==="list"?"Lista":"Grade"}</button>)}
      </div>
    </div>

    {/* Day pills */}
    <div style={{display:"flex",gap:6,marginBottom:12,overflowX:"auto",paddingBottom:4}}>
      <button onClick={()=>setDayF("all")} style={{padding:"6px 14px",borderRadius:20,border:dayF==="all"?`2px solid ${T.primary}`:`1px solid ${T.border}`,background:dayF==="all"?`${T.primary}12`:T.card,color:dayF==="all"?T.primary:T.mutedFg,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",flexShrink:0}}>Todos</button>
      {DAYS.map(d=>{const cnt=CLS.filter(c=>c.day===d).length;if(!cnt) return null;return <button key={d} onClick={()=>setDayF(d)} style={{padding:"6px 14px",borderRadius:20,border:dayF===d?`2px solid ${T.primary}`:`1px solid ${T.border}`,background:dayF===d?`${T.primary}12`:T.card,color:dayF===d?T.primary:T.mutedFg,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",flexShrink:0}}>{d} ({cnt})</button>})}
    </div>

    {view==="list"&&Object.entries(grouped).map(([day,classes])=> <div key={day} style={{marginBottom:12}}>
      <div style={{fontSize:13,fontWeight:700,color:T.fg,marginBottom:6,display:"flex",alignItems:"center",gap:6}}><div style={{width:6,height:6,borderRadius:3,background:T.primary}}/>{DAY_FULL[day]} <span style={{fontSize:11,color:T.mutedFg,fontWeight:500}}>({classes.length})</span></div>
      {classes.map(c=> <ClassCard key={c.id} c={c} onClick={()=>onOpen(c)} compact={isMob}/>)}
    </div>)}

    {view==="grid"&&<div style={{background:T.card,borderRadius:12,border:`1px solid ${T.border}`,overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:`50px repeat(6,1fr)`,borderBottom:`1px solid ${T.border}`}}>
        <div style={{padding:6,background:T.muted,fontSize:9,fontWeight:700,color:T.mutedFg,textAlign:"center"}}></div>
        {DAYS.map(d=> <div key={d} style={{padding:6,background:T.muted,fontSize:isMob?10:11,fontWeight:700,color:T.fg,textAlign:"center"}}>{d}</div>)}
      </div>
      {hrs.map(h=> <div key={h} style={{display:"grid",gridTemplateColumns:`50px repeat(6,1fr)`,borderBottom:`1px solid ${T.border}`}}>
        <div style={{padding:"4px 2px",fontSize:9,color:T.mutedFg,fontWeight:600,textAlign:"center",borderRight:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center"}}>{h}</div>
        {DAYS.map(d=>{const cls=CLS.find(c=>c.day===d&&c.time===h);return <div key={d} style={{padding:2,minHeight:40}}>
          {cls&&<div onClick={()=>onOpen(cls)} style={{background:`${tc[cls.type]}10`,border:`1px solid ${tc[cls.type]}30`,borderRadius:5,padding:3,height:"100%",cursor:"pointer",textAlign:"center"}}>
            <div style={{fontSize:isMob?9:10,fontWeight:700,color:tc[cls.type]}}>{cls.type.slice(0,4)}</div>
            <div style={{fontSize:8,color:T.mutedFg}}>{cls.stu.length}/{cls.cap}</div>
          </div>}
        </div>})}
      </div>)}
    </div>}

    {/* Month summary */}
    <div style={{fontSize:14,fontWeight:700,margin:"16px 0 8px"}}>Resumo do Mes</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
      {[{l:"Slim",v:tS*4,c:T.primary},{l:"Free",v:tF*4,c:T.yellow},{l:"Circuito",v:tC*4,c:T.purple}].map(x=> <div key={x.l} style={{background:T.card,borderRadius:10,border:`1px solid ${T.border}`,padding:"10px 8px",textAlign:"center"}}>
        <div style={{fontSize:18,fontWeight:800,color:x.c}}>{x.v}</div><div style={{fontSize:10,color:T.mutedFg,fontWeight:600}}>{x.l}/mes</div>
      </div>)}
    </div>
  </div>;
};

// === 3. CLASS DETAIL ===
const ClassDetail=({cls,onBack,checkins,doCheckin,isMob})=>{
  const cts=(type)=>cls.stu.filter(s=>checkins[`${cls.id}-${s.n}`]===type).length;
  const active=cls.stu.filter(s=>s.s!=="suspended").length;
  const pending=active-cts("present")-cts("justified")-cts("absent");

  return <div style={{background:T.bg,minHeight:"100vh"}}>
    <div style={{background:`linear-gradient(135deg, ${tc[cls.type]}, ${tc[cls.type]}cc)`,padding:isMob?"16px 16px 24px":"20px 28px 28px",color:"#fff"}}>
      <button onClick={onBack} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:8,padding:"6px 14px",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",marginBottom:10}}>&#8592; Voltar</button>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
        <div><div style={{fontSize:isMob?22:28,fontWeight:800}}>{cls.type}</div><div style={{fontSize:14,opacity:0.9,marginTop:2}}>{DAY_FULL[cls.day]} - {cls.time} - 50 min - Asa Sul</div></div>
        <span style={{padding:"6px 12px",background:"rgba(255,255,255,0.2)",borderRadius:8,fontSize:13,fontWeight:600}}>{cls.stu.length}/{cls.cap}</span>
      </div>
    </div>

    <div style={{maxWidth:700,margin:"0 auto",padding:isMob?"0 16px":"0 28px"}}>
      {/* Status bar */}
      <div style={{marginTop:-14,background:T.card,borderRadius:12,border:`1px solid ${T.border}`,padding:"12px 8px",display:"flex",justifyContent:"space-around",textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
        {[{v:cts("present"),l:"Presentes",c:T.green},{v:cts("justified"),l:"Justif.",c:T.yellow},{v:cts("absent"),l:"Faltas",c:T.red},{v:pending,l:"Pendentes",c:T.mutedFg}].map(x=> <div key={x.l}><div style={{fontSize:18,fontWeight:800,color:x.c}}>{x.v}</div><div style={{fontSize:9,color:T.mutedFg,fontWeight:600}}>{x.l}</div></div>)}
      </div>

      <div style={{margin:"10px 0",padding:"8px 12px",background:T.greenBg,borderRadius:8,fontSize:11,color:T.green,fontWeight:600,display:"flex",alignItems:"center",gap:6}}><Check size={14}/> Check-in aberto - 5 min antes ate o fim da aula</div>

      {/* Students */}
      {cls.stu.map((s,i)=>{const ck=checkins[`${cls.id}-${s.n}`];const isSusp=s.s==="suspended";const isExp=s.s==="experimental";
        return <div key={i} style={{background:T.card,borderRadius:12,border:`1px solid ${isSusp?`${T.red}40`:T.border}`,padding:isMob?"12px 14px":"14px 16px",marginBottom:8,opacity:isSusp?0.65:1}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:ck||isSusp?0:10}}>
            <div style={{width:40,height:40,borderRadius:"50%",background:isSusp?`${T.red}15`:isExp?`${T.yellow}15`:`${T.primary}10`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              {isExp?<Star size={16} color={T.yellow}/>:<span style={{fontSize:12,fontWeight:700,color:isSusp?T.red:T.primary}}>{s.n.split(" ").map(x=>x[0]).join("").slice(0,2)}</span>}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:14,fontWeight:600}}>{s.n}</div>
              <div style={{display:"flex",gap:6,alignItems:"center",marginTop:1}}>
                <span style={{fontSize:11,color:T.mutedFg}}>{s.c}</span>
                {isSusp&&<Bdg v="red">Suspensa</Bdg>}
                {isExp&&<Bdg v="yellow">Experimental</Bdg>}
              </div>
            </div>
            {ck&&<div style={{padding:"6px 12px",background:ck==="present"?T.greenBg:ck==="justified"?T.yellowBg:T.redBg,borderRadius:8,fontSize:11,fontWeight:600,color:ck==="present"?T.green:ck==="justified"?T.yellow:T.red}}>{ck==="present"?"Presente":ck==="justified"?"Justificada":"Falta"}</div>}
            {isSusp&&!ck&&<div style={{padding:"6px 10px",background:T.redBg,borderRadius:8,fontSize:10,fontWeight:600,color:T.red}}>Suspenso</div>}
          </div>
          {!ck&&!isSusp&&<div style={{display:"flex",gap:6}}>
            <button onClick={()=>doCheckin(cls.id,s.n,"present")} style={{flex:2,padding:isMob?"14px 0":"12px 0",background:T.green,border:"none",borderRadius:10,fontSize:13,fontWeight:700,color:"#fff",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><Check size={16}/> Presente</button>
            <button onClick={()=>doCheckin(cls.id,s.n,"justified")} style={{flex:1,padding:isMob?"14px 0":"12px 0",background:T.yellowBg,border:`1px solid ${T.yellow}40`,borderRadius:10,fontSize:11,fontWeight:600,color:T.yellow,cursor:"pointer",fontFamily:"inherit"}}>Justificada</button>
            <button onClick={()=>doCheckin(cls.id,s.n,"absent")} style={{flex:1,padding:isMob?"14px 0":"12px 0",background:T.redBg,border:`1px solid ${T.red}40`,borderRadius:10,fontSize:11,fontWeight:600,color:T.red,cursor:"pointer",fontFamily:"inherit"}}>Falta</button>
          </div>}
        </div>
      })}

      <div style={{margin:"8px 0 20px",padding:10,background:`${T.primary}06`,borderRadius:8,fontSize:10,color:T.fgLight}}>
        <strong>Regras:</strong> Falta justificada (cancelou 1h30 antes) = gera reposicao. Falta nao justificada = sem reposicao.
      </div>
    </div>
  </div>;
};

// === 4. PAGAMENTO ===
const PayPage=({isMob})=>{
  const sA=tS*4,fA=tF*4,cA=tC*4;
  const sB=350.99,fB=272.02,cB=89;const pct=30;
  const sP=Math.round(sA*sB*(pct/100)),fP=Math.round(fA*fB*(pct/100)),cP=Math.round(cA*cB*(pct/100));
  const tot=sP+fP+cP;

  return <div style={{padding:isMob?16:24}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
      <div><h1 style={{fontSize:isMob?18:22,fontWeight:700,margin:0}}>Meu Pagamento</h1><p style={{fontSize:12,color:T.mutedFg,margin:"2px 0 0"}}>Marco 2026</p></div>
      <button style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",background:T.card,border:`1px solid ${T.border}`,borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",color:T.fg}}><Download size={14}/> PDF</button>
    </div>

    {/* Total */}
    <div style={{background:`linear-gradient(135deg, ${T.green}, ${T.green}cc)`,borderRadius:14,padding:isMob?18:22,color:"#fff",marginBottom:14}}>
      <div style={{fontSize:11,fontWeight:600,opacity:0.8}}>PAGAMENTO ESTIMADO</div>
      <div style={{fontSize:isMob?30:36,fontWeight:800,marginTop:2}}>R$ {tot.toLocaleString("pt-BR")}</div>
      <div style={{fontSize:12,opacity:0.9,marginTop:4}}>{sA+fA+cA} aulas no mes - {pct}% por aluno</div>
    </div>

    {/* Breakdown */}
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
      {[{t:"Slim Fit",a:sA,b:sB,p:sP,c:T.primary},{t:"Free",a:fA,b:fB,p:fP,c:T.yellow},{t:"Circuito",a:cA,b:cB,p:cP,c:T.purple}].map(x=> <div key={x.t} style={{background:T.card,borderRadius:12,border:`1px solid ${T.border}`,padding:"14px 16px",borderLeft:`4px solid ${x.c}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:14,fontWeight:700,color:x.c}}>{x.t}</div><div style={{fontSize:12,color:T.mutedFg,marginTop:1}}>{x.a} aulas - R$ {x.b.toFixed(0)}/aluno - {pct}%</div></div>
        <div style={{fontSize:18,fontWeight:800,color:x.c}}>R$ {x.p.toLocaleString("pt-BR")}</div>
      </div>)}
    </div>

    {/* Detail */}
    <div style={{fontSize:14,fontWeight:700,marginBottom:8}}>Detalhamento Semanal</div>
    <div style={{background:T.card,borderRadius:12,border:`1px solid ${T.border}`,overflow:"hidden"}}>
      {CLS.map((c,i)=>{const act=c.stu.filter(s=>s.s!=="suspended").length;const val=c.type==="Slim"?sB:c.type==="Free"?fB:cB;const sub=Math.round(act*val*(pct/100));
        return <div key={c.id} style={{padding:"10px 14px",borderTop:i?`1px solid ${T.border}`:"none",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:4,height:28,borderRadius:2,background:tc[c.type]}}/>
            <div><div style={{fontSize:12,fontWeight:600}}>{c.day} {c.time}</div><div style={{fontSize:10,color:T.mutedFg}}>{c.type} - {act} alunos</div></div>
          </div>
          <div style={{fontSize:13,fontWeight:700,color:T.primary}}>R$ {sub}</div>
        </div>
      })}
      <div style={{padding:"12px 14px",background:T.muted,display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:13}}>
        <span>Total Semanal</span>
        <span style={{color:T.green}}>R$ {CLS.reduce((a,c)=>{const act=c.stu.filter(s=>s.s!=="suspended").length;const val=c.type==="Slim"?sB:c.type==="Free"?fB:cB;return a+Math.round(act*val*(pct/100))},0).toLocaleString("pt-BR")}</span>
      </div>
    </div>

    {/* History */}
    <div style={{marginTop:14,fontSize:14,fontWeight:700,marginBottom:8}}>Historico</div>
    <div style={{background:T.card,borderRadius:12,border:`1px solid ${T.border}`,padding:14}}>
      <ResponsiveContainer width="100%" height={isMob?120:160}>
        <BarChart data={[{m:"Out",v:2850},{m:"Nov",v:3100},{m:"Dez",v:2920},{m:"Jan",v:3200},{m:"Fev",v:3050},{m:"Mar",v:tot}]}>
          <XAxis dataKey="m" fontSize={10} stroke={T.mutedFg}/><YAxis fontSize={10} stroke={T.mutedFg} width={35}/><Tooltip/>
          <Bar dataKey="v" fill={T.green} name="R$" radius={[4,4,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>;
};

// === SIDEBAR (desktop) ===
const Sidebar=({active,onChange,onSwitch})=> <aside style={{width:220,backgroundColor:T.sidebar,display:"flex",flexDirection:"column",flexShrink:0,height:"100vh",position:"sticky",top:0}}>
  <div style={{padding:"16px 18px",borderBottom:`1px solid ${T.sidebarBorder}`}}>
    <svg viewBox="0 0 180 40" width="120" height="28"><text x="0" y="30" fontFamily="Arial,sans-serif" fontWeight="300" fontSize="32" fill="#808080" letterSpacing="-1">slim</text><text x="75" y="30" fontFamily="Arial,sans-serif" fontWeight="300" fontSize="32" fill="#00BFB3" letterSpacing="-1">fit</text><circle cx="82" cy="8" r="3" fill="#00BFB3"/><text x="120" y="38" fontFamily="Arial,sans-serif" fontWeight="400" fontSize="10" fill="#808080" letterSpacing="3">STUDIO</text></svg>
  </div>
  {onSwitch&&<div style={{padding:"8px 6px 0"}}>
    <button onClick={onSwitch} style={{display:"flex",alignItems:"center",gap:8,width:"100%",padding:"7px 10px",background:`${T.primary}15`,color:T.primary,border:`1px solid ${T.primary}30`,borderRadius:7,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{"\u2190"} Voltar p/ Franqueadora</button>
  </div>}
  <div style={{fontSize:9,fontWeight:700,color:"#555",textTransform:"uppercase",letterSpacing:"0.1em",paddingLeft:18,marginTop:10,marginBottom:2}}>Professor</div>
  <nav style={{flex:1,padding:"2px 6px"}}>
    {[{id:"home",icon:LayoutDashboard,label:"Meu Dia"},{id:"grade",icon:CalendarDays,label:"Minha Grade"},{id:"pay",icon:DollarSign,label:"Meu Pagamento"}].map(item=>{const isA=active===item.id;return <button key={item.id} onClick={()=>onChange(item.id)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"8px 10px",backgroundColor:isA?T.sidebarActive:"transparent",color:isA?T.primary:"#9CA3AF",border:"none",cursor:"pointer",borderRadius:7,fontSize:12,fontWeight:isA?600:400,fontFamily:"inherit",marginBottom:1,borderLeft:isA?`3px solid ${T.primary}`:"3px solid transparent"}}><item.icon size={16}/><span>{item.label}</span></button>})}
  </nav>
  <div style={{padding:"10px 12px",borderTop:`1px solid ${T.sidebarBorder}`}}>
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <div style={{width:32,height:32,borderRadius:7,background:`${T.primary}30`,display:"flex",alignItems:"center",justifyContent:"center",color:T.primary,fontWeight:700,fontSize:11}}>AC</div>
      <div><p style={{fontSize:12,fontWeight:600,margin:0,color:"#E5E7EB"}}>Angela Costa</p><p style={{fontSize:10,color:"#6B7280",margin:0}}>Professora - Asa Sul</p></div>
    </div>
  </div>
</aside>;

// === BOTTOM NAV (mobile) ===
const BottomNav=({active,onChange})=> <div style={{position:"fixed",bottom:0,left:0,right:0,background:T.card,borderTop:`1px solid ${T.border}`,display:"flex",zIndex:40,paddingBottom:"env(safe-area-inset-bottom)"}}>
  {[{id:"home",icon:LayoutDashboard,label:"Meu Dia"},{id:"grade",icon:CalendarDays,label:"Grade"},{id:"pay",icon:DollarSign,label:"Pagamento"}].map(t=> <button key={t.id} onClick={()=>onChange(t.id)} style={{flex:1,padding:"10px 0 8px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,fontFamily:"inherit"}}>
    <t.icon size={20} color={active===t.id?T.primary:T.mutedFg} strokeWidth={active===t.id?2.5:1.8}/>
    <span style={{fontSize:10,fontWeight:active===t.id?700:500,color:active===t.id?T.primary:T.mutedFg}}>{t.label}</span>
  </button>)}
</div>;

// === MAIN ===
export default function ProfessorApp({onSwitch}){
  const w=useW();
  const isMob=w<768;
  const [pg,sPg]=useState("home");
  const [openCls,setOpenCls]=useState(null);
  const [checkins,setCk]=useState({});
  const doCheckin=(cid,name,type)=>setCk(p=>({...p,[`${cid}-${name}`]:type}));

  if(openCls) return <div style={{fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif"}}><ClassDetail cls={openCls} onBack={()=>setOpenCls(null)} checkins={checkins} doCheckin={doCheckin} isMob={isMob}/></div>;

  if(isMob) return <div style={{fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",background:T.bg,minHeight:"100vh",paddingBottom:70}}>
    {onSwitch&&<div style={{padding:"12px 16px 0"}}><button onClick={onSwitch} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",background:`${T.primary}12`,color:T.primary,border:`1px solid ${T.primary}30`,borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{"\u2190"} Voltar p/ Franqueadora</button></div>}
    {pg==="home"&&<HomePage onOpen={setOpenCls} isMob/>}
    {pg==="grade"&&<GradePage onOpen={setOpenCls} isMob/>}
    {pg==="pay"&&<PayPage isMob/>}
    <BottomNav active={pg} onChange={sPg}/>
  </div>;

  return <div style={{display:"flex",height:"100vh",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",background:T.bg}}>
    <Sidebar active={pg} onChange={sPg} onSwitch={onSwitch}/>
    <main style={{flex:1,overflowY:"auto"}}>
      {pg==="home"&&<HomePage onOpen={setOpenCls}/>}
      {pg==="grade"&&<GradePage onOpen={setOpenCls}/>}
      {pg==="pay"&&<PayPage/>}
    </main>
  </div>;
}
