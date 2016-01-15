"use strict";

(function(){
  angular
  .module("wmata", [
    "ui.router",
    "ngDialog",
    "wmata"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ]);

  function RouterFunction($stateProvider){

    $stateProvider
    .state("indexPage", {
      url: "/index",
      templateUrl: "js/metro/index.html",
      controller: "LineIndexController",
      controllerAs: "LineIndexViewModel"
    })
  }

})();
