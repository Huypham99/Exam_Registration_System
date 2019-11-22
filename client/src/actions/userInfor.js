export const setUser = (name, email, dob, studentId, program, schoolYear) => {
    return {
        type: 'SET_USER_INFOR',
        name: name,
        email: email,
        dob: dob,
        studentId: studentId,
        program: program,
        schoolYear: schoolYear
    };
};


export const setStudentId = (studentId) => {
    return {
        type: 'SET_STUDENT_ID',
        studentId: studentId,
    };
};