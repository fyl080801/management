define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.build', [
        '$scope',
        '$modal',
        'NgTableParams',
        'modules.setting.services.request',
        'app.services.popupService',
        'app.services.ajaxService',
        function ($scope, $modal, NgTableParams, request, popupService, httpService) {
            var me = this;

            this.tableParams = new NgTableParams();

            this.add = function () {
                $modal
                    .open({
                        templateUrl: 'views/room/manage/BuildForm.html',
                        data: {}
                    }).result
                    .then(function (data) {
                        httpService
                            .post('/buildinghotel/addBuildingHotel', data)
                            .then(function (result) {
                                me.load();
                            });
                    });
            };

            this.edit = function (build) {
                $modal
                    .open({
                        templateUrl: 'views/room/manage/BuildForm.html',
                        data: build
                    }).result
                    .then(function (data) {
                        data.building_id = data.buildingId;
                        delete data.buildingId;
                        httpService
                            .post('/buildinghotel/modifyBuildingHotel', data)
                            .then(function (result) {
                                me.load();
                            });
                    });
            };

            this.drop = function (id) {
                popupService
                    .confirm('是否删除？')
                    .ok(function () {
                        httpService
                            .post('/buildinghotel/delBuildingHotel', {
                                buildingId: id
                            })
                            .then(function (result) {
                                popupService.information();
                                me.load();
                            });
                    });
            };

            this.load = function () {
                httpService
                    .post('/buildinghotel/findBuildingHotel', {})
                    .then(function (result) {
                        $scope.$globalStore.builds = result;
                    });
            };

            this.load();
        }
    ]);
});