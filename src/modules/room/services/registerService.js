define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.service('modules/room/services/registerService', [
        'modules.manageui.factories.tableParameter',
        function (tableParameter) {
            var me = this;

            this.tableParams = new tableParameter({
                url: '/enter/findEnterup'
            });

            this.load = function () {
                me.tableParams.reload();
            };
        }
    ]);
});