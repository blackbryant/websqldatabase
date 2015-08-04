/*************************************************************************************************
*   Web SQL Database Utility
*   version : 1.0
*   Date : 2015/7/31
*   Function: 
*			  checkSupport() : return the browser 
*             openDatabase(dbName, version, virtualTableName, size) : 
*                 		   dbName = database Name 
*                          version : database version
*						   virtualTableName: show table name       
*             executeSql(sql, args, successCallback, errorCallback) :
*                        sql : execute sql 
*						 args: args 
*						 successCallback : after execute             
************************************************************************************************/
var dbUtility = (  {
	localDB:'' ,
	localtx:'' ,
	localRs:'',
	message:'' ,
	dbName: '',
	version : '1',
	virtualTableName: '',
	size : 1024*1024,
	checkSupport: function(){
		return window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
	},
	openDatabase : function(dbName, version, virtualTableName, size){
		 
		if(typeof version  == "undefined"){
			version = this.version ;
		}
		if(typeof virtualTableName  == "undefined"){
			virtualTableName = dbName ;
		}
		if(typeof size  == "undefined"){
			size = this.size ;
		}
		 
		this.localDB = openDatabase(dbName,version ,virtualTableName ,size ); 
		 
	},
	executeSql: function(sql,args,successCallback, errorCallback){
		if(typeof errorCallback  == "undefined"){
			var error = "" ;
			errorCallback = function(){}
		}
		if(typeof successCallback  == "undefined"){
			 
			successCallback = function(){}
		}

		this.localDB.transaction(function(tx){
			tx.executeSql(sql,args,
				function(tx,rs){
					 successCallback(rs)
				}
			
			);
		},
		function(error){
			return errorCallback(error)
			}
		)
	}
 
	
	
	
})












