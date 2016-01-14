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
      TrainPrediction: TrainPrediction
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

    };// end ServiceFunction
}());
