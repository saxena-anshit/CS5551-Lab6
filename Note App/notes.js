const fs =  require('fs');


// ------------ Begin - Converting objects into JSON using JSON.stringify -----------------
var saveData = (data) => {
  fs.writeFileSync('cust_Data.json',JSON.stringify(data));
};
// ------------ End - Converting objects into JSON using JSON.stringify -----------------

// ------------ Begin - Converting JSON back into an object using JSON.parse -----------------
var fetchData = () => {
  try {     
    var notesString = fs.readFileSync('cust_Data.json')
    return JSON.parse(notesString);
  } catch(e){
    return [];
  }
};
// ------------ End - Converting JSON back into an object using JSON.parse -----------------

// ------------ Begin - Adding -----------------
var addData = (custID,custName,custEmail,custPhone) => {   
    var data = fetchData();
    var info = {custID,custName,custEmail,custPhone}

    var duplicateData =  data.filter((info) => { 
	// By using customer ID, we check if the data already exists.
      return info.custID === custID;
    });

    if (duplicateData.length === 0){
      data.push(info);
      saveData(data);
      return info
    }

  };
// ------------ End - Adding -----------------

// ------------ Begin - Updating -----------------
var updateData = (custID,custName,custEmail,custPhone) => {   
    var data = fetchData();
	var updatingDate = data.filter((info) => {
		if (info.custID === custID){
			info.custName = custName;
			info.custEmail = custEmail;
			info.custPhone = custPhone;
		} return;
	});	
	saveData(data);
  };
// ------------ End - Updating -----------------

// ------------ Begin - listing -----------------
var getAll = () => {
    return fetchData();
};
// ------------ End - listing -----------------

// ------------ Begin - Reading -----------------
var readData = (custID) => {
    var data = fetchData();
    var getData =  data.filter((info) => { 
      return info.custID === custID;
    });
    return getData[0]
};
// ------------ End - Reading -----------------

// ------------ Begin - Deleting -----------------
var removeData = (custID) => {
    var data = fetchData();
    var filteredData =  data.filter((info) => {
      return info.custID !== custID;
    });
    saveData(filteredData);
    return data.length !== filteredData.length 
};
// ------------ End - Deleting -----------------

// ------------ Begin - Log -----------------
  var logData = (info) => { 
  console.log('\n-- Customer Information -- \n');
  console.log(`ID: ${info.custID}`);
  console.log(`Name: ${info.custName}`);
  console.log(`Email: ${info.custEmail}`);
  console.log(`Phone Number: ${info.custPhone}`);
};
// ------------ End - Log -----------------

// ------------ Begin - Define the functions -----------------
module.exports = {
  addData,logData, readData, getAll, removeData, updateData
};
// ------------ End - Define the functions -----------------
