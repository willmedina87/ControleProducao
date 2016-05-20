(function() {
    'use strict';

    var mainCtrl = function($scope) {
      $scope.abaAtiva = 'projetos'


      $scope.logout = function() {
        console.log('logout')
      }

    };

    mainCtrl.$inject = ['$scope'];

    angular.module('controleApp')
        .controller('mainCtrl', mainCtrl);

})();
