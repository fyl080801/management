define('modules.room.filters.roomStatus', [
    'modules.room.module'
], function (module) {
    'use strict';

    module.filter('roomStatus', [
        '$filter',
        function ($filter) {
            return function (list) {
                var result = [];
                var pathfilter = $filter('imagePath');
                $.each(list, function (idx, item) {
                    item.DoorStatus = pathfilter(item.DoorStatus);
                    item.PersonalStatus = pathfilter(item.PersonalStatus);
                    item.CallStatus = pathfilter(item.CallStatus);
                    item.RoomStatus = pathfilter(item.RoomStatus);
                    item.AlertStatus = pathfilter(item.AlertStatus);
                    item.StrongStatus = pathfilter(item.StrongStatus);

                    result.push(item);
                });
                return result;
            };
        }
    ]);
});