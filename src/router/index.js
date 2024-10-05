import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { config } from "../helpers/config";
import DashboardPage from "../pages/dashboard/dashboard-page";
import PrivateRoute from "./private-route";
import LoginPage from "../pages/dashboard/login-page";
import AdminManagementPage from "../pages/dashboard/admin-management-page";
import UserLayout from "../layouts/user-layout";
import LessonManagementPage from "../pages/dashboard/lesson-management-page";
import TeacherManagementPage from "../pages/dashboard/teacher-management-page";
import StudentManagementPage from "../pages/dashboard/student-management-page";
import ContactMessagePage from "../pages/dashboard/contact-message-page";
import Error401Page from "../pages/errors/error-401";
import Error404Page from "../pages/errors/error-404";


const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        children: [
            {
                index: true,
                element: <LoginPage/>
            },
            {
                path: "dashboard",
                children: [
                    {
                        index: true,
                        element: <PrivateRoute roles={config.pageRoles.dashboard}><DashboardPage/></PrivateRoute>,
                    },
                    {
                        path: "admin-management",
                        element: <PrivateRoute roles={config.pageRoles.adminManagement}><AdminManagementPage /></PrivateRoute>
                    },
                    {
                        path: "lesson-management",
                        element: <PrivateRoute roles={config.pageRoles.lessonManagement}><LessonManagementPage /></PrivateRoute>
                    },
                    {
                        path: "teacher-management",
                        element: <PrivateRoute roles={config.pageRoles.teacherManagement}><TeacherManagementPage /></PrivateRoute>
                    },
                    {
                        path: "student-management",
                        element: <PrivateRoute roles={config.pageRoles.studentManagement}><StudentManagementPage /></PrivateRoute>
                    },
                    {
                        path: "contact-messages",
                        element: <PrivateRoute roles={config.pageRoles.contacts}><ContactMessagePage /></PrivateRoute>
                    },
                ]
            },
            {
                path: "unauthorized",
                element: <Error401Page />,
            },
            {
                path: "*",
                element: <Error404Page />
            }
        ]
    },
]); 


const AppRouter = () => {
    return <RouterProvider router={router}/>
}

export default AppRouter
