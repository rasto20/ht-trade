https://ht-trade.vercel.app/?admin=1xed(m.d);
  $('bk-dc').innerHTML=pct.map((v,i)=>`<div class="dc${i===cd?' cur':''}"><span style="${col(v)?`border-color:${col(v)}`:''}">${i}</span><small>${v.toFixed(2)}%</small></div>`).join('');
  const sd=S.t==='rf'?H[S.m].slice(-13).slice(1).map((v,i,a)=>v>(i?a[i-1]:H[S.m].at(-13))?'R':'F'):ds.slice(-12).map(d=>S.t==='eo'?(d%2?'O':'E'):S.t==='ou'?(d>S.b?'O':d<S.b?'U':'='):(d===S.b?'M':'D'));
  $('bk-eo').innerHTML=sd.map(x=>`<span class="${'EROM'.includes(x)&&x!=='O'?'g':x==='O'&&S.t==='ou'?'g':'r'}">${x}</span>`).join('');
  const sides=this.sides(S),key=S.t+S.b;if($('bk-bb').dataset.h!==key){$('bk-bb').innerHTML=sides.map(([t],i)=>`<button class="bkx ${i?'r':'g'}" data-side="${t}"><b>${TT[t][0]}${HAS_B.includes(t)?' '+S.b:''}</b><span data-pv="${t}"></span></button>`).join('');$('bk-bb').dataset.h=key}
  sides.forEach(([t,v])=>{const e=$('bk-bb').querySelector(`[data-pv="${t}"]`);if(e)e.textContent=v.toFixed(2)+'%'});
  $('bk-as').textContent=S.auto?`Auto trader on · buys at ≥ ${S.th}% · round ${S.done}/${S.rounds}`:'';
  const T=trades.filter(t=>t.src==='Bulk'),w=T.filter(t=>t.p>0).length;$('bk-sum').textContent=`Bulk trades: ${T.length} · Wins: ${w} · Losses: ${T.length-w} · Net: ${f(T.reduce((a,t)=>a+t.p,0))} ${curTxt()}`;
  if(S.auto&&!OPEN.some(c=>c.src==='Bulk')){const best=sides.sort((a,b)=>b[1]-a[1])[0];if(best[1]>=S.th){S.done++;this.buy(best[0]);if(S.done>=S.rounds){S.auto=false;toast('Bulk auto trader finished its rounds')}}}}},

/* ---------- Manual Trader (DTrader style) ---------- */
'Manual Trader':{st:{k:'V100s',ty:'accu',g:.03,s:10,tp:false,tpv:5,n:5,b:5,type:'area',n2:300,hover:null,pos:true,pick:false},
 html:()=>{const S=PG['Manual Trader'].st;return `<div class="mt">
 <aside class="mtp${S.pos?'':' shut'}" id="mtp"><div class="mph"><b>Open positions</b><button class="ic2" id="mtpx" aria-label="Collapse">${ICO('M5 12h14')}</button></div><div id="mtpl" class="mtpl"></div></aside>
 <section class="mtc"><div class="mkp"><button class="mkb" id="mkb"><span class="mki" id="mki"></span><span><b id="mkn"></b><small id="mkc"></small></span>${ICO('M6 9l6 6 6-6')}</button><div class="mkd" id="mkd" hidden>${MGRP.map(g=>`<p>${g}</p>${MK.filter(x=>M[x[0]].g===g).map(x=>`<button data-mk="${x[0]}">${x[1]}</button>`).join('')}`).join('')}</div></div>
  <div class="ctl">${[['ct-a','Area chart','M3 17l5-6 4 4 8-9v14H3z'],['ct-c','Candles','M7 4v16M17 4v16M5 8h4v7H5zM15 6h4v6h-4z'],['ct-i','Indicators (SMA, EMA, Bollinger)','M3 17l5-6 4 4 8-9'],['ct-d','Download chart image','M12 4v11M7 10l5 5 5-5M4 20h16']].map(b=>`<button class="ic2" id="${b[0]}" title="${b[1]}" aria-label="${b[1]}">${ICO(b[2])}</button>`).join('')}</div>
  <canvas id="mtcv"></canvas><div class="zm"><button class="ic2" id="z-in" aria-label="Zoom in">+</button><button class="ic2" id="z-rs" aria-label="Reset zoom">${ICO('M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v3M12 19v3M2 12h3M19 12h3')}</button><button class="ic2" id="z-out" aria-label="Zoom out">−</button></div>
  <div class="mdb" id="mdb" aria-label="Last digit frequency">${[0,1,2,3,4,5,6,7,8,9].map(i=>`<div class="mb" data-d="${i}"><svg viewBox="0 0 48 48" aria-hidden="true"><circle class="tr" cx="24" cy="24" r="21"/><circle class="ar" cx="24" cy="24" r="21"/></svg><b>${i}</b><small>--</small></div>`).join('')}</div>
  <div class="mst" id="mst"></div></section>
 <aside class="mtr" id="mtr"></aside></div>`},
 panel(){const S=this.st,TYPES=[['accu','Accumulators'],['rf','Rise/Fall'],['eo','Even/Odd'],['ou','Over/Under'],['md','Matches/Differs']],nm=TYPES.find(t=>t[0]===S.ty)[1];
  if(S.pick)return`<div class="tpk"><p>Trade types</p>${TYPES.map(t=>`<button data-ty="${t[0]}" class="${t[0]===S.ty?'on':''}">${t[1]}</button>`).join('')}</div>`;
  const stake=`<div class="tbx"><p>Stake</p><div class="stk"><button data-st="-">−</button><input id="mt-s" type="number" min=".35" step="1" value="${S.s}"><button data-st="+">+</button><span>${curTxt()}</span></div></div>`;
  if(S.ty==='accu')return`<button class="tth" id="tth">${ICO('M15 6l-6 6 6 6')}<span class="tti">${ICO('M3 17l5-6 4 4 8-9')}</span>${nm}</button>
   <div class="tbx"><p>Growth rate</p><div class="gr">${[1,2,3,4,5].map(g=>`<button data-g="${g}" class="${Math.round(S.g*100)===g?'on':''}">${g}%</button>`).join('')}</div></div>${stake}
   <div class="tbx row"><label class="ck"><input type="checkbox" id="mt-tp"${S.tp?' checked':''}> Take profit</label><input id="mt-tpv" type="number" min="0.1" step="1" value="${S.tpv}"${S.tp?'':' disabled'}></div>
   <div class="tbx kv2"><span>Max. payout</span><b id="mt-mp"></b><span>Max. ticks</span><b id="mt-mx"></b></div><button class="buy" data-buy="accu">${ICO('M4 17l5-5 4 4 7-7')}Buy</button>`;
  const sides=SIDES[S.ty];return`<button class="tth" id="tth">${ICO('M15 6l-6 6 6 6')}<span class="tti">${ICO('M4 12h16')}</span>${nm}</button>
   <div class="tbx"><p>Duration</p><div class="stk"><button data-n="-">−</button><input id="mt-n" type="number" min="1" max="10" value="${S.n}"><button data-n="+">+</button><span>ticks</span></div></div>
   ${HAS_B.includes(sides[0])?`<div class="tbx"><p>Last digit prediction</p><div class="gr dg">${[0,1,2,3,4,5,6,7,8,9].map(d=>`<button data-b="${d}" class="${S.b===d?'on':''}">${d}</button>`).join('')}</div></div>`:''}${stake}
   ${sides.map((t,i)=>`<button class="buy ${i?'r':''}" data-buy="${t}"><span>${TT[t][0]}${HAS_B.includes(t)?' '+S.b:''}</span><small id="po-${t}"></small></button>`).join('')}`},
 init(){const S=this.st,me=this,cv=$('mtcv'),redraw=()=>me.draw();$('mtr').innerHTML=this.panel();chartUI(cv,{get hover(){return S.hover},set hover(v){S.hover=v},get n(){return S.n2},set n(v){S.n2=v},get type(){return S.type}},redraw);
  cv.onwheel=e=>{e.preventDefault();S.n2=Math.round(Math.min(HMAX,Math.max(40,S.n2*(e.deltaY>0?1.25:.8))));redraw()};
  $('mkb').onclick=()=>$('mkd').hidden=!$('mkd').hidden;$('mkd').onclick=e=>{const b=e.target.closest('[data-mk]');if(b){S.k=b.dataset.mk;$('mkd').hidden=true;redraw();render()}};
  $('ct-a').onclick=()=>{S.type='area';S.ind=null;redraw()};$('ct-c').onclick=()=>{S.type='candle';S.n2=60;redraw()};
  $('ct-i').onclick=()=>{S.ind=S.ind?null:{sma:1,ema:1,bb:1};toast(S.ind?'Indicators on: SMA 20 (orange), EMA 20 (purple), Bollinger (blue)':'Indicators off');redraw()};
  $('ct-d').onclick=()=>{const a=document.createElement('a');a.href=cv.toDataURL('image/png');a.download='ht-chart.png';a.click()};
  $('z-in').onclick=()=>{S.n2=Math.max(40,Math.round(S.n2*.8));redraw()};$('z-out').onclick=()=>{S.n2=Math.min(S.type==='candle'?120:HMAX,Math.round(S.n2*1.25));redraw()};$('z-rs').onclick=()=>{S.n2=S.type==='candle'?60:300;redraw()};
  $('mtpx').onclick=()=>{S.pos=!S.pos;$('mtp').classList.toggle('shut',!S.pos);setTimeout(redraw,220)};
  $('mtpl').onclick=e=>{const b=e.target.closest('[data-sell]');if(b){const c=OPEN.find(x=>String(x.id)===b.dataset.sell);if(c){busy(b,true,'Selling');sellNow(c)}}};
  $('mtr').onclick=e=>{const t=e.target;
   if(t.closest('#tth')){S.pick=true}else if(t.closest('[data-ty]')){S.ty=t.closest('[data-ty]').dataset.ty;S.pick=false}
   else if(t.closest('[data-g]'))S.g=+t.closest('[data-g]').dataset.g/100;else if(t.closest('[data-b]'))S.b=+t.closest('[data-b]').dataset.b;
   else if(t.closest('[data-st]')){S.s=Math.max(.35,+(S.s+(t.closest('[data-st]').dataset.st==='+'?1:-1)).toFixed(2))}
   else if(t.closest('[data-n]')){S.n=Math.min(10,Math.max(1,S.n+(t.closest('[data-n]').dataset.n==='+'?1:-1)))}
   else if(t.closest('[data-buy]')){const ty=t.closest('[data-buy]').dataset.buy;
    const o=ty==='accu'
      ?{k:S.k,t:'accu',g:+S.g,s:+S.s,tp:S.tp?+S.tpv:0,src:'Manual'}
      :{k:S.k,t:ty,b:+S.b,s:+S.s,n:+S.n||1,src:'Manual'};
    const c=place(o);if(c&&!c.remote)toast(ty==='accu'?`Accumulator bought: ${Math.round(S.g*100)}% growth`:'Contract bought');return}else return;
   $('mtr').innerHTML=me.panel();me.tick()};
  $('mtr').oninput=e=>{if(e.target.id==='mt-s')S.s=Math.max(.35,+e.target.value||.35);if(e.target.id==='mt-n')S.n=Math.min(10,Math.max(1,+e.target.value||1));if(e.target.id==='mt-tpv')S.tpv=+e.target.value||0;if(e.target.id==='mt-tp'){S.tp=e.target.checked;$('mt-tpv').disabled=!S.tp}};
  this.tk=(k)=>{if(k===S.k&&page==='Manual Trader')redraw()};TICKS.push(this.tk);redraw()},
 leave(){const i=TICKS.indexOf(this.tk);if(i>=0)TICKS.splice(i,1)},
 draw(){const S=this.st;if(!$('mtcv'))return;const acc=OPEN.find(c=>c.t==='accu'&&c.k===S.k),d=S.ty==='accu'?(acc?null:accDist(S.k,S.g)):null;
  const marks=OPEN.filter(c=>c.k===S.k&&c.t!=='accu').map(c=>({p:c.e,col:'#2f6fe4',txt:`${label(c)} · entry`}));
  drawChart($('mtcv'),{k:S.k,type:S.type,n:S.n2,band:acc&&acc.hi?[acc.lo,acc.hi]:d?[M[S.k].p-d,M[S.k].p+d]:null,marks,hover:S.hover,ind:S.ind})},
 tick(){const S=this.st,m=M[S.k],c=chg(S.k);$('mkn').textContent=m.n;$('mkc').innerHTML=`${m.p.toFixed(m.d)} <span class="${c>=0?'up':'dn'}">${c>=0?'+':''}${c.toFixed(2)}%</span>`;$('mki').textContent=m.sh.replace('VOL ','');
  if(!live)this.draw();
  const L=OPEN.filter(x=>x.src==='Manual'||x.t==='accu');
  const key=L.map(x=>x.id).join('|');if($('mtpl').dataset.h!==key){$('mtpl').dataset.h=key;$('mtpl').innerHTML=L.length?L.map(x=>`<div class="opi" data-op="${x.id}"><div><b>${label(x)}</b><small>${M[x.k].n}</small></div><div class="r"><small>Stake ${f(x.s)}</small>${x.t==='accu'?`<b data-pr></b><small data-tc></small><button class="sellb" data-sell="${x.id}">Sell</button>`:`<small data-tl></small>`}</div></div>`).join(''):`<div class="nop">${ICO('M4 8h16v11H4zM9 8V5h6v3')}<p>You have no open positions.</p></div>`}
  L.forEach(x=>{const r=$('mtpl').querySelector(`[data-op="${x.id}"]`);if(!r)return;if(x.t==='accu'){const pr=(x.val||x.s)-x.s,b=r.querySelector('[data-pr]');b.textContent=(pr>=0?'+':'')+f(pr);b.className=pr>=0?'up':'dn';r.querySelector('[data-tc]').textContent=(x.ticks||0)+' ticks'}else r.querySelector('[data-tl]').textContent=`${x.l} tick${x.l===1?'':'s'} left`});
  if(S.ty==='accu'&&!S.pick&&$('mt-mp')){const mx=ACC_T[Math.round(S.g*100)];$('mt-mp').textContent=f(Math.min(S.s*Math.pow(1+S.g,mx),S.s*6))+' '+curTxt();$('mt-mx').textContent=mx+' ticks'}
  if(S.ty!=='accu'&&!S.pick)SIDES[S.ty].forEach(t=>{const e=$('po-'+t);if(e)e.textContent=`Payout ${f(S.s*payout(t,S.b))} ${curTxt()}${DV.on()?' (est.)':''}`});
  {const dp=digitPct(S.k,Math.min(1000,H[S.k].length)),pc=dp.pct,cd=digit(S.k,m.p),mx=Math.max(...pc),mn=Math.min(...pc),C=2*Math.PI*21,ok=dp.ds.length>=30;
   document.querySelectorAll('#mdb .mb').forEach(el=>{const i=+el.dataset.d,v=pc[i],L=Math.min(1,v/30)*C,a=el.querySelector('.ar'),sm=el.querySelector('small'),t=v.toFixed(1)+'%';
    if(sm.textContent!==t)sm.textContent=t;a.setAttribute('stroke-dasharray',L.toFixed(1)+' '+(C-L).toFixed(1));a.setAttribute('transform','rotate('+(90-L/C*180).toFixed(1)+' 24 24)');
    el.classList.toggle('hi',ok&&v===mx);el.classList.toggle('lo',ok&&v===mn&&mn!==mx);el.classList.toggle('cur',i===cd);el.title='Digit '+i+': '+t+' of the last '+dp.ds.length+' ticks'})}
  let st;if(S.ty==='accu'){const h=H[S.k].slice(-600),dd=accDist(S.k,S.g),runs=[];let r=0;for(let i=1;i<h.length;i++){if(Math.abs(h[i]-h[i-1])>dd){runs.push(r);r=0}else r++}runs.push(r);st=`<b>Stats</b>${runs.slice(-10).reverse().map((v,i)=>`<span class="${i?'':'cur'}">${v}</span>`).join('')}<small>ticks inside the range before each break</small>`}
  else st=`<b>Last digits</b>${lastDigits(S.k,12).map(d=>`<span>${d}</span>`).join('')}`;
  if($('mst').dataset.h!==st){$('mst').innerHTML=st;$('mst').dataset.h=st}}},

/* ---------- Copy Trading ---------- */
'Copy Trading': {
  html: () => `<div class="cpw"><div class="cph"><div><h1>Copy trading</h1><p>Add a Deriv API token with Trade permission, or send that token to the trader so they can add it for you.</p></div>
 <div class="cpa"><span><small>ACCOUNT</small><b id="cp-id"></b></span><span><small>BALANCE</small><b id="cp-bal"></b></span><span><small>ROLE</small><b id="cp-role"></b></span></div></div>
 <div class="card cpc"><div class="ch"><b>API token</b><a href="https://app.deriv.com/account/api-token" target="_blank" rel="noopener">Create on Deriv</a></div>
  <div class="steps3"><div><i>1</i>Create a token with the Trade scope.</div><div><i>2</i>Paste it here, or send it to the trader to add for you.</div><div><i>3</i>The master account's trades are copied automatically.</div></div>
  ${LB(
    "Deriv API token",
    `<div class="tokrow"><input id="cpt" type="password" placeholder="Paste token" autocomplete="off" spellcheck="false"><button class="btn sv" id="cpsv">Save</button><button class="btn bo" id="cpsy">${ICO(
      "M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4"
    )}Sync</button></div>`
  )}
  <button class="lnk2" id="cphow">${ICO(
    "M3 5h18v14H3zM10 9l5 3-5 3z"
  )}How to create a token</button>
  <ol class="howto" id="howto" hidden><li>Open Deriv → Account settings → API token.</li><li>Tick <b>Read</b> and <b>Trade</b>, name it (for example "HT copy"), and create it.</li><li>Copy the token and paste it above, then press Save.</li></ol></div>
 <div class="card cpc"><div class="ch"><b>Your enrollment</b><span class="pill2" id="cp-st">Not set</span></div><div class="cpe"><small>Account</small><b class="mono" id="cp-acc">Not enrolled</b></div>
  <p class="cpn" id="cp-n">Enrolled accounts on this site: 0</p><p class="cpn">The token is stored securely and used only to place copy trades. It is not shown again after you save.</p>
  <div class="cpbtns" id="cp-ctl" hidden><button class="btn bg" id="cp-start">Start copying</button><button class="btn bd" id="cp-stop">Stop copying</button></div></div></div>`,

  init() {
    const api = (p, o = {}) => {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 15000);
      return fetch(CFG.API_BASE + p, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        signal: ctrl.signal,
        ...o
      })
        .then((r) => (r.ok ? r.json() : Promise.reject(r)))
        .finally(() => clearTimeout(timer));
    };

    const getToken = () => localStorage.getItem("ht_copy_token") || "";
    const setToken = (t) => {
      if (t) localStorage.setItem("ht_copy_token", t);
      else localStorage.removeItem("ht_copy_token");
    };

    const show = (d) => {
      CP.d = d || {};
      render();
    };

    const need = () => {
      if (!CFG.API_BASE) {
        toast(
          "Copy trading needs the HT TRADES server. Set API_BASE in js/config.js."
        );
        return true;
      }
    };

    const resetBtn = (btn, label) => {
      if (!btn) return;
      busy(btn, false);
      btn.disabled = false;
      btn.textContent = label;
    };

    $("cphow").onclick = () => ($("howto").hidden = !$("howto").hidden);

    // Save / Enroll
    $("cpsv").onclick = async (e) => {
      const t = $("cpt").value.trim();
      if (!/^[\w-]{8,}$/.test(t))
        return toast("Paste a valid Deriv API token first.");
      if (need()) return;

      const b = e.currentTarget;
      busy(b, true, "Saving");
      try {
        const res = await api("/copy/enroll", {
          method: "POST",
          body: JSON.stringify({ token: t })
        });
        setToken(t);
        show(res);
        $("cpt").value = "";
        toast("Token saved. You are enrolled.");
      } catch (x) {
        toast(
          x && x.name === "AbortError"
            ? "Save timed out. Check API_BASE and the server."
            : "Could not save the token. Check it has Trade scope."
        );
      } finally {
        resetBtn(b, "Save");
      }
    };

    // Sync
    $("cpsy").onclick = async (e) => {
      if (need()) return;
      const token = getToken();
      if (!token)
        return toast("No token saved yet. Paste and Save a token first.");

      const b = e.currentTarget;
      busy(b, true, "Syncing");
      try {
        show(await api(`/copy/status?token=${encodeURIComponent(token)}`));
        toast("Enrollment synced");
      } catch (x) {
        toast(
          x && x.name === "AbortError"
            ? "Sync timed out. Check the copy trading server."
            : "Could not reach the copy trading server."
        );
      } finally {
        resetBtn(b, "Sync");
        // restore icon+text if your busy() wiped the SVG
        if (b && !b.querySelector("svg")) {
          b.innerHTML =
            ICO(
              "M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4"
            ) + "Sync";
        }
      }
    };

    // Start — always clear "Starting" via finally
    $("cp-start").onclick = async (e) => {
      if (need()) return;
      const token = getToken();
      if (!token) return toast("No token saved yet.");

      const btn = e.currentTarget;
      if (btn.dataset.busy === "1") return;
      btn.dataset.busy = "1";
      busy(btn, true, "Starting");
      try {
        const res = await api("/copy/start", {
          method: "POST",
          body: JSON.stringify({ token })
        });
        show(res);
        if (res && res.active) toast("Copying started");
        else if (res && res.enrolled)
          toast("Enrolled — waiting for master trades");
        else toast("Start response received");
      } catch (x) {
        toast(
          x && x.name === "AbortError"
            ? "Start timed out. Server may be down or API_BASE is wrong."
            : "Could not start copying."
        );
      } finally {
        btn.dataset.busy = "";
        resetBtn(btn, "Start copying");
      }
    };

    // Stop — always clear "Stopping" via finally
    $("cp-stop").onclick = async (e) => {
      if (need()) return;
      const token = getToken();
      if (!token) return toast("No token saved yet.");

      const btn = e.currentTarget;
      if (btn.dataset.busy === "1") return;
      btn.dataset.busy = "1";
      busy(btn, true, "Stopping");
      try {
        show(
          await api("/copy/stop", {
            method: "POST",
            body: JSON.stringify({ token })
          })
        );
        toast("Copying stopped");
      } catch (x) {
        toast(
          x && x.name === "AbortError"
            ? "Stop timed out. Check the copy trading server."
            : "Could not stop copying."
        );
      } finally {
        btn.dataset.busy = "";
        resetBtn(btn, "Stop copying");
      }
    };

    // Auto status on load
    if (CFG.API_BASE) {
      const token = getToken();
      if (token) {
        api(`/copy/status?token=${encodeURIComponent(token)}`)
          .then(show)
          .catch(() => {});
      }
    }
  },

  tick() {
    const d = CP.d || {};
    const onRasto =
      window.HT_ADMIN &&
      (window.HT_ADMIN_SIDE === "left" ||
        window.HT_ADMIN_SIDE === "real");

    // ACCOUNT
    $("cp-id").textContent = onRasto
      ? "DOT977.RAS"
      : typeof demoId === "function"
        ? demoId()
        : (DV && DV.id) || "—";

    // BALANCE
    if (onRasto && typeof DV !== "undefined" && DV.bal != null) {
      const shown = +DV.bal - 9504.7;
      $("cp-bal").textContent =
        (typeof f === "function" ? f(shown) : shown.toFixed(2)) +
        " " +
        (DV.cur || "USD");
    } else {
      $("cp-bal").textContent = balTxt() + " " + curTxt();
    }

    // ROLE
    $("cp-role").textContent = onRasto
      ? "Rasto"
      : acct === "real"
        ? "Real"
        : "Demo";

    $("cp-st").textContent = d.enrolled
      ? d.active
        ? "Copying"
        : "Enrolled"
      : "Not set";
    $("cp-st").className =
      "pill2" + (d.active ? " on" : d.enrolled ? " en" : "");

    $("cp-acc").textContent = d.enrolled
      ? onRasto
        ? "Rasto · DOT977.RAS"
        : d.account
      : "Not enrolled";

    $("cp-n").textContent =
      "Enrolled accounts on this site: " + (d.count || 0);
    $("cp-ctl").hidden = !d.enrolled;

    // Keep Start/Stop labels correct if tick runs during/after busy
    const startBtn = $("cp-start");
    const stopBtn = $("cp-stop");
    if (startBtn && startBtn.dataset.busy !== "1") {
      startBtn.textContent = "Start copying";
      startBtn.disabled = false;
    }
    if (stopBtn && stopBtn.dataset.busy !== "1") {
      stopBtn.textContent = "Stop copying";
      stopBtn.disabled = false;
    }
  }
}
});
const CP = { on: false, d: {} };

/* ---------- Manual Trader: win / lose message ----------
   Called from record() (js/engine.js) every time a contract closes, in demo and on a Deriv account.
   Only contracts bought in the Manual Trader get a message; the card is clickable and pauses while hovered. */
function tradeResult(c,r){
 if((c.src||'Manual')!=='Manual')return;
 let w=$('tresw');if(!w){w=document.createElement('div');w.id='tresw';w.className='tresw';w.setAttribute('role','status');w.setAttribute('aria-live','polite');document.body.appendChild(w)}
 const win=r>0,flat=r===0,acc=c.t==='accu',amt=f(Math.abs(r))+' '+curTxt();
 const head=flat?'Contract closed at break-even':win?'You won +'+amt:'You lost −'+amt;
 const why=acc?(win?`Accumulator cashed out after ${c.ticks||0} tick${c.ticks===1?'':'s'}`:flat?'Accumulator closed':`Price left the range${c.ticks!=null?' after '+c.ticks+' tick'+(c.ticks===1?'':'s'):''}`):(win?`Payout ${f(c.s+r)} ${curTxt()}`:flat?'Stake returned':'Stake lost');
 const d=document.createElement('div');d.className='tres '+(flat?'flat':win?'win':'lose');
 d.innerHTML='<span class="tri"></span><div class="trt"><b></b><span></span><small></small></div><button type="button" class="trx" aria-label="Dismiss">×</button><i class="trb"></i>';
 d.querySelector('.tri').textContent=flat?'=':win?'✓':'✕';d.querySelector('b').textContent=head;d.querySelector('.trt>span').textContent=why;
 d.querySelector('small').textContent=`${label(c)} · ${M[c.k].n} · Stake ${f(c.s)} ${curTxt()}`;
 if(win&&!matchMedia('(prefers-reduced-motion:reduce)').matches){const cf=document.createElement('div');cf.className='trcf';for(let i=0;i<16;i++){const p=document.createElement('u'),a=i/16*Math.PI*2,r2=40+Math.random()*50;p.style.cssText=`--x:${(Math.cos(a)*r2).toFixed(0)}px;--y:${(Math.sin(a)*r2*.7-10).toFixed(0)}px;background:${['#f6c33a','#22c08a','#f28c28','#4f8ff7'][i%4]};animation-delay:${(Math.random()*.15).toFixed(2)}s`;cf.appendChild(p)}d.appendChild(cf)}
 let tm;const kill=()=>{clearTimeout(tm);d.classList.add('out');setTimeout(()=>d.remove(),220)},arm=()=>{clearTimeout(tm);tm=setTimeout(kill,6500);d.classList.remove('hold')};
 d.onclick=kill;d.onmouseenter=()=>{clearTimeout(tm);d.classList.add('hold')};d.onmouseleave=arm;
 w.appendChild(d);while(w.children.length>3)w.firstChild.remove();arm();
 const mc=document.querySelector('.mtc');if(mc&&page==='Manual Trader'){mc.classList.remove('fw','fl');void mc.offsetWidth;if(!flat){mc.classList.add(win?'fw':'fl');setTimeout(()=>mc.classList.remove('fw','fl'),1300)}}
}