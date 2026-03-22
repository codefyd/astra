
document.addEventListener('DOMContentLoaded', loadDashboard);
async function loadDashboard(){
  showLoader();
  try{
    const res = await apiPost('getDashboardStats',{});
    const s = res.data || {};
    const map = {
      todayBookings: s.حجوزات_اليوم || 0,
      monthRevenue: fmtMoney(s.إيراد_الشهر || 0),
      occupiedUnits: s.وحدات_مشغولة || 0,
      unpaidBookings: s.حجوزات_غير_مكتملة_السداد || 0
    };
    Object.entries(map).forEach(([id,val])=>{ const el=document.getElementById(id); if(el) el.textContent=val; });
    const upcoming = s.الحجوزات_القادمة || [];
    document.getElementById('upcomingBookings').innerHTML = upcoming.length ? upcoming.map(r=>`
      <tr>
        <td>${htmlEscape(r.رقم_الحجز||'-')}</td>
        <td>${htmlEscape(r.العميل||'-')}</td>
        <td>${htmlEscape(r.الوحدة||'-')}</td>
        <td>${fmtDate(r.تاريخ_البداية)}</td>
        <td>${htmlEscape(r.حالة_الحجز||'-')}</td>
      </tr>`).join('') : '<tr><td colspan="5" class="text-center text-muted">لا توجد بيانات</td></tr>';
  }catch(e){
    notify('خطأ في تحميل اللوحة',String(e),'error');
  }finally{hideLoader();}
}
