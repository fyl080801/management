define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.identitySettings', [
        '$scope',
        'modules.manageui.factories.tableParameter',
        'app.services.popupService',
        'app.services.httpService',
        function ($scope, tableParameter, popupService, httpService) {
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
                popupService
                    .confirm('是否删除？')
                    .ok(function () {
                        httpService
                            .post('/identifier/delIdentifierSet', {
                                id: row.id
                            })
                            .then(function () {
                                me.tableParams.reload();
                            });
                    });
            };
        }
    ]);
});