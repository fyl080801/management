define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules/room/components/system/comment', [
        '$scope',
        '$timeout',
        '$modal',
        '$q',
        'modules.room.factories.stateAdapter',
        'app.services.httpService',
        'app.services.popupService',
        function ($scope, $timeout, $modal, $q, stateAdapter, httpService, popupService) {

            function connectRoom() {
                var defer = $q.defer();
                stateAdapter
                    .connect('/h5ws')
                    // .onopened(function () {
                    //     // stateAdapter.send({
                    //     //     code: 3,
                    //     //     data: data
                    //     // });
                    // })
                    .onreceived(function (result) {
                        var jsonResult = JSON.parse(result);
                        if (jsonResult) {
                            defer.resolve(jsonResult.data);
                        }
                    })
                    .onerror(function () {
                        //popupService.error('房间状态服务异常');
                    });
                return defer.promise;
            }

            $scope.messages = [];

            $scope.adapter = connectRoom()
                .then(function (data) {
                    // $scope.messages.push({
                    //     content: data.content,
                    //     time: new Date()
                    // });
                });

            $scope.send = function () {
                // if (!$scope.message || $scope.message == '') {

                // }
                stateAdapter.send({
                    code: 3,
                    data: {
                        roomId: $scope.$data.roomId,
                        content: $scope.message
                    }
                });
                $scope.message = '';
            };

            $scope.$on('$destroy', function () {
                stateAdapter.close();
            });
        }
    ]);
});