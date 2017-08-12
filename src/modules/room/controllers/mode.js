define('modules.room.controllers.mode', [
    'modules.room.module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.mode', [
        '$scope',
        '$modal',
        'NgTableParams',
        function ($scope, $modal, NgTableParams) {
            this.list = [];
            this.tableParams = new NgTableParams();
            this.add = function () {
                $modal
                    .open({
                        templateUrl: 'views/room/settings/ModeForm.html',
                        size: 'sm'
                    }).result
                    .then(function () {

                    });
            };
        }
    ]);
});