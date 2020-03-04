const fs =  require('fs');

var saveData = (data) => {
  fs.writeFileSync('cust_Data.json',JSON.stringify(data));
};

var fetchData = () => {
  try {     
    var notesString = fs.readFileSync('cust_Data.json')
    return JSON.parse(notesString);
  } catch(e){
    return [];
  }
};

var addData = (custID,custName,custEmail,custPhone) => {   
    var data = fetchData();
    var info = {custID,custName,custEmail,custPhone}

    var duplicateData =  data.filter((info) => { 
      return info.custID === custID;
    });

    if (duplicateData.length === 0){
      data.push(info);
      saveData(data);
      return info
    }

  };

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

var getAll = () => {
    return fetchData();
};

var readData = (custID) => {
    var data = fetchData();
    var getData =  data.filter((info) => { 
      return info.custID === custID;
    });
    return getData[0]
};

var removeData = (custID) => {
    var data = fetchData();
    var filteredData =  data.filter((info) => {
      return info.custID !== custID;
    });
    saveData(filteredData);
    return data.length !== filteredData.length 
};

var logData = (info) => { 
  console.log('\n-- Customer Information -- \n');
  console.log(`ID: ${info.custID}`);
  console.log(`Name: ${info.custName}`);
  console.log(`Email: ${info.custEmail}`);
  console.log(`Phone Number: ${info.custPhone}`);
};

module.exports = {
  addData,logData, readData, getAll, removeData, updateData
};
