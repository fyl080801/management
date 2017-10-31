define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.eventSystem', [
        '$scope',
        'modules.manageui.factories.tableParameter',
        'modules.setting.services.request',
        'app.services.httpService',
        function ($scope, tableParameter, request, httpService) {
            var me = this;

            this.list = [];

            this.tableParams = new tableParameter({});
        }
    ]);
});