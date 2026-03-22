
document.addEventListener('DOMContentLoaded', initBookingForm);
async function initBookingForm(){
  showLoader();
  try{
    const [lookups, booking] = await Promise.all([
      apiGet('getLookupData'),
      getQuery('id') ? apiPost('getBooking',{المعرف:getQuery('id')}) : Promise.resolve({success:true,data:null})
    ]);
    fillSelect('الوحدة', lookups.lookup?.الوحدات || [], 'الاسم');
    fillSelect('العميل', lookups.lookup?.العملاء || [], 'الاسم_الكامل');
    fillSelect('حالة_الحجز', lookups.lookup?.حالات_الحجز || [], 'الاسم');
    fillSelect('مصدر_الحجز', lookups.lookup?.قنوات_الحجز || [], 'الاسم');
    fillSelect('المشرف', lookups.lookup?.المستخدمون || [], 'الاسم_الكامل');
    document.getElementById('تاريخ_البداية').value = todayStr();
    document.getElementById('تاريخ_النهاية').value = todayStr();
    if(booking.data){ patchForm(booking.data); }
    document.getElementById('saveBookingBtn').addEventListener('click', saveBooking);
  }catch(e){
    notify('خطأ',String(e),'error');
  }finally{hideLoader();}
}
function fillSelect(id, rows, labelField){
  const el = document.getElementById(id);
  if(!el) return;
  el.innerHTML = '<option value="">اختر</option>' + rows.map(r=>`<option value="${htmlEscape(r[labelField]||r.المعرف||'')}">${htmlEscape(r[labelField]||r.المعرف||'')}</option>`).join('');
}
function patchForm(d){
  ['المعرف','العميل','الوحدة','تاريخ_البداية','تاريخ_النهاية','وقت_الدخول','وقت_الخروج','عدد_الضيوف','نوع_المناسبة','مصدر_الحجز','السعر_الأساسي','الخصم','الرسوم_الإضافية','مبلغ_التأمين','إجمالي_الحجز','المدفوع','المتبقي','حالة_الحجز','المشرف','ملاحظات_العميل','ملاحظات_داخلية'].forEach(k=>{
    const el = document.getElementById(k); if(el) el.value = d[k] || '';
  });
}
async function saveBooking(){
  const payload = collectForm([
    'المعرف','العميل','الوحدة','تاريخ_البداية','تاريخ_النهاية','وقت_الدخول','وقت_الخروج','عدد_الضيوف','نوع_المناسبة','مصدر_الحجز','السعر_الأساسي','الخصم','الرسوم_الإضافية','مبلغ_التأمين','إجمالي_الحجز','المدفوع','المتبقي','حالة_الحجز','المشرف','ملاحظات_العميل','ملاحظات_داخلية'
  ]);
  showLoader();
  try{
    const res = await apiPost('saveBooking',payload);
    if(res.success){
      await notify('تم الحفظ بنجاح');
      location.href='bookings.html';
    }else notify('تعذر الحفظ',res.message || '', 'error');
  }catch(e){ notify('خطأ',String(e),'error'); }
  finally{ hideLoader(); }
}
function collectForm(keys){
  const o={}; keys.forEach(k=>o[k]=document.getElementById(k)?.value || ''); return o;
}
