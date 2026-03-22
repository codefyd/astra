
document.addEventListener('DOMContentLoaded', initCustomerForm);
async function initCustomerForm(){
  if(getQuery('id')){
    showLoader();
    try{
      const res = await apiPost('getCustomer',{المعرف:getQuery('id')});
      const d = res.data || {};
      ['المعرف','الاسم_الكامل','الجوال','رقم_الهوية','المدينة','مصدر_الحجز','ملاحظات'].forEach(k=>{ const el=document.getElementById(k); if(el) el.value=d[k]||''; });
    }catch(e){ notify('خطأ',String(e),'error'); } finally{ hideLoader(); }
  }
  document.getElementById('saveCustomerBtn')?.addEventListener('click', saveCustomer);
});
async function saveCustomer(){
  const payload={}; ['المعرف','الاسم_الكامل','الجوال','رقم_الهوية','المدينة','مصدر_الحجز','ملاحظات'].forEach(k=>payload[k]=document.getElementById(k)?.value||'');
  showLoader();
  try{
    const res = await apiPost('saveCustomer',payload);
    if(res.success){ await notify('تم حفظ العميل'); location.href='customers.html'; }
    else notify('تعذر الحفظ',res.message||'','error');
  }catch(e){ notify('خطأ',String(e),'error'); } finally{ hideLoader(); }
}
