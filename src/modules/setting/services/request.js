/**
 * Created by fyl08 on 2017/1/4.
 */
define('modules.setting.services.request', [
    'modules.setting.module'
], function (module) {
    'use strict';

    module.service('modules.setting.services.request', [
        function () {
            this.登录 = '';
            this.退出 = '';

            this.人员类别列表 = '/data/roleList.json';
            this.人员列表 = '/data/userList.json';

            this.房间状态列表 = '/data/roomList.json';
        }
    ]);
});