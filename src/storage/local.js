export function setFavJoke(joke){
      setItemInStorage('jokes',null);
      if(getItemFromStorage('jokes')){
        var tmp=getItemFromStorage('jokes');
          setItemInStorage('jokes',tmp.push(joke));

      }else{
        setItemInStorage('jokes',[joke]);

      }
      console.log(getItemFromStorage('jokes'));
}
export function isFav(id){
    return true
}
export function removeFavJoke(id){
  if(getItemFromStorage(id)){
    setItemInStorage(id,null)
  }
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
