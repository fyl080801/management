define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.roomTypeForm', [
        '$scope',
        'NgTableParams',
        'app.services.ajaxService',
        'modules.room.factories.enumerate',
        function ($scope, NgTableParams, ajaxService, enumerate) {
            var me = this;

            $scope.groups = []; //enumerate.LineGroups;
            $scope.electricRoads = [];
            $scope.table = new NgTableParams({}, {
                groupBy: 'GroupId',
                getData: function () {
                    $.each($scope.data.Lines, function (idx, item) {
                        $scope.data.Lines[idx].idx = idx;
                    });
                    return $scope.data.Lines;
                }
            });

            $scope.data = $.extend({}, $scope.$data);

            this.newLine = {};
            this.current = {};
            this.editing = -1;

            this.addLine = function () {
                me.newLine.Group = me.groups[me.newLine.GroupId];
                $scope.data.Lines.push($.extend({}, me.newLine));
                me.newLine = {};
                $scope.table.reload();
            };

            this.applyEditing = function (idx) {
                $scope.data.Lines[idx] = $.extend({}, me.current);
                $scope.table.reload();
                me.cancelEditing();
            };

            this.beginEditing = function (idx) {
                me.editing = idx;
                me.current = $.extend({}, $scope.data.Lines[idx]);
            };

            this.cancelEditing = function () {
                me.editing = -1;
                me.current = {};
            };

            this.removeLine = function (idx) {
                $scope.data.Lines.splice(idx, 1);
                $scope.table.reload();
            };

            this.groups = {};

            $.each($scope.groups, function (idx, item) {
                me.groups[item.Key] = item.Name;
            });

            ajaxService
                .post('/equipment/findEquipmentHotel', {})
                .then(function (result) {
                    $scope.groups = result;
                });

            ajaxService
                .post('/electric/findElectricRoad', {})
                .then(function (result) {
                    $scope.electricRoads = result;
                });
        }
    ]);
});