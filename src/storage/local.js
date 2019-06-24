export function setFavJoke(joke){

}
export function removeFavJoke(id){

}
export function getFavJokes(id){

}
export function setItemInStorage(dataKey, data){
    localStorage.setItem(dataKey, JSON.stringify(data));
}

export function getItemFromStorage(dataKey){
    var data = localStorage.getItem(dataKey);
    return data? JSON.parse(data): null ;
}
