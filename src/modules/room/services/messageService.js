define('modules.room.services.messageService', [
    'modules.room.module'
], function (module) {
    'use strict';

    module.service('modules.room.services.messageService', [
        function () {
            var me = this;

            this.actives = {
                call: false,
                checkIn: false,
                room: false,
                message: false
            };

            this.active = function (type, status) {
                if (status !== undefined) {
                    me.actives[type] = status;
                } else {
                    me.actives[type] = me.actives[type] === true ? false : true;
                }
            };

            this.activeSingle = function (type) {
                $.each(me.actives, function (idx) {
                    if (type !== idx) {
                        me.actives[idx] = false;
                    } else if (me.actives[idx] === false) {
                        me.actives[idx] = true;
                    }
                });
            };

            this.activeAll = function () {
                $.each(me.actives, function (idx) {
                    me.actives[idx] = true;
                });
            };
        }
    ]);
});