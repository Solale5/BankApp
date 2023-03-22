const {} = require("");

var connection;
function setConnection(con){
    connection = con;
}

function createCustomer(){
    var custIn = "INSERT INTO customers () VALUES ()";
    connection.query(custIn, function (error, result){
        if (error) throw error;
        console.log("Created customer");
    })
}

function deleteCustomer(){
    var custDel = "DELETE FROM customers () WHERE _ = ()";
    connection.query(custDel, function (error, result){
        if (error) throw error;
        console.log("Deleted customer");
    })
}

function customerExists(){
    connection.query('SELECT * FROM WHERE = "${}"', (error,result,fields)=>{
       if (error) throw error;
       console.log("Customer already exists");
    })
}

function addAccount(){
    var acc = "INSERT INTO accounts () VALUES ()";
    connection.query(acc, function (error, result){
        if (error) throw error;
        console.log("Created account");
    })
}

function accountExists(){
    connection.query('SELECT * FROM WHERE = "${}"', (error,result,fields)=>{
        if (error) throw error;
        console.log("Account already exists");
     })
}

function generateReport(){

}

