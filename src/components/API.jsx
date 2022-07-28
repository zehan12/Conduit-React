class API {
    constructor(){
      this.url = "https://mighty-oasis-08080.herokuapp.com/api/tags";
      this.data = null;
    }
  
    api_call(){    
      fetch(this.url)
      .then((response) => response.json())
      .then((data)=> this.data = data )
    }
}

export default API

var TagsAPI = new API();
const tags = TagsAPI.api_call();
console.log(tags,"tags")