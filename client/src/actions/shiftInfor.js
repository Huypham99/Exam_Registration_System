
export const setShiftId = (shiftId) => {
    return {
        type: 'SET_SHIFT_ID',
        shiftId: shiftId,
    };
};

export const setShiftInfor = (id, time, date, dayOfWeek, moduleId, moduleName) => {
    return {
        type: 'SET_SHIFT_INFOR',
        id,
        time,
        date,
        dayOfWeek,
        moduleId,
        moduleName
    }
}