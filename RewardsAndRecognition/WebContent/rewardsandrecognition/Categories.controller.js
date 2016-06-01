sap.ui.controller("rewardsandrecognition.Categories", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf akila_rnr.Akila_DashBoard
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf akila_rnr.Akila_DashBoard
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf akila_rnr.Akila_DashBoard
*/
	onAfterRendering: function() {
		var data;
		jQuery.ajax({
			url:"https://ldciey8.wdf.sap.corp:44320/sap/opu/odata/SAP/ZREWARDSANDRECOGNITION_SRV/categoriesSet",
			dataType:"json",
			crossDomain:true,
			success:function(oData){
				console.log(oData);
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData(oData);
				/*for(var i=0;i<oData.d.results.length;i++){
					data = oData.d.results[i];
					data.Img = "data:image/png;base64," + data.Img;
				}*/
				sap.ui.getCore().getElementById("iddynamicView--HLay").setModel(oModel);
			},
			error:function(err){
				console.log(err);
			}})
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf akila_rnr.Akila_DashBoard
*/
//	onExit: function() {
//
//	}
	
	navToRewards:function(){
		
		var oShell = sap.ui.getCore().byId("shellContainer");
		oShell.removeAllContent();
		var rewardsView = sap.ui.getCore().byId("idRewards");
		oShell.addContent(rewardsView);
	}

});