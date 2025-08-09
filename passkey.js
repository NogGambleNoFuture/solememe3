document.addEventListener('DOMContentLoaded',()=>{
  const passkeyScreen=document.getElementById('passkey-screen');
  if(!localStorage.getItem('passkeyAuth')) passkeyScreen.classList.remove('hidden');
  document.getElementById('passkey-submit').addEventListener('click',()=>{
    const key=document.getElementById('passkey-input').value.trim();
    if(key==='tothemoon'){ localStorage.setItem('passkeyAuth',true); passkeyScreen.classList.add('hidden'); }
    else{ document.getElementById('passkey-error').innerText='Wrong passkey'; }
  });
});
