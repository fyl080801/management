define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.build', [
        '$scope',
        '$modal',
        'NgTableParams',
        'app.services.popupService',
        'app.services.ajaxService',
        function ($scope, $modal, NgTableParams, popupService, httpService) {
            var me = this;

            this.tableParams = new NgTableParams();

            this.add = function () {
                $modal
                    .open({
                        templateUrl: 'views/room/manage/BuildForm.html',
                        data: {}
                    }).result
                    .then(function (data) {
                        data.extfloor = data.excludes.join(',');
                        data.extsubfloor = data.excsubs.join(',');
                        delete data.excludes;
                        delete data.extsubfloor;
                        httpService
                            .post('/buildinghotel/addBuildingHotel', data)
                            .then(function (result) {
                                me.load();
                            });
                    });
            };

            this.edit = function (build) {
                if (build.extfloor)
                    build.excludes = build.extfloor.split(',');
                if (build.extsubfloor)
                    build.excsubs = build.extsubfloor.split(',');
                $modal
                    .open({
                        templateUrl: 'views/room/manage/BuildForm.html',
                        data: build
                    }).result
                    .then(function (data) {
                        data.extfloor = data.excludes.join(',');
                        data.extsubfloor = data.excsubs.join(',');
                        delete data.excludes;
                        delete data.excsubs;
                        httpService
                            .post('/buildinghotel/modifyBuildingHotel', {
                                buildingId: data.buildingId,
                                buildingName: data.buildingName,
                                floor: data.floor,
                                subFloor: data.subFloor,
                                extfloor: data.extfloor,
                                extsubfloor: data.extsubfloor
                            })
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