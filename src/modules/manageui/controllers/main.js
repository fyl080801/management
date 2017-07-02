define('modules.manageui.controllers.main', [
    'modules.manageui.module'
], function (module) {
    'use strict';

    module.controller('modules.manageui.controllers.main', [
        '$scope',
        '$state',
        '$appEnvironment',
        '$element',
        '$location',
        '$tab',
        'modules.manageui.configs.linkManager',
        'app.services.popupService',
        'modules.manageui.services.sessionService',
        function ($scope, $state, $appEnvironment, $element, $location, $tab, linkManager, popupService, sessionService) {
            var me = this;

            this.links = linkManager.tree();

            this.tabs = [];

            this.tab;

            this.logout = function () {
                popupService
                    .confirm('是否退出？')
                    .ok(function () {
                        $state.go('login');
                    });
            };

            this.tabtest = function () {
                me.tab = $tab.open({
                    tabkey: 'test',
                    title: 'tabtest',
                    template: 'aaaaaaaaaaa'
                });
            };

            this.act = function () {
                me.tab.active();
            };

            // this.tabAdded = function (tab) {
            //     $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            //         var tabState = $(e.target).attr('state');
            //         var tabStateParams = $(e.target).attr('state-params');
            //         $state.go(tabState, tabStateParams !== '' ? $.parseJSON(tabStateParams) : null);
            //     });
            //     me.tabActive(tab);
            // };

            // this.tabOpen = function (tab) {
            //     if (!tab.target) return;
            //     if (!checkAdded(tab)) {
            //         $('a[data-toggle="tab"]').off('shown.bs.tab');
            //         me.tabs.push(tab);
            //     }
            // };

            // this.tabActive = function (tab) {
            //     if (!checkAdded(tab)) return;
            //     $('[role="tablist"] a[data-target="#' + tab.tab + '"]').tab('show');
            // };

            // this.tabClose = function (idx) {
            //     var added = me.tabs[idx];
            //     if (added.tabState === $state.current.name && added.tabStateParams === $state.current.tabStateParams) {
            //         $state.back();
            //     }
            //     me.tabs.splice(idx, 1);
            // };

            // this.tabAdded();

            // this.tabOpen($state.current);

            // $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            //     if (toState.target) {
            //         toState.tabStateParams = toParams;
            //         me.tabOpen(toState);
            //     }
            // });

            // $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            //     // if (toState.target) {
            //     //     me.tabActive(toState);
            //     // }
            //     if (me.tabs.length <= 0) {
            //         $('[role="tablist"] a[data-target="#tab_home"]').tab('show');
            //     }
            // });

            // function checkAdded(tab) {
            //     var added = false;
            //     $.each(me.tabs, function (idx, tabItem) {
            //         if (tabItem.tab === tab.tab) {
            //             added = true;
            //             return false;
            //         }
            //     });
            //     return added;
            // }

            // function getAdded(tab) {
            //     var added;
            //     $.each(me.tabs, function (idx, tabItem) {
            //         if (tabItem.tab === tab.tab) {
            //             added = tabItem;
            //             return false;
            //         }
            //     });
            //     return added;
            // }
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