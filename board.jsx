/* Game board — top-down Monopoly-style loop, dark fantasy themed */

// Tile data — 40 tiles around the loop. Corners + 9 sides + 9 sides...
const REGIONS = {
  swamp:   { color: '#5b7a3a', name: 'ТРЯСИНА' },
  cult:    { color: '#7a1c2a', name: 'КУЛЬТ' },
  market:  { color: '#c8923a', name: 'РЫНОК' },
  arcane:  { color: '#3a6bb5', name: 'АРКАНА' },
  crypt:   { color: '#6a3aa8', name: 'НЕКРОПОЛЬ' },
  citadel: { color: '#b8a778', name: 'ЦИТАДЕЛЬ' },
  forge:   { color: '#a85a2a', name: 'КУЗНЯ' },
  moon:    { color: '#5b88c2', name: 'ЛУНА' },
};

const TILES = [
  // bottom-right corner (start)
  { kind: 'corner', label: 'НАЧАЛО', sub: '+200 ⚜', icon: 'gate' },

  // bottom row (right to left) — 9 tiles
  { kind: 'prop', region: 'swamp', name: 'Гнилое Болото', price: 60 },
  { kind: 'event', label: 'Удача', icon: 'fortune' },
  { kind: 'prop', region: 'swamp', name: 'Логово Жаб', price: 60 },
  { kind: 'prop', region: 'swamp', name: 'Топь Утопленников', price: 80 },
  { kind: 'tax', label: 'Десятина', sub: '−10%' },
  { kind: 'prop', region: 'cult', name: 'Алтарь Червя', price: 100 },
  { kind: 'prop', region: 'cult', name: 'Костяной Круг', price: 100 },
  { kind: 'event', label: 'Проклятие', icon: 'curse' },
  { kind: 'prop', region: 'cult', name: 'Храм Безымянного', price: 120 },

  // bottom-left corner
  { kind: 'corner', label: 'ТЁМНИЦА', sub: 'пропуск 2 хода', icon: 'jail' },

  // left column (bottom to top) — 9 tiles
  { kind: 'prop', region: 'market', name: 'Воровской Рынок', price: 140, icon: 'market' },
  { kind: 'quest', label: 'Квест', icon: 'scroll' },
  { kind: 'prop', region: 'market', name: 'Лавка Алхимика', price: 140 },
  { kind: 'prop', region: 'market', name: 'Чёрный Базар', price: 160 },
  { kind: 'shop', label: 'Кузня', sub: 'прокачка', icon: 'anvil' },
  { kind: 'prop', region: 'arcane', name: 'Башня Архимага', price: 180, icon: 'tower' },
  { kind: 'prop', region: 'arcane', name: 'Зал Стихий', price: 180 },
  { kind: 'event', label: 'Удача', icon: 'fortune' },
  { kind: 'prop', region: 'arcane', name: 'Обсерватория', price: 200 },

  // top-left corner
  { kind: 'corner', label: 'СВЯТИЛИЩЕ', sub: 'отдых +HP', icon: 'sanctuary' },

  // top row (left to right) — 9 tiles
  { kind: 'prop', region: 'crypt', name: 'Костница', price: 220, icon: 'crypt' },
  { kind: 'event', label: 'Проклятие', icon: 'curse' },
  { kind: 'prop', region: 'crypt', name: 'Усыпальница Королей', price: 220 },
  { kind: 'prop', region: 'crypt', name: 'Чёрный Курган', price: 240 },
  { kind: 'tax', label: 'Налог Лорда', sub: '−15%' },
  { kind: 'prop', region: 'citadel', name: 'Барбакан', price: 260 },
  { kind: 'prop', region: 'citadel', name: 'Донжон', price: 260, icon: 'castle' },
  { kind: 'quest', label: 'Квест', icon: 'scroll' },
  { kind: 'prop', region: 'citadel', name: 'Тронный Зал', price: 280 },

  // top-right corner
  { kind: 'corner', label: 'ПОРТАЛ', sub: 'телепорт', icon: 'portal' },

  // right column (top to bottom) — 9 tiles
  { kind: 'prop', region: 'forge', name: 'Гномья Кузня', price: 300, icon: 'anvil' },
  { kind: 'prop', region: 'forge', name: 'Литейная Душ', price: 300 },
  { kind: 'event', label: 'Удача', icon: 'fortune' },
  { kind: 'prop', region: 'forge', name: 'Адамантовая Шахта', price: 320 },
  { kind: 'shop', label: 'Таверна', sub: 'наём', icon: 'tavern' },
  { kind: 'prop', region: 'moon', name: 'Лунный Алтарь', price: 350, icon: 'moon' },
  { kind: 'event', label: 'Проклятие', icon: 'curse' },
  { kind: 'tax', label: 'Налог Короны', sub: '−10%' },
  { kind: 'prop', region: 'moon', name: 'Серебряный Шпиль', price: 400, icon: 'tower' },
];

// ── Single board tile (~60×60 by default) ──
function BoardTile({ tile, size = 56, players = [], owner, orientation = 'bottom', onClick, highlight }) {
  const region = tile.region ? REGIONS[tile.region] : null;

  // colorbar position rotates depending on which edge of the board
  const barStyle = {
    bottom: { top: 0, left: 0, right: 0, height: size * 0.22, borderBottom: '2px solid var(--ink)' },
    top: { bottom: 0, left: 0, right: 0, height: size * 0.22, borderTop: '2px solid var(--ink)' },
    left: { right: 0, top: 0, bottom: 0, width: size * 0.22, borderLeft: '2px solid var(--ink)' },
    right: { left: 0, top: 0, bottom: 0, width: size * 0.22, borderRight: '2px solid var(--ink)' },
  }[orientation];

  const isCorner = tile.kind === 'corner';
  const dim = isCorner ? size * 1.4 : size;

  return (
    <div onClick={onClick} style={{
      position: 'relative',
      width: dim, height: isCorner ? dim : (orientation === 'left' || orientation === 'right' ? size * 1.5 : size * 1.5),
      ...(orientation === 'left' || orientation === 'right' ? { width: size * 1.5, height: dim } : {}),
      background: tile.kind === 'corner' ? 'var(--panel-2)' : 'var(--panel)',
      boxShadow: highlight
        ? 'inset 0 0 0 2px var(--ink), inset 0 0 0 4px var(--gold-bright), 0 0 12px var(--gold)'
        : 'inset 0 0 0 2px var(--ink), inset 0 0 0 3px var(--rim-bright)',
      cursor: onClick ? 'pointer' : 'default',
      overflow: 'hidden',
    }}>
      {/* region color bar (only on properties) */}
      {region && (
        <div style={{ position: 'absolute', background: region.color, ...barStyle }} />
      )}

      {/* content */}
      <div style={{
        position: 'absolute', inset: 0,
        padding: 4,
        paddingTop: orientation === 'bottom' && region ? size * 0.24 : 4,
        paddingBottom: orientation === 'top' && region ? size * 0.24 : 4,
        paddingLeft: orientation === 'right' && region ? size * 0.24 : 4,
        paddingRight: orientation === 'left' && region ? size * 0.24 : 4,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 2,
        textAlign: 'center',
        fontFamily: 'var(--f-body)',
      }}>
        {tile.kind === 'corner' && (
          <>
            <TileIcon icon={tile.icon} size={isCorner ? 22 : 16} />
            <div style={{ fontFamily: 'var(--f-head)', fontSize: 6, color: 'var(--gold-bright)', letterSpacing: 0.5 }}>{tile.label}</div>
            {tile.sub && <div style={{ fontSize: 9, color: 'var(--bone-dim)' }}>{tile.sub}</div>}
          </>
        )}
        {tile.kind === 'prop' && (
          <>
            <div style={{ fontSize: 9, color: 'var(--bone)', lineHeight: 1, textWrap: 'pretty' }}>{tile.name}</div>
            {tile.icon && <TileIcon icon={tile.icon} size={14} />}
            <div style={{ fontFamily: 'var(--f-head)', fontSize: 6, color: 'var(--gold)', marginTop: 'auto' }}>{tile.price}⚜</div>
          </>
        )}
        {(tile.kind === 'event' || tile.kind === 'quest' || tile.kind === 'tax' || tile.kind === 'shop') && (
          <>
            <TileIcon icon={tile.icon} size={20} />
            <div style={{ fontFamily: 'var(--f-head)', fontSize: 6, color: 'var(--bone)' }}>{tile.label}</div>
            {tile.sub && <div style={{ fontSize: 9, color: 'var(--bone-dim)' }}>{tile.sub}</div>}
          </>
        )}
      </div>

      {/* owner marker — small flag in corner */}
      {owner && (
        <div style={{
          position: 'absolute', top: 2, right: 2,
          width: 8, height: 8, background: owner.color, boxShadow: '0 0 0 1px #000',
        }} />
      )}

      {/* player pawns — small chunky pixels at bottom */}
      {players.length > 0 && (
        <div style={{
          position: 'absolute',
          ...(orientation === 'bottom' ? { bottom: 2, left: 2, right: 2 } : {}),
          ...(orientation === 'top' ? { top: 2, left: 2, right: 2 } : {}),
          ...(orientation === 'left' ? { left: 2, top: 2, bottom: 2, flexDirection: 'column' } : {}),
          ...(orientation === 'right' ? { right: 2, top: 2, bottom: 2, flexDirection: 'column' } : {}),
          display: 'flex', gap: 2, flexWrap: 'wrap',
        }}>
          {players.map((p, i) => <Pawn key={i} color={p.color} />)}
        </div>
      )}
    </div>
  );
}

function Pawn({ color, size = 8 }) {
  return (
    <div style={{
      width: size, height: size,
      background: color,
      boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.4), inset -1px -1px 0 rgba(0,0,0,0.5), 0 0 0 1px #000',
    }} />
  );
}

function TileIcon({ icon, size = 16 }) {
  const path = {
    gate: <path d="M2 14h12V6L8 2 2 6v8zM6 14V9h4v5" stroke="currentColor" fill="none" strokeWidth="1"/>,
    jail: <g><rect x="2" y="3" width="12" height="11" fill="none" stroke="currentColor" strokeWidth="1"/><line x1="6" y1="3" x2="6" y2="14" stroke="currentColor"/><line x1="10" y1="3" x2="10" y2="14" stroke="currentColor"/></g>,
    sanctuary: <path d="M8 2L3 6v8h10V6L8 2zm-1 5h2v6H7V7z" fill="currentColor"/>,
    portal: <g><circle cx="8" cy="8" r="5" fill="none" stroke="currentColor"/><circle cx="8" cy="8" r="2" fill="currentColor"/></g>,
    fortune: <path d="M8 2v12M2 8h12M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1"/>,
    curse: <path d="M3 3l10 10M13 3L3 13M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1"/>,
    scroll: <g><rect x="3" y="3" width="10" height="10" fill="none" stroke="currentColor"/><line x1="5" y1="6" x2="11" y2="6" stroke="currentColor"/><line x1="5" y1="9" x2="11" y2="9" stroke="currentColor"/><line x1="5" y1="12" x2="9" y2="12" stroke="currentColor"/></g>,
    anvil: <path d="M2 8h12v3H2zM4 11h8v2H4zM6 4h4v4H6z" fill="currentColor"/>,
    tavern: <path d="M3 4h10v8H3zM5 6h6M5 9h6" stroke="currentColor" fill="none" strokeWidth="1"/>,
    tower: <path d="M5 14V4l3-2 3 2v10z M7 6h2M7 9h2" stroke="currentColor" fill="none"/>,
    crypt: <g><rect x="4" y="6" width="8" height="8" fill="currentColor"/><path d="M4 6L8 2l4 4" stroke="currentColor" fill="none"/></g>,
    castle: <g><rect x="2" y="6" width="12" height="8" fill="currentColor"/><rect x="2" y="4" width="2" height="2" fill="currentColor"/><rect x="6" y="4" width="2" height="2" fill="currentColor"/><rect x="10" y="4" width="2" height="2" fill="currentColor"/></g>,
    market: <g><path d="M3 6l2-3h6l2 3v8H3z" fill="currentColor"/><line x1="3" y1="9" x2="13" y2="9" stroke="var(--ink)"/></g>,
    moon: <path d="M10 2a6 6 0 100 12 4 4 0 010-12z" fill="currentColor"/>,
  }[icon] || <rect x="5" y="5" width="6" height="6" fill="currentColor"/>;
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ color: 'var(--gold)', imageRendering: 'pixelated' }}>{path}</svg>
  );
}

// ── Full board: 11×11 grid of tiles with center plaza ──
function GameBoard({ scale = 1, current = 0, players = [], owners = {}, theme = 'classic' }) {
  // Slice tile array into 4 sides of 11 (with shared corners)
  const t = TILES;
  // tile indices:
  // 0     bottom-right corner (start)
  // 1-9   bottom row right→left
  // 10    bottom-left corner
  // 11-19 left column bottom→top
  // 20    top-left corner
  // 21-29 top row left→right
  // 30    top-right corner
  // 31-39 right column top→bottom (wraps to 0)

  const cornerSize = 86 * scale;
  const tileW = 60 * scale;
  const tileH = 90 * scale;

  // Build positions for player pawns
  const playersByTile = {};
  players.forEach((p) => {
    (playersByTile[p.tile] = playersByTile[p.tile] || []).push(p);
  });

  const renderTile = (i, orientation) => (
    <BoardTile key={i} tile={t[i]} size={60 * scale}
      orientation={orientation}
      players={playersByTile[i] || []}
      owner={owners[i]}
      highlight={i === current}
    />
  );

  return (
    <div style={{
      position: 'relative',
      display: 'inline-block',
      padding: 12 * scale,
      background: 'var(--ink)',
      boxShadow: 'inset 0 0 0 4px var(--gold-dark), inset 0 0 0 6px var(--ink), inset 0 0 0 8px var(--gold)',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: `${cornerSize}px repeat(9, ${tileW}px) ${cornerSize}px`, gap: 2 * scale }}>
        {/* row 1: top-left corner, top row left→right, top-right corner */}
        {renderTile(20, 'top')}
        {Array.from({ length: 9 }, (_, i) => renderTile(21 + i, 'top'))}
        {renderTile(30, 'top')}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `${cornerSize}px 1fr ${cornerSize}px`, gap: 2 * scale, marginTop: 2 * scale }}>
        {/* row 2: left col 9 tiles (rotated), center plaza, right col 9 tiles (rotated) */}
        <div style={{ display: 'grid', gridTemplateRows: `repeat(9, ${tileW}px)`, gap: 2 * scale }}>
          {Array.from({ length: 9 }, (_, i) => renderTile(19 - i, 'left'))}
        </div>
        <BoardCenter theme={theme} />
        <div style={{ display: 'grid', gridTemplateRows: `repeat(9, ${tileW}px)`, gap: 2 * scale }}>
          {Array.from({ length: 9 }, (_, i) => renderTile(31 + i, 'right'))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `${cornerSize}px repeat(9, ${tileW}px) ${cornerSize}px`, gap: 2 * scale, marginTop: 2 * scale }}>
        {renderTile(10, 'bottom')}
        {Array.from({ length: 9 }, (_, i) => renderTile(9 - i, 'bottom'))}
        {renderTile(0, 'bottom')}
      </div>
    </div>
  );
}

function BoardCenter({ theme = 'classic' }) {
  return (
    <div style={{
      background: 'var(--void)',
      boxShadow: 'inset 0 0 0 2px var(--ink), inset 0 0 0 4px var(--rim), inset 0 0 0 6px var(--ink)',
      position: 'relative',
      overflow: 'hidden',
      minWidth: 200,
    }}>
      {/* dithered stars */}
      <svg viewBox="0 0 64 64" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <rect width="64" height="64" fill="var(--void)"/>
        {/* stars */}
        {[[6,8],[14,4],[22,12],[34,6],[44,10],[54,4],[58,16],[8,22],[18,28],[26,20],[40,24],[50,28],[56,32],[10,38],[20,44],[30,40],[42,46],[52,42],[60,48],[6,54],[16,58],[28,52],[36,58],[46,54],[54,60]].map(([x,y],i) => (
          <rect key={i} x={x} y={y} width="1" height="1" fill="var(--bone-bright)"/>
        ))}
        {/* central tower silhouette */}
        <g transform="translate(20, 20)">
          <rect x="10" y="6" width="4" height="18" fill="#000"/>
          <rect x="9" y="8" width="6" height="14" fill="#000"/>
          <polygon points="9,6 15,6 12,2" fill="#000"/>
          <rect x="11" y="12" width="2" height="2" fill="var(--gold)"/>
          <rect x="11" y="18" width="2" height="2" fill="var(--gold)"/>
        </g>
      </svg>

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
        padding: 12,
      }}>
        <div style={{ fontFamily: 'var(--f-disp)', fontSize: 36, color: 'var(--gold)', textShadow: '2px 2px 0 var(--ink)', letterSpacing: 2, marginTop: 8 }}>
          АЛШАПОЛИЯ
        </div>
        <div style={{ fontFamily: 'var(--f-head)', fontSize: 7, color: 'var(--bone-dim)', textAlign: 'center', letterSpacing: 1 }}>
          ★ КОРОЛЕВСТВО ТЕНЕЙ ★
        </div>
        <div style={{
          display: 'flex', gap: 6, marginBottom: 8,
        }}>
          <DeckStack label="ФОРТУНА" tone="hex" />
          <DeckStack label="КВЕСТ" tone="gold" />
          <DeckStack label="ТОРГИ" tone="blood" />
        </div>
      </div>
    </div>
  );
}

function DeckStack({ label, tone = 'hex' }) {
  return (
    <div style={{ position: 'relative' }}>
      <CardBack w={44} h={62} tone={tone} />
      <div style={{
        position: 'absolute', bottom: -8, left: 0, right: 0,
        textAlign: 'center', fontFamily: 'var(--f-head)', fontSize: 5,
        color: `var(--${tone === 'rim' ? 'rim' : tone})`, letterSpacing: 0.5,
      }}>{label}</div>
    </div>
  );
}

Object.assign(window, { GameBoard, BoardTile, TILES, REGIONS, Pawn, TileIcon });
