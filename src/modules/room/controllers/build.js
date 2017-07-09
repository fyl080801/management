define('modules.room.controllers.build', [
    'modules.room.module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.build', [
        '$scope',
        'NgTableParams',
        'modules.setting.services.request',
        function ($scope, NgTableParams, request) {
            var me = this;

            this.builds = [];

            this.floors = [];

            this.buildTable = new NgTableParams();

            this.floorTable = new NgTableParams();


        }
    ]);
});