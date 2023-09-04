class UI {
    constructor() {
        this.userNameInput = document.querySelector('#github-name');
        this.profile = document.querySelector('#profile');
        this.repos = document.querySelector('#repos');
        this.lastUsersList = document.querySelector('#last-users');
        this.searchCard = document.querySelector('.search-card');
    }

    clearInput() {
        this.userNameInput.value = "";
    }

    displayUserInfo(user) {
        this.profile.innerHTML = `
            <div class="card card-body mb-3 bg-dark border">
                <div class="row">
                    <div class="col-md-4">
                        <a href="${user.html_url}" target="_blank">
                            <img class="img-fluid mb-2" src="${user.avatar_url}">
                        </a>
                        <hr class="border-white">
                        <div id="fullName"><strong class="text-white">${user.name}</strong></div>
                        <hr class="border-white">
                        <div id="bio" class="text-white">${user.bio}</div>
                    </div>
                    <div class="col-md-8">
                        <button class="btn btn-secondary">
                            Follower <span class="badge badge-light">${user.followers}</span>
                        </button>
                        <button class="btn btn-primary">
                            Following <span class="badge badge-light">${user.following}</span>
                        </button>
                        <button class="btn btn-danger">
                            Repos <span class="badge badge-light">${user.public_repos}</span>
                        </button>
                        <hr class="border-white">
                        <li class="list-group">
                        <li class="list-group-item text-white mb-3">
                            <img src="images/company.png" class="bg-white rounded me-2" width="30px"> <span id="company">${user.company}</span>
                        </li>
                        <li class="list-group-item text-white mb-3">
                            <img src="images/location.png" class="bg-white rounded p-1 me-2" width="30px"> <span id="location">${user.location}</a>
                        </li>
                        <li class="list-group-item text-white">
                            <img src="images/mail.png" class="bg-white rounded p-1 me-2" width="30px"> <span id="email">${user.email}</span>
                        </li>

                    </div>
                </div>
            </div>
        `;
    }

    displayRepoInfo(repos) {
        this.repos.innerHTML = '';

        repos.forEach(repo => {
            this.repos.innerHTML += `
                <div class="mb-2 card bg-dark text-white p-3" style="border:none;">
                    <div class="row mb-3">
                        <div class="col-md-2">
                            <a href="${repo.html_url}" target="_blank" class="text-info" id="repoName">${repo.name}</a>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-secondary">
                                Stars <span class="badge badge-light" id="repoStar">${repo.stargazers_count}</span>
                            </button>

                            <button class="btn btn-primary">
                                Forks <span class="badge badge-light" id="repoFork">${repo.forks}</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    displayError(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger';
        alert.textContent = message;

        this.searchCard.appendChild(alert);

        setTimeout(() => alert.remove(), 2000);
    }

    addLastUserToUI(lastUser) {
        let users = Storage.getLastUsersFromStorage();
        users.indexOf(lastUser) === -1 && (this.lastUsersList.innerHTML += `<li class="list-group-item bg-dark text-white">${lastUser}</li>`);
    }

    loadLastUsersToUI(lastUsers) {
        lastUsers.forEach(lastUser => {
            this.lastUsersList.innerHTML += `<li class="list-group-item bg-dark text-white">${lastUser}</li>`;
        });
    }

    clearLastUsersFromUI() {
        this.lastUsersList.innerHTML = '';
        while (this.lastUsersList.lastElementChild !== null) {
            this.lastUsersList.firstElementChild.remove();
        }
    }
}