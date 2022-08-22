export class Profile {
    constructor(data) {
        this.id = data.id
        this.picture = data.picture
        this.name = data.name
        this.bio = data.bio
        this.email = data.email
        this.coverImg = data.coverImg
        this.github = data.github
        this.linkedin = data.linkedin
        this.class = data.class
        this.graduated = data.graduated
    }
}