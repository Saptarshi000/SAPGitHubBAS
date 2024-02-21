sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";
        var dataArr = [];

        return Controller.extend("chartso.controller.View1", {
            onInit: function () {
                this.checkData();
                // var jModel = new JSONModel();
                // // jModel.setData({Heat:[
                // //     {Month: 'January', Temperature:'20'},
                // //     {Month: 'February', Temperature:'24'},
                // //     {Month: 'March', Temperature:'30'}
                // //  ]});

                // jModel.setData({Heat: dataArr});

                //  var vizObj = this.byId("_IDGenVizFrame1");
                //  vizObj.setModel(jModel);
            },
             checkData(){
                var that = this;
                var oModel = this.getOwnerComponent().getModel();

                oModel.read("/Products", {
                    success: function(OData)
                    {
                        var jModel = new JSONModel(OData);
                        // that.getView().setModel(jModel,"a");
                        console.log("success");
                        // console.log(jModel.oData.results);
        
                        
                        var p = jModel.oData.results
                        p.map((prod) => {
                            let newObj = {
                                month: prod.Price,
                                cost: prod.Rating
                            }
                            dataArr.push(newObj)
                        });
                        console.log(dataArr);


                        var kModel = new JSONModel();
                        kModel.setData({Heat: dataArr});
                        // console.log( kModel.setData({Heat: dataArr}) )
 
                        var vizObj = that.getView().byId("_IDGenVizFrame1");
                        vizObj.setModel(kModel);

                    },
                    error: function(oError)
                    {
                        console.log("Error");
                        // console.log(oError);
                    }
                })
            }
        });
    });
