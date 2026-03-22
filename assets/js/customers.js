
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('newCustomerBtn')?.addEventListener('click', ()=>location.href='customer-form.html');
  loadCustomers();
});
async function loadCustomers(){
  showLoader();
  try{
    const res = await apiPost('listCustomers',{});
    const rows=res.data||[];
    document.getElementById('customersTableBody').innerHTML = rows.length ? rows.map(r=>`
      <tr>
        <td>${htmlEscape(r.الاسم_الكامل||'-')}</td>
        <td>${htmlEscape(r.الجوال||'-')}</td>
        <td>${htmlEscape(r.المدينة||'-')}</td>
        <td>${htmlEscape(r.مصدر_الحجز||'-')}</td>
        <td>${htmlEscape(r.عدد_الحجوزات||'0')}</td>
        <td>${fmtMoney(r.إجمالي_المدفوعات||0)}</td>
        <td><a class="btn btn-sm btn-outline-secondary" href="customer-form.html?id=${encodeURIComponent(r.المعرف||'')}">تعديل</a></td>
      </tr>`).join('') : '<tr><td colspan="7" class="text-center text-muted">لا توجد بيانات</td></tr>';
  }catch(e){ notify('خطأ',String(e),'error'); }
  finally{ hideLoader(); }
}
