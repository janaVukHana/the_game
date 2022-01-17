// loading 

const loadingContainer = document.querySelector('.loading-container');
const loading = document.querySelector('.loading');
const load = document.querySelector('.load');

const bgImgs = ['deadpool.jpeg', 'ball-net-basketball-game-arena.webp', 'hot-girl.jpg', 'new-york-bb.webp', 'new-york-bb_2.webp', 'new-york-bb_3.webp', 'quokka.png'];
const randomImage = Math.floor(Math.random() * bgImgs.length);
loading.style.backgroundImage = `url('./images/${bgImgs[randomImage]}')`;

let count = 0;
let interval = '';

setTimeout(() => {
    interval = setInterval(run, 10);
}, 2000);

function run() {
    count++;
    load.textContent = count + '%';
    load.style.opacity = scale(count, 0, 100, 1, 0);
    loading.style.filter = `blur(${scale(count, 0, 100, 30, 0)}px)`;
    
    if(count > 99) {
        setTimeout(remove, 1000)
        clearInterval(interval);
    }
}

function remove() {
    loadingContainer.style.opacity = '0';
    setTimeout(() => {
        loadingContainer.style.display = 'none';
    }, 100)
}

// scale function
const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

// navigation
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('close');
})

let gameTitle = '';
// nav links 
const links = document.querySelectorAll('nav a');
links.forEach(link => {
    link.addEventListener('click', (e) => {
        gameTitle = e.target.textContent;
        console.log(gameTitle);
        window.location.href = `game.html?${gameTitle}`;
    })
})
