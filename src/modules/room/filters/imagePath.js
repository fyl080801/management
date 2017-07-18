define('modules.room.filters.imagePath', [
    'modules.room.module'
], function (module) {
    'use strict';

    module.filter('imagePath', [
        function () {
            return function (input) {
                return 'images/' + input;
            };
        }
    ]);
});