
document.addEventListener('DOMContentLoaded', loadCalendarSummary);
async function loadCalendarSummary(){
  showLoader();
  try{
    const res = await apiPost('listBookings',{});
    const rows = res.data || [];
    document.getElementById('calendarStats').innerHTML = rows.length ? rows.slice(0,20).map(r=>`
      <div class="col-12 col-md-6 col-xl-4">
        <div class="card"><div class="card-body">
          <div class="fw-bold mb-1">${htmlEscape(r.الوحدة || '-')}</div>
          <div class="text-muted small">${fmtDate(r.تاريخ_البداية)} — ${fmtDate(r.تاريخ_النهاية)}</div>
          <div class="mt-2"><span class="stat-chip">${htmlEscape(r.حالة_الحجز || '-')}</span></div>
        </div></div>
      </div>`).join('') : '<div class="col-12"><div class="empty-box">لا توجد بيانات حجوزات لعرضها</div></div>';
  }catch(e){ notify('خطأ',String(e),'error'); } finally{ hideLoader(); }
}
