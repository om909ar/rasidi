let data=Storage.load();

if(!data){

data={

settings:{

salaryDay:27,

minimumBalance:800

},

transactions:[

{

type:"income",

category:"راتب",

amount:7700

},

{

type:"expense",

category:"مطاعم",

amount:18

},

{

type:"expense",

category:"مترو",

amount:14

}

]

};

Storage.save(data);

}

UI.render();
