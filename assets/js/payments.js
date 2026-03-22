
document.addEventListener('DOMContentLoaded', ()=>{ document.getElementById('newPaymentBtn')?.addEventListener('click', saveDemoPayment); loadPayments(); });
async function loadPayments(){
  showLoader();
  try{
    const res = await apiPost('listPayments',{});
    const rows=res.data||[];
    document.getElementById('paymentsTableBody').innerHTML = rows.length ? rows.map(r=>`
      <tr>
        <td>${htmlEscape(r.الحجز||'-')}</td>
        <td>${fmtDate(r.التاريخ)}</td>
        <td>${fmtMoney(r.المبلغ||0)}</td>
        <td>${htmlEscape(r.طريقة_الدفع||'-')}</td>
        <td>${htmlEscape(r.نوع_العملية||'-')}</td>
        <td>${htmlEscape(r.المرجع||'-')}</td>
      </tr>`).join('') : '<tr><td colspan="6" class="text-center text-muted">لا توجد دفعات</td></tr>';
  }catch(e){ notify('خطأ',String(e),'error'); } finally{ hideLoader(); }
}
async function saveDemoPayment(){
  const booking = prompt('أدخل رقم الحجز أو معرفه');
  if(!booking) return;
  const amount = prompt('أدخل المبلغ','100');
  showLoader();
  try{
    const res = await apiPost('savePayment',{الحجز:booking,المبلغ:amount,التاريخ:todayStr(),طريقة_الدفع:'تحويل',نوع_العملية:'دفعة'});
    if(res.success){ await notify('تم حفظ الدفعة'); loadPayments(); }
    else notify('تعذر الحفظ',res.message||'','error');
  }catch(e){ notify('خطأ',String(e),'error'); } finally{ hideLoader(); }
}
