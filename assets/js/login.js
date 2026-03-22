
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('loginBtn')?.addEventListener('click', async ()=>{
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    if(!username || !password) return notify('تنبيه','أدخل اسم المستخدم وكلمة المرور','warning');
    showLoader();
    try{
      const res = await apiPost('login',{اسم_المستخدم:username,كلمة_المرور:password});
      if(res.success){
        localStorage.setItem('chalets_user','1');
        localStorage.setItem('chalets_user_name',res.user?.الاسم_الكامل || username);
        location.href='index.html';
      }else{
        notify('تعذر تسجيل الدخول',res.message || 'بيانات الدخول غير صحيحة','error');
      }
    }catch(e){
      notify('خطأ',String(e),'error');
    }finally{hideLoader();}
  });
});
