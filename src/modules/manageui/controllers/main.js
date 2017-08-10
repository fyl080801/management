define('modules.manageui.controllers.main', [
    'modules.manageui.module'
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
        'app.services.popupService',
        'modules.manageui.services.sessionService',
        function ($scope, $state, $appEnvironment, $location, $tab, $modal, linkManager, popupService, sessionService) {
            var me = this;

            this.menuCollapse = false;

            this.themes = [{
                name: '深色',
                value: 'theme-dark'
            }, {
                name: '天蓝',
                value: 'theme-blue'
            }, {
                name: '橘黄',
                value: 'theme-orange'
            }];

            this.links = linkManager.tree();

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