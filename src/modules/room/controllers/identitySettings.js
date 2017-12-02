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

            this.newItem = {};
            this.list = [];
            this.tableParams = new NgTableParams();
            this.load = function () {
                // httpService
                //     .post('/identifier/addIdentifierSet', {})
                //     .then(function (result) {
                //         me.list = result.Data;
                //     });
            };
            this.selectImage = function (row) {

            };
            this.add = function () {
                httpService
                    .post('/identifier/addIdentifierSet', me.newItem)
                    .then(function () {

                    });
            };
        }
    ]);
});