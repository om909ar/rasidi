let data = Storage.load();

if (!data) {

data = {

settings:{

salaryDay:27,

minimumBalance:800

},

fixedExpenses:[

{name:"القرض",amount:2500},

{name:"الشغالة",amount:350},

{name:"الجوال والإنترنت",amount:350},

{name:"بنزين",amount:500}

],

transactions:[

{

type:"income",

category:"راتب",

amount:7700,

date:new Date().toLocaleDateString("ar-SA")

}

]

};

Storage.save(data);

}

document
.getElementById("saveBtn")
.onclick=()=>{
UI.save();
};
