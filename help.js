/* Help drawer (the Help button) and the FAQ on the landing page, both built from FAQ in pages2.js */
const faqHTML=(list,attr)=>list.map(([q,a],i)=>`<details ${attr}="${i}"><summary>${q}</summary><p>${a}</p></details>`).join('');
$('hl').innerHTML=faqHTML(FAQ,'data-q');
$('lfq').innerHTML=faqHTML(FAQ.slice(0,6),'data-lq');
function openHelp(i){$('help').hidden=false;$('hq').value='';filterHelp('');
 if(i>=0){const d=document.querySelector(`#hl [data-q="${i}"]`);if(d){d.open=true;d.scrollIntoView({block:'nearest'})}}else $('hq').focus()}
function filterHelp(q){q=q.trim().toLowerCase();let n=0;
 document.querySelectorAll('#hl details').forEach(d=>{const hit=!q||d.textContent.toLowerCase().includes(q);d.hidden=!hit;if(hit)n++});
 let e=$('hl').querySelector('.hempty');if(!n){if(!e){e=document.createElement('p');e.className='hempty';$('hl').append(e)}e.textContent='No answer matches that. Try a shorter word, or open the tutorials.'}else if(e)e.remove()}
$('ai').onclick=()=>$('help').hidden?openHelp(-1):($('help').hidden=true);
$('hx').onclick=()=>$('help').hidden=true;
$('hq').oninput=e=>filterHelp(e.target.value);
document.addEventListener('click',e=>{if(!$('help').hidden&&!e.target.closest('#help,#ai,[data-help]'))$('help').hidden=true});
