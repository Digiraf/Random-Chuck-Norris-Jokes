import axios from 'axios';
import Config from '../config/config'
export function getJokes(max,scope,cb){
  scope.props.isRegister(['loading',true]);
  serverRequest("get",max,{},response => {
          if(response.status&&response.res){
            cb(response.res);
          }
  });
}
export  function isRegister(data){
    return {type:"IS_REGISTER_UPDATE", payload:data};
}
export function serverRequest(method,url,data,callback) {
  const req = axios[method](Config.host+url, data);
  req.then((response) => {
    callback({status:1,res:response.data})
  }).catch((error) => {
    callback({status:0,error:error})
  });

}
