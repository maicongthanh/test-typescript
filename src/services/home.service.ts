import api from './api'

const homeService = {
    getInfoHome: (data: object = {}) => {
        return api().get<any, any>("/home-test", { data });
    },

}
export default homeService;

