define('modules.room.controllers.identitySettings', [
    'modules.room.module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.identitySettings', [
        '$scope',
        'NgTableParams',
        'modules.setting.services.request',
        'app.services.httpService',
        function ($scope, NgTableParams, request, httpService) {
            var me = this;

            this.list = [];
            this.tableParams = new NgTableParams();
            this.load = function () {
                httpService
                    .get(request.身份表示列表)
                    .then(function (result) {
                        me.list = result.Data;
                    });
            };
            this.selectImage = function (row) {

            };
        }
    ]);
});