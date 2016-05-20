(function() {
    "use strict";
    var loginFactory = function($http, $q) {

        var factory = {};
        factory.usuario = {"_id":"57392afe3fe85e9428f44d83",
        "login":"diniz",
        "senha":"diniz",
        "nome":"Felipe Diniz",
        "nomeGuerra":"Diniz",
        "postGrad":"1ºTen",
        "turno":"Integral",
        "perfil":"Chefe de Seção",
        "secao":{
          "nome":"Seção de Validação e Edição",
          "__v":0,
          "_id":"5738f693a606060c01c737b8"
    },
        "funcoesTexto":"Preparador Validação,Revisor Validação",
        "funcoes":[
          {"funcao":{
            "nome":"Preparador Validação",
            "secao":{
              "nome":"Seção de Validação e Edição",
              "__v":0,
              "_id":"5738f693a606060c01c737b8"
            },
            "__v":0,
            "_id":"5738f6e81426c4b42aa5f8d0"
          },
            "dataInicio":"2016-05-16T02:05:50.125Z",
            "_id":"57392afe3fe85e9428f44d87"
          },
          {
            "funcao":{
              "nome":"Revisor Validação",
              "secao":{
                "nome":"Seção de Validação e Edição",
                "__v":0,
                "_id":"5738f693a606060c01c737b8"
              },
              "__v":0,
              "_id":"5738f6f31426c4b42aa5f8d2"
            },
            "dataInicio":"2016-05-16T02:05:50.125Z",
            "_id":"57392afe3fe85e9428f44d84"
          }],
          "__v":0}

        factory.secao = factory.usuario.secao;


        return factory;

}
    loginFactory.$inject = ['$http', '$q'];

    angular.module('controleApp')
        .factory('loginFactory', loginFactory);

})();
