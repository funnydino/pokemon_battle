import Pokemon from "./pokemon.js";
import {
  threatment,
  btnCount,
  btnCount_2
} from "./utils.js";
import {
  $log,
  playerKick
} from "./logs.js";

class Game {
  getPokemons = async () => {
    const response = await fetch('https://reactmarathon-api.netlify.app/api/pokemons');
    const body = await response.json();
    return body;
  }
  changeHealth = async (pokemon_a, btnId, pokemon_b) => {
    let response = await fetch('https://reactmarathon-api.netlify.app/api/fight?player1id=' + pokemon_a + '&attackId=' + btnId + '&player2id=' + pokemon_b);
    const body = await response.json();
    return body;
  }

  // selectEnemy = async () => {
  //   const response = await fetch('https://reactmarathon-api.netlify.app/api/pokemons?random=true&exceptId=25');
  //   const body = await response.json();
  //   return body;
  // }

  start = async () => {
    const pokemons = await this.getPokemons();
    console.log(pokemons);

    // const pikachu = pokemons.find(item => item.name === 'Pikachu');

    $log('Да начнётся битва!');

    function selectPlayer(i) {
      return Math.ceil(Math.random() * (i) - 1);
    }

    let a = selectPlayer(pokemons.length);
    console.log('Порядковый номер твоего Покемона: ' + a);

    let b = selectPlayer(pokemons.length);
    console.log('Порядковый номер Покемона противника: ' + b);

    for (a < pokemons.length; a == b; b += 1) {};

    if (b == pokemons.length) {
      b -= 2;
    }

    console.log('Новый порядковый номер Покемона противника (если совпадает): ' + b);

    let player1 = new Pokemon({
      ...pokemons[a],
      selectors: 'player1',
    });
    let pokemon_a = pokemons[a]['id'];
    console.log('Покемон A ID: ' + pokemon_a);

    const $elImg1 = document.getElementById('img-player1');
    $elImg1.src = pokemons[a].img;
    const $elName1 = document.getElementById('name-player1');
    $elName1.innerText = pokemons[a].name;

    let player2 = new Pokemon({
      ...pokemons[b],
      selectors: 'player2',
    });
    let pokemon_b = pokemons[b]['id'];
    console.log('Покемон B ID: ' + pokemon_b);

    const $elImg2 = document.getElementById('img-player2');
    $elImg2.src = pokemons[b].img;
    const $elName2 = document.getElementById('name-player2');
    $elName2.innerText = pokemons[b].name;

    const $control = document.querySelector('.control-player1');

    player1.attacks.forEach(item => {
      const $btn = document.createElement('button');
      $btn.classList.add('button');
      $btn.innerText = item.name;
      $btn.id = item.id;
      const countBtn = btnCount(item.maxCount, $btn);
      $btn.addEventListener('click', async () => {
        console.log('Click button', $btn.innerText);
        let chgHlth = await this.changeHealth(pokemon_a, item.id, pokemon_b);
        console.log(chgHlth, 'ID Покемон A: ' + pokemon_a, 'ID Кнопки: ' + item.id, 'ID Покемон B: ' + pokemon_b);
        let count = chgHlth.kick.player1;
        player2.changeHP(count);
        playerKick(player2, player1, count);
        let count2 = chgHlth.kick.player2;
        player1.changeHP(count2);
        playerKick(player1, player2, count2);
        countBtn();
      });
      $control.appendChild($btn);
    });

    function $getElById(id) {
      return document.getElementById(id);
    }

    const count6 = btnCount_2();
    const $btn_6 = $getElById('first-aid__player1');

    $btn_6.addEventListener('click', function () {
      console.log(player1.name + ' Using First Aid Kit!');
      player1.changeHealth(threatment(50, 100));
      count6($btn_6);
    })
  }
}

const game = new Game();
game.start();