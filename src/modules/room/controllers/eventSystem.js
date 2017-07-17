define('modules.room.controllers.eventSystem', [
    'modules.room.module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.eventSystem', [
        '$scope',
        'modules.manageui.factories.tableParameter',
        'modules.setting.services.request',
        function ($scope, tableParameter, request) {
            var me = this;

            this.list = [];

            this.tableParams = new tableParameter({});
        }
    ]);
});