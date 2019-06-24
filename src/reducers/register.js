export default function(state,action){
    if(!state&&!action.payload){
        return  {}
    }
    switch(action.type){
        case 'IS_REGISTER':
            return action.payload;
        case 'IS_REGISTER_UPDATE':
            var nested=action.payload[0].split(".");
            if(nested.length===1){
                state[action.payload[0]]=action.payload[1];
            }else if(nested.length===2){
                state[nested[0]][nested[1]]=action.payload[1];
            }else if(nested.length===3){
                state[nested[0]][nested[1]][nested[2]]=action.payload[1];
            }else{
              return action.payload;
            }
            return {...state, regsitration: state};
        default:
            return state;
    }
}
