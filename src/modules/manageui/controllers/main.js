define('modules.manageui.controllers.main', [
    'modules.manageui.module'
], function (module) {
    'use strict';

    module.controller('modules.manageui.controllers.main', [
        '$scope',
        '$state',
        '$appEnvironment',
        '$element',
        'modules.manageui.configs.linkManager',
        'app.services.popupService',
        'modules.manageui.services.sessionService',
        function ($scope, $state, $appEnvironment, $element, linkManager, popupService, sessionService) {
            var me = this;

            this.links = linkManager.tree();

            this.tabs = {};

            this.logout = function () {
                popupService
                    .confirm('是否退出？')
                    .ok(function () {
                        $state.go('login');
                    });
            };

            this.tabAdded = function () {
                $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                    var tabState = $(e.target).attr('state');
                    var tabStateParams = $(e.target).attr('state-params');
                    $state.go(tabState, tabStateParams !== '' ? $.parseJSON(tabStateParams) : null);
                });
            };

            this.tabOpen = function (tab) {
                if (!tab.target) return;
                if (!me.tabs[tab.tab]) {
                    me.tabs[tab.tab] = tab;
                }
            };

            this.tabActive = function (tab) {
                if (!me.tabs[tab.tab]) return;
                $('[role="tablist"] a[data-target="#' + tab.tab + '"]').tab('show');
            };

            this.tabClose = function (tab) {
                var added = me.tabs[tab.tab];
                if (added.tabState === $state.current.name && added.tabStateParams === $state.current.tabStateParams) {
                    $state.back();
                }
                delete me.tabs[tab.tab];
            };

            this.tabAdded();

            this.tabOpen($state.current);

            $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if (toState.target) {
                    toState.tabStateParams = toParams;
                    me.tabOpen(toState);
                }
            });

            $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                if (toState.target) {
                    me.tabActive(toState);
                }
                if (Object.getOwnPropertyNames(me.tabs) <= 0) {
                    $('[role="tablist"] a[data-target="#tab_home"]').tab('show');
                }
            });

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