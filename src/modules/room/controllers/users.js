define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.users', [
        '$scope',
        '$modal',
        'NgTableParams',
        'app.services.popupService',
        'app.services.httpService',
        'app.services.ajaxService',
        function ($scope, $modal, tableParameter, popupService, httpService, ajaxService) {
            var me = this;

            this.list = [];

            this.add = function () {
                $modal
                    .open({
                        templateUrl: 'views/room/personal/UserForm.html'
                    }).result
                    .then(function (data) {
                        data.personRoleRelationAuthoritys = [{
                            roleCode: data.roleId
                        }];
                        ajaxService
                            .json('/personauth/addRoleAuthority', JSON.stringify(data))
                            .then(function () {
                                popupService.information('添加成功');
                                me.load();
                            });
                    });
            };

            this.edit = function (user) {
                if (user.personRoleRelationAuthoritys && user.personRoleRelationAuthoritys.length > 0)
                    user.roleId = user.personRoleRelationAuthoritys[0].roleCode;
                $modal
                    .open({
                        templateUrl: 'views/room/personal/UserForm.html',
                        data: user
                    }).result
                    .then(function (data) {
                        data.personRoleRelationAuthoritys = [{
                            roleCode: data.roleId
                        }];
                        ajaxService
                            .json('/personauth/modifyPersonAuthority', JSON.stringify(data))
                            .then(function () {
                                popupService.information('添加成功');
                                me.load();
                            });
                    })
            };

            this.changePassword = function (id) {
                $modal
                    .open({
                        templateUrl: 'views/room/personal/UserPassword.html',
                        size: 'sm'
                    }).result
                    .then(function (data) {

                    });
            };

            this.drop = function (id) {
                popupService
                    .confirm('是否删除？')
                    .ok(function () {
                        ajaxService
                            .post('/personauth/delPersonAuthority', {
                                id: id
                            })
                            .then(function () {
                                popupService.information('删除成功');
                                me.load();
                            });
                    });
            };

            this.load = function () {
                httpService
                    .post('/personauth/findPersonAuthorityList', {})
                    .then(function (result) {
                        me.list = result;
                    });
            };
        }
    ]);
});