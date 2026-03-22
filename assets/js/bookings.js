
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('من_تاريخ').value=todayStr();
  document.getElementById('إلى_تاريخ').value=todayStr();
  document.getElementById('searchBookingsBtn')?.addEventListener('click', loadBookings);
  document.getElementById('newBookingBtn')?.addEventListener('click', ()=>location.href='booking-form.html');
  loadBookings();
});
async function loadBookings(){
  showLoader();
  try{
    const payload = {
      من_تاريخ: document.getElementById('من_تاريخ')?.value || '',
      إلى_تاريخ: document.getElementById('إلى_تاريخ')?.value || '',
      الوحدة: document.getElementById('فلتر_الوحدة')?.value || '',
      الحالة: document.getElementById('فلتر_الحالة')?.value || ''
    };
    const res = await apiPost('listBookings',payload);
    const rows=res.data||[];
    document.getElementById('bookingsTableBody').innerHTML = rows.length ? rows.map(r=>`
      <tr>
        <td>${htmlEscape(r.رقم_الحجز||'-')}</td>
        <td>${htmlEscape(r.العميل||'-')}</td>
        <td>${htmlEscape(r.الوحدة||'-')}</td>
        <td>${fmtDate(r.تاريخ_البداية)}</td>
        <td>${fmtDate(r.تاريخ_النهاية)}</td>
        <td>${fmtMoney(r.إجمالي_الحجز||0)}</td>
        <td>${fmtMoney(r.المدفوع||0)}</td>
        <td>${fmtMoney(r.المتبقي||0)}</td>
        <td>${htmlEscape(r.حالة_الحجز||'-')}</td>
        <td>
          <a class="btn btn-sm btn-outline-primary" href="booking-details.html?id=${encodeURIComponent(r.المعرف||'')}">عرض</a>
          <a class="btn btn-sm btn-outline-secondary" href="booking-form.html?id=${encodeURIComponent(r.المعرف||'')}">تعديل</a>
        </td>
      </tr>`).join('') : '<tr><td colspan="10" class="text-center text-muted">لا توجد حجوزات</td></tr>';
  }catch(e){
    notify('خطأ',String(e),'error');
  }finally{hideLoader();}
}
