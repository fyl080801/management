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

            this.links = linkManager.tree();

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
                        data: {
                            Id: $appEnvironment.user.Id
                        }
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