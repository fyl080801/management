define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.eventSystem', [
        '$scope',
        'modules.manageui.factories.tableParameter',
        'app.services.httpService',
        function ($scope, tableParameter, httpService) {
            var me = this;

            this.list = [];

            this.tableParams = new tableParameter({});
        }
    ]);
});