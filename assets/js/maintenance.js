
document.addEventListener('DOMContentLoaded', ()=>{ document.getElementById('newMaintenanceBtn')?.addEventListener('click', saveMaintenance); loadMaintenance(); });
async function loadMaintenance(){
  showLoader();
  try{
    const res = await apiPost('listMaintenance',{});
    const rows=res.data||[];
    document.getElementById('maintenanceTableBody').innerHTML = rows.length ? rows.map(r=>`
      <tr>
        <td>${fmtDate(r.التاريخ)}</td>
        <td>${htmlEscape(r.الوحدة||'-')}</td>
        <td>${htmlEscape(r.العنوان||'-')}</td>
        <td>${htmlEscape(r.الحالة||'-')}</td>
        <td>${htmlEscape(r.الأولوية||'-')}</td>
      </tr>`).join('') : '<tr><td colspan="5" class="text-center text-muted">لا توجد أعمال صيانة</td></tr>';
  }catch(e){ notify('خطأ',String(e),'error'); } finally{ hideLoader(); }
}
async function saveMaintenance(){
  const payload = {
    التاريخ: todayStr(),
    الوحدة: prompt('اسم الوحدة') || '',
    العنوان: prompt('عنوان الصيانة','تسريب ماء') || '',
    الحالة: 'مفتوح',
    الأولوية: 'متوسط',
    الوصف: prompt('الوصف','') || ''
  };
  showLoader();
  try{
    const res = await apiPost('saveMaintenance',payload);
    if(res.success){ await notify('تم حفظ سجل الصيانة'); loadMaintenance(); }
    else notify('تعذر الحفظ',res.message||'','error');
  }catch(e){ notify('خطأ',String(e),'error'); } finally{ hideLoader(); }
}
