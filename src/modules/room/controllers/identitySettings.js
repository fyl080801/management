define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.identitySettings', [
        '$scope',
        'modules.manageui.factories.tableParameter',
        'app.services.httpService',
        function ($scope, tableParameter, httpService) {
            var me = this;

            this.newItem = {};
            this.list = [];
            this.onoffTypes = ['红外感应', 'TIMIC', 'MIFARE'];
            this.tableParams = new tableParameter({
                url: '/identifier/findIdentifierSet'
            });
            this.selectImage = function (row) {

            };
            this.add = function () {
                httpService
                    .post('/identifier/addIdentifierSet', me.newItem)
                    .then(function () {
                        me.tableParams.reload();
                    });
            };
            this.drop = function (row) {

            };
        }
    ]);
});