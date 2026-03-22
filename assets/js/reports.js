
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('reportDate').value = todayStr().slice(0,7);
  document.getElementById('refreshReportsBtn').addEventListener('click', loadReports);
  loadReports();
});
async function loadReports(){
  showLoader();
  try{
    const [b,p,e] = await Promise.all([
      apiPost('listBookings',{}),
      apiPost('listPayments',{}),
      apiPost('listExpenses',{})
    ]);
    document.getElementById('reportBookingsCount').textContent = (b.data||[]).length;
    document.getElementById('reportPaymentsCount').textContent = (p.data||[]).length;
    document.getElementById('reportExpensesCount').textContent = (e.data||[]).length;
  }catch(err){ notify('خطأ',String(err),'error'); }
  finally{ hideLoader(); }
}
