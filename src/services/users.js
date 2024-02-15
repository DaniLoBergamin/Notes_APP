// Calls to user endpoints.

import Api from "./api";

const UsersService = {
    register: (params) => Api.post("/users/register", params),
    login: async (params) => {
        const response = await Api.post("/users/login", params);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
    },

    // Deleting USER and TOKEN from localStorage (LOGOUT).
    logout: () => {
        localStorage.removeItem('user', null);
        localStorage.removeItem('token', null);
    },

    // Update user.
    update: async (params) => {
        const response = await Api.put("/users", params, {
            headers: {'x-access-token': localStorage.getItem('token')}
        })
        localStorage.setItem('user', JSON.stringify(response.data));
    },

    // Update password.
    updatePassword: async (params) => {
        await Api.put("/users/password", params, {
            headers: {'x-access-token': localStorage.getItem('token')}
        })
    },

    // Delete user.
    delete: async () => {
        await Api.delete("/users", {
            headers: {'x-access-token': localStorage.getItem('token')}
        })
        // null - User no longer exists.
        localStorage.removeItem('user', null);
        localStorage.removeItem('token', null);
    }
}

export default UsersService;