define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.mode', [
        '$scope',
        '$modal',
        'modules.manageui.factories.tableParameter',
        'app.services.httpService',
        function ($scope, $modal, tableParameter, httpService) {
            this.list = [];
            this.tableParams = new tableParameter({
                url: '/defaultval/findDefaultvalList'
            });
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