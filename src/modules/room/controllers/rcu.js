define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.rcu', [
        '$scope',
        '$modal',
        'modules.manageui.factories.tableParameter',
        'app.services.httpService',
        'app.services.ajaxService',
        'app.services.popupService',
        function ($scope, $modal, tableParameter, httpService, ajaxService, popupService) {
            var me = this;

            this.current = null;

            this.floorParams = {
                floorid: null
            };

            this.timeTable = new tableParameter({
                url: '/rcuSettime/findRcuSettime',
                data: me.floorParams
            });

            // this.paramTable = new tableParameter({
            //     url: '/rcuSetparam/findRcuSetparam',
            //     data: me.floorParams
            // });

            this.upgrade = function () {

            };

            this.reset = function () {
                $modal
                    .open({
                        templateUrl: 'modules/room/views/rcu/Reset.html'
                    });
            };

            this.select = function (floor) {
                me.current = floor;
                me.floorParams.floorid = floor.id;
                me.timeTable.reload();
            };
        }
    ]);
});