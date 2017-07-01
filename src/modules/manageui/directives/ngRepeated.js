define('modules.manageui.directives.ngRepeated', [
    'modules.manageui.module'
], function (module) {
    'use strict';

    module.directive('ngRepeated', [
        function () {
            var _link = function (scope, element, attr) {
                if (scope.$last === true) {
                    eval(attr.ngRepeated);
                }
            };

            return {
                link: _link
            }
        }
    ]);
});