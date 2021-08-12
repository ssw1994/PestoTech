import axios  from "axios";
const userService = (function () {
    const http = axios.create({
        baseURL: './assets/mocks',
        timeout: 1000,
        headers: {'Content-Type': 'application/json'}
    });
    let fetchUserList = function () {
        return http.get('/user.mock.json');
    }

    let fetchCompanyList = function () {
        return http.get('/company.mock.json');
    }

    return {
        fetchUserList,
        fetchCompanyList
    }
})();

export default userService;