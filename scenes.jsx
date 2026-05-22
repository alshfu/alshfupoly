/* Bidding table (Preferans-style auction) + RPG sheet + Rules + Skill tree */

// ── Bidding panel — torgi za klyatku ──
function BiddingTable() {
  const players = [
    { name: 'КАЭЛЬ', col: '#c8313a', bid: 4, status: 'bid', tag: 'РЫЦАРЬ' },
    { name: 'МОРЕНА', col: '#9558d6', bid: 5, status: 'leader', tag: 'НЕКРОМАНТ' },
    { name: 'ТОРВИН', col: '#4b88c2', bid: 3, status: 'pass', tag: 'МАГ' },
    { name: 'ВЕЛЬДА', col: '#e8b84c', bid: null, status: 'thinking', tag: 'ТОРГОВЕЦ' },
  ];
  return (
    <div style={{ padding: 16, background: 'var(--void)', height: '100%', display: 'flex', flexDirection: 'column', gap: 12, position: 'relative' }} className="scanlines">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: 'var(--f-head)', fontSize: 8, color: 'var(--bone-dim)', letterSpacing: 1 }}>★ ТОРГИ МАСТИ ★</div>
          <div style={{ fontFamily: 'var(--f-disp)', fontSize: 36, color: 'var(--gold-bright)', lineHeight: 0.9, letterSpacing: 1, marginTop: 4 }}>УСЫПАЛЬНИЦА КОРОЛЕЙ</div>
          <div style={{ fontFamily: 'var(--f-body)', fontSize: 12, color: 'var(--bone-dim)', marginTop: 2 }}>« регион Некрополь · цена 220⚜ »</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--f-head)', fontSize: 7, color: 'var(--blood-bright)' }}>ТАЙМЕР</div>
          <div style={{ fontFamily: 'var(--f-disp)', fontSize: 48, color: 'var(--blood)', lineHeight: 0.8 }}>14<span style={{ color: 'var(--bone-dim)', fontSize: 24 }}>s</span></div>
        </div>
      </div>

      {/* property card pinned on left */}
      <div style={{ display: 'flex', gap: 16 }}>
        <LocationCard
          name="Усыпальница Королей"
          region={REGIONS.crypt.name}
          regionColor={REGIONS.crypt.color}
          price={220}
          illusKind="crypt" illusTint="crypt"
          ranks={[
            { label: 'Базовая рента', value: '24⚜' },
            { label: 'Регион полный', value: '48⚜' },
            { label: '+ Страж лв.1', value: '110⚜' },
            { label: '+ Страж лв.2', value: '240⚜' },
            { label: '+ Лич-хозяин', value: '460⚜' },
            { label: 'Дать ход (откуп)', value: '½ цены' },
          ]}
          hexes="владелец вызывает любого Нежить-стража"
        />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{
            background: 'var(--panel)',
            boxShadow: 'inset 0 0 0 2px var(--ink), inset 0 0 0 3px var(--rim), 0 0 0 2px var(--ink)',
            padding: 12,
          }}>
            <div style={{ fontFamily: 'var(--f-head)', fontSize: 8, color: 'var(--gold)' }}>ЗАЯВКИ (1-6 ВЗЯТОК)</div>
            <div style={{ fontFamily: 'var(--f-body)', fontSize: 12, color: 'var(--bone-dim)', marginTop: 4, lineHeight: 1.3 }}>
              Объяви, сколько взяток возьмёшь в TCG-партии. Высшая заявка играет против Стража клетки. Невыполнил — теряешь ставку × 2.
            </div>
          </div>

          {/* player bid rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {players.map((p, i) => <BidRow key={i} p={p}/>)}
          </div>

          {/* your bid input */}
          <div style={{ background: 'var(--ink)', padding: 10, boxShadow: 'inset 0 0 0 2px var(--gold-dark)' }}>
            <div style={{ fontFamily: 'var(--f-head)', fontSize: 7, color: 'var(--gold-bright)', marginBottom: 6 }}>ТВОЯ ЗАЯВКА</div>
            <div style={{ display: 'flex', gap: 4, justifyContent: 'space-between' }}>
              {[1,2,3,4,5,6].map(n => (
                <div key={n} style={{
                  flex: 1, padding: '12px 0', textAlign: 'center',
                  background: n === 5 ? 'var(--gold)' : 'var(--panel-2)',
                  color: n === 5 ? 'var(--ink)' : 'var(--bone)',
                  fontFamily: 'var(--f-head)', fontSize: 14,
                  boxShadow: n === 5
                    ? 'inset 2px 2px 0 var(--gold-bright), inset -2px -2px 0 var(--gold-dark), 0 0 0 2px #000'
                    : 'inset 1px 1px 0 var(--rim), inset -1px -1px 0 var(--ink), 0 0 0 1px #000',
                  cursor: 'pointer',
                }}>{n}</div>
              ))}
              <div style={{
                padding: '12px 16px', textAlign: 'center',
                background: 'var(--blood-dark)', color: 'var(--blood-bright)',
                fontFamily: 'var(--f-head)', fontSize: 9,
                boxShadow: 'inset 1px 1px 0 var(--blood), inset -1px -1px 0 var(--ink), 0 0 0 1px #000',
                cursor: 'pointer',
              }}>ПАС</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BidRow({ p }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      background: p.status === 'leader' ? 'var(--hex-dark)' : 'var(--panel)',
      padding: '6px 8px',
      boxShadow: p.status === 'leader'
        ? 'inset 0 0 0 2px var(--hex), 0 0 12px rgba(149,88,214,0.3)'
        : 'inset 0 0 0 1px var(--rim)',
    }}>
      <Pawn color={p.col} size={12}/>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--f-head)', fontSize: 8, color: 'var(--bone-bright)' }}>{p.name}</div>
        <div style={{ fontFamily: 'var(--f-body)', fontSize: 10, color: 'var(--bone-dim)' }}>« {p.tag} »</div>
      </div>
      <div style={{ fontFamily: 'var(--f-head)', fontSize: 7, color: p.status === 'pass' ? 'var(--blood)' : p.status === 'thinking' ? 'var(--bone-dim)' : 'var(--gold)' }}>
        {p.status === 'pass' ? 'ПАС' : p.status === 'thinking' ? '...' : 'ЗАЯВКА'}
      </div>
      {p.bid !== null && (
        <PixPip value={p.bid} tone={p.status === 'leader' ? 'gold' : 'arcane'} size={28}/>
      )}
      {p.status === 'leader' && (
        <div style={{ fontFamily: 'var(--f-head)', fontSize: 6, color: 'var(--gold-bright)', letterSpacing: 1 }}>★ ЛИДЕР</div>
      )}
    </div>
  );
}

// ── RPG Character sheet ──
function RPGSheet() {
  const skills = [
    { name: 'Удар Тенью', lvl: 3, max: 5, mana: 2, branch: 'necro' },
    { name: 'Призыв Скелета', lvl: 2, max: 5, mana: 4, branch: 'necro' },
    { name: 'Костяной Доспех', lvl: 1, max: 3, mana: 3, branch: 'necro' },
    { name: 'Похищение Души', lvl: 0, max: 3, mana: 5, branch: 'necro', locked: true },
  ];
  return (
    <div style={{ padding: 16, background: 'var(--void)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, height: '100%', position: 'relative' }} className="scanlines">
      {/* header */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 8, borderBottom: '2px solid var(--rim)' }}>
        <div>
          <div style={{ fontFamily: 'var(--f-head)', fontSize: 7, color: 'var(--bone-dim)', letterSpacing: 1 }}>★ ЛИСТ ПЕРСОНАЖА ★</div>
          <div style={{ fontFamily: 'var(--f-disp)', fontSize: 40, color: 'var(--gold-bright)', lineHeight: 0.9, marginTop: 2 }}>МОРЕНА из Чёрной Пустоши</div>
          <div style={{ fontFamily: 'var(--f-body)', fontSize: 13, color: 'var(--hex)' }}>« НЕКРОМАНТ · уровень 7 »</div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <PixPip value={3} tone="gold" size={36}/>
          <span style={{ fontFamily: 'var(--f-body)', fontSize: 10, color: 'var(--gold)', alignSelf: 'end' }}>очка<br/>навыков</span>
        </div>
      </div>

      {/* left: portrait + bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <PixFrame tone="hex" thick={3} style={{ aspectRatio: '4/3', padding: 0 }}>
          <PixIllus kind="portrait" tint="crypt" w="100%" h="100%" style={{ width: '100%', height: '100%' }}/>
        </PixFrame>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <PixBar value={24} max={30} tone="blood" width="100%" label="HP" height={14} showText/>
          <PixBar value={6} max={8} tone="arcane" width="100%" label="MN" height={14} showText/>
          <PixBar value={320} max={500} tone="gold" width="100%" label="XP" height={14} showText/>
        </div>

        {/* stats */}
        <div style={{ background: 'var(--panel)', padding: 10, boxShadow: 'inset 0 0 0 2px var(--rim)' }}>
          <div style={{ fontFamily: 'var(--f-head)', fontSize: 8, color: 'var(--gold)', marginBottom: 6 }}>ХАРАКТЕРИСТИКИ</div>
          {[
            { label: 'СИЛА', val: 4, tone: 'blood', desc: 'урон ближнего боя' },
            { label: 'ИНТЕЛЛЕКТ', val: 9, tone: 'arcane', desc: 'мощь заклинаний' },
            { label: 'УДАЧА', val: 5, tone: 'gold', desc: 'крит, броски, торги' },
            { label: 'ВЫНОСЛИВОСТЬ', val: 6, tone: 'toxic', desc: 'макс. HP' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', borderBottom: i < 3 ? '1px solid var(--panel-2)' : 'none' }}>
              <span style={{ fontFamily: 'var(--f-head)', fontSize: 7, color: `var(--${s.tone})`, width: 90 }}>{s.label}</span>
              <span style={{ fontFamily: 'var(--f-head)', fontSize: 14, color: 'var(--bone-bright)' }}>{s.val}</span>
              <span style={{ flex: 1, fontSize: 11, color: 'var(--bone-dim)' }}>« {s.desc} »</span>
              <div style={{ width: 16, height: 16, background: 'var(--gold)', color: 'var(--ink)', textAlign: 'center', fontFamily: 'var(--f-head)', fontSize: 10, lineHeight: '16px', cursor: 'pointer', boxShadow: 'inset 1px 1px 0 var(--gold-bright), inset -1px -1px 0 var(--gold-dark)' }}>+</div>
            </div>
          ))}
        </div>
      </div>

      {/* right: skills + inventory */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* skill tree */}
        <div style={{ background: 'var(--panel)', padding: 10, boxShadow: 'inset 0 0 0 2px var(--hex)', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontFamily: 'var(--f-head)', fontSize: 8, color: 'var(--hex)' }}>★ ПУТЬ НЕКРОМАНТА</span>
            <span style={{ fontFamily: 'var(--f-body)', fontSize: 10, color: 'var(--bone-dim)' }}>ветви: Кости · Тени · Чума</span>
          </div>
          {skills.map((s, i) => <SkillRow key={i} s={s}/>)}
        </div>

        {/* inventory */}
        <div style={{ background: 'var(--panel)', padding: 10, boxShadow: 'inset 0 0 0 2px var(--gold-dark)' }}>
          <div style={{ fontFamily: 'var(--f-head)', fontSize: 8, color: 'var(--gold)', marginBottom: 6 }}>★ ИНВЕНТАРЬ</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 3 }}>
            {Array.from({ length: 16 }, (_, i) => <InvSlot key={i} idx={i}/>)}
          </div>
          <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--f-head)', fontSize: 7, color: 'var(--bone-dim)' }}>
            <span>ВЕС: 12/20</span>
            <span style={{ color: 'var(--gold)' }}>● 1240⚜</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillRow({ s }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '4px 6px', marginBottom: 4,
      background: s.locked ? 'rgba(0,0,0,0.3)' : 'var(--panel-2)',
      boxShadow: 'inset 0 0 0 1px var(--rim)',
      opacity: s.locked ? 0.5 : 1,
    }}>
      <PixPip value={s.mana} tone="arcane" size={20}/>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--f-head)', fontSize: 8, color: s.locked ? 'var(--bone-dim)' : 'var(--bone-bright)' }}>
          {s.locked ? '⚷ ' : ''}{s.name}
        </div>
        <div style={{ display: 'flex', gap: 2, marginTop: 3 }}>
          {Array.from({ length: s.max }, (_, i) => (
            <div key={i} style={{
              width: 12, height: 6,
              background: i < s.lvl ? 'var(--hex)' : 'var(--ink)',
              boxShadow: i < s.lvl ? 'inset 1px 1px 0 var(--rim-bright)' : 'inset 1px 1px 0 var(--panel)',
            }}/>
          ))}
        </div>
      </div>
      <div style={{
        padding: '3px 8px',
        background: s.locked ? 'var(--panel)' : 'var(--gold)',
        color: s.locked ? 'var(--bone-dim)' : 'var(--ink)',
        fontFamily: 'var(--f-head)', fontSize: 7, letterSpacing: 1,
        cursor: s.locked ? 'not-allowed' : 'pointer',
      }}>{s.locked ? 'УР.10' : '+1'}</div>
    </div>
  );
}

function InvSlot({ idx }) {
  // some slots have items
  const items = { 0: 'spell', 2: 'item', 3: 'item', 5: 'creature', 9: 'spell' };
  const item = items[idx];
  return (
    <div style={{
      aspectRatio: '1', position: 'relative',
      background: 'var(--ink)',
      boxShadow: 'inset 1px 1px 0 #000, inset -1px -1px 0 var(--rim)',
    }}>
      {item && <PixIllus kind={item} tint={idx % 2 ? 'crypt' : 'arcane'} w="100%" h="100%" style={{ width: '100%', height: '100%' }}/>}
      {idx === 5 && <div style={{ position: 'absolute', bottom: 0, right: 1, fontFamily: 'var(--f-head)', fontSize: 6, color: 'var(--bone-bright)', textShadow: '1px 1px 0 #000' }}>×3</div>}
    </div>
  );
}

// ── Rules cheat sheet (one-pager) ──
function RulesCheat() {
  return (
    <div style={{ padding: 20, background: 'var(--void)', height: '100%', overflow: 'auto', position: 'relative' }} className="scanlines">
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--f-disp)', fontSize: 56, color: 'var(--gold-bright)', lineHeight: 0.85, letterSpacing: 2 }}>АЛШАПОЛИЯ</div>
        <div style={{ fontFamily: 'var(--f-head)', fontSize: 8, color: 'var(--bone-dim)', letterSpacing: 2, marginTop: 6 }}>★ ПАМЯТКА ИГРОКА · 2-8 ЛИЦ · 60-120 МИН ★</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <RulePanel n="01" title="ХОД" tone="arcane">
          Бросьте 2d6. Двигайте фишку по часовой стрелке. Дубль — повторите бросок. Три дубля подряд — в Тёмницу.
        </RulePanel>
        <RulePanel n="02" title="КЛЕТКА" tone="hex">
          • Ничья → ТОРГИ (см. 03)<br/>
          • Чужая → плати ренту<br/>
          • Своя → бесплатно<br/>
          • Событие → тяни карту
        </RulePanel>
        <RulePanel n="03" title="ТОРГИ" tone="gold">
          Все игроки втёмную заявляют 1-6 взяток. Высший бид играет TCG-партию против Стража. Победил и взял заявку — клетка твоя.
        </RulePanel>
        <RulePanel n="04" title="БОЙ TCG" tone="blood">
          У каждого колода из 30 карт. Мана 1→8. У существа ATK/HP. Спеллы — одноразовые. Цель: 10 урона ИЛИ N взяток (по заявке).
        </RulePanel>
        <RulePanel n="05" title="РЕНТА" tone="bone">
          1 клетка региона → базовая. Весь регион → ×2. Страж лв.1/2 → ×5/×11. Лич-хозяин (вершина) → ×21. Можно откупиться: ½ цены.
        </RulePanel>
        <RulePanel n="06" title="РОСТ" tone="toxic">
          Бой → +XP. Уровень → +1 в характеристику + 1 очко в дерево навыков. Класс выбирается на уровне 3. Максимум уровень 20.
        </RulePanel>
      </div>

      {/* victory conditions */}
      <div style={{
        marginTop: 16, padding: 14,
        background: 'linear-gradient(180deg, var(--gold-dark) 0%, var(--gold) 100%)',
        boxShadow: 'inset 2px 2px 0 var(--gold-bright), inset -2px -2px 0 #4a3208, 0 0 0 3px #000',
        color: 'var(--ink)',
      }}>
        <div style={{ fontFamily: 'var(--f-head)', fontSize: 10, letterSpacing: 2, textAlign: 'center', marginBottom: 8 }}>★ УСЛОВИЯ ПОБЕДЫ ★</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, fontFamily: 'var(--f-body)', fontSize: 12, textAlign: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--f-head)', fontSize: 9, marginBottom: 2 }}>ТРОН</div>
            Собрать 3 полных региона
          </div>
          <div>
            <div style={{ fontFamily: 'var(--f-head)', fontSize: 9, marginBottom: 2 }}>ГЕРОЙ</div>
            Достичь 20 уровня персонажа
          </div>
          <div>
            <div style={{ fontFamily: 'var(--f-head)', fontSize: 9, marginBottom: 2 }}>КОРОНА</div>
            Завершить квест «Корона Алшаполии»
          </div>
        </div>
      </div>

      {/* terms key */}
      <div style={{ marginTop: 14, fontFamily: 'var(--f-body)', fontSize: 11, color: 'var(--bone-dim)', lineHeight: 1.5 }}>
        <span style={{ color: 'var(--gold)' }}>⚜</span> золото · <span style={{ color: 'var(--blood)' }}>♥</span> HP · <span style={{ color: 'var(--arcane)' }}>◆</span> мана · <span style={{ color: 'var(--hex)' }}>✦</span> очко навыка · <span style={{ color: 'var(--bone)' }}>★</span> регион
      </div>
    </div>
  );
}

function RulePanel({ n, title, tone, children }) {
  return (
    <div style={{
      background: 'var(--panel)',
      boxShadow: `inset 0 0 0 2px var(--${tone}), 0 0 0 2px var(--ink)`,
      padding: 12,
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: -6, left: -6,
        background: `var(--${tone})`, color: tone === 'gold' || tone === 'bone' ? 'var(--ink)' : '#fff',
        padding: '3px 6px',
        fontFamily: 'var(--f-head)', fontSize: 9,
        boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.4), inset -1px -1px 0 rgba(0,0,0,0.4), 0 0 0 2px var(--ink)',
      }}>{n}</div>
      <div style={{ fontFamily: 'var(--f-head)', fontSize: 9, color: `var(--${tone})`, marginTop: 4, marginBottom: 6, letterSpacing: 1 }}>{title}</div>
      <div style={{ fontFamily: 'var(--f-body)', fontSize: 12, color: 'var(--bone)', lineHeight: 1.35, textWrap: 'pretty' }}>{children}</div>
    </div>
  );
}

Object.assign(window, { BiddingTable, RPGSheet, RulesCheat });
