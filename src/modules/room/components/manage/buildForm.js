define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.components.manage.buildForm', [
        '$scope',
        'NgTableParams',
        'app.services.httpService',
        'app.services.ajaxService',
        function ($scope, NgTableParams, httpService, ajaxService) {
            var me = this;

            $scope.$data = $scope.$data ? $scope.$data : {};
            $scope.$data.excludes = $scope.$data.excludes ? $scope.$data.excludes : [];
            $scope.$data.excsubs = $scope.$data.excsubs ? $scope.$data.excsubs : [];

            this.list = [];

            this.loadFloors = function (buildId) {
                ajaxService
                    .json('/buildinghotel/selectFloorHotelList', JSON.stringify({
                        buildingId: buildId
                    }))
                    .then(function (result) {
                        me.list = result;
                    });
            };

            this.floors = function (n) {
                var arr = [];
                for (var i = 1; i <= n; i++) {
                    arr.push(i + '');
                }
                return arr;
            };

            this.floorChange = function (num) {
                var floorIndex = $scope.$data.excludes.indexOf(num);
                if (floorIndex >= 0) {
                    $scope.$data.excludes.splice(floorIndex, 1);
                } else {
                    $scope.$data.excludes.push(num);
                }
            };

            this.subChange = function (num) {
                var floorIndex = $scope.$data.excsubs.indexOf(num);
                if (floorIndex >= 0) {
                    $scope.$data.excsubs.splice(floorIndex, 1);
                } else {
                    $scope.$data.excsubs.push(num);
                }
            };
        }
    ]);
});