export const setHall = (name, capacity) => {
    return {
        type: 'SET_HALL_INFOR',
        name: name,
        capacity: capacity
    };
};

export const setHallId = (hallId) => {
    return {
        type: 'SET_HALL_ID',
        hallId: hallId
    };
};

