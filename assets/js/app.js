
function showLoader(){document.getElementById('appLoader')?.classList.remove('d-none')}
function hideLoader(){document.getElementById('appLoader')?.classList.add('d-none')}
function notify(title,text='',icon='success'){return Swal.fire({title,text,icon,confirmButtonText:'حسنًا'})}
function fmtMoney(v){return new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(Number(v||0))}
function fmtDate(v){if(!v) return '-'; return String(v).slice(0,10)}
function todayStr(){return new Date().toISOString().slice(0,10)}
function getQuery(name){return new URLSearchParams(location.search).get(name) || ''}
function htmlEscape(v){return String(v ?? '').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]))}
function ensureAuth(){
  const user = localStorage.getItem('chalets_user');
  if(!user && !location.pathname.endsWith('login.html') && !location.pathname.endsWith('/')) {
    location.href='login.html';
  }
}
function setUserInfo(){
  const el = document.getElementById('currentUserName');
  if(el){ el.textContent = localStorage.getItem('chalets_user_name') || 'المدير';}
}
document.addEventListener('DOMContentLoaded', ()=>{ ensureAuth(); setUserInfo(); });
