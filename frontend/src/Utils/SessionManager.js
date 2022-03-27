export function saveUser(userData) {
    localStorage.setItem('currentUser', JSON.stringify(userData)); 
}

export function saveUserToken(token) {
    localStorage.setItem('token', token);
}

export function saveUserPermissions(perms) {
    localStorage.setItem('userPermissions', perms);
}

export function getToken() {
    return localStorage.getItem('token');
}

export function getUser() {
    if(
        localStorage.getItem('currentUser') && Object.keys(localStorage.getItem('currentUser')).length
    ){
        return JSON.parse(localStorage.getItem('currentUser'));
    }else{
        return null;
    }
}