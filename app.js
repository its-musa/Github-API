const githubForm = document.querySelector('#github-form');
const userNameInput = document.querySelector('#github-name');
const lastUsersList = document.querySelector('#last-users');
const clearLastUsersButton = document.querySelector('#clear-last-users');

const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners() {
    githubForm.addEventListener('submit', getData);
    clearLastUsersButton.addEventListener('click', clearLastUsers);
    document.addEventListener('DOMContentLoaded', getLastUsers);
}

function getData(e) {
    let username = userNameInput.value.trim();

    if (username === "") {
        alert('Please enter a valid username!')
    } else {
        github.getGitData(username)
        .then(response => {
            if (response.user.message === 'Not Found') {
                ui.displayError("User couldn't be found!");    
            } else {
                ui.displayUserInfo(response.user);
                ui.displayRepoInfo(response.repos);
                ui.addLastUserToUI(username);
                Storage.addUserToStorage(username);
            }
        })
        .catch(error => ui.displayError(error))
    }

    ui.clearInput();
    
    e.preventDefault();
}

function clearLastUsers() {
    if (confirm('Are you sure?')) {
        Storage.clearLastUsersFromStorage();
        ui.clearLastUsersFromUI();   
    }
}

function getLastUsers() {
    ui.loadLastUsersToUI(Storage.getLastUsersFromStorage());
}