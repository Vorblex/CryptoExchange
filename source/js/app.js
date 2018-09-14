'use strict';

//================================================================//
//*********** app.js ***********//
//*********** © Vorobey Alexander - Vorblex
//================================================================//

//------------ import
import Card from './card';

//------------ init

svg4everybody();

let
  cards = $('.coins__item'),
  currency = 'USD',
  cardsArr = [];

for(let card of cards) {
  card = new Card($(card));
  card.getData(currency);
  cardsArr.push(card);
}

$('.currency').on('tap', '.currency__link', function(e) {
  e.preventDefault();
  let $this = $(this);
  currency = $this.data('currency');
    
  for(let card of cardsArr) {
    card.getData(currency);
  }
});
