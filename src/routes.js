// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";

// Users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

// Plan
const PLANS = "/plans";
const UPLOAD = "/upload";
const DELETE_PLAN = "/:id/delete";

// Calendar
const CALENDAR = "/calendar";

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    users: USERS,
    userDetail: USER_DETAIL,
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    plans: PLANS,
    upload: UPLOAD,
    calendar: CALENDAR,
    deletePlan: id => {
        if (id) {
            return `/plans/${id}/delete`;
        } else {
            return DELETE_PLAN;
        }
    }
};

export default routes;