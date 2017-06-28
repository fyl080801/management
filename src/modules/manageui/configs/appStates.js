/**
 * Created by fyl08 on 2017/2/15.
 */
define('modules.manageui.configs.appStates', [
    'modules.manageui.configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        function ($provide) {
            $provide.constant('$appStates', {});
        }
    ]);
});