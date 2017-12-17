define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules/room/components/manage/registers', [
        '$scope',
        'modules/room/services/registerService',
        'modules.manageui.factories.tableParameter',
        'app.services.httpService',
        function ($scope, registerService, tableParameter, httpService) {
            var me = this;

            this.tableParams = registerService.tableParams;
        }
    ]);
});