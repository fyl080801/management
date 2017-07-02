define('modules.room.controllers.state', [
    'modules.room.module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.state', [
        '$scope',
        function ($scope) {
            var me = this;

            this.rooms = [{
                No: '0001',
                Temperature: 20
            }, {
                No: '0001',
                Temperature: 20
            }, {
                No: '0001',
                Temperature: 20
            }, {
                No: '0001',
                Temperature: 20
            }, {
                No: '0001',
                Temperature: 20
            }, {
                No: '0001',
                Temperature: 20
            }, {
                No: '0001',
                Temperature: 20
            }, {
                No: '0001',
                Temperature: 20
            }, {
                No: '0001',
                Temperature: 20
            }, {
                No: '0001',
                Temperature: 20
            }, {
                No: '0001',
                Temperature: 20
            }];
        }
    ]);
});