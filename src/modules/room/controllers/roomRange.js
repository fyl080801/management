define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.roomRange', [
        '$scope',
        '$timeout',
        function ($scope, $timeout) {
            var me = this;

            this.ignores = [];

            this.rooms = function (start, end) {
                if (start && end) {
                    $scope.$data.Ip4e = $scope.$data.Ip4s + end - start;
                    var arr = [];
                    for (var i = start; i <= end; i++) {
                        arr.push(i);
                    }
                    return arr;
                }
                return [];
            };

            this.ignore = function (num) {
                var idx = me.ignores.indexOf(num);
                if (idx < 0) {
                    me.ignores.push(num);
                } else {
                    me.ignores.splice(idx, 1);
                }
            };
        }
    ]);
});