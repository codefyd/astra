
document.addEventListener('DOMContentLoaded', initUnitForm);
async function initUnitForm(){
  showLoader();
  try{
    const [lookups, unit] = await Promise.all([
      apiGet('getLookupData'),
      getQuery('id') ? apiPost('getUnit',{المعرف:getQuery('id')}) : Promise.resolve({success:true,data:null})
    ]);
    fillSelect('الفرع', lookups.lookup?.الفروع || [], 'الاسم');
    fillSelect('نوع_الوحدة', lookups.lookup?.أنواع_الوحدات || [], 'الاسم');
    if(unit.data){ patch(unit.data); }
    document.getElementById('saveUnitBtn')?.addEventListener('click', saveUnit);
  }catch(e){ notify('خطأ',String(e),'error'); }
  finally{ hideLoader(); }
}
function fillSelect(id, rows, field){
  const el=document.getElementById(id);
  if(el) el.innerHTML='<option value="">اختر</option>'+rows.map(r=>`<option value="${htmlEscape(r[field]||'')}">${htmlEscape(r[field]||'')}</option>`).join('');
}
function patch(d){ ['المعرف','الكود','الاسم','الفرع','نوع_الوحدة','الوصف','السعة','عدد_الغرف','عدد_دورات_المياه','سعر_أساسي','سعر_نهاية_الأسبوع','مبلغ_التأمين','رسوم_التنظيف','الحالة','ملاحظات'].forEach(k=>{const el=document.getElementById(k); if(el) el.value=d[k]||''})}
async function saveUnit(){
  const payload = {}; ['المعرف','الكود','الاسم','الفرع','نوع_الوحدة','الوصف','السعة','عدد_الغرف','عدد_دورات_المياه','سعر_أساسي','سعر_نهاية_الأسبوع','مبلغ_التأمين','رسوم_التنظيف','الحالة','ملاحظات'].forEach(k=>payload[k]=document.getElementById(k)?.value||'');
  showLoader();
  try{
    const res = await apiPost('saveUnit',payload);
    if(res.success){ await notify('تم حفظ الوحدة'); location.href='units.html'; }
    else notify('تعذر الحفظ',res.message||'','error');
  }catch(e){ notify('خطأ',String(e),'error'); } finally{ hideLoader(); }
}
