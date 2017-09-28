define([
    'modules/manageui/module'
], function (module) {
    'use strict';

    module.controller('modules.manageui.controllers.main', [
        '$scope',
        '$state',
        '$appEnvironment',
        '$location',
        '$tab',
        '$modal',
        'modules.manageui.configs.linkManager',
        'modules.manageui.services.tabService',
        'app.services.popupService',
        'modules.manageui.services.sessionService',
        function ($scope, $state, $appEnvironment, $location, $tab, $modal, linkManager, tabService, popupService, sessionService) {
            var me = this;

            this.menuCollapse = false;

            this.themes = [{
                name: '深蓝',
                value: 'theme-dark'
            }, {
                name: '紫红',
                value: 'theme-purple'
            }, {
                name: '军绿',
                value: 'theme-green'
            }];

            this.links = linkManager.tree();

            this.tabService = tabService;

            this.changeTheme = function (theme) {
                $appEnvironment.theme = theme;
            };

            this.logout = function () {
                popupService
                    .confirm('是否退出？')
                    .ok(function () {
                        $state.go('login');
                    });
            };

            this.showUser = function () {
                $modal
                    .open({
                        templateUrl: 'views/manageui/UserDetails.html',
                        size: 'sm',
                        data: {
                            Id: $appEnvironment.user.Id
                        }
                    });
            };

            this.editPicture = function () {
                $modal
                    .open({
                        templateUrl: 'views/manageui/UserPicture.html'
                    });
            };

            $scope.$appEnvironment = $appEnvironment;

            $scope.$on('ngRepeated', function () {
                $('.metismenu').metisMenu();
            });

            $('[role="tablist"]').sortable({
                items: 'li:not(.ui-state-disabled)',
                axis: 'x'
            });
            $('[role="tablist"]').disableSelection();

            // if (!$appEnvironment.session) {
            //     sessionService
            //         .checkSession()
            //         .authenticated(function () {
            //             me.links = linkManager.tree();
            //         })
            //         .unAuthenticated(function () {
            //             $state.go('login');
            //         });
            // } else {
            //     me.links = linkManager.tree();
            // }
        }
    ]);
});