define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.users', [
        '$scope',
        '$modal',
        'NgTableParams',
        'modules.setting.services.request',
        'app.services.popupService',
        'app.services.httpService',
        function ($scope, $modal, NgTableParams, request, popupService, httpService) {
            var me = this;

            this.tableParams = new NgTableParams();

            this.list = [];

            this.add = function () {
                $modal
                    .open({
                        templateUrl: 'views/room/personal/UserForm.html'
                    }).result
                    .then(function (result) {

                    });
            };

            this.edit = function (id) {
                $modal
                    .open({
                        templateUrl: 'views/room/personal/UserForm.html'
                    }).result
                    .then(function (result) {

                    })
            };

            this.drop = function (id) {
                popupService
                    .confirm('是否删除？')
                    .ok(function () {

                    });
            };

            this.load = function () {
                httpService
                    .post('')
                    .then(function (result) {
                        me.list = result;
                    });
            };
        }
    ]);
});