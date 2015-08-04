 /*************************************************************************************************
*   User Data Access Object 
*   import: dbUtility.js
*   version : 1.0
*   Date : 2015/8/4
*   Function: 
*			  createTable(dataName) : create employee table of the database
*             insertUser(user,successCallback):        
*             queryUser(ID, successCallback) : query a user data by ID value
*						ID is a primary key ,   
*						successCallback :  return a user 
*             queryUsers(successCallback) :
*						successCallback : return a array of user               
************************************************************************************************/


var userDAO = ({
	
	createTable:  function(dbName){
		localDB = dbUtility.openDatabase(dbName ); 
		dbUtility.executeSql("CREATE TABLE user (ID INTEGER PRIMARY KEY, name TEXT, age TEXT)",[])
	},
	
	insertUser: function(user,successCallback){
		dbUtility.executeSql(" INSERT INTO user  values(?, ?, ?)", [user.id, user.name, user.age])
	},
	
	queryUser: function(ID,successCallback){
		dbUtility.executeSql("SELECT * FROM user WHERE ID=? ",[ID], 
			function(rs){
				var  user = new Object() ;
				for(i=0; i< rs.rows.length;i++){
					 
					var row = rs.rows[i];
					
					user.ID = row.ID ; 
					user.name = row.name ; 
					user.age = row.age ; 
				}
				successCallback(user) 
			}
		) ;
		  
	},
	queryUsers: function(successCallback){
		
		dbUtility.executeSql("SELECT * FROM user ",[], 
			function(rs){
				var UserArray = new Array() ;
				for(i=0; i< rs.rows.length;i++){
					 
					var row = rs.rows[i];
					var  user = new Object() ;
					user.ID = row.ID ; 
					user.name = row.name ; 
					user.age = row.age ; 
					UserArray.push(user) 
				}
				successCallback(UserArray) 
			}
		) ;  
	}
})



