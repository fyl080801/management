define('modules.room.controllers.roomForm', [
    'modules.room.module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.roomForm', [
        '$scope',
        'app.services.httpService',
        'modules.setting.services.request',
        'modules.room.factories.enumerate',
        function ($scope, httpService, request, enumerate) {
            $scope.roomTypes = [];
            httpService
                .get(request.房间类型列表)
                .then(function (result) {
                    $scope.roomTypes = result.Data;
                });
        }
    ]);
});