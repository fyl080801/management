define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules/room/components/system/bar', [
        '$scope',
        '$modal',
        'modules.manageui.configs.linkManager',
        'modules.manageui.services.tabService',
        'modules.room.services.messageService',
        'modules/room/services/registerService',
        'app.services.httpService',
        'app.services.popupService',
        function ($scope, $modal, linkManager, tabService, messageService, registerService, httpService, popupService) {
            $scope.service = messageService;

            this.openMessage = function (type) {
                tabService.open(linkManager.get('roommanage').get('roommanage_infomanage'));
                messageService.activeSingle(type);
            };

            this.checkIn = function () {
                $modal
                    .open({
                        templateUrl: 'modules/room/components/system/checkIn.html',
                        size: 'sm'
                    }).result
                    .then(function (data) {
                        httpService
                            .post('/enter/addEnterup', data)
                            .then(function () {
                                popupService.information('登记成功');
                                registerService.load();
                            });
                    });
            };

            this.checkOut = function () {
                $modal
                    .open({
                        templateUrl: 'modules/room/components/system/checkOut.html',
                        size: 'sm'
                    });
            };
        }
    ]);
});