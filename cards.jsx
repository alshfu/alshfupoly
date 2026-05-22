/* Creature & Location cards — Alshfupoly */

// ── Rarity ribbon (top of card) ──
function RarityRibbon({ rarity }) {
  const meta = {
    common: { c: 'var(--r-common)', label: 'ОБЫЧНАЯ' },
    rare: { c: 'var(--r-rare)', label: 'РЕДКАЯ' },
    epic: { c: 'var(--r-epic)', label: 'ЭПИЧЕСКАЯ' },
    legendary: { c: 'var(--r-legendary)', label: 'ЛЕГЕНДАРНАЯ' },
  }[rarity];
  return (
    <div style={{
      position: 'absolute', top: -6, left: 12, right: 12,
      background: meta.c, color: '#0a0614',
      padding: '3px 0',
      fontFamily: 'var(--f-head)', fontSize: 7, letterSpacing: 1,
      textAlign: 'center',
      boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.4), inset -1px -1px 0 rgba(0,0,0,0.5), 0 0 0 2px #000',
      clipPath: 'polygon(0 0, 100% 0, calc(100% - 6px) 100%, 6px 100%)',
    }}>{meta.label}</div>
  );
}

// ── Creature card (TCG, ~180×260) ──
// mana top-left, name, illustration, type/ability, atk + hp bottom corners
function CreatureCard({ name, mana, atk, hp, type, ability, rarity = 'common', illusKind = 'creature', illusTint, faction = 'rim', focused }) {
  const factionRim = {
    necro: 'hex', undead: 'hex',
    knight: 'arcane', order: 'arcane',
    cult: 'blood', demon: 'blood',
    beast: 'toxic', wild: 'toxic',
    rogue: 'rim', merchant: 'gold',
  }[faction] || 'rim';

  return (
    <div style={{ position: 'relative', width: 180, height: 260 }}>
      <PixFrame tone={factionRim} thick={3} glow={focused} style={{ width: '100%', height: '100%', padding: 8, display: 'flex', flexDirection: 'column' }}>
        <RarityRibbon rarity={rarity} />

        {/* mana orb top-left, floating over the frame */}
        <div style={{ position: 'absolute', top: 4, left: -4, zIndex: 3 }}>
          <PixPip value={mana} tone="arcane" size={32} />
        </div>

        {/* illustration window */}
        <div style={{ marginTop: 14, position: 'relative', height: 110, boxShadow: 'inset 0 0 0 2px var(--ink), inset 0 0 0 3px var(--gold-dark)' }}>
          <PixIllus w="100%" h="100%" kind={illusKind} tint={illusTint || 'panel'} style={{ width: '100%', height: '100%' }} />
        </div>

        {/* name plate */}
        <div style={{
          marginTop: 6, padding: '4px 6px',
          background: 'var(--ink)',
          boxShadow: 'inset 0 0 0 1px var(--gold-dark)',
          fontFamily: 'var(--f-head)', fontSize: 8, color: 'var(--gold-bright)',
          textAlign: 'center', letterSpacing: 0.5, lineHeight: 1.2,
          minHeight: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{name}</div>

        {/* type tag */}
        <div style={{
          marginTop: 4, fontFamily: 'var(--f-body)', fontSize: 11,
          color: 'var(--bone-dim)', textAlign: 'center',
          letterSpacing: 0.5,
        }}>« {type} »</div>

        {/* ability text */}
        <div style={{
          flex: 1, marginTop: 4, padding: '4px 6px',
          fontFamily: 'var(--f-body)', fontSize: 11, lineHeight: 1.2,
          color: 'var(--bone)', textAlign: 'center',
          background: 'rgba(0,0,0,0.25)',
          textWrap: 'pretty',
        }}>{ability}</div>

        {/* atk / hp pips */}
        <div style={{ position: 'absolute', bottom: -6, left: -6, zIndex: 3 }}>
          <PixPip value={atk} tone="gold" size={32} />
        </div>
        <div style={{ position: 'absolute', bottom: -6, right: -6, zIndex: 3 }}>
          <PixPip value={hp} tone="blood" size={32} />
        </div>
      </PixFrame>
    </div>
  );
}

// ── Spell card (slightly different layout — no atk/hp, big iconography) ──
function SpellCard({ name, mana, type = 'Заклинание', ability, rarity = 'rare', illusKind = 'spell', illusTint = 'arcane' }) {
  return (
    <div style={{ position: 'relative', width: 180, height: 260 }}>
      <PixFrame tone="arcane" thick={3} style={{ width: '100%', height: '100%', padding: 8, display: 'flex', flexDirection: 'column' }}>
        <RarityRibbon rarity={rarity} />
        <div style={{ position: 'absolute', top: 4, left: -4, zIndex: 3 }}>
          <PixPip value={mana} tone="arcane" size={32} />
        </div>
        <div style={{ marginTop: 14, position: 'relative', height: 130, boxShadow: 'inset 0 0 0 2px var(--ink), inset 0 0 0 3px var(--arcane-bright)' }}>
          <PixIllus w="100%" h="100%" kind={illusKind} tint={illusTint} style={{ width: '100%', height: '100%' }} />
        </div>
        <div style={{
          marginTop: 6, padding: '4px 6px',
          background: 'var(--ink)',
          boxShadow: 'inset 0 0 0 1px var(--arcane)',
          fontFamily: 'var(--f-head)', fontSize: 8, color: 'var(--arcane-bright)',
          textAlign: 'center', letterSpacing: 0.5, lineHeight: 1.2,
          minHeight: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{name}</div>
        <div style={{ marginTop: 4, fontFamily: 'var(--f-body)', fontSize: 11, color: 'var(--arcane-bright)', textAlign: 'center' }}>« {type} »</div>
        <div style={{
          flex: 1, marginTop: 4, padding: '6px',
          fontFamily: 'var(--f-body)', fontSize: 12, lineHeight: 1.25,
          color: 'var(--bone)', textAlign: 'center',
          background: 'rgba(0,0,0,0.25)',
          textWrap: 'pretty',
        }}>{ability}</div>
      </PixFrame>
    </div>
  );
}

// ── Location / property card (Monopoly-style title deed, but pixel-fantasy) ──
function LocationCard({ name, region, regionColor, price, ranks = [], illusKind = 'castle', illusTint, hexes, rarity = 'rare' }) {
  return (
    <div style={{ position: 'relative', width: 200, height: 300 }}>
      <PixFrame tone="gold" thick={3} bg="var(--bone)" style={{ width: '100%', height: '100%', padding: 6, display: 'flex', flexDirection: 'column' }}>
        {/* region color stripe */}
        <div style={{
          background: regionColor, color: '#0a0614',
          padding: '6px 8px',
          fontFamily: 'var(--f-head)', fontSize: 7, letterSpacing: 1,
          textAlign: 'center',
          boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.3), inset -1px -1px 0 rgba(0,0,0,0.4)',
        }}>{region}</div>

        {/* big name */}
        <div style={{
          padding: '8px 4px',
          fontFamily: 'var(--f-disp)', fontSize: 24, color: 'var(--ink)',
          textAlign: 'center', lineHeight: 0.9, letterSpacing: 0.5,
        }}>{name}</div>

        {/* illustration */}
        <div style={{ position: 'relative', height: 80, boxShadow: 'inset 0 0 0 2px var(--ink)' }}>
          <PixIllus w="100%" h="100%" kind={illusKind} tint={illusTint || 'crypt'} style={{ width: '100%', height: '100%' }} />
        </div>

        {/* ranks table — like monopoly rent ladder */}
        <div style={{ flex: 1, marginTop: 6, fontFamily: 'var(--f-body)', fontSize: 11, color: 'var(--ink)' }}>
          {ranks.map((r, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '1px 4px',
              background: i % 2 ? 'rgba(0,0,0,0.06)' : 'transparent',
            }}>
              <span>{r.label}</span>
              <span style={{ fontFamily: 'var(--f-head)', fontSize: 9 }}>{r.value}</span>
            </div>
          ))}
        </div>

        {/* footer */}
        <div style={{
          borderTop: '2px solid var(--ink)',
          paddingTop: 4,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--f-head)', fontSize: 8, color: 'var(--ink)',
        }}>
          <span>ЦЕНА</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 14 }}>{price}</span>
            <CoinIcon />
          </span>
        </div>
        {hexes && (
          <div style={{ fontFamily: 'var(--f-body)', fontSize: 10, color: 'var(--blood-dark)', textAlign: 'center', marginTop: 2 }}>
            ⚠ Особое: {hexes}
          </div>
        )}
      </PixFrame>
    </div>
  );
}

// ── Tiny coin icon ──
function CoinIcon({ size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" style={{ imageRendering: 'pixelated' }}>
      <rect x="2" y="0" width="4" height="1" fill="var(--gold-dark)"/>
      <rect x="1" y="1" width="6" height="1" fill="var(--gold)"/>
      <rect x="0" y="2" width="8" height="4" fill="var(--gold)"/>
      <rect x="1" y="6" width="6" height="1" fill="var(--gold-dark)"/>
      <rect x="2" y="7" width="4" height="1" fill="var(--gold-dark)"/>
      <rect x="3" y="2" width="2" height="4" fill="var(--gold-bright)"/>
      <rect x="2" y="3" width="1" height="2" fill="var(--gold-bright)"/>
    </svg>
  );
}

// ── Card back — for hands, decks ──
function CardBack({ w = 180, h = 260, tone = 'hex' }) {
  return (
    <PixFrame tone={tone} thick={3} bg="var(--night)" style={{ width: w, height: h, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: '90%', height: '90%', background: 'var(--panel)', boxShadow: 'inset 0 0 0 2px var(--ink)' }}>
        {/* central sigil */}
        <svg viewBox="0 0 32 32" style={{ position: 'absolute', inset: '15%', width: '70%', height: '70%' }}>
          <rect x="14" y="2" width="4" height="4" fill={`var(--${tone === 'hex' ? 'hex' : tone})`}/>
          <rect x="14" y="26" width="4" height="4" fill={`var(--${tone === 'hex' ? 'hex' : tone})`}/>
          <rect x="2" y="14" width="4" height="4" fill={`var(--${tone === 'hex' ? 'hex' : tone})`}/>
          <rect x="26" y="14" width="4" height="4" fill={`var(--${tone === 'hex' ? 'hex' : tone})`}/>
          <rect x="13" y="13" width="6" height="6" fill={`var(--${tone === 'hex' ? 'hex' : tone})`}/>
          <rect x="15" y="15" width="2" height="2" fill="var(--gold)"/>
          <rect x="7" y="7" width="2" height="2" fill={`var(--${tone === 'hex' ? 'hex' : tone})`} opacity="0.6"/>
          <rect x="23" y="7" width="2" height="2" fill={`var(--${tone === 'hex' ? 'hex' : tone})`} opacity="0.6"/>
          <rect x="7" y="23" width="2" height="2" fill={`var(--${tone === 'hex' ? 'hex' : tone})`} opacity="0.6"/>
          <rect x="23" y="23" width="2" height="2" fill={`var(--${tone === 'hex' ? 'hex' : tone})`} opacity="0.6"/>
        </svg>
        <div style={{
          position: 'absolute', bottom: 6, left: 0, right: 0, textAlign: 'center',
          fontFamily: 'var(--f-head)', fontSize: 6, color: 'var(--bone-dim)', letterSpacing: 1,
        }}>АЛШАПОЛИЯ</div>
      </div>
    </PixFrame>
  );
}

Object.assign(window, { CreatureCard, SpellCard, LocationCard, CardBack, CoinIcon, RarityRibbon });
