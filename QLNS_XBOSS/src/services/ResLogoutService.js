import Servies from './Servies'
import { GOOGLE_CONFIGS, DATA_STATUS } from '../utils/configs';

export default class LogoutService extends Servies{
    logout(url){
        return new Promise((resolve, rejects)=>{
            this.post({},url).then((resService)=>{
                if('data' in resService && 'error' in resService){
                    resolve({
                        status: DATA_STATUS.FAILED,
                        data: resService,
                    })
                }else{
                    resolve({
                        status: DATA_STATUS.SUCCESS,
                        data: resService,
                    })
                }
            }).catch((rejectService)=>{
                resolve({
                    status: DATA_STATUS.FAILED,
                    data: rejectService,
                })
            })
        })
    }
}