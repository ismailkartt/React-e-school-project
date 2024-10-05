export const config = {
    api: {
        baseUrl: "https://mycampusmates.com/app",
    },
    pageRoles: {
        dashboard: ["ADMIN","TEACHER", "STUDENT"],
        adminManagement: ["ADMIN"],
        teacherManagement: ["ADMIN"],
        lessonManagement: ["ADMIN"],
        studentManagement: ["ADMIN"],
        studentInfoManagement: ["TEACHER"],
        meetManagement: ["TEACHER"],
        contacts: ["ADMIN"],
        chooseLesson: ["STUDENT"],
        gradesAndMeets: ["STUDENT"],
      },
      educationTerms: [
        { label: "Fall", key: "FALL_SEMESTER" },
        { label: "Spring", key: "SPRING_SEMESTER" },
      ],
      days: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
}