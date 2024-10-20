class GameApp {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.navbar = document.querySelector('.navbar');
        this.closeIcon = document.querySelector('.close-icon');
        this.spinner = document.querySelector('.spinner-container'); 
        this.init(); 
    }

    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        this.getGames('mmorpg');
    }

    handleNavClick(e) {
        this.navLinks.forEach(link => {
            link.classList.remove('active', 'text-info');
        });
        e.target.classList.add('active', 'text-info');
        
        let navName = e.target.innerHTML;
        this.getGames(navName); 
    }

    async getGames(category) {
        this.showSpinner(); 

        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '8bff3bedfamsh6b23a6577570651p14bc83jsn0ad08ad97ed4',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        try {
            let result = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?platform=browser&category=${category}&sort-by=release-date`, options);
            let response = await result.json();
            this.displayGames(response);
        } catch (error) {
            console.error('Error fetching games:', error);
        } finally {
            this.hideSpinner(); 
        }
    }

    displayGames(arr) {
        let cartona = "";
        arr.forEach(game => {
            cartona += `
                <div onclick='app.gameDetails(${game.id})' class="col-md-3 mt-5">
                    <div class="inner p-2 position-relative rounded-2">
                        <div class="game-img position-relative">
                            <img src="${game.thumbnail}" class="img-fluid" alt=""> 
                            <div class="layerblack"></div>  
                        </div>
                        <div class="game-name d-flex justify-content-between mt-2">
                            <small>${game.title}</small>
                            <span class="bg-primary rounded-2 btn">free</span>
                        </div>
                        <p class="small">${game.short_description}</p>
                        <div class="divs-co d-flex justify-content-between border-top pt-2 ps-0 pe-0">
                            <div>${game.genre}</div>
                            <div>${game.platform}</div>
                        </div>
                    </div>
                </div>`;
        });
        document.getElementById('myRow').innerHTML = cartona;
    }

    async getDetails(id) {
        this.showSpinner(); 
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '8bff3bedfamsh6b23a6577570651p14bc83jsn0ad08ad97ed4',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        try {
            let req = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
            let response = await req.json();
            this.displayDetails(response);
        } catch (error) {
            console.error('Error fetching game details:', error);
        } finally {
            this.hideSpinner(); 
        }
    }

    displayDetails(data) {
        let Box = `
            <div class="close-icon d-flex justify-content-between ms-5 mt-2 pb-3">
                <h1 class="fs-5">Details Game</h1>
                <i class="fa-solid fa-xmark text-white"></i>
            </div>
            <div class="game ms-5 mt-2 row">
                <div class="col-md-4">
                    <div class="inner-img">
                        <img src="${data.thumbnail}" class="img-fluid" alt="">
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="game-data">
                        <h1 class="fs-5">Title: <span>${data.title}</span></h1>
                        <h6 class="">Category : <span class="rounded-2 d-inline-block text-black">${data.genre}</span></h6>
                        <h6>Platform : <span class="rounded-2 d-inline-block text-black">${data.platform}</span></h6>
                        <h6>Status : <span class="rounded-2 d-inline-block text-black">${data.status}</span></h6>
                        <p class="mt-2 fs-6">${data.description}</p>
                        <button class="btn btn-outline-warning">Show Game</button>
                    </div>
                </div>
            </div>`;
        document.querySelector('.game-details').innerHTML = Box;

        let gameDetails = document.querySelector('.game-details');
        gameDetails.classList.remove('d-none');
        document.body.style.overflow = 'hidden';

        document.querySelector('.close-icon i').addEventListener('click', () => {
            gameDetails.classList.add('d-none');
            document.body.style.overflow = 'auto';
            this.navbar.classList.remove('d-none');
        });
    }

    gameDetails(id) {
        this.getDetails(id);
        this.navbar.classList.add('d-none');
    }

    
    showSpinner() {
        this.spinner.style.display = 'flex';
    }

    
    hideSpinner() {
        this.spinner.style.display = 'none';
    }
}


const app = new GameApp();
