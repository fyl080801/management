define('modules.room.configs.provide', [
    'modules.room.configs'
], function (configs) {
    'use strict';

    configs
        .config([
            '$provide',
            function ($provide) {
                $provide.constant('$globalStore', {
                    builds: [],
                    roomTypes: []
                });
            }
        ])
        .config([
            '$provide',
            function ($provide) {
                $provide.decorator('$rootScope', [
                    '$delegate',
                    '$globalStore',
                    function ($delegate, $globalStore) {
                        $delegate.$globalStore = $globalStore;
                        return $delegate;
                    }
                ]);
            }
        ]);
});