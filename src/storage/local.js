export function setFavJoke(joke){
      if(getItemFromStorage('jokes')){
        if(!isFav(joke)){
          var tmp=getItemFromStorage('jokes').jokes;
          if(tmp.length===10){
            tmp.shift()
          }

            tmp.push(joke);
          setItemInStorage('jokes',{"jokes":tmp});
        }


      }else{
     setItemInStorage('jokes',{"jokes":[joke]});

      }
}
export function isFav(newjoke){
  if(getItemFromStorage('jokes')){
          if(newjoke.categories&&newjoke.categories.length>0){
            newjoke.category=newjoke.categories.join("_");
          }else{
            newjoke.category='jokers_case';
          }
        var exist=false;
        for(var i=0;i<getItemFromStorage('jokes').jokes.length;i++){
              const joke=getItemFromStorage('jokes').jokes[i]

              if(joke.id===newjoke.id&&joke.category===newjoke.category){
                  exist= true;
              }
        }

      return exist;
  }else{
    return false;
  }

}
export function getFavList(){
  if(getItemFromStorage('jokes')&&getItemFromStorage('jokes').jokes){
    return getItemFromStorage('jokes').jokes;
  }else{
    return [];
  }
}
export function removeFavJoke(newjoke,scope){

          var newJokes=[];
          getItemFromStorage('jokes').jokes.map((joke)=>{
            if(joke.id===newjoke.id&&joke.category===newjoke.category){
                //ignore
            }else{
                newJokes.push(joke)
            }
            setItemInStorage('jokes',{"jokes":newJokes});
          })

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
