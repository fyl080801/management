define('modules.mobileui.directives.mobileTitle', [
    'modules.mobileui.module'
], function (module) {
    'use strict';

    module.directive('mobileTitle', [
        '$rootScope',
        '$state',
        '$timeout',
        function ($rootScope, $state, $timeout) {
            var _link = function (scope, element, attrs) {
                $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                    $timeout(function () {
                        element.html((toState.data && toState.data.title) ? toState.data.title : '');
                    });
                });
                element.html(($state.$current.data && $state.$current.data.title) ? $state.$current.data.title : '');
            };

            return {
                restrict: 'A',
                link: _link
            };
        }
    ]);
});