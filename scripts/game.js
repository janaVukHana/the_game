const typeOfGame = location.search.substring(1);

const h2 = document.querySelector('h2');
const form = document.querySelector('form');
const input = document.querySelector('input');
const button = document.querySelector('button');
const list = document.querySelector('.players');
const lis = document.querySelectorAll('li');
const play = document.querySelector('.play');
const playAgainBtn = document.querySelector('.play-again');
const messageContainer = document.querySelector('.message-container');
const label = document.querySelector('label');

if(typeOfGame === 'Drink') {
    h2.textContent = "Let's see who's paying drinks today?";
    label.textContent = 'Drinker...'
} else if(typeOfGame === 'Clean') {
    h2.textContent = "Who is cleaning house today?";
    label.textContent = 'Cleaner...'
} else if(typeOfGame === 'Cook') {
    h2.textContent = "Today cook is...";
    label.textContent = "Mr/Mrs Cheff..."
} else if (typeOfGame === 'Shop') {
    h2.textContent = "...aaaaaaand shop master today is?";
    label.textContent = "Shoper..."
}

let players = [];

form.addEventListener('submit', addPlayer);

function addPlayer(e) {
    players.push(input.value[0].toUpperCase() + input.value.slice(1).toLocaleLowerCase());
    
    const item = document.createElement('li');
    item.textContent = players[players.length - 1];
    list.appendChild(item);

    // remove player from game with click
    list.childNodes.forEach((li) => {
        li.addEventListener('click', (e) => {
            e.target.remove();
            players = players.filter(player => {
                console.log(typeof player,typeof e.target.textContent);
                return player !== e.target.textContent;
            })
            console.log(players);
        })
    })

    // reset input value
    input.value = '';

    e.preventDefault();
}

// play game
play.addEventListener('click', (e) => {

    if(players.length < 2) {
        console.log('less than two players');
    }
    else {
        input.style.display = 'none';
    
        const interval = setInterval(() => {
            const numOfPlayers = players.length;
            const randomPlayer = Math.floor(Math.random() * numOfPlayers);
    
            const lis = document.querySelectorAll('li');
            lis.forEach(li => {
                li.classList.remove('active');
            })
            lis[randomPlayer].classList.add('active');
            console.log(lis);
        }, 100);
        // end of interval
        
        setTimeout(() => {
            clearInterval(interval);
            const loser = document.querySelector('.active');
            const name = loser.innerHTML;
    
            const message = document.createElement('p');
            message.innerHTML = `${name} paying drink today.`;
            messageContainer.appendChild(message);
        }, 3000);
    }
})

// play game again
playAgainBtn.addEventListener('click', () => {
    window.location.reload();
})

// moving label

label.innerHTML = label.textContent
    .split('')
    .map(letter => `<span>${letter}</span>`)
    .join('')

const labelLetters = document.querySelectorAll('label span');
input.addEventListener('focus', () => {
    labelLetters.forEach((letter, index) => {
        letter.style.display = 'inline-block';
        letter.style.transform = `translateY(-35px)`;
        letter.style.transitionDelay = `${30 * index}ms`;
    })
})
  