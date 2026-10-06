const rand = (min, max) => min + Math.random() * (max - min);
const make = (tag, cls, css) => {
  const el = document.createElement(tag);
  el.className = cls;
  el.style.cssText = css;
  return el;
};

const head = document.querySelector('.head');
const petals = [];

// Scale the whole scene to fit any screen
const fit = () => document.documentElement.style.setProperty(
  '--s', Math.min(innerWidth / 720, innerHeight / 760, 1.6));
fit();
addEventListener('resize', fit);

// 6 outer + 6 inner petals fanned out like a lily seen from the side, then the stamens
for (let layer = 0; layer < 2; layer++) {
  for (let i = 0; i < 6; i++) {
    const angle = layer ? -80 + i * 32 : -100 + i * 40;
    const p = make('div', `petal ${layer ? 'inner' : 'outer'}`, `--a:${angle}deg;--i:${i}`);
    head.append(p);
    petals.push(p);
  }
}
[-34, -17, 0, 17, 34].forEach((a, i) => {
  head.append(make('div', a ? 'st' : 'st pistil',
    `--a:${a}deg;--l:${a ? 92 + (i % 2) * 10 : 124}px;animation-delay:${3 + i * .1}s`));
});

// Floating lights
for (let i = 0; i < 18; i++) {
  document.body.append(make('i', 'sp',
    `--x:${rand(0, 100)}vw;--z:${rand(3, 8)}px;--t:${rand(7, 14)}s;--dl:${-rand(0, 10)}s;--dx:${rand(-40, 40)}px`));
}

// Start animations shortly after load
let ready = false;
onload = () => setTimeout(() => {
  document.body.classList.remove('not-loaded');
  setTimeout(() => (ready = true), 4600);
}, 600);

// Each click or tap drops one random petal; when all are gone the flower blooms again
let left = [...petals];
addEventListener('pointerdown', () => {
  if (!ready || !left.length) return;
  document.body.classList.add('touched');

  const p = left.splice(Math.floor(Math.random() * left.length), 1)[0];
  p.style.setProperty('--dx', `${rand(-140, 140)}px`);
  p.style.setProperty('--sp', `${rand(-140, 140)}deg`);
  p.classList.add('fall');

  if (!left.length) {
    setTimeout(() => {
      petals.forEach(el => el.classList.remove('fall'));
      left = [...petals];
      ready = false;
      setTimeout(() => (ready = true), 4200);
    }, 3800);
  }
});