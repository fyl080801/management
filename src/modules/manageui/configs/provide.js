define([
    'modules/manageui/configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        function ($provide) {
            $provide.constant('$appStates', {});
            $provide.constant('$tabStore', {});
        }
    ]);
});