const UI={

render(){

const data=Storage.load();

const balance=Finance.balance(data);

const today=Finance.todayLimit(data);

document.getElementById("app").innerHTML=`

<h1>💰 رصيدي</h1>

<h2>${balance.toFixed(2)} ريال</h2>

<p>

المسموح اليوم

${today} ريال

</p>

`;

}

};
