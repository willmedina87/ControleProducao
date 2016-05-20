(function() {
    'use strict';

    var atividadeCtrl = function($scope, $uibModal, dataFactory, loginFactory) {

      $scope.usuario = loginFactory.usuario;

      $scope.reload = function(){
        dataFactory.getAtividadePrioritaria($scope.usuario).then(function success(response){
          $scope['atividadePrioritaria1'] = dataFactory['atividadePrioritaria1'];
          $scope['atividadePrioritaria2'] = dataFactory['atividadePrioritaria2'];
        }, function error(response){
        })

        dataFactory.getAtividadeEmExecucao($scope.usuario).then(function success(response){
          $scope['atividadeEmExecucao'] = dataFactory['atividadeEmExecucao'];
          
        }, function error(response){
        })

        dataFactory.getAtividadesIniciadas($scope.usuario).then(function success(response){
          $scope['atividadesIniciadas'] = dataFactory['atividadesIniciadas'];
        }, function error(response){
        })

        var dados = ['tipoatividadesespecial'];
        dados.forEach(function(d){
          dataFactory.loadUrl(d).then(function success(response){
            $scope[d] = dataFactory[d];
          }, function error(response){
          })
        })
      }

      $scope.reload();


      $scope.finaliza = function(ativ){
        ativ.dataFim = new Date().toISOString();
        ativ.horasTrabalhadas = Math.floor((Date.parse(ativ.dataFim) - Date.parse(ativ.dataInicio))/ 60000);
        ativ.status = 'Finalizado';

        dataFactory.updateUrl(ativ, 'atividades').then(function success(response){
          $scope.reload();
        }, function error(response){
          console.log(response)
        })

      }

      $scope.inicia = function(ativ){

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/views/modal/addRegime.html',
            controller: 'addRegimeCtrl',
            size: 'sm'
       });

        modalInstance.result
            .then(function(result) {
              ativ.operador = $scope.usuario;
              ativ.dataInicio = new Date().toISOString();
              ativ.status = 'Em execução';
              ativ.regime = result.regime;

              dataFactory.updateUrl(ativ, 'atividades').then(function success(response){
                $scope.reload();
              }, function error(response){
                console.log(response)
              })
            }, function(exit) {

            });

      };



      $scope.pausa = function(ativ){
        //chama cria atividade especial
        ativ.dataFim = new Date().toISOString();
        ativ.horasTrabalhadas = Math.floor((Date.parse(ativ.dataFim) - Date.parse(ativ.dataInicio))/ 60000);
        ativ.status = 'Pausado';

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/views/modal/criaAtividadeEspecial.html',
            controller: 'criaAtividadeEspecialCtrl',
            size: 'lg',
            resolve: {
                tipoatividadesespecial: function() {
                    return $scope.tipoatividadesespecial;
                  },
                usuario: function(){
                  return $scope.usuario;
                }
            }
       });

        modalInstance.result
            .then(function(result) {
              ativ.motivoPausa = result.atividadeEspecial.tipoAtividadeEspecial;

              dataFactory.updateUrl(ativ, 'atividades').then(function success(response){
                $scope.reload();
              }, function error(response){
                console.log(response)
              })

              dataFactory.saveUrl(result.atividadeEspecial, 'atividadesespeciais').then(function success(response){
                $scope.reload();
              }, function error(response){
                console.log(response)
              })
            }, function(exit) {

            });
    };

      $scope.criaAtividadeEspecial = function() {

          var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: 'app/views/modal/criaAtividadeEspecial.html',
              controller: 'criaAtividadeEspecialCtrl',
              size: 'lg',
              resolve: {
                  tipoatividadesespecial: function() {
                      return $scope.tipoatividadesespecial;
                    },
                  usuario: function(){
                    return $scope.usuario;
                  }
              }
         });

          modalInstance.result
              .then(function(result) {
                dataFactory.saveUrl(result.atividadeEspecial, 'atividadesespeciais').then(function success(response){
                  $scope.reload();
                }, function error(response){
                  console.log(response)
                })
              }, function(exit) {

              });
      };


    };

    atividadeCtrl.$inject = ['$scope', '$uibModal', 'dataFactory', 'loginFactory'];

    angular.module('controleApp')
        .controller('atividadeCtrl', atividadeCtrl);

    var deepCopy = function(object){
      if(object){
        return JSON.parse(JSON.stringify(object));
      } else{
        return {};
      }
    }

//CRIA ATIV ESPECIAL CONTROLLER ----------------------------------------------------------------------
    var criaAtividadeEspecialCtrl = function($scope, $uibModalInstance, tipoatividadesespecial, usuario) {

       $scope.tipoatividadesespecial = deepCopy(tipoatividadesespecial);

       $scope.regimes = ['Turno', 'Integral', 'Serviço', 'Saindo de serviço'];

       $scope.atividadeEspecial = {};

        $scope.finaliza = function(){
          $scope.atividadeEspecial.operador = usuario;
          $scope.atividadeEspecial.status = 'Em execução';
          $scope.atividadeEspecial.dataInicio = new Date().toISOString();
          $scope.atividadeEspecial.atividadeTecnica = ($scope.atividadeTecnica === 'sim');
          $uibModalInstance.close({atividadeEspecial: $scope.atividadeEspecial})
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    };

    criaAtividadeEspecialCtrl.$inject = ['$scope', '$uibModalInstance', 'tipoatividadesespecial', 'usuario'];

    angular.module('controleApp')
        .controller('criaAtividadeEspecialCtrl', criaAtividadeEspecialCtrl);

//CRIA ATIV ESPECIAL CONTROLLER ----------------------------------------------------------------------
    var addRegimeCtrl = function($scope, $uibModalInstance) {

       $scope.regimes = ['Turno', 'Integral', 'Serviço', 'Saindo de serviço'];

        $scope.finaliza = function(){
          $uibModalInstance.close({regime: $scope.regime})
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    };

    addRegimeCtrl.$inject = ['$scope', '$uibModalInstance'];

    angular.module('controleApp')
        .controller('addRegimeCtrl', addRegimeCtrl);

})();
