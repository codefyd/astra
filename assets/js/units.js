
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('newUnitBtn')?.addEventListener('click', ()=>location.href='unit-form.html');
  loadUnits();
});
async function loadUnits(){
  showLoader();
  try{
    const res = await apiPost('listUnits',{});
    const rows=res.data||[];
    document.getElementById('unitsTableBody').innerHTML = rows.length ? rows.map(r=>`
      <tr>
        <td>${htmlEscape(r.الكود||'-')}</td>
        <td>${htmlEscape(r.الاسم||'-')}</td>
        <td>${htmlEscape(r.نوع_الوحدة||'-')}</td>
        <td>${htmlEscape(r.السعة||'-')}</td>
        <td>${fmtMoney(r.سعر_أساسي||0)}</td>
        <td>${htmlEscape(r.الحالة||'-')}</td>
        <td><a class="btn btn-sm btn-outline-secondary" href="unit-form.html?id=${encodeURIComponent(r.المعرف||'')}">تعديل</a></td>
      </tr>`).join('') : '<tr><td colspan="7" class="text-center text-muted">لا توجد وحدات</td></tr>';
  }catch(e){ notify('خطأ',String(e),'error'); }
  finally{ hideLoader(); }
}
