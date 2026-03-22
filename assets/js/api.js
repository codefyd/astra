
const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbwJFN3pq7_M2EC3U_aV95mF5o_YvI7pKxc2UPNGqFwJHqYrGTwWntutYekmXCjr_Yrbmg/exec';

async function apiGet(action){
  const url = `${API_BASE_URL}?action=${encodeURIComponent(action)}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function apiPost(action,payload={}){
  const res = await fetch(API_BASE_URL,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({action,payload})
  });
  const data = await res.json();
  return data;
}
