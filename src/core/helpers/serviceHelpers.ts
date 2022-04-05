import { NoDataFoundError } from '../models/errors/noDataFoundError';
export async function onlineOnly<T>(
                        onlineFn : () => Promise<T>,
                        offlineSucceedCallback?: (arg : T) => void) : Promise<T> {
 try {
     let value = await onlineFn();
        if (offlineSucceedCallback) {
            offlineSucceedCallback(value);
        }
        return value;
 }
    catch (err) {
        console.log(err);
        await handelNoDataFound(err);
        throw new Error('No internet connection');
    }
}
export async function onlineFirst<T>(
    offlineFn : () => Promise<T>,
    onlineFn : () => Promise<T>,
    onlineSucceedCallback?: (arg : T) => void): Promise<T>{
    try {
        const value = await onlineFn();
        if (onlineSucceedCallback) {
            onlineSucceedCallback(value);
        }
        return value;
    }
    catch (err) {
        console.log(err);
        if(isOnlineNotFoundError(err)){
            return await  offlineFn().catch(handelNoDataFound);
        }
        throw err;
    }
}

export async function offlineOnly<T>(
    offlineFn : () => Promise<T>): Promise<T>{
    try {
        let value = await offlineFn();
        return value;
    }
    catch (err) {
        if(isOfflineNotFoundError(err)){
            throw new Error('Vous n\'etes pas connecté à internet');
        }
        throw err;
    }
}

export async function offlineFirst<T>(
    offlineFn : () => Promise<T>,
    onlineFn : () => Promise<T>,
    onlineSucceedCallback?: (arg : T) => void): Promise<T>{
    try {
        return await offlineFn();
        
    }
    catch (err) {
        if(isOnlineNotFoundError(err)){
            const value = await  onlineFn().catch(handelNoDataFound);
            if(onlineSucceedCallback){
                await onlineSucceedCallback(value);
            }
            return value;
        }
        
        throw err;
    }
}
    


function handelNoDataFound(e:any){
    if(isNotFondError(e)){
        return Promise.reject(new Error('Vous n\'etes pas connecté à internet'));
    }
    throw e;
}

function isNotFondError(e:any){
    return isOnlineNotFoundError(e) || isOfflineNotFoundError(e);
}

export function isOnlineNotFoundError(e:any){
    return e instanceof Error && 
    (e.message === "Failed to fetch" || e.message === "Network Error" || 
     e.message ==="Request timeout");
}
export function isOfflineNotFoundError(e:any){
    return e instanceof NoDataFoundError;
}

