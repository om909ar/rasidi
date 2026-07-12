const UI={

render(){

const data=Storage.load();

const balance=Finance.balance(data);

const today=Finance.todayLimit(data);

document.getElementById("app").innerHTML=`

<div class="card balance">

<h1>💰 الرصيد الحالي</h1>

<h2>${balance.toFixed(2)} ريال</h2>

<p>

المسموح اليوم

${today} ريال

</p>

</div>

<div class="grid">

<div class="small">

<h3>🎯 الهدف</h3>

<span>

${data.settings.minimumBalance}

</span>

</div>

<div class="small">

<h3>📅 الراتب</h3>

<span>

27

</span>

</div>

<div class="small">

<h3>💳 العمليات</h3>

<span>

${data.transactions.length}

</span>

</div>

</div>

<h2 class="section-title">

⚡ تسجيل سريع

</h2>

<div class="quick">

<button>🍔</button>

<button>⛽</button>

<button>🚇</button>

<button>🚗</button>

<button>🛒</button>

<button>❤️</button>

<button>📱</button>

<button>📦</button>

</div>

<h2 class="section-title">

آخر العمليات

</h2>

<div class="card">

${data.transactions.map(t=>`

<div class="transaction">

<div>

${t.category}

</div>

<strong>

${t.amount}

</strong>

</div>

`).join("")}

</div>

`;

}

}
