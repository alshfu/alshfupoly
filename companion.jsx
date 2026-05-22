/* Companion mobile app — Alshfupoly */

// Phone-shaped device frame (chunky 16-bit handheld)
function Handheld({ children, w = 280, h = 520 }) {
  return (
    <div style={{
      width: w + 28, height: h + 96,
      background: '#2a1f48',
      boxShadow: 'inset 3px 3px 0 #5b438f, inset -3px -3px 0 #0e0a1a, 0 0 0 3px #000',
      padding: '20px 14px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      position: 'relative',
    }}>
      {/* top speaker grille */}
      <div style={{ display: 'flex', gap: 3, marginBottom: 10 }}>
        {[0,1,2,3,4,5,6,7].map(i => <div key={i} style={{ width: 4, height: 4, background: '#0e0a1a', boxShadow: 'inset 1px 1px 0 #000' }}/>)}
      </div>
      {/* screen */}
      <div style={{
        width: w, height: h,
        background: '#0a0614',
        boxShadow: 'inset 0 0 0 3px #000, inset 0 0 0 5px #5b438f, inset 0 0 0 7px #000',
        position: 'relative', overflow: 'hidden',
      }} className="scanlines">
        {children}
      </div>
      {/* dpad + buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: w, marginTop: 14 }}>
        <div style={{ position: 'relative', width: 48, height: 48 }}>
          <div style={{ position: 'absolute', left: 16, top: 0, width: 16, height: 48, background: '#0e0a1a', boxShadow: 'inset 1px 1px 0 #5b438f' }}/>
          <div style={{ position: 'absolute', left: 0, top: 16, width: 48, height: 16, background: '#0e0a1a', boxShadow: 'inset 1px 1px 0 #5b438f' }}/>
        </div>
        <div style={{ fontFamily: 'var(--f-head)', fontSize: 6, color: '#5b438f', letterSpacing: 1 }}>АЛШАПОЛИЯ</div>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#7a1820', boxShadow: 'inset 2px 2px 0 #c8313a, inset -2px -2px 0 #3a0a14' }}/>
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#1c4078', boxShadow: 'inset 2px 2px 0 #4b88c2, inset -2px -2px 0 #0e1a3a' }}/>
        </div>
      </div>
    </div>
  );
}

// ── Main HUD screen ──
function CompanionHUD({ char }) {
  const c = char || {
    name: 'МОРЕНА',
    class: 'НЕКРОМАНТ',
    level: 7, xp: 320, xpMax: 500,
    hp: 24, hpMax: 30,
    mana: 6, manaMax: 8,
    gold: 1240,
    str: 4, int: 9, luck: 5,
    region: 'Усыпальница Королей',
    quest: 'Найти Корону Алшаполии',
  };
  return (
    <div style={{ padding: 8, fontFamily: 'var(--f-body)', color: 'var(--bone)', height: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
      {/* top bar — gold + turn */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <CoinIcon size={12}/>
          <span style={{ fontFamily: 'var(--f-head)', fontSize: 9, color: 'var(--gold-bright)' }}>{c.gold}</span>
        </div>
        <div style={{ fontFamily: 'var(--f-head)', fontSize: 7, color: 'var(--bone-dim)' }}>ХОД 14 / РАУНД 3</div>
      </div>

      {/* portrait + class */}
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ position: 'relative' }}>
          <PixFrame tone="hex" thick={2} style={{ width: 64, height: 64, padding: 0 }}>
            <PixIllus kind="portrait" tint="crypt" w="100%" h="100%" style={{ width: 64, height: 64 }}/>
          </PixFrame>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ fontFamily: 'var(--f-head)', fontSize: 10, color: 'var(--gold-bright)' }}>{c.name}</div>
          <div style={{ fontFamily: 'var(--f-body)', fontSize: 11, color: 'var(--hex)' }}>« {c.class} » ур. {c.level}</div>
          <PixBar value={c.hp} max={c.hpMax} tone="blood" width={140} height={10} showText/>
          <PixBar value={c.mana} max={c.manaMax} tone="arcane" width={140} height={10} showText/>
        </div>
      </div>

      {/* XP bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--f-head)', fontSize: 7, color: 'var(--bone-dim)' }}>
          <span>ОПЫТ</span><span>{c.xp}/{c.xpMax}</span>
        </div>
        <PixBar value={c.xp} max={c.xpMax} tone="gold" width={232} height={8}/>
      </div>

      {/* stats triplet */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
        <StatBox label="СИЛ" value={c.str} tone="blood"/>
        <StatBox label="ИНТ" value={c.int} tone="arcane"/>
        <StatBox label="УДА" value={c.luck} tone="gold"/>
      </div>

      {/* current location */}
      <div style={{
        background: 'var(--panel)', padding: '4px 6px',
        boxShadow: 'inset 0 0 0 1px var(--rim)',
      }}>
        <div style={{ fontFamily: 'var(--f-head)', fontSize: 6, color: 'var(--bone-dim)' }}>ВЫ НА КЛЕТКЕ:</div>
        <div style={{ fontFamily: 'var(--f-disp)', fontSize: 18, color: 'var(--gold-bright)', lineHeight: 0.9, marginTop: 2 }}>{c.region}</div>
      </div>

      {/* quest tracker */}
      <div style={{
        background: 'var(--hex-dark)', padding: '4px 6px',
        boxShadow: 'inset 0 0 0 1px var(--hex)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--f-head)', fontSize: 6, color: 'var(--hex)' }}>
          <span>★ КВЕСТ</span>
          <span>2/3</span>
        </div>
        <div style={{ fontSize: 11, marginTop: 2, color: 'var(--bone)', lineHeight: 1.1 }}>{c.quest}</div>
      </div>

      {/* dice + actions */}
      <div style={{ flex: 1 }}/>
      <div style={{ display: 'flex', gap: 4 }}>
        <PixButton tone="gold" small style={{ flex: 1 }}>БРОСИТЬ 2D6</PixButton>
        <PixButton tone="blood" small style={{ flex: 1 }}>КОЛОДА</PixButton>
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        <PixButton tone="arcane" small style={{ flex: 1 }}>ТОРГ</PixButton>
        <PixButton tone="rim" small style={{ flex: 1 }}>МЕНЮ</PixButton>
      </div>

      {/* nav bar */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
        background: 'var(--ink)', boxShadow: 'inset 0 0 0 1px var(--rim)',
        padding: 3, gap: 2,
      }}>
        {[
          { ic: 'gate', label: 'КАРТА' },
          { ic: 'crypt', label: 'ЛИСТ' },
          { ic: 'tower', label: 'КОЛОДА' },
          { ic: 'market', label: 'РЫНОК' },
          { ic: 'scroll', label: 'КВЕСТ' },
        ].map((n, i) => (
          <div key={i} style={{
            background: i === 1 ? 'var(--panel-2)' : 'transparent',
            padding: '4px 2px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            cursor: 'pointer',
          }}>
            <TileIcon icon={n.ic} size={14}/>
            <div style={{ fontFamily: 'var(--f-head)', fontSize: 5, color: i === 1 ? 'var(--gold)' : 'var(--bone-dim)', letterSpacing: 0.5 }}>{n.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatBox({ label, value, tone }) {
  return (
    <div style={{
      background: 'var(--panel)',
      boxShadow: `inset 0 0 0 1px var(--${tone})`,
      padding: '3px 4px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <span style={{ fontFamily: 'var(--f-head)', fontSize: 7, color: `var(--${tone})` }}>{label}</span>
      <span style={{ fontFamily: 'var(--f-head)', fontSize: 10, color: 'var(--bone-bright)' }}>{value}</span>
    </div>
  );
}

// ── Battle screen — TCG-style combat ──
function CompanionBattle() {
  return (
    <div style={{ height: '100%', padding: 8, fontFamily: 'var(--f-body)', color: 'var(--bone)', display: 'flex', flexDirection: 'column', gap: 6, background: 'radial-gradient(ellipse at center, #1f1430 0%, #08051a 100%)' }}>
      {/* enemy bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <PixFrame tone="blood" thick={2} style={{ width: 36, height: 36, padding: 0 }}>
          <PixIllus kind="skull" tint="blood" w="100%" h="100%" style={{ width: 36, height: 36 }}/>
        </PixFrame>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--f-head)', fontSize: 7, color: 'var(--blood-bright)' }}>ЛИЧ ВЕЛЕКОР</div>
          <PixBar value={7} max={10} tone="blood" width={180} height={8} showText/>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <PixPip value={3} tone="arcane" size={20}/>
        </div>
      </div>

      {/* opponent's board (mini cards) */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
        <MiniCard atk={3} hp={2} mana={2} tone="hex"/>
        <MiniCard atk={5} hp={4} mana={4} tone="hex"/>
      </div>

      {/* battlefield divider */}
      <div style={{
        height: 2, background: 'var(--gold)',
        boxShadow: '0 0 8px var(--gold), inset 0 0 0 1px var(--gold-dark)',
        margin: '4px 0',
      }}/>

      {/* takes counter (preferans tricks) */}
      <div style={{ display: 'flex', justifyContent: 'space-around', fontFamily: 'var(--f-head)', fontSize: 7, color: 'var(--bone)' }}>
        <span>ЗАЯВКА: <span style={{ color: 'var(--gold)' }}>4</span></span>
        <span>ВЗЯТО: <span style={{ color: 'var(--toxic)' }}>2</span></span>
        <span>ОСТАЛОСЬ: <span style={{ color: 'var(--blood)' }}>2</span></span>
      </div>

      {/* my board */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
        <MiniCard atk={2} hp={3} mana={1} tone="arcane"/>
        <MiniCard atk={4} hp={5} mana={3} tone="arcane"/>
        <MiniCard atk={1} hp={1} mana={1} tone="arcane"/>
      </div>

      <div style={{ flex: 1 }}/>

      {/* my bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <PixFrame tone="hex" thick={2} style={{ width: 36, height: 36, padding: 0 }}>
          <PixIllus kind="portrait" tint="crypt" w="100%" h="100%" style={{ width: 36, height: 36 }}/>
        </PixFrame>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--f-head)', fontSize: 7, color: 'var(--bone-bright)' }}>МОРЕНА</div>
          <PixBar value={9} max={10} tone="blood" width={180} height={8} showText/>
        </div>
        <PixPip value={6} tone="arcane" size={20}/>
      </div>

      {/* hand */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 2, paddingTop: 4 }}>
        <MiniCard atk={3} hp={3} mana={3} tone="hex" inHand/>
        <MiniCard atk={1} hp={1} mana={1} tone="arcane" inHand/>
        <MiniCard atk={5} hp={4} mana={5} tone="hex" inHand glow/>
        <MiniCard atk={2} hp={6} mana={4} tone="bone" inHand/>
      </div>

      <div style={{ display: 'flex', gap: 4 }}>
        <PixButton tone="blood" small style={{ flex: 1 }}>АТАКА</PixButton>
        <PixButton tone="gold" small style={{ flex: 1 }}>КОНЕЦ ХОДА</PixButton>
      </div>
    </div>
  );
}

function MiniCard({ atk, hp, mana, tone = 'rim', inHand, glow }) {
  return (
    <div style={{
      position: 'relative', width: 38, height: inHand ? 56 : 48,
      background: 'var(--panel)',
      boxShadow: glow
        ? `inset 0 0 0 1px var(--ink), inset 0 0 0 2px var(--gold-bright), 0 0 8px var(--gold)`
        : `inset 0 0 0 1px var(--ink), inset 0 0 0 2px var(--${tone})`,
      transform: inHand ? `translateY(${Math.random()*2}px) rotate(${(Math.random()-0.5)*4}deg)` : 'none',
    }}>
      {mana !== undefined && (
        <div style={{ position: 'absolute', top: -3, left: -3 }}>
          <PixPip value={mana} tone="arcane" size={14}/>
        </div>
      )}
      <PixIllus kind="creature" tint="crypt" w="100%" h="100%" style={{ width: '100%', height: '100%' }}/>
      <div style={{ position: 'absolute', bottom: -3, left: -3 }}>
        <PixPip value={atk} tone="gold" size={14}/>
      </div>
      <div style={{ position: 'absolute', bottom: -3, right: -3 }}>
        <PixPip value={hp} tone="blood" size={14}/>
      </div>
    </div>
  );
}

// ── Map / spectator view ──
function CompanionMap() {
  const players = [
    { tile: 0, color: '#c8313a' }, { tile: 5, color: '#4b88c2' },
    { tile: 13, color: '#66b542' }, { tile: 22, color: '#e8b84c' },
    { tile: 30, color: '#9558d6' }, { tile: 37, color: '#f0e3b8' },
  ];
  return (
    <div style={{ height: '100%', padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontFamily: 'var(--f-head)', fontSize: 8, color: 'var(--gold)', textAlign: 'center', padding: 2 }}>★ КАРТА АЛШАПОЛИИ ★</div>
      <div style={{ background: 'var(--void)', padding: 4, boxShadow: 'inset 0 0 0 2px var(--rim)', display: 'flex', justifyContent: 'center' }}>
        <div style={{ transform: 'scale(0.32)', transformOrigin: 'top center', marginBottom: -560 }}>
          <GameBoard players={players} owners={{ 1: { color: '#c8313a' }, 4: { color: '#c8313a' }, 13: { color: '#66b542' }, 22: { color: '#e8b84c' }, 27: { color: '#e8b84c' }, 35: { color: '#9558d6' } }} />
        </div>
      </div>
      {/* players list */}
      <div style={{ background: 'var(--panel)', padding: 4, fontSize: 10 }}>
        <div style={{ fontFamily: 'var(--f-head)', fontSize: 7, color: 'var(--bone-dim)', marginBottom: 2 }}>ИГРОКИ (8)</div>
        {[
          { name: 'МОРЕНА', col: '#9558d6', lvl: 7, owned: 3 },
          { name: 'КАЭЛЬ', col: '#c8313a', lvl: 6, owned: 4 },
          { name: 'ТОРВИН', col: '#4b88c2', lvl: 5, owned: 2 },
          { name: 'ВЕЛЬДА', col: '#e8b84c', lvl: 8, owned: 5 },
        ].map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '1px 0' }}>
            <Pawn color={p.col} size={6}/>
            <span style={{ flex: 1, color: 'var(--bone)' }}>{p.name}</span>
            <span style={{ color: 'var(--bone-dim)', fontFamily: 'var(--f-head)', fontSize: 6 }}>ур.{p.lvl}</span>
            <span style={{ color: 'var(--gold)', fontFamily: 'var(--f-head)', fontSize: 6 }}>★{p.owned}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Handheld, CompanionHUD, CompanionBattle, CompanionMap, MiniCard });
