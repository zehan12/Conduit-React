// const base = "https://mighty-oasis-08080.herokuapp.com/api";
const base = "https://conduit.productionready.io/api"

const header = () => {
    const Token  = localStorage["user_token"] ? `Token ${localStorage["user_token"]}` : "";
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': Token
    }
}

module.exports = { base, header }
