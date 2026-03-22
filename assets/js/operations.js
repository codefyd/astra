
document.addEventListener('DOMContentLoaded', ()=>{ document.getElementById('newOperationBtn')?.addEventListener('click', saveOperation); loadOperations(); });
async function loadOperations(){
  showLoader();
  try{
    const res = await apiPost('listOperations',{});
    const rows=res.data||[];
    document.getElementById('operationsTableBody').innerHTML = rows.length ? rows.map(r=>`
      <tr>
        <td>${fmtDate(r.التاريخ)}</td>
        <td>${htmlEscape(r.الوحدة||'-')}</td>
        <td>${htmlEscape(r.نوع_المهمة||'-')}</td>
        <td>${htmlEscape(r.الموظف||'-')}</td>
        <td>${htmlEscape(r.الحالة||'-')}</td>
      </tr>`).join('') : '<tr><td colspan="5" class="text-center text-muted">لا توجد مهام</td></tr>';
  }catch(e){ notify('خطأ',String(e),'error'); } finally{ hideLoader(); }
}
async function saveOperation(){
  const payload = {
    التاريخ: todayStr(),
    الوحدة: prompt('اسم الوحدة') || '',
    نوع_المهمة: prompt('نوع المهمة','تنظيف') || '',
    الموظف: prompt('الموظف','') || '',
    الحالة: 'جديد',
    الوصف: prompt('الوصف','') || ''
  };
  showLoader();
  try{
    const res = await apiPost('saveOperation',payload);
    if(res.success){ await notify('تم حفظ المهمة'); loadOperations(); }
    else notify('تعذر الحفظ',res.message||'','error');
  }catch(e){ notify('خطأ',String(e),'error'); } finally{ hideLoader(); }
}
