define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.identitySettings', [
        '$scope',
        'NgTableParams',
        'app.services.httpService',
        function ($scope, NgTableParams, httpService) {
            var me = this;

            this.list = [];
            this.tableParams = new NgTableParams();
            this.load = function () {
                httpService
                    .get('')
                    .then(function (result) {
                        me.list = result.Data;
                    });
            };
            this.selectImage = function (row) {

            };
        }
    ]);
});