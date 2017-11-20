define([
    'modules/manageui/configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        function ($provide) {
            $provide.constant('$appStates', {});
            $provide.constant('$tabStore', {});

            var app = $('#app').length > 0 ? $('#app') : null;
            var cfg = {
                serverUrl: app ? app.attr('data-server') : '',
                debug: app ? eval(app.attr('data-debug')) ? true : false : false,
                session: app ? eval(app.attr('data-session')) ? true : false : false
            };
            $provide.constant('$appConfig', cfg);
        }
    ]);
});