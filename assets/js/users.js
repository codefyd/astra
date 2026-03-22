
document.addEventListener('DOMContentLoaded', ()=>{ document.getElementById('newUserBtn')?.addEventListener('click', saveUser); loadUsers(); });
async function loadUsers(){
  showLoader();
  try{
    const res = await apiPost('listUsers',{});
    const rows=res.data||[];
    document.getElementById('usersTableBody').innerHTML = rows.length ? rows.map(r=>`
      <tr>
        <td>${htmlEscape(r.الاسم_الكامل||'-')}</td>
        <td>${htmlEscape(r.اسم_المستخدم||'-')}</td>
        <td>${htmlEscape(r.الدور||'-')}</td>
        <td>${htmlEscape(r.الفرع||'-')}</td>
        <td>${htmlEscape(r.نشط||'-')}</td>
      </tr>`).join('') : '<tr><td colspan="5" class="text-center text-muted">لا يوجد مستخدمون</td></tr>';
  }catch(e){ notify('خطأ',String(e),'error'); } finally{ hideLoader(); }
}
async function saveUser(){
  const payload = {
    الاسم_الكامل: prompt('الاسم الكامل') || '',
    اسم_المستخدم: prompt('اسم المستخدم') || '',
    كلمة_المرور: prompt('كلمة المرور') || '',
    الجوال: prompt('الجوال') || '',
    الدور: prompt('الدور','مدير') || 'مدير',
    الفرع: prompt('الفرع','الرئيسي') || 'الرئيسي',
    نشط: 'نعم'
  };
  showLoader();
  try{
    const res = await apiPost('saveUser',payload);
    if(res.success){ await notify('تم حفظ المستخدم'); loadUsers(); }
    else notify('تعذر الحفظ',res.message||'','error');
  }catch(e){ notify('خطأ',String(e),'error'); } finally{ hideLoader(); }
}
