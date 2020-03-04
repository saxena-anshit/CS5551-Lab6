const fs =  require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const DataFile = require('./notes.js');

const cust_ID = {
    describe: 'Customer ID',
    demand : true,
    alias : 'i'
}

const cust_name = {
    describe: 'Customer Name',
    demand : true,
    alias : 'n'
}

const cust_email  = {
    describe: 'Customer Email ID',
    demand : true,
    alias : 'e'
}

const cust_pnum  = {
    describe: 'Customer Phone Number',
    demand : true,
    alias : 'p'
}


const argv =  yargs
    .command('add','New Customer',{
      custID: cust_ID,
      custName: cust_name,
	  custEmail: cust_email,
      custPhone: cust_pnum
    })
	.command('update','Update',{
      custID: cust_ID,
      custName: cust_name,
	  custEmail: cust_email,
      custPhone: cust_pnum
    })
    .command('list','List all entries')
    .command('read','Read specific information',{
      custID: cust_ID
    })
    .command('remove','Remove',{
      custID: cust_ID
    })
    .help()
    .argv;

var command = argv._[0];

if (command === 'add'){
    var info = DataFile.addData(argv.custID,argv.custName,argv.custEmail,argv.custPhone);
    if (info){
      DataFile.logData(info); 
    } else{
      console.log("Data already exists");
    }
}

else if (command === 'update'){
 var info = DataFile.updateData(argv.custID,argv.custName,argv.custEmail,argv.custPhone);
    if (info){
      DataFile.logData(info); 
    } else{
      console.log("Data updated");
    }
}

else if (command === 'list') {
  var AllData = DataFile.getAll();
    console.log(`Printing ${AllData.length} info(s).`);
    AllData.forEach((info)=>{
    DataFile.logData(info);
  });
}

else if (command === 'read') {
   var info = DataFile.readData(argv.custID);
   if(info){
    DataFile.logData(info);      
          }
   else{
    console.log("Data not found");
   }
}

else if (command === 'remove') {
   var info = DataFile.removeData(argv.custID);
   if(info){
    console.log(`This ID (${argv.custID}) was deleted successfully`);
          }
   else{
    console.log("Data not found");
   }
}

else{
  console.log('Please type the right command'); 
}
