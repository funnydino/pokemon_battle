function threatment(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

function threatmentRandom(num) {
  return Math.ceil(Math.random() * (num));
}

function btnCount(count, el) {
  const innerText = el.innerText;
  el.innerText = `${innerText} (${count})`;
  return function () {
    count--;
    if (count === 0) {
      el.disabled = true;
    }
    el.innerText = `${innerText} (${count})`;
    return count;
  }
}

function btnCount_2() {
  let clk = 0;
  let count = threatmentRandom(10);
  return function (btn) {
    clk++;
    console.log('Количество использований аптечки: ' + clk + '/' + count);
    let btnId = btn['id'];
    const $clicks = document.querySelector('.' + btnId + '__log');
    const $p = document.createElement('p');
    $p.innerText = clk + '/' + count;
    $clicks.insertBefore($p, $clicks.children[0]);
    if (clk >= count) {
      btn.disabled = true;
      $p.style = 'color: red';
    }
  };
}


export {
  threatment,
  btnCount,
  btnCount_2
};