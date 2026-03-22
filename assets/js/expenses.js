
document.addEventListener('DOMContentLoaded', ()=>{ document.getElementById('newExpenseBtn')?.addEventListener('click', saveExpense); loadExpenses(); });
async function loadExpenses(){
  showLoader();
  try{
    const res = await apiPost('listExpenses',{});
    const rows=res.data||[];
    document.getElementById('expensesTableBody').innerHTML = rows.length ? rows.map(r=>`
      <tr>
        <td>${fmtDate(r.التاريخ)}</td>
        <td>${htmlEscape(r.الوحدة||'-')}</td>
        <td>${htmlEscape(r.التصنيف||'-')}</td>
        <td>${fmtMoney(r.المبلغ||0)}</td>
        <td>${htmlEscape(r.الوصف||'-')}</td>
      </tr>`).join('') : '<tr><td colspan="5" class="text-center text-muted">لا توجد مصروفات</td></tr>';
  }catch(e){ notify('خطأ',String(e),'error'); } finally{ hideLoader(); }
}
async function saveExpense(){
  const payload = {
    التاريخ: todayStr(),
    الوحدة: prompt('اسم الوحدة') || '',
    التصنيف: prompt('التصنيف','نظافة') || '',
    المبلغ: prompt('المبلغ','50') || '0',
    الوصف: prompt('الوصف','مصروف تشغيلي') || ''
  };
  showLoader();
  try{
    const res = await apiPost('saveExpense',payload);
    if(res.success){ await notify('تم حفظ المصروف'); loadExpenses(); }
    else notify('تعذر الحفظ',res.message||'','error');
  }catch(e){ notify('خطأ',String(e),'error'); } finally{ hideLoader(); }
}
