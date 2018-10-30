
import { observable, action,computed } from 'mobx'
import axios from 'axios'
import dog from '../assets/images/dog.jpeg';
import dog2 from '../assets/images/dog2.jpg';
import dog3 from '../assets/images/dog3.jpg';
class UserStore {
    @observable username = null
    @observable name = null
    @observable biography = ''
    @observable gay = null
    @observable preference = null
    @observable radius = null
    @observable location = {
        lat:0,
        lng:0
    }
    @observable state = null
    @observable profilePicture = null
    @observable photos = []
    @observable photo_link_1 = null
    @observable photo_link_2 = null
    @observable photo_link_3 = null
    @observable photo_link_4 = null
    @observable token = null
    @observable accessToken = null
    @observable profile_id = null
    @observable prospects = [
        {
          user:{
            first_name: "Rico",

          },
            age: 16,
            img: [dog, dog2, dog3],
            location: "DOWNTOWN MANHATTAN, NEW YORK",
            bio: "My friends call me daddy. I can't figure out why. Do you mind helping me figure it out?",
        }
    ]
    @observable matches = []
    @observable redirect_to = null
    @observable user_slug = null
    @observable noProspects = false;
    @observable isMatched = false;

    @action
    setIsMatched(bool){

        this.isMatched = bool;
    }

    @action
    setNoProspects(bool){
        this.noProspects = bool
    }

    @action
    async authenticateUser(authObj) {
        try {
            return this.getLocation(() => {
                axios.post(`${process.env.REACT_APP_API_BASEURL}/login/`, {
                    accessToken: authObj.accessToken,
                    lng:this.location.lng,
                    lat:this.location.lat
                }).then(response=> {
                    console.log(response.data)
                    this.populateUser(response.data)
                    this.insertToken(authObj)
                    return true
                }).catch(error => {
                    console.log(error)
                    return false
                })
            })
        } catch(err) {
            return false
        }
    }

    @action
    populateUser(userAuth) {
        console.log(userAuth)
        this.token = userAuth.auth_token
        this.name = userAuth.user_profile.user.full_name
        this.email = true
        this.profilePicture = userAuth.user_profile.profile_image
        this.photo_link_1 = userAuth.user_profile.supporting_pic_1
        this.photo_link_2 = userAuth.user_profile.supporting_pic_2
        this.photo_link_3 = userAuth.user_profile.supporting_pic_3
        this.photo_link_4 = userAuth.user_profile.supporting_pic_4
        this.biography = userAuth.user_profile.bio
        this.radius = userAuth.user_profile.search_radius
        this.preference = userAuth.user_profile.sexual_preference
        this.profile_id = userAuth.user_profile.id
        this.gay = userAuth.user_profile.gay
        this.user_slug = userAuth.user_profile.user.slug
    }

    @action
    setRedirectTo(link) {
        this.redirect_to = link
    }

    @action
    getRedirectTo() {
        const redirectLink = this.redirect_to
        this.redirect_to = null
        return redirectLink
    }

    @action
    setBio(bio){
        this.biography = bio
    }

    @action
    setLocation(location){
        this.location.lat = location.lat;
        this.location.lng = location.lng

    }

    @action
    setGay(gay){
        this.gay = gay
    }

    @action
    setRadius(radius){
        this.radius = radius
    }

    @action
    setPreference(prefs){
        this.preference = prefs
    }

    @action
    setPic(num, pic){
        switch(num){
            case 1:
                this.photo_link_1 = pic;
                break;
            case 2:
                this.photo_link_2 = pic;
                break;
            case 3:
                this.photo_link_3 = pic;
                break;
            case 4:
                this.photo_link_4 = pic;
                break;
            default:
                break;
        }
    }

    @action
    handleSubmit(){

        const fd = new FormData()
        const url = `${process.env.REACT_APP_API_BASEURL}/profiles/${this.profile_id}/`;
        const config = {
            headers: {
                'Authorization': 'Token ' + this.token,
            }
        }
        fd.append('bio',this.biography)
        fd.append('sexual_preference',this.preference)
        fd.append('gay',this.gay)
        fd.append('search_radius',this.radius)

        axios.put(url,fd,config)
        .then(response => {

        })
        .catch(error => {
            console.log(error)
        })
    }

    @action
    handleSubmitImage(e, num){
        this.setPic(num,null)
        const fd = new FormData()
        const url = `${process.env.REACT_APP_API_BASEURL}/profiles/${this.profile_id}/`;
        const config = {
            headers: {
                'Authorization': 'Token ' + this.token,
                'content-type': 'multipart/form-data'
            }
        }
        fd.append('supporting_pic_'+num+'',e.target.files[0])
        fd.append('gay',this.gay)

        axios.put(url,fd,config)
        .then(response => {
            let photo;

            switch(num){
                case 1:
                    photo = response.data.supporting_pic_1
                    break;
                case 2:
                    photo = response.data.supporting_pic_2
                    break;
                case 3:
                    photo = response.data.supporting_pic_3
                    break;
                case 4:
                    photo = response.data.supporting_pic_4
                    break;
                default:
                    photo = null;
            }
            photo = photo.slice(photo.indexOf("/media"))
            this.setPic(num, photo)
        })
        .catch(error => {
            console.log(error)
        })
    }

    @action
    setMatches(matches){
        this.matches = matches;
    }

    @action
    async getLocation(callback){
        try{
            navigator.geolocation.getCurrentPosition((position) => {
              let coords = {
                lat: parseFloat(position.coords.latitude),
                lng: parseFloat(position.coords.longitude)
            }
              this.setLocation(coords);

              return callback()
            }, err => {
                this.ipToLocation()
                return callback()
              }
              , {enableHighAccuracy: false, timeout: 20000, maximumAge: 0})

        } catch (err){
            this.ipToLocation()
            return callback()
        }

    }

    @action insertToken(authObj){
        this.accessToken = authObj.auth_token
    }

    @action
    setProspects(prospects){
        this.prospects = prospects
    }

    @action
    async ipToLocation(){
        try{
        let response = await fetch("https://freegeoip.app/json/");
        let body = await response.json();

        this.setLocation( {
            lat: body.latitude,
            lng: body.longitude
        });
         } catch (err){
        }

    }

    @action
    nextProspect(){
        if(this.prospects.length > 1){
            this.prospects.splice(0,1)
        }
    }

    @computed get isMatchedValue(){
        return this.isMatched
    }
    @computed get currentProspect(){
        if(this.prospects && this.prospects.length) {
            if(this.prospects[0].age ==null){
                this.prospects[0].age = "";
            }
            if(this.prospects[0].bio == null){
                this.prospects[0].bio = "";
            }
            return this.prospects[0]
        } else return -1
    }

    @computed get noProspectsValue(){
        return this.noProspects
    }

    @computed get prospectLength(){

        // return this.prospects.length?this.prospects.length:null;
        return this.prospects.length;
    }
}

export default UserStore
