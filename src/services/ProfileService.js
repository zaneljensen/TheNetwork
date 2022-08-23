import { AppState } from "../AppState.js";
import { Profile } from "../models/Profile.js";
import { api } from "./AxiosService.js";

class ProfileService {
    async getProfileById(id) {
        const res = await api.get(`api/profiles/${id}`)
        AppState.activeProfile = new Profile(res.data)
    }

    async getNextProfilePostPage(url) {
        const res = await api.get(`${url}`)
        AppState.posts = res.data.posts
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
    }

}


export const profilesService = new ProfileService()