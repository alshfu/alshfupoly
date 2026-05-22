/* Main app — assembles all sections into a DesignCanvas */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#e8b84c", "#c8313a", "#9558d6"],
  "headingFont": "'Press Start 2P', monospace",
  "displayFont": "'Jersey 15', monospace",
  "bodyFont": "'Pixelify Sans', monospace",
  "frameStyle": "rim",
  "illusDetail": "medium",
  "boardLayout": "classic"
}/*EDITMODE-END*/;

function App() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // expose tweak vars to CSS root
  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--f-head', tw.headingFont);
    r.style.setProperty('--f-disp', tw.displayFont);
    r.style.setProperty('--f-body', tw.bodyFont);
    if (tw.palette && tw.palette.length >= 3) {
      const [g, b, h] = tw.palette;
      r.style.setProperty('--gold', g);
      r.style.setProperty('--blood', b);
      r.style.setProperty('--hex', h);
    }
  }, [tw.headingFont, tw.displayFont, tw.bodyFont, tw.palette]);

  return (
    <>
      <DesignCanvas>
        {/* SECTION: cover / hero */}
        <DCSection id="cover" title="01 · Обложка и сеттинг" subtitle="Тёмное фэнтези, 16-bit Mega Drive">
          <DCArtboard id="cover" label="Cover · вид сверху" width={1100} height={700}>
            <CoverArtboard />
          </DCArtboard>
          <DCArtboard id="lore" label="Лор · 4 фракции" width={680} height={700}>
            <LoreArtboard />
          </DCArtboard>
          <DCArtboard id="loop" label="Игровой цикл" width={680} height={700}>
            <LoopArtboard />
          </DCArtboard>
        </DCSection>

        {/* SECTION: board */}
        <DCSection id="board" title="02 · Игровое поле" subtitle="Кольцо из 40 готических локаций, центр — деки и сюжетный замок">
          <DCArtboard id="board-classic" label="A · Каноничный — квадрат 11×11" width={920} height={920}>
            <BoardArtboard variant="classic" />
          </DCArtboard>
          <DCArtboard id="board-zoom" label="B · Сектор крупным планом" width={680} height={920}>
            <BoardZoomArtboard />
          </DCArtboard>
        </DCSection>

        {/* SECTION: creature cards */}
        <DCSection id="creatures" title="03 · Карточки существ (TCG)" subtitle="Hearthstone-логика: мана, атака, здоровье. 4 редкости, 6 фракций">
          <DCArtboard id="hand" label="Рука игрока — 6 карт" width={1200} height={420}>
            <CreatureHandArtboard />
          </DCArtboard>
          <DCArtboard id="creature-detail" label="Карточка крупно" width={420} height={620}>
            <CreatureDetailArtboard />
          </DCArtboard>
          <DCArtboard id="rarity" label="Шкала редкостей" width={820} height={620}>
            <RarityArtboard />
          </DCArtboard>
        </DCSection>

        {/* SECTION: location/property cards */}
        <DCSection id="locations" title="04 · Карточки собственности" subtitle="Монопольный «титул-дид» в готической ливрее. 8 регионов">
          <DCArtboard id="loc-set" label="Регион Некрополь — 3 клетки" width={760} height={420}>
            <LocationSetArtboard />
          </DCArtboard>
          <DCArtboard id="loc-detail" label="Карточка крупно" width={440} height={620}>
            <LocationDetailArtboard />
          </DCArtboard>
        </DCSection>

        {/* SECTION: bidding table */}
        <DCSection id="bidding" title="05 · Стол торгов (преферанс-логика)" subtitle="Заявка взяток втёмную перед каждой битвой за клетку">
          <DCArtboard id="bidding" label="Экран торгов · 4 игрока" width={1000} height={680}>
            <BiddingTable/>
          </DCArtboard>
        </DCSection>

        {/* SECTION: companion app */}
        <DCSection id="app" title="06 · Цифровое компаньон-приложение" subtitle="Карманный handheld-интерфейс. HUD, бой, карта мира">
          <DCArtboard id="hud" label="HUD · мой герой" width={340} height={680}>
            <Handheld><CompanionHUD/></Handheld>
          </DCArtboard>
          <DCArtboard id="battle" label="Бой · TCG + торги" width={340} height={680}>
            <Handheld><CompanionBattle/></Handheld>
          </DCArtboard>
          <DCArtboard id="map" label="Карта мира · 8 игроков" width={340} height={680}>
            <Handheld><CompanionMap/></Handheld>
          </DCArtboard>
        </DCSection>

        {/* SECTION: RPG sheet */}
        <DCSection id="rpg" title="07 · Лист персонажа · RPG-система" subtitle="Уровни, характеристики, ветка класса, инвентарь">
          <DCArtboard id="sheet" label="Полный лист персонажа" width={1000} height={780}>
            <RPGSheet/>
          </DCArtboard>
        </DCSection>

        {/* SECTION: rules */}
        <DCSection id="rules" title="08 · Памятка правил" subtitle="Распечатать на A4, держать у каждого">
          <DCArtboard id="rules" label="Cheat sheet · одна страница" width={900} height={920}>
            <RulesCheat/>
          </DCArtboard>
        </DCSection>

        {/* SECTION: contents */}
        <DCSection id="contents" title="09 · Содержимое коробки" subtitle="Что лежит в коробке настольной игры">
          <DCArtboard id="box" label="Боксшот и компоненты" width={1100} height={640}>
            <BoxContentsArtboard/>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>
      <TweaksPanel title="Tweaks · Алшаполия">
        <TweakSection label="Тема палитры"/>
        <TweakColor label="Палитра (золото · кровь · магия)"
          value={tw.palette}
          options={[
            ['#e8b84c', '#c8313a', '#9558d6'],
            ['#ff9d3a', '#5b1c2a', '#3a7ab8'],
            ['#9bdb6e', '#c8313a', '#b8e0ff'],
            ['#f5ebcc', '#3a7ab8', '#c8313a'],
            ['#e88030', '#3a8a4e', '#6a3aa8'],
          ]}
          onChange={(v) => setTweak('palette', v)}/>
        <TweakSection label="Типографика"/>
        <TweakSelect label="Заголовки"
          value={tw.headingFont}
          options={[
            { value: "'Press Start 2P', monospace", label: 'Press Start 2P' },
            { value: "'Silkscreen', monospace", label: 'Silkscreen' },
            { value: "'Pixelify Sans', monospace", label: 'Pixelify Bold' },
          ]}
          onChange={(v) => setTweak('headingFont', v)}/>
        <TweakSelect label="Дисплей (большие)"
          value={tw.displayFont}
          options={[
            { value: "'Jersey 15', monospace", label: 'Jersey 15' },
            { value: "'Jersey 10', monospace", label: 'Jersey 10' },
            { value: "'Press Start 2P', monospace", label: 'Press Start 2P' },
          ]}
          onChange={(v) => setTweak('displayFont', v)}/>
        <TweakSelect label="Body"
          value={tw.bodyFont}
          options={[
            { value: "'Pixelify Sans', monospace", label: 'Pixelify Sans' },
            { value: "'Silkscreen', monospace", label: 'Silkscreen' },
            { value: 'monospace', label: 'System Mono' },
          ]}
          onChange={(v) => setTweak('bodyFont', v)}/>
        <TweakSection label="Иллюстрации"/>
        <TweakRadio label="Детализация" value={tw.illusDetail}
          options={['low', 'medium', 'high']}
          onChange={(v) => setTweak('illusDetail', v)}/>
        <TweakRadio label="Стиль рамок" value={tw.frameStyle}
          options={['rim', 'gold', 'blood']}
          onChange={(v) => setTweak('frameStyle', v)}/>
      </TweaksPanel>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// COVER ARTBOARD
// ─────────────────────────────────────────────────────────────
function CoverArtboard() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(180deg, #0a0614 0%, #1a1230 50%, #2a1f48 100%)',
      position: 'relative', overflow: 'hidden',
    }} className="scanlines">
      {/* stars */}
      <svg viewBox="0 0 220 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.6 }}>
        {Array.from({ length: 80 }, (_, i) => {
          const x = (i * 37) % 220, y = (i * 19) % 80;
          return <rect key={i} x={x} y={y} width="1" height="1" fill="#e8d9b0"/>;
        })}
      </svg>

      {/* castle skyline silhouette */}
      <svg viewBox="0 0 220 140" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '60%', opacity: 0.9 }}>
        <g>
          <rect x="0" y="100" width="220" height="40" fill="#0a0614"/>
          {/* far towers */}
          <rect x="20" y="80" width="6" height="20" fill="#0a0614"/>
          <rect x="40" y="70" width="8" height="30" fill="#0a0614"/>
          <rect x="60" y="60" width="10" height="40" fill="#0a0614"/>
          <polygon points="60,60 70,60 65,52" fill="#0a0614"/>
          {/* central castle */}
          <rect x="90" y="50" width="40" height="50" fill="#0a0614"/>
          <rect x="86" y="56" width="4" height="44" fill="#0a0614"/>
          <rect x="130" y="56" width="4" height="44" fill="#0a0614"/>
          {/* crenellations */}
          {[90,96,102,108,114,120,126].map(x => <rect key={x} x={x} y="46" width="3" height="4" fill="#0a0614"/>)}
          {/* main tower */}
          <rect x="104" y="20" width="12" height="36" fill="#0a0614"/>
          <polygon points="102,20 118,20 110,12" fill="#0a0614"/>
          {/* windows */}
          <rect x="108" y="32" width="4" height="4" fill="#e8b84c" opacity="0.8"/>
          <rect x="108" y="42" width="4" height="3" fill="#e8b84c" opacity="0.6"/>
          <rect x="100" y="68" width="3" height="4" fill="#c8313a" opacity="0.7"/>
          <rect x="116" y="68" width="3" height="4" fill="#c8313a" opacity="0.7"/>
          {/* right towers */}
          <rect x="150" y="70" width="10" height="30" fill="#0a0614"/>
          <rect x="170" y="60" width="12" height="40" fill="#0a0614"/>
          <polygon points="168,60 184,60 176,52" fill="#0a0614"/>
          <rect x="174" y="74" width="3" height="4" fill="#e8b84c" opacity="0.6"/>
          <rect x="195" y="80" width="6" height="20" fill="#0a0614"/>
        </g>
      </svg>

      {/* moon */}
      <div style={{ position: 'absolute', top: 60, right: 80, width: 72, height: 72, borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #f5ebcc 0%, #e8d9b0 40%, #b8a778 70%, #6a5a3a 100%)',
        boxShadow: '0 0 60px rgba(232,217,176,0.4)' }} className="pix"/>

      {/* title */}
      <div style={{ position: 'absolute', top: 90, left: 80, right: 80, textAlign: 'center', zIndex: 4 }}>
        <div style={{ fontFamily: 'var(--f-head)', fontSize: 12, color: 'var(--bone-dim)', letterSpacing: 4 }}>★ В ТЁМНЫХ ЗЕМЛЯХ ★</div>
        <div style={{ fontFamily: 'var(--f-disp)', fontSize: 140, color: 'var(--gold-bright)',
          textShadow: '4px 4px 0 #0a0614, 6px 6px 0 var(--gold-dark), 0 0 30px rgba(232,184,76,0.4)',
          letterSpacing: 6, lineHeight: 0.85, marginTop: 8,
        }}>АЛШАПОЛИЯ</div>
        <div style={{ fontFamily: 'var(--f-disp)', fontSize: 36, color: 'var(--blood)', letterSpacing: 3, marginTop: 4, textShadow: '2px 2px 0 #0a0614' }}>КОРОЛЕВСТВО ТЕНЕЙ</div>
      </div>

      {/* tagline at bottom */}
      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', zIndex: 4 }}>
        <div style={{ fontFamily: 'var(--f-body)', fontSize: 20, color: 'var(--bone-bright)', textShadow: '2px 2px 0 #0a0614', lineHeight: 1.3 }}>
          МОНОПОЛИЯ × HEARTHSTONE × ПРЕФЕРАНС × RPG
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16, fontFamily: 'var(--f-head)', fontSize: 8, color: 'var(--gold)', letterSpacing: 2 }}>
          <span>2-8 ИГРОКОВ</span>
          <span style={{ color: 'var(--rim)' }}>·</span>
          <span>60-120 МИН</span>
          <span style={{ color: 'var(--rim)' }}>·</span>
          <span>16+</span>
        </div>
      </div>

      {/* corner stamp */}
      <div style={{ position: 'absolute', bottom: 20, right: 20, transform: 'rotate(-8deg)', padding: '6px 10px',
        boxShadow: 'inset 0 0 0 2px var(--blood), 0 0 0 1px #000', color: 'var(--blood-bright)',
        fontFamily: 'var(--f-head)', fontSize: 8, letterSpacing: 1, background: 'rgba(122,24,32,0.2)' }}>
        v0.1 · ALPHA
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LORE / FACTIONS
// ─────────────────────────────────────────────────────────────
function LoreArtboard() {
  const factions = [
    { name: 'РЫЦАРИ ЗАРИ', desc: 'Лоялисты короны. Танки, исцеление, налоговый бонус.', tone: 'arcane', kind: 'castle' },
    { name: 'ОРДЕН ЧЕРВЯ', desc: 'Культ погибели. Жертвоприношения, проклятия, призыв.', tone: 'blood', kind: 'skull' },
    { name: 'ВОЛЬНОЕ КУПЕЧЕСТВО', desc: 'Гильдии и шпионы. Лучшие торги, дешевле клетки.', tone: 'gold', kind: 'market' },
    { name: 'ВЫСШИЙ КОВЕН', desc: 'Архимаги. Сильные спеллы, контроль колоды.', tone: 'hex', kind: 'tower' },
  ];
  return (
    <div style={{ height: '100%', padding: 24, background: 'var(--void)', display: 'flex', flexDirection: 'column', gap: 12, position: 'relative' }} className="scanlines">
      <div>
        <div style={{ fontFamily: 'var(--f-head)', fontSize: 8, color: 'var(--bone-dim)', letterSpacing: 2 }}>★ ЧЕТЫРЕ СИЛЫ ★</div>
        <div style={{ fontFamily: 'var(--f-disp)', fontSize: 56, color: 'var(--gold-bright)', lineHeight: 0.85, marginTop: 6, letterSpacing: 1 }}>Кто правит руинами</div>
        <div style={{ fontFamily: 'var(--f-body)', fontSize: 13, color: 'var(--bone-dim)', marginTop: 6, lineHeight: 1.4, textWrap: 'pretty' }}>
          После падения Алой Луны королевство раскололось на четыре фракции. Выбери класс на 3 уровне — он определяет твою колоду, дерево навыков и стиль торгов.
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, flex: 1 }}>
        {factions.map((f, i) => (
          <PixFrame key={i} tone={f.tone} thick={3} style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <PixIllus kind={f.kind} tint={f.tone === 'hex' ? 'crypt' : f.tone === 'gold' ? 'gold' : f.tone === 'arcane' ? 'arcane' : 'blood'} w={56} h={48}/>
              <div style={{ fontFamily: 'var(--f-head)', fontSize: 9, color: `var(--${f.tone === 'rim' ? 'bone' : f.tone}-bright, var(--${f.tone}))`, letterSpacing: 1, lineHeight: 1.2 }}>{f.name}</div>
            </div>
            <div style={{ fontFamily: 'var(--f-body)', fontSize: 13, color: 'var(--bone)', lineHeight: 1.3, textWrap: 'pretty' }}>{f.desc}</div>
          </PixFrame>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CORE LOOP
// ─────────────────────────────────────────────────────────────
function LoopArtboard() {
  const steps = [
    { n: '01', t: 'БРОСОК', d: '2d6 · фишка идёт по полю. Дубль повторяет ход.', tone: 'arcane' },
    { n: '02', t: 'СОБЫТИЕ', d: 'Клетка решает: Торги · Рента · Карта Фортуны · Квест.', tone: 'gold' },
    { n: '03', t: 'ТОРГИ', d: 'Все втёмную заявляют 1-6 взяток. Высший бид — претендент.', tone: 'hex' },
    { n: '04', t: 'TCG БОЙ', d: 'Колода 30, мана 1→8. Цель: 10 урона ИЛИ N взяток.', tone: 'blood' },
    { n: '05', t: 'ТРОФЕИ', d: 'Победа → титул, XP, золото. Невыполнил — штраф ×2.', tone: 'toxic' },
    { n: '06', t: 'РОСТ', d: '+1 в характеристику, +1 в дерево навыков. На 3 ур. — выбор класса.', tone: 'bone' },
  ];
  return (
    <div style={{ height: '100%', padding: 24, background: 'var(--void)', display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }} className="scanlines">
      <div>
        <div style={{ fontFamily: 'var(--f-head)', fontSize: 8, color: 'var(--bone-dim)', letterSpacing: 2 }}>★ ИГРОВОЙ ЦИКЛ ★</div>
        <div style={{ fontFamily: 'var(--f-disp)', fontSize: 56, color: 'var(--gold-bright)', lineHeight: 0.85, marginTop: 6, letterSpacing: 1 }}>Один ход — шесть шагов</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              flexShrink: 0, width: 48, height: 48, background: `var(--${s.tone})`,
              boxShadow: `inset 2px 2px 0 rgba(255,255,255,0.4), inset -2px -2px 0 rgba(0,0,0,0.4), 0 0 0 2px #000`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--f-head)', fontSize: 14, color: s.tone === 'gold' || s.tone === 'bone' || s.tone === 'toxic' ? 'var(--ink)' : '#fff',
            }}>{s.n}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--f-head)', fontSize: 10, color: `var(--${s.tone})`, letterSpacing: 1 }}>{s.t}</div>
              <div style={{ fontFamily: 'var(--f-body)', fontSize: 13, color: 'var(--bone)', marginTop: 2, textWrap: 'pretty' }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// BOARD ARTBOARD
// ─────────────────────────────────────────────────────────────
function BoardArtboard({ variant = 'classic' }) {
  const samplePlayers = [
    { tile: 0, color: '#c8313a' },
    { tile: 0, color: '#4b88c2' },
    { tile: 7, color: '#9558d6' },
    { tile: 13, color: '#66b542' },
    { tile: 22, color: '#e8b84c' },
    { tile: 30, color: '#f0e3b8' },
    { tile: 35, color: '#ff5c66' },
    { tile: 5, color: '#7ab3e8' },
  ];
  const sampleOwners = {
    1: { color: '#c8313a' }, 3: { color: '#c8313a' },
    7: { color: '#9558d6' }, 9: { color: '#9558d6' },
    13: { color: '#66b542' },
    22: { color: '#e8b84c' }, 24: { color: '#e8b84c' }, 27: { color: '#e8b84c' },
    31: { color: '#9558d6' }, 35: { color: '#9558d6' }, 38: { color: '#4b88c2' },
  };
  return (
    <div style={{ width: '100%', height: '100%', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, position: 'relative' }} className="scanlines">
      <div style={{ transform: 'scale(0.78)', transformOrigin: 'center' }}>
        <GameBoard players={samplePlayers} owners={sampleOwners} current={13}/>
      </div>
    </div>
  );
}

function BoardZoomArtboard() {
  // Top-down close-up of one corner with detailed tile labels
  const tiles = [TILES[10], TILES[11], TILES[12], TILES[13], TILES[14], TILES[15]];
  return (
    <div style={{ height: '100%', padding: 24, background: 'var(--void)', display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' }} className="scanlines">
      <div>
        <div style={{ fontFamily: 'var(--f-head)', fontSize: 8, color: 'var(--bone-dim)', letterSpacing: 2 }}>★ ФРАГМЕНТ ★</div>
        <div style={{ fontFamily: 'var(--f-disp)', fontSize: 44, color: 'var(--gold-bright)', lineHeight: 0.85, marginTop: 6 }}>Тёмница → Воровской Рынок</div>
        <div style={{ fontFamily: 'var(--f-body)', fontSize: 13, color: 'var(--bone-dim)', marginTop: 4 }}>Восточный сектор поля. Каждая клетка — мини-локация.</div>
      </div>

      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
        {tiles.map((t, i) => (
          <div key={i} style={{ transform: `translateY(${i % 2 ? 4 : 0}px) scale(1.6)`, transformOrigin: 'top' }}>
            <BoardTile tile={t} orientation="bottom" players={i === 3 ? [{ color: '#9558d6' }, { color: '#c8313a' }] : i === 0 ? [{ color: '#e8b84c' }] : []} owner={i === 1 || i === 3 ? { color: '#9558d6' } : null} />
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontFamily: 'var(--f-body)', fontSize: 12, color: 'var(--bone)' }}>
        <div style={{ background: 'var(--panel)', padding: 10, boxShadow: 'inset 0 0 0 2px var(--rim)' }}>
          <div style={{ fontFamily: 'var(--f-head)', fontSize: 8, color: 'var(--gold)', letterSpacing: 1, marginBottom: 4 }}>ЦВЕТОВОЙ ШИФР</div>
          {Object.entries(REGIONS).slice(0, 4).map(([k, r]) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '2px 0' }}>
              <div style={{ width: 16, height: 12, background: r.color, boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.3), 0 0 0 1px #000' }}/>
              <span>{r.name}</span>
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--panel)', padding: 10, boxShadow: 'inset 0 0 0 2px var(--rim)' }}>
          <div style={{ fontFamily: 'var(--f-head)', fontSize: 8, color: 'var(--gold)', letterSpacing: 1, marginBottom: 4 }}>СПЕЦКЛЕТКИ</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0' }}><TileIcon icon="fortune" size={14}/><span>Фортуна — тяни карту</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0' }}><TileIcon icon="scroll" size={14}/><span>Квест — выбор и последствия</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0' }}><TileIcon icon="anvil" size={14}/><span>Кузня — прокачка экипировки</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0' }}><TileIcon icon="curse" size={14}/><span>Проклятие — урон/штраф</span></div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CREATURE CARDS
// ─────────────────────────────────────────────────────────────
const SAMPLE_CREATURES = [
  { name: 'РУНИЧЕСКИЙ ВОРОН', mana: 1, atk: 1, hp: 2, type: 'Фамильяр', ability: 'При появлении: возьми карту.', rarity: 'common', illusKind: 'creature', illusTint: 'arcane', faction: 'knight' },
  { name: 'ЖНЕЦ ИЗ КОСТНИЦЫ', mana: 3, atk: 3, hp: 3, type: 'Нежить', ability: 'Поглощает HP жертвы.', rarity: 'rare', illusKind: 'creature', illusTint: 'crypt', faction: 'necro' },
  { name: 'ЛИЧ ВЕЛЕКОР', mana: 7, atk: 5, hp: 8, type: 'Легендарная Нежить', ability: 'В конце хода: воскресить случайное существо из сброса.', rarity: 'legendary', illusKind: 'skull', illusTint: 'crypt', faction: 'necro' },
  { name: 'ЧЁРНАЯ ПАЛАТА', mana: 4, atk: 2, hp: 5, type: 'Заклинатель', ability: 'Раз в ход: наложи проклятие (−1 ATK).', rarity: 'epic', illusKind: 'creature', illusTint: 'panel', faction: 'cult' },
  { name: 'ПИЛИГРИМ ЗАРИ', mana: 2, atk: 2, hp: 3, type: 'Рыцарь', ability: 'Священное: блок 2 урона раз в ход.', rarity: 'common', illusKind: 'portrait', illusTint: 'arcane', faction: 'knight' },
  { name: 'СОВА АРХИМАГА', mana: 5, atk: 4, hp: 4, type: 'Тайный зверь', ability: 'Заклинание стоит на 1 меньше.', rarity: 'epic', illusKind: 'creature', illusTint: 'arcane', faction: 'knight' },
];

const SAMPLE_SPELLS = [
  { name: 'ЛИВЕНЬ КОСТЕЙ', mana: 3, type: 'Заклинание', ability: 'Нанесите 2 урона всем существам противника.', rarity: 'rare', illusKind: 'spell', illusTint: 'crypt' },
  { name: 'ЗОВ ВЛАСТЕЛИНА', mana: 6, type: 'Ритуал', ability: 'Призвать Стража 4/4. Жертва: −3 HP.', rarity: 'epic', illusKind: 'spell', illusTint: 'blood' },
];

function CreatureHandArtboard() {
  return (
    <div style={{ height: '100%', padding: 30, background: 'radial-gradient(ellipse at center, #1f1430 0%, #08051a 100%)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 8, position: 'relative' }} className="scanlines">
      {SAMPLE_CREATURES.slice(0, 4).map((c, i) => (
        <div key={i} style={{ transform: `translateY(${[8, -8, -16, -8][i] || 0}px) rotate(${[-6, -2, 2, 6][i] || 0}deg)` }}>
          <CreatureCard {...c} />
        </div>
      ))}
      {SAMPLE_SPELLS.slice(0, 1).map((s, i) => (
        <div key={i} style={{ transform: `translateY(0px) rotate(8deg)` }}>
          <SpellCard {...s} />
        </div>
      ))}
      <div style={{ transform: 'translateY(20px) rotate(12deg)' }}>
        <CardBack tone="hex"/>
      </div>
    </div>
  );
}

function CreatureDetailArtboard() {
  const c = SAMPLE_CREATURES[2]; // Лич
  return (
    <div style={{ width: '100%', height: '100%', background: 'radial-gradient(ellipse at center, #2a1f48 0%, #08051a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }} className="scanlines">
      <div style={{ transform: 'scale(1.8)', transformOrigin: 'center' }}>
        <CreatureCard {...c} focused/>
      </div>
    </div>
  );
}

function RarityArtboard() {
  const rarities = ['common', 'rare', 'epic', 'legendary'];
  const samples = [
    { name: 'СКЕЛЕТ-СТРЕЛОК', mana: 2, atk: 2, hp: 1, type: 'Нежить', ability: 'Атакует первым.', illusKind: 'creature', illusTint: 'crypt', faction: 'necro' },
    { name: 'ВОДЯНОЙ ЭЛЕМЕНТАЛЬ', mana: 4, atk: 3, hp: 5, type: 'Стихия', ability: 'Замораживает цель на 1 ход.', illusKind: 'creature', illusTint: 'arcane', faction: 'knight' },
    { name: 'ТЕНЕВОЙ КЛИНОК', mana: 5, atk: 6, hp: 3, type: 'Тень', ability: 'Невидим. Первая атака ×2.', illusKind: 'creature', illusTint: 'panel', faction: 'cult' },
    { name: 'ДРЕВНИЙ ДРАКОН', mana: 8, atk: 8, hp: 8, type: 'Легендарный Зверь', ability: 'При появлении: −5 HP всем существам.', illusKind: 'creature', illusTint: 'blood', faction: 'cult' },
  ];
  return (
    <div style={{ height: '100%', padding: 24, background: 'var(--void)', display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' }} className="scanlines">
      <div>
        <div style={{ fontFamily: 'var(--f-head)', fontSize: 8, color: 'var(--bone-dim)', letterSpacing: 2 }}>★ РЕДКОСТИ ★</div>
        <div style={{ fontFamily: 'var(--f-disp)', fontSize: 38, color: 'var(--gold-bright)', lineHeight: 0.85, marginTop: 4 }}>От костяной пыли до короны</div>
      </div>
      <div style={{ display: 'flex', gap: 18, justifyContent: 'center', alignItems: 'flex-end', flex: 1 }}>
        {samples.map((s, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, transform: `translateY(${-i * 6}px)` }}>
            <CreatureCard {...s} rarity={rarities[i]}/>
            <div style={{ fontFamily: 'var(--f-head)', fontSize: 7, color: `var(--r-${rarities[i]})`, letterSpacing: 1 }}>{['1 в 10', '1 в 25', '1 в 60', '1 в 200'][i]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LOCATIONS
// ─────────────────────────────────────────────────────────────
function LocationSetArtboard() {
  const locs = [
    { name: 'Костница', price: 220, ranks: [{ label: 'База', value: '20⚜' }, { label: 'Регион', value: '40⚜' }, { label: 'Страж', value: '100⚜' }, { label: 'Лич', value: '420⚜' }], illusKind: 'crypt' },
    { name: 'Усыпальница Королей', price: 220, ranks: [{ label: 'База', value: '24⚜' }, { label: 'Регион', value: '48⚜' }, { label: 'Страж', value: '110⚜' }, { label: 'Лич', value: '460⚜' }], illusKind: 'crypt' },
    { name: 'Чёрный Курган', price: 240, ranks: [{ label: 'База', value: '28⚜' }, { label: 'Регион', value: '56⚜' }, { label: 'Страж', value: '120⚜' }, { label: 'Лич', value: '500⚜' }], illusKind: 'crypt' },
  ];
  return (
    <div style={{ height: '100%', padding: 24, background: 'radial-gradient(ellipse at center, #2a1f48 0%, #08051a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, position: 'relative' }} className="scanlines">
      {locs.map((l, i) => (
        <div key={i} style={{ transform: `rotate(${[-3, 0, 3][i]}deg) translateY(${[6, 0, 6][i]}px)` }}>
          <LocationCard
            name={l.name}
            region={REGIONS.crypt.name}
            regionColor={REGIONS.crypt.color}
            price={l.price}
            illusKind={l.illusKind}
            illusTint="crypt"
            ranks={l.ranks}
          />
        </div>
      ))}
    </div>
  );
}

function LocationDetailArtboard() {
  return (
    <div style={{ width: '100%', height: '100%', background: 'radial-gradient(ellipse at center, #2a1f48 0%, #08051a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }} className="scanlines">
      <div style={{ transform: 'scale(1.4)' }}>
        <LocationCard
          name="Башня Архимага"
          region={REGIONS.arcane.name}
          regionColor={REGIONS.arcane.color}
          price={180}
          illusKind="tower" illusTint="arcane"
          ranks={[
            { label: 'Базовая рента', value: '18⚜' },
            { label: 'Регион полный', value: '36⚜' },
            { label: '+ Ученик', value: '90⚜' },
            { label: '+ Архимаг', value: '210⚜' },
            { label: '+ Драконий Лорд', value: '420⚜' },
            { label: 'Дать ход (откуп)', value: '90⚜' },
          ]}
          hexes="владелец берёт +1 спелл в стартовую руку"
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// BOX CONTENTS
// ─────────────────────────────────────────────────────────────
function BoxContentsArtboard() {
  const items = [
    { label: '1× игровое поле', kind: 'castle', tint: 'crypt' },
    { label: '8× фишек героев', kind: 'portrait', tint: 'arcane' },
    { label: '240× карт существ', kind: 'creature', tint: 'panel' },
    { label: '80× карт спеллов', kind: 'spell', tint: 'arcane' },
    { label: '28× карт собственности', kind: 'castle', tint: 'gold' },
    { label: '60× карт Фортуны', kind: 'spell', tint: 'blood' },
    { label: '40× карт Квестов', kind: 'item', tint: 'gold' },
    { label: '2× d6, 16× жетонов', kind: 'item', tint: 'panel' },
  ];
  return (
    <div style={{ height: '100%', padding: 32, background: 'var(--void)', display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }} className="scanlines">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: 'var(--f-head)', fontSize: 8, color: 'var(--bone-dim)', letterSpacing: 2 }}>★ СОДЕРЖИМОЕ КОРОБКИ ★</div>
          <div style={{ fontFamily: 'var(--f-disp)', fontSize: 48, color: 'var(--gold-bright)', lineHeight: 0.85, marginTop: 4 }}>Что лежит в коробке</div>
          <div style={{ fontFamily: 'var(--f-body)', fontSize: 13, color: 'var(--bone-dim)', marginTop: 6, maxWidth: 600 }}>Базовый набор для 2-8 игроков. Цифровой компаньон бесплатно через QR-код в коробке.</div>
        </div>
        {/* mini box */}
        <PixFrame tone="gold" thick={4} style={{ width: 140, height: 90 }}>
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, #1a1230 0%, #0a0614 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: 'var(--f-disp)', fontSize: 26, color: 'var(--gold-bright)', textShadow: '2px 2px 0 #000', letterSpacing: 1 }}>АЛША-<br/>ПОЛИЯ</div>
          </div>
        </PixFrame>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, flex: 1 }}>
        {items.map((it, i) => (
          <div key={i} style={{ background: 'var(--panel)', boxShadow: 'inset 0 0 0 2px var(--rim)', padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <PixIllus kind={it.kind} tint={it.tint} w="100%" h={90} style={{ width: '100%', height: 90 }}/>
            <div style={{ fontFamily: 'var(--f-head)', fontSize: 8, color: 'var(--bone-bright)', textAlign: 'center', letterSpacing: 0.5, lineHeight: 1.3 }}>{it.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// (unused) legacy tweak helper — kept for ref
// ─────────────────────────────────────────────────────────────
function _UnusedTweakAesthetic() {
  const PALETTES = [
    ['#e8b84c', '#c8313a', '#9558d6'], // default
    ['#ff9d3a', '#5b1c2a', '#3a7ab8'], // amber/burgundy
    ['#9bdb6e', '#c8313a', '#b8e0ff'], // toxic/ice
    ['#f5ebcc', '#3a7ab8', '#c8313a'], // bone/cobalt
    ['#e88030', '#3a8a4e', '#6a3aa8'], // forest mead
  ];
  return (
    <>
      <TweakSection title="Тема">
        <TweakColor label="Палитра (золото / кровь / магия)" k="palette" def={PALETTES[0]} options={PALETTES}/>
      </TweakSection>
      <TweakSection title="Типографика">
        <TweakSelect label="Заголовки" k="headingFont" def="'Press Start 2P', monospace" options={[
          { value: "'Press Start 2P', monospace", label: "Press Start 2P" },
          { value: "'Silkscreen', monospace", label: "Silkscreen" },
          { value: "'Pixelify Sans', monospace", label: "Pixelify Sans Bold" },
        ]}/>
        <TweakSelect label="Дисплей (большие заглавия)" k="displayFont" def="'Jersey 15', monospace" options={[
          { value: "'Jersey 15', monospace", label: "Jersey 15" },
          { value: "'Jersey 10', monospace", label: "Jersey 10" },
          { value: "'Press Start 2P', monospace", label: "Press Start 2P" },
        ]}/>
        <TweakSelect label="Body / текст" k="bodyFont" def="'Pixelify Sans', monospace" options={[
          { value: "'Pixelify Sans', monospace", label: "Pixelify Sans" },
          { value: "'Silkscreen', monospace", label: "Silkscreen" },
          { value: "monospace", label: "System Mono" },
        ]}/>
      </TweakSection>
    </>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
