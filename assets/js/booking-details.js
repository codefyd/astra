
document.addEventListener('DOMContentLoaded', loadBookingDetails);
async function loadBookingDetails(){
  const id = getQuery('id');
  if(!id) return;
  showLoader();
  try{
    const res = await apiPost('getBooking',{المعرف:id});
    const d = res.data || {};
    document.getElementById('detailsBox').innerHTML = `
      <div class="row g-3">
        ${detail('رقم الحجز', d.رقم_الحجز)}
        ${detail('العميل', d.العميل)}
        ${detail('الوحدة', d.الوحدة)}
        ${detail('من', fmtDate(d.تاريخ_البداية))}
        ${detail('إلى', fmtDate(d.تاريخ_النهاية))}
        ${detail('الحالة', d.حالة_الحجز)}
        ${detail('الإجمالي', fmtMoney(d.إجمالي_الحجز))}
        ${detail('المدفوع', fmtMoney(d.المدفوع))}
        ${detail('المتبقي', fmtMoney(d.المتبقي))}
        ${detail('المشرف', d.المشرف)}
        ${detail('ملاحظات العميل', d.ملاحظات_العميل)}
        ${detail('ملاحظات داخلية', d.ملاحظات_داخلية)}
      </div>`;
  }catch(e){ notify('خطأ',String(e),'error'); }
  finally{ hideLoader(); }
}
function detail(label,value){ return `<div class="col-12 col-md-6"><div class="card"><div class="card-body"><div class="text-muted small mb-1">${htmlEscape(label)}</div><div class="fw-bold">${htmlEscape(value || '-')}</div></div></div></div>`; }
