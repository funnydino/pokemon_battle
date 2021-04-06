function playerKick(player1, player2, count) {
  let log = generateLog(player1, player2, count);
  console.log(log);
  $log(log);
}

function random(num) {
  return Math.ceil(Math.random() * (num));
}

function $log(log) {
  const $logs = document.querySelector('#logs');
  const $p = document.createElement('p');
  $p.innerText = log;
  $logs.insertBefore($p, $logs.children[0]);
}

function generateLog(firstPerson, secondPerson, count) {

  function damage() {
    return `[${firstPerson.hp.current} / ${firstPerson.hp.total}]`
  }
  const logs = [
    `${firstPerson.name} вспомнил что - то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. - ${count} HP ${damage()}`,
    `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. - ${count} HP ${damage()}`,
    `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. - ${count} HP ${damage()}`,
    `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар. - ${count} HP ${damage()}`,
    `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. - ${count} HP ${damage()}`,
    `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. - ${count} HP ${damage()}`,
    `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. - ${count} HP ${damage()}`,
    `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника - ${count} HP ${damage()}`,
    `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. - ${count} HP ${damage()}`,
    `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику. - ${count} HP ${damage()}`
  ];
  return logs[random(logs.length) - 1];
}

export {
  $log,
  playerKick
};