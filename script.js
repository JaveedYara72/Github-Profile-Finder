const APIURL = 'https://api.github.com/users/'

const form = document.getElementById('form')
const main = document.getElementById('main')
const search = document.getElementById('search')

async function getuser(username){
    // // axios() is an object which can handle api requests
    // axios(APIURL + username) //This returns a promise
    //     .then(res => console.log(res.data))
    //     .catch(err => console.log(err))
        try{
            const res = await axios(APIURL + username)
            createusernCard(res.data)
            getRepos(username)
        }catch(err){
            if(err.response.status == 404){
                createErrorCard("No Profile with this username")
            }
            
        }
    
}

function createusernCard(user){
    const CardHTML = `
    <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul>
                    <li>${user.followers}<strong> Followers</strong></li>
                    <br>
                    <li>${user.following}<strong> Following </strong></li>
                    <br>
                    <li>${user.public_repos}<strong> Repos</strong></li>
                </ul>

                <div id="repos">
                    <a href="#" class="repo">Repo 1</a>
                    <a href="#" class="repo">Repo 2</a>
                    <a href="#" class="repo">Repo 3</a>
                </div>
            </div>
        </div>
    `

    main.innerHTML = CardHTML
}

async function getRepos(username){
    try{
        const res = await axios(APIURL + username + '/repos')
        addReposToCard(res.data)
    }catch(err){
            createErrorCard("Problem fetching repos")
        
        
    }
}

function createErrorCard(message){
    const CardHTML = `
        <div class = "card">
            <h1>${message}</h1>
        </div>
    `
    main.innerHTML = CardHTML
}

function addReposToCard(repos){
    const reposelement = document.getElementById('repos')

    repos
        .slice(0,10)
        .forEach(repo => {
            const repoEl = document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name
            repoEl.appendChild(repoEl)
        });
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    const user = search.value
    if(user){
        getuser(user)
        search.value = ''

    }
})