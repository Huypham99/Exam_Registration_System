export const setModule = (name, moduleId) => {
    return {
        type: 'SET_MODULE_INFOR',
        name: name,
        moduleId: moduleId
    };
};

export const setModuleId = (moduleId) => {
    return {
        type: 'SET_MODULE_ID',
        moduleId: moduleId
    };
};

