
document.addEventListener('DOMContentLoaded', ()=>{ document.getElementById('saveSettingBtn')?.addEventListener('click', saveSetting); loadSettings(); });
async function loadSettings(){
  showLoader();
  try{
    const res = await apiGet('listSettings');
    const rows=res.data||[];
    document.getElementById('settingsList').innerHTML = rows.length ? rows.map(r=>`
      <div class="list-group-item">
        <div class="fw-bold">${htmlEscape(r.المفتاح||'-')}</div>
        <div>${htmlEscape(r.القيمة||'-')}</div>
        <small>${htmlEscape(r.الوصف||'')}</small>
      </div>`).join('') : '<div class="empty-box">لا توجد إعدادات بعد</div>';
  }catch(e){ notify('خطأ',String(e),'error'); } finally{ hideLoader(); }
}
async function saveSetting(){
  const payload = {
    المفتاح: document.getElementById('المفتاح').value.trim(),
    القيمة: document.getElementById('القيمة').value.trim(),
    الوصف: document.getElementById('الوصف').value.trim(),
    المجموعة: document.getElementById('المجموعة').value.trim() || 'عام',
    نشط: 'نعم'
  };
  if(!payload.المفتاح) return notify('تنبيه','أدخل المفتاح','warning');
  showLoader();
  try{
    const res = await apiPost('saveSetting',payload);
    if(res.success){ await notify('تم حفظ الإعداد'); document.getElementById('settingForm').reset(); loadSettings(); }
    else notify('تعذر الحفظ',res.message||'','error');
  }catch(e){ notify('خطأ',String(e),'error'); } finally{ hideLoader(); }
}
