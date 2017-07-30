define('modules.room.controllers.state', [
    'modules.room.module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.state', [
        '$scope',
        '$modal',
        'modules.setting.services.request',
        'app.services.httpService',
        function ($scope, $modal, request, httpService) {
            var me = this;

            this.builds = [];

            this.rooms = [];

            this.openControl = function (id) {
                $modal
                    .open({
                        templateUrl: 'views/room/RoomControl.html',
                        size: 'lg'
                    });
            };

            this.load = function () {
                httpService
                    .get(request.楼栋列表)
                    .then(function (result) {
                        me.builds = result.Data;
                    });
            };

            this.showComment = function (roomId) {
                $modal
                    .open({
                        templateUrl: 'views/room/Comment.html'
                    });
            };

            $scope.current = null;

            httpService
                .get(request.房间状态列表)
                .then(function (result) {
                    me.rooms = result;
                });
        }
    ]);
});