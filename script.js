document.addEventListener('DOMContentLoaded', () => {
    let attempts = 0;
    const cardArray = generateRandomEmojis();
    cardArray.sort(() => 0.5 - Math.random());

    const gameBoard = document.querySelector('#game-board');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    function generateRandomEmojis() {
        const emojiCategories = {
            frutas: ['🍎', '🍌', '🍇', '🍉', '🍊', '🍓', '🍒', '🍍'],
            animais: ['🐶', '🐱', '🐭', '🐰', '🐹', '🦊', '🐻', '🦁'],
            veiculos: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🏍️'],
            natureza: ['🌳', '🌼', '🌲', '🌻', '🍂', '🌸', '🍃', '🍀'],
            simbolos: ['⭐', '❤️', '💖', '🎉', '🔔', '🔥', '🌈', '⚡'],
            clima: ['☀️', '☁️', '🌧️', '⛈️', '❄️', '🌪️', '🌊', '🌈'],
            comida: ['🍕', '🍔', '🍣', '🌭', '🍦', '🍩', '🍺', '🍰'],
            desportos: ['⚽', '🏀', '🏈', '🎾', '🏐', '⛷️', '🚴‍♂️', '🏋️']
        };

        const categories = Object.keys(emojiCategories);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const selectedEmojis = emojiCategories[randomCategory];

        return selectedEmojis.flatMap(emoji => [
            { name: emoji, img: emoji },
            { name: emoji, img: emoji }
        ]);
    }

    function createBoard() {
        cardArray.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', index);

            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');

            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');

            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');
            cardBack.textContent = item.img;

            cardInner.append(cardFront, cardBack);
            card.append(cardInner);
            card.addEventListener('click', flipCard);
            gameBoard.append(card);
        });
    }

    function flipCard() {
        const cardId = this.getAttribute('data-id');
        if (cardsChosenId.length < 2 && !this.classList.contains('flipped')) {
            this.classList.add('flipped');
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            attempts++;

            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.card');
        const [choiceOneId, choiceTwoId] = cardsChosenId;

        if (cardsChosen[0] === cardsChosen[1] && choiceOneId !== choiceTwoId) {
            cardsWon.push(cardsChosen);
            cards[choiceOneId].classList.add('matched');
            cards[choiceTwoId].classList.add('matched');
            cards[choiceOneId].removeEventListener('click', flipCard);
            cards[choiceTwoId].removeEventListener('click', flipCard);
        } else {
            cards[choiceOneId].classList.remove('flipped');
            cards[choiceTwoId].classList.remove('flipped');
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            alert(`Parabéns! Encontraste todos os pares! Tentativas: ${attempts}.`);
            setTimeout(() => location.reload(), 0);
        }
    }

    createBoard();
});
