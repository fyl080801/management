define('modules.room.controllers.eventSystem', [
    'modules.room.module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.eventSystem', [
        '$scope',
        'NgTableParams',
        'modules.setting.services.request',
        function ($scope, NgTableParams, request) {
            var me = this;

            this.list = [];

            this.tableParams = new NgTableParams();

        }
    ]);
});