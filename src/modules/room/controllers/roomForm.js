define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.roomForm', [
        '$scope',
        'app.services.httpService',
        'modules.room.factories.enumerate',
        function ($scope, httpService, enumerate) {
            $scope.roomTypes = [];

            httpService
                .post('/roomtype/findRoomtypeHotels', {})
                .then(function (result) {
                    $scope.roomTypes = result;
                });
        }
    ]);
});