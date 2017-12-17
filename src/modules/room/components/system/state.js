define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules/room/components/system/state', [
        '$scope',
        '$timeout',
        '$modal',
        '$q',
        'modules.room.factories.stateAdapter',
        'app.services.httpService',
        'app.services.popupService',
        function ($scope, $timeout, $modal, $q, stateAdapter, httpService, popupService) {

            function toDoReceive(data, obj) {
                var defer = $q.defer();
                stateAdapter
                    .connect('/h5ws')
                    .onopened(function () {
                        stateAdapter.send({
                            code: 1,
                            data: data
                        });
                    })
                    .onreceived(function (result) {
                        var jsonResult = JSON.parse(result);
                        if (jsonResult) {
                            defer.resolve(jsonResult.data);
                            obj.rooms = jsonResult.data;
                            $scope.$apply();
                        }
                    })
                    .onerror(function () {
                        popupService.error('房间状态服务异常');
                    });
                return defer.promise;
            }

            var me = this;

            $scope.$controller = this;

            this.rooms = [];

            this.openControl = function (id) {
                $modal
                    .open({
                        templateUrl: 'modules/room/components/system/roomControl.html',
                        size: 'lg'
                    });
            };

            this.load = function () {
                httpService
                    .post('/buildinghotel/findBuildingHotel')
                    .then(function (result) {
                        $scope.$globalStore.builds = result;
                    });
            };

            this.showComment = function (roomId) {
                $modal
                    .open({
                        templateUrl: 'modules/room/components/system/comment.html'
                    });
            };

            this.selectFloor = function (num) {
                var selectIndex = $scope.selectedFloors.indexOf(num);
                if (selectIndex >= 0) {
                    $scope.selectedFloors.splice(selectIndex, 1);
                } else {
                    $scope.selectedFloors.push(num);
                }
            };

            this.getServicePic = function (type) {
                switch (type) {
                    case 'Accepted':
                        return 'null.png';
                    case 'Close':
                        return 'CallGrey.png';
                    case 'Open':
                        return 'CallColor.png';
                }
            };

            this.getRoomStatus = function (type) {
                switch (type) {
                    case 'DaiZu':
                        return 'null.png';
                    case 'YiZu':
                        return 'lease.png';
                    case 'YuDing':
                        return 'CheckoutColor.png';
                    case 'WeiXiu':
                        return 'Fix.png';
                    case 'KongZhi':
                        return 'unlease.png';
                    case 'ZangFang':
                        return 'unclearcolor.png';
                }
            };

            this.getAlertStatus = function (type) {
                switch (type) {
                    case 'WuRao':
                        return 'UndisturbColor.png';
                    case 'QingLi':
                        return 'ClearColor.png';
                    case 'TuiFang':
                        return 'CheckoutColor.png';
                }
            };

            $scope.current = null;

            $scope.selectedFloors = [];

            var buildWatched = $scope.$watch(function () {
                return $scope.current;
            }, function (newValue) {
                if ($scope.current) {
                    toDoReceive({
                            buildingId: $scope.current.buildingId
                        }, $scope.$controller)
                        .then(function (result) {
                            me.rooms = result;
                        });
                }
                $scope.selectedFloors = [];
                me.rooms = [];
            });

            var floorWatched = $scope.$watch(function () {
                return $scope.selectedFloors.length;
            }, function (newValue) {
                if ($scope.current && newValue > 0) { // 已选择楼层
                    toDoReceive({
                            buildingId: $scope.current.buildingId,
                            floors: $scope.selectedFloors
                        }, $scope.$controller)
                        .then(function (result) {
                            me.rooms = result;
                        });
                } else if (!$scope.current) {
                    toDoReceive({}, $scope.$controller)
                        .then(function (result) {
                            me.rooms = result;
                        });
                }
                me.rooms = [];
            });

            $scope.$on('$destroy', function () {
                stateAdapter.close();
                if (buildWatched) buildWatched();
                if (floorWatched) floorWatched();
            });
        }
    ]);
});