class Storage {
    static getLastUsersFromStorage() {
        return localStorage.getItem('lastUsers') === null ? [] : JSON.parse(localStorage.getItem('lastUsers'));
    }

    static addUserToStorage(user) {
        let users = this.getLastUsersFromStorage();
        users.indexOf(user) === -1 && users.push(user);
        localStorage.setItem('lastUsers', JSON.stringify(users));
    }

    static clearLastUsersFromStorage() {
        localStorage.removeItem('lastUsers');
    }
}