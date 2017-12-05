define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.mode', [
        '$scope',
        '$modal',
        'modules.manageui.factories.tableParameter',
        'app.services.popupService',
        'app.services.httpService',
        function ($scope, $modal, tableParameter, popupService, httpService) {
            var me = this;
            this.list = [];
            this.tableParams = new tableParameter({
                url: '/defaultval/findDefaultvalList'
            });
            this.add = function () {
                $modal
                    .open({
                        templateUrl: 'views/room/settings/ModeForm.html',
                        size: 'sm'
                    }).result
                    .then(function (data) {
                        httpService
                            .post('/defaultval/addDefaultval', data)
                            .then(function (result) {
                                me.tableParams.reload();
                            });
                    });
            };
            this.edit = function (row) {
                $modal
                    .open({
                        templateUrl: 'views/room/settings/ModeForm.html',
                        size: 'sm',
                        data: $.extend({}, row)
                    }).result
                    .then(function (data) {
                        httpService
                            .post('/defaultval/modifyDefaultval', data)
                            .then(function (result) {
                                me.tableParams.reload();
                            });
                    });
            };
            this.drop = function (row) {
                popupService
                    .confirm('是否删除？')
                    .ok(function () {
                        httpService
                            .post('/defaultval/delDefaultval', {
                                modelid: row.modelid
                            })
                            .then(function (result) {
                                me.tableParams.reload();
                            });
                    });
            };
        }
    ]);
});