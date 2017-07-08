/**
 * Created by fyl08 on 2017/1/4.
 */
define('modules.setting.services.request', [
    'modules.setting.module'
], function (module) {
    'use strict';

    module.service('modules.setting.services.request', [
        function () {
            this.login = '';
            this.logout = "";
        }
    ]);
});