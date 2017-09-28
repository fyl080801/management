define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.factory('modules.room.factories.enumerate', [
        function () {
            return {
                // LineGroups: {
                //     '1': '灯光',
                //     '2': '调光',
                //     '3': '窗帘',
                //     '4': '新风',
                //     '5': '保险柜'
                // }
                LineGroups: [{
                    Key: '1',
                    Name: '灯光'
                }, {
                    Key: '2',
                    Name: '调光'
                }, {
                    Key: '3',
                    Name: '窗帘'
                }, {
                    Key: '4',
                    Name: '新风'
                }, {
                    Key: '5',
                    Name: '保险柜'
                }]
            };
        }
    ]);
});