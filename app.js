document.addEventListener('DOMContentLoaded',()=>{
  const tbody=document.getElementById('tokenTable');
  fetch('https://api.dexscreener.com/latest/dex/tokens/solana')
    .then(r=>r.json())
    .then(data=>{
      tbody.innerHTML='';
      data.pairs.slice(0,30).forEach((pair,i)=>{
        const row=document.createElement('tr');
        row.innerHTML=`<td>${i+1}</td><td>${pair.baseToken.name}</td><td>${pair.baseToken.symbol}</td>
                       <td>${pair.priceUsd}</td><td>${pair.priceChange.h1}%</td><td>${pair.priceChange.h24}%</td>
                       <td>${pair.dexId}</td>`;
        tbody.appendChild(row);
      });
    });
});
