class Selectors {
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressbar = document.getElementById(`progressbar-${name}`);
    this.allLogs = document.querySelectorAll('.btn-log');
    this.buttons = document.getElementsByClassName('button');
  }
}

class Pokemon extends Selectors {
  constructor({
    name,
    hp,
    type,
    selectors,
    attacks = []
  }) {
    super(selectors);
    this.name = name;
    this.hp = {
      current: hp,
      total: hp,
    };
    this.type = type;
    this.attacks = attacks;
    this.renderHP();
  }

  changeHP = (count, cb) => {
    this.hp.current -= count;
    if (this.hp.current <= 0) {
      this.hp.current = 0;
      alert('Бедный ' + this.name + ' проиграл бой!');
      this.allLogs.forEach($item => $item.remove());
      for (let i = 0; i < this.buttons.length; i++) {
        this.buttons[i].style.display = "none";
      }
      document.getElementById('reload-page').style = 'display: inline-block';
    }
    this.renderHP();
    cb && cb(count);
  }

  changeHealth = (count) => {
    this.hp.current += count;
    if (this.hp.current > this.hp.total) {
      this.hp.current = this.hp.total;
    }
    console.log('Восстановлено здоровья: ' + count);
    this.renderHP();
  }

  renderHP = () => {
    this.renderHPLife();
    this.renderProgressbarHP();
  }

  renderHPLife = () => {
    this.elHP.innerText = this.hp.current + ' / ' + this.hp.total;
  }

  renderProgressbarHP = () => {
    this.elProgressbar.style.width = this.hp.current / this.hp.total * 100 + '%';
    if (this.hp.current / this.hp.total <= .4) {
      this.elProgressbar.classList.add("low");
    } else if (this.hp.current / this.hp.total > .4) {
      this.elProgressbar.classList.remove("low");
    }
    if (this.hp.current / this.hp.total <= .2) {
      this.elProgressbar.classList.add("critical");
    } else if (this.hp.current / this.hp.total > .2) {
      this.elProgressbar.classList.remove("critical");
    }
  }
}

export default Pokemon;