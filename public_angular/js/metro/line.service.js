"use strict";

(function(){
  angular
  .module("wmata")
  .service("LineService", [
    "$http",
    ServiceFunction
  ]);

//revealing module pattern

  function ServiceFunction($http) {

    return {
      StationApiCall : StationApiCall,
      SilverCall : SilverCall,
      RedCall: RedCall,
      BlueCall: BlueCall,
      YellowCall: YellowCall,
      GreenCall: GreenCall,
      OrangeCall: OrangeCall,
      TrainPrediction: TrainPrediction,
      getAllLines : getAllLines,
      getStationData: getStationData
    }

    function TrainPrediction(code){
      return $http({
        method: 'GET',
        url:  "http://localhost:4000/lineprediction/" + code
      })
    }//end TrainPrediction function

    function SilverCall() {
        return $http({
          method: 'GET',
          url: "http://localhost:4000/linedata/silver"
        })
      }//end SilverCall function

    function RedCall() {
        return $http({
          method: 'GET',
          url: "http://localhost:4000/linedata/red"
        })
      }//end RedCall function

    function BlueCall() {
        return $http({
          method: 'GET',
          url: "http://localhost:4000/linedata/blue"
        })
      }//end BlueCall function

    function YellowCall() {
        return $http({
          method: 'GET',
          url: "http://localhost:4000/linedata/yellow"
        })
      }//end YellowCall function

    function GreenCall() {
        return $http({
          method: 'GET',
          url: "http://localhost:4000/linedata/green"
        })
      }//end GreenCall function

    function OrangeCall() {
        return $http({
          method: 'GET',
          url: "http://localhost:4000/linedata/orange"
        })
      }//end OrangeCall function

    function StationApiCall(){
      return $http({
        method: 'GET',
        url: "http://localhost:4000/stations"
      })
    }//end StationApiCall

    function getAllLines(){
      var combineLines = {};
      return SilverCall().then(function(data){
        combineLines.silver = data.data[0].stations;
        return BlueCall();
      }).then(function(data){
        combineLines.blue = data.data[0].stations;
        return YellowCall();
      }).then(function(data){
        combineLines.yellow = data.data[0].stations;
        return GreenCall();
      }).then(function(data){
        combineLines.green = data.data[0].stations;
        return OrangeCall();
      }).then(function(data){
        combineLines.orange = data.data[0].stations;
        return RedCall();
      }).then(function(data){
        combineLines.red = data.data[0].stations;
        return combineLines;
      })
    }

    function getStationData(){
      return StationApiCall()
    }

    };// end ServiceFunction
}());






    // //Stations API Call
    // LineService.StationApiCall().then(function(data){
    //   var self = this;
    //   self.dataStations = data.data;
    //
    //   //API call for all lines, puts them in a useful object
    //   LineService.SilverCall().then(function(data){
    //     var combineLines = {};
    //     combineLines.silver = data.data[0].stations;
    //
    //     LineService.BlueCall().then(function(data){
    //       combineLines.blue = data.data[0].stations;
    //
    //       LineService.YellowCall().then(function(data){
    //         combineLines.yellow = data.data[0].stations;
    //
    //         LineService.GreenCall().then(function(data){
    //           combineLines.green = data.data[0].stations;
    //
    //           LineService.OrangeCall().then(function(data){
    //             combineLines.orange = data.data[0].stations;
    //
    //             LineService.RedCall().then(function(data){
    //               combineLines.red = data.data[0].stations;
    //
    //               self.allLines = combineLines;
    //
    //               console.log(self.dataStations);
    //               console.log(allLines);
    //
    //               D3scatterplot(self.dataStations, allLines);
    //             })
    //           })
    //         })
    //       })
    //     })
    //   });
    // });
