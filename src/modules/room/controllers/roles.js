define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.roles', [
        '$scope',
        '$modal',
        'NgTableParams',
        'modules.setting.services.request',
        'app.services.httpService',
        'app.services.ajaxService',
        'app.services.popupService',
        function ($scope, $modal, NgTableParams, request, httpService, ajaxService, popupService) {
            var me = this;

            this.tableParams = new NgTableParams();

            this.list = [];

            this.add = function () {
                $modal
                    .open({
                        templateUrl: 'views/room/personal/RoleForm.html'
                    }).result
                    .then(function (data) {
                        ajaxService
                            .post('/roleauth/addRoleAuthority', data)
                            .then(function () {
                                me.load();
                            });
                    });
            };

            this.edit = function (role) {
                $modal
                    .open({
                        templateUrl: 'views/room/personal/RoleForm.html',
                        data: $.extend({}, role)
                    }).result
                    .then(function (data) {
                        ajaxService
                            .post('/roleauth/modifyRoleAuthority', data)
                            .then(function () {
                                me.load();
                            });
                    });
            };

            this.authorize = function (id) {
                $modal
                    .open({
                        templateUrl: 'views/room/personal/Authorize.html'
                    });
            };

            this.drop = function (id) {
                popupService
                    .confirm('是否删除？')
                    .ok(function () {
                        ajaxService
                            .post('/roleauth/delRoleAuthority', {
                                'id': id
                            })
                            .then(function () {
                                me.load();
                            });
                    });
            };

            this.load = function () {
                httpService
                    .post('/roleauth/findRoleAuthorityList', {})
                    .then(function (result) {
                        me.list = result;
                    });
            };
        }
    ]);
});