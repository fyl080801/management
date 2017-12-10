define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.service('modules/room/services/registerService', [
        'modules.manageui.factories.tableParameter',
        function (tableParameter) {
            var me = this;

            this.tableParams = new tableParameter({
                url: '/enter/findEnterup',
                count: 9,
                counts: [9, 18]
            });

            this.load = function () {
                me.tableParams.reload();
            };
        }
    ]);
});