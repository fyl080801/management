define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.roomTypeForm', [
        '$scope',
        'NgTableParams',
        'app.services.ajaxService',
        function ($scope, NgTableParams, ajaxService) {
            var me = this;

            $scope.equipments = [];
            $scope.equipmentNames = {};
            $scope.roads = [];
            $scope.roadNames = {};
            $scope.table = new NgTableParams({}, {
                groupBy: 'equid',
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
                $scope.data.Lines.push($.extend({
                    equname: $scope.equipmentNames[me.newLine.equid]
                }, me.newLine));
                me.newLine = {};
                $scope.table.reload();
            };

            this.removeLine = function (idx) {
                $scope.data.Lines.splice(idx, 1);
                $scope.table.reload();
            };

            this.beginEditing = function (idx) {
                me.editing = idx;
                me.current = $.extend({}, $scope.data.Lines[idx]);
            };

            this.applyEditing = function (idx) {
                $scope.data.Lines[idx] = $.extend({
                    equname: $scope.equipmentNames[me.current.equid]
                }, me.current);
                $scope.table.reload();
                me.cancelEditing();
            };

            this.cancelEditing = function () {
                me.editing = -1;
                me.current = {};
            };

            this.getEquipment = function (eid) {
                var query = $.grep($scope.equipments, function (item) {
                    return item.id === eid;
                });
                return query.length > 0 ? query[0] : {};
            };

            ajaxService
                .post('/equipment/findEquipmentHotel', {})
                .then(function (result) {
                    $scope.equipments = result;
                    $.each(result, function (idx, item) {
                        $scope.equipmentNames[item.id] = item.equipmentname;
                    });
                });

            ajaxService
                .post('/electric/findElectricRoad', {})
                .then(function (result) {
                    $scope.roads = result;
                    $.each(result, function (idx, item) {
                        $scope.roadNames[item.id] = item.elename;
                    });
                });
        }
    ]);
});