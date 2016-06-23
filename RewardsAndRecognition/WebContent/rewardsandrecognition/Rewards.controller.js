sap.ui.controller("rewardsandrecognition.Rewards", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf rewards.Rewards
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf rewards.Rewards
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf rewards.Rewards
*/
	onAfterRendering: function() {
		
		sap.ui.getCore().byId("idRewards--selCategory").setText(that._selCategory.CategoryName);
		var sUrl = "https://ldciey8.wdf.sap.corp:44320/sap/opu/odata/sap/ZREWARDSANDRECOGNITION_SRV/usersSet";
		$.ajax({
			url:sUrl,
			dataType:"json",
			crossDomain:true,
			success:function(oData){
				that._ouserList = oData;
				var ojsonModel = new sap.ui.model.json.JSONModel();
				ojsonModel.setData(oData);
				sap.ui.getCore().byId("idRewards--nomineeSel").setModel(ojsonModel);
			},
			error:function(errLog){
				console.log(errLog);
			}
		})
		
		var nUrl = "https://ldciey8.wdf.sap.corp:44320/sap/opu/odata/SAP/ZREWARDSANDRECOGNITION_SRV/nominationsSet";
		$.ajax({
			url: nUrl,
			dataType:"json",
			crossDomain:true,
			success:function(oData,oStatus,oRequest){
				var oNomJson = 	new sap.ui.model.json.JSONModel();
				oNomJson.setData(oData);
				sap.ui.getCore().byId("idRewards--subList").setModel(oNomJson);
			},
			error:function(errLog){
				console.log(errLog);
			}
			
		});
		
		
		var nsUrl = "https://ldciey8.wdf.sap.corp:44320/sap/opu/odata/SAP/ZREWARDSANDRECOGNITION_SRV/nominations_saveSet";
		$.ajax({
			url: nsUrl,
			dataType:"json",
			crossDomain:true,
			success:function(oData){
				var oNomsJson = 	new sap.ui.model.json.JSONModel();
				oNomsJson.setData(oData);
				sap.ui.getCore().byId("idRewards--savList").setModel(oNomsJson);
			},
			error:function(errLog){
				console.log(errLog);
			}
			
		})
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf rewards.Rewards
*/
//	onExit: function() {
//
//	}
	
	userSelected:function(oEvent){
		var oUserImage = sap.ui.getCore().byId("idRewards--userSelected");
		var ojsonModel = new sap.ui.model.json.JSONModel();
		ojsonModel.setData(that._ouserList);
		oUserImage.setModel(ojsonModel);
		oUserImage.bindProperty("src","ProfilePic");
		oUserImage.bindElement(oEvent.getParameters().selectedItem.getBindingContext().sPath);
		var userselPath = oEvent.getParameters().selectedItem.getBindingContext().sPath;
		var userArr = userselPath.split("/");
		that._toUser = that._ouserList.d.results[userArr[3]].Username;
		that._nomTo = that._ouserList.d.results[userArr[3]].Name;
		/*oEvent.getParameters().selectedItem.getBindingContext().sPath*/
		
	/*	sap.ui.getCore().byId("idRewards--userSelected").bindContext(
				oEvent.getParameters().selectedItem.getBindingContext());*/

	},
	
	navtoCat:function(){
		 var categoriesView = sap.ui.getCore().byId("idCategories")
		 var oShell = sap.ui.getCore().byId("shellContainer");
		 oShell.removeAllContent();
		 oShell.addContent(categoriesView);	 
	},
	
	submitNomination:function(oEvent){
		var fromUser = that._oUser.d.Username;
		var nomFrom = that._oUser.d.Name;
		var toUser = that._toUser;
		var nomTo = that._nomTo;
		var catId = that._selCategory.CategoryId;
		var catName = that._selCategory.CategoryName;
		var reasonNom = sap.ui.getCore().byId("idRewards--selReason").getValue();
		var todayDate = new Date();
		var todayDD = todayDate.getDate();
		var todayMonth = todayDate.getMonth()+1;
		var todayYear = todayDate.getFullYear();
		if(todayDD<10){
			todayDD = "0"+todayDD;
		}
		if(todayMonth<10){
			todayMonth = "0"+todayMonth;
		}
		var today = todayYear+"-"+todayMonth+"-"+todayDD+"T00:00:00";
/*		var milliSec = todayDate.getTime();
		var date = "\/Date("+milliSec+")\/";*/
		
/*
		var ojsonDummyPayload = {
				"FromUser" : "SHETTYRAG",
				"ToUser" : "PARASURAMAN",
				"CategoryId" : "CF"
		};*/
		

		var ojsonPayload ={
				"FromUser":fromUser,
				"ToUser":toUser,
				"CategoryId":catId,
				"NomiFromName":nomFrom,
				"NomiToName":nomTo,
				"CategoryName":catName,
				"Reason":reasonNom,
				"NomDate":today
		}
		
		var oModel = new sap.ui.model.odata.ODataModel("proxy/https/ldciey8.wdf.sap.corp:44320/sap/opu/odata/SAP/ZREWARDSANDRECOGNITION_SRV/",{
			json:true
		});
		
		oModel.create("/nominationsSet", ojsonPayload,{
			success:function(oData,response){
				console.log(response);
			},
			error:function(oError){
				console.log(oError);
			}
		});

	}

});