define('modules.room.controllers.users', [
    'modules.room.module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.users', [
        '$scope',
        '$modal',
        'NgTableParams',
        'modules.setting.services.request',
        'app.services.httpService',
        'app.services.popupService',
        function ($scope, $modal, NgTableParams, request, httpService, popupService) {
            var me = this;

            this.tableParams = new NgTableParams();

            this.list = [];

            
        }
    ]);
});