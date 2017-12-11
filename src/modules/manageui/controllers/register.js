define([
    'modules/manageui/module'
], function (module) {
    'use strict';

    module.controller('modules/manageui/controllers/register', [
        '$scope',
        'app.services.httpService',
        function ($scope, httpService) {
            $scope.machineno = '';
            $scope.regnumber = '';

            this.getCode = function () {
                httpService
                    .post('/softreg/findMachineNumber')
                    .then(function (result) {
                        $scope.machineno = result;
                        $scope.regnumber = result;
                    });
            };

            this.regist = function () {
                httpService
                    .post('/softreg/addSoftreg', {
                        username: $scope.username,
                        machineno: $scope.machineno,
                        regnumber: $scope.regnumber
                    });
            };
        }
    ]);
});