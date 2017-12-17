define([
    'modules/manageui/configs'
], function (configs) {
    'use strict';

    configs.factory('modules.manageui.configs.factories.httpSession', [
        function () {
            return {
                request: function (configs) {
                    configs.withCredentials = true;
                    return configs;
                },
                requestError: function (err) {
                    return err;
                },
                response: function (response) {
                    return response;
                },
                responseError: function (err) {
                    return err;
                }
            };
        }
    ]);
});