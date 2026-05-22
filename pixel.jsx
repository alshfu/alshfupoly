/* Pixel-art helper components for Alshfupoly */

// ── Chunky pixel frame — for cards, panels, tiles ──
// Simulates a Sega-era stamped metal frame: dark outline, inner rim, inset
// bevel highlight. Pass tone to pick a rim color: 'rim', 'gold', 'blood',
// 'arcane', 'hex', 'toxic', 'bone'.
function PixFrame({ tone = 'rim', bg, children, style = {}, thick = 3, glow, ...rest }) {
  const rim = `var(--${tone === 'rim' ? 'rim' : tone})`;
  const rim2 = `var(--${tone === 'rim' ? 'rim-bright' : tone})`;
  return (
    <div {...rest} className={'pix ' + (rest.className || '')} style={{
      position: 'relative',
      background: bg || 'var(--panel)',
      boxShadow: [
        `0 0 0 ${thick}px var(--ink)`,
        `inset 0 0 0 ${thick}px ${rim}`,
        `inset 0 0 0 ${thick + 2}px var(--ink)`,
        `inset 0 0 0 ${thick + 3}px ${rim2}`,
        glow ? `0 0 0 ${thick + 2}px ${rim}, 0 0 24px ${rim}` : '',
      ].filter(Boolean).join(','),
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── 16-bit style chunky button ──
function PixButton({ children, tone = 'gold', onClick, style = {}, small, disabled }) {
  const [pressed, setPressed] = React.useState(false);
  const c = {
    gold: { fg: '#2a1a04', bg: 'var(--gold)', sh: 'var(--gold-dark)', hi: 'var(--gold-bright)' },
    blood: { fg: '#fff', bg: 'var(--blood)', sh: 'var(--blood-dark)', hi: 'var(--blood-bright)' },
    arcane: { fg: '#fff', bg: 'var(--arcane)', sh: 'var(--arcane-dark)', hi: 'var(--arcane-bright)' },
    bone: { fg: '#1a1230', bg: 'var(--bone)', sh: 'var(--bone-dim)', hi: 'var(--bone-bright)' },
    rim: { fg: 'var(--bone)', bg: 'var(--panel-2)', sh: 'var(--night)', hi: 'var(--rim)' },
  }[tone];
  return (
    <button onClick={onClick} disabled={disabled}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        fontFamily: 'var(--f-head)', fontSize: small ? 8 : 10, letterSpacing: 1,
        background: c.bg, color: c.fg, border: 'none',
        padding: small ? '6px 10px' : '10px 14px',
        textTransform: 'uppercase',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: pressed
          ? `inset 2px 2px 0 ${c.sh}, 0 0 0 2px var(--ink)`
          : `inset 2px 2px 0 ${c.hi}, inset -2px -2px 0 ${c.sh}, 0 0 0 2px var(--ink)`,
        transform: pressed ? 'translate(1px,1px)' : 'none',
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}>{children}</button>
  );
}

// ── Pip / counter — small chunky number bubble (mana, atk, hp) ──
function PixPip({ value, tone = 'arcane', size = 24, style = {} }) {
  const colors = {
    arcane: { bg: '#1c4078', rim: '#7ab3e8', tx: '#fff' },
    blood: { bg: '#7a1820', rim: '#ff8088', tx: '#fff' },
    gold: { bg: '#8a6720', rim: '#f7d96a', tx: '#2a1a04' },
    bone: { bg: '#6a5a3a', rim: '#f5ebcc', tx: '#1a1230' },
    toxic: { bg: '#2e5a1c', rim: '#9bdb6e', tx: '#fff' },
  }[tone];
  return (
    <div style={{
      width: size, height: size,
      background: colors.bg,
      color: colors.tx,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--f-head)', fontSize: size * 0.42,
      boxShadow: `inset 2px 2px 0 ${colors.rim}, inset -2px -2px 0 #000, 0 0 0 2px #000`,
      ...style,
    }}>{value}</div>
  );
}

// ── Health bar — segmented chunky pixel bar ──
function PixBar({ value, max, tone = 'blood', height = 12, width = 120, label, showText }) {
  const ratio = Math.max(0, Math.min(1, value / max));
  const colors = {
    blood: { fill: 'var(--blood)', hi: 'var(--blood-bright)', shadow: 'var(--blood-dark)' },
    arcane: { fill: 'var(--arcane)', hi: 'var(--arcane-bright)', shadow: 'var(--arcane-dark)' },
    gold: { fill: 'var(--gold)', hi: 'var(--gold-bright)', shadow: 'var(--gold-dark)' },
    toxic: { fill: 'var(--toxic)', hi: '#9bdb6e', shadow: 'var(--toxic-dark)' },
  }[tone];
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      {label && <span style={{ fontFamily: 'var(--f-head)', fontSize: 8, color: 'var(--bone)' }}>{label}</span>}
      <div style={{
        position: 'relative', width, height, background: '#08051a',
        boxShadow: 'inset 1px 1px 0 #000, 0 0 0 2px #000, 0 0 0 3px var(--rim)',
      }}>
        <div style={{
          width: `${ratio * 100}%`, height: '100%',
          background: colors.fill,
          boxShadow: `inset 0 2px 0 ${colors.hi}, inset 0 -2px 0 ${colors.shadow}`,
          transition: 'width .3s steps(8)',
        }} />
        {showText && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--f-head)', fontSize: 7, color: 'var(--bone-bright)', textShadow: '1px 1px 0 #000' }}>
            {value}/{max}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Pixel illustration placeholder — striped panel with label ──
// Used wherever we'd put real pixel art. SVG-rendered so we can compose
// simple silhouettes for variety.
function PixIllus({ label, w, h, kind = 'creature', tint = 'panel', style = {} }) {
  const palette = {
    panel: { bg: '#1a1230', mid: '#3d2d66', hi: '#5b438f' },
    crypt: { bg: '#0e0a1a', mid: '#2a1f48', hi: '#4a3878' },
    blood: { bg: '#3a0a14', mid: '#7a1820', hi: '#c8313a' },
    arcane: { bg: '#0f1c3a', mid: '#1f3f6b', hi: '#4b88c2' },
    gold: { bg: '#2a1a04', mid: '#5a3f10', hi: '#a07820' },
    toxic: { bg: '#1a2a10', mid: '#2e5a1c', hi: '#66b542' },
    forest: { bg: '#102018', mid: '#1f4030', hi: '#3e7a5e' },
  }[tint] || { bg: '#1a1230', mid: '#3d2d66', hi: '#5b438f' };

  // pick a silhouette by kind
  const silhouettes = {
    creature: <CreatureSilhouette palette={palette} />,
    castle: <CastleSilhouette palette={palette} />,
    crypt: <CryptSilhouette palette={palette} />,
    tower: <TowerSilhouette palette={palette} />,
    market: <MarketSilhouette palette={palette} />,
    skull: <SkullSilhouette palette={palette} />,
    item: <ItemSilhouette palette={palette} />,
    spell: <SpellSilhouette palette={palette} />,
    portrait: <PortraitSilhouette palette={palette} />,
  };
  return (
    <div className="pix" style={{ position: 'relative', width: w, height: h, background: palette.bg, overflow: 'hidden', ...style }}>
      {/* dithered atmosphere */}
      <svg viewBox="0 0 64 48" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <pattern id={`dith-${tint}`} width="2" height="2" patternUnits="userSpaceOnUse">
            <rect width="1" height="1" fill={palette.mid}/>
            <rect x="1" y="1" width="1" height="1" fill={palette.mid}/>
          </pattern>
        </defs>
        <rect width="64" height="20" fill={`url(#dith-${tint})`} opacity="0.5"/>
        {silhouettes[kind] || silhouettes.creature}
      </svg>
      {label && (
        <div style={{
          position: 'absolute', bottom: 2, left: 0, right: 0, textAlign: 'center',
          fontFamily: 'var(--f-body)', fontSize: 8, color: 'rgba(232,217,176,0.4)',
          letterSpacing: 0.5, textTransform: 'uppercase',
        }}>{label}</div>
      )}
    </div>
  );
}

// Crude pixel silhouettes — all on 64×48 viewbox
function CreatureSilhouette({ palette }) {
  return (
    <g>
      {/* moon */}
      <rect x="42" y="6" width="6" height="6" fill={palette.hi} opacity="0.6"/>
      {/* horned head */}
      <rect x="22" y="14" width="20" height="14" fill="#000"/>
      <rect x="20" y="10" width="4" height="6" fill="#000"/>
      <rect x="40" y="10" width="4" height="6" fill="#000"/>
      <rect x="18" y="8" width="2" height="4" fill="#000"/>
      <rect x="44" y="8" width="2" height="4" fill="#000"/>
      {/* eyes */}
      <rect x="26" y="18" width="3" height="3" fill="#ff5c66"/>
      <rect x="35" y="18" width="3" height="3" fill="#ff5c66"/>
      {/* fangs */}
      <rect x="28" y="24" width="2" height="3" fill={palette.hi}/>
      <rect x="34" y="24" width="2" height="3" fill={palette.hi}/>
      {/* body / cape */}
      <rect x="16" y="28" width="32" height="20" fill="#000"/>
      <rect x="14" y="32" width="2" height="10" fill="#000"/>
      <rect x="48" y="32" width="2" height="10" fill="#000"/>
    </g>
  );
}
function CastleSilhouette({ palette }) {
  return (
    <g>
      <rect x="0" y="34" width="64" height="14" fill="#000"/>
      <rect x="8" y="22" width="10" height="14" fill="#000"/>
      <rect x="26" y="14" width="12" height="22" fill="#000"/>
      <rect x="46" y="22" width="10" height="14" fill="#000"/>
      {/* crenellations */}
      <rect x="8" y="20" width="2" height="2" fill="#000"/>
      <rect x="12" y="20" width="2" height="2" fill="#000"/>
      <rect x="16" y="20" width="2" height="2" fill="#000"/>
      <rect x="26" y="12" width="2" height="2" fill="#000"/>
      <rect x="30" y="12" width="2" height="2" fill="#000"/>
      <rect x="34" y="12" width="2" height="2" fill="#000"/>
      <rect x="46" y="20" width="2" height="2" fill="#000"/>
      <rect x="50" y="20" width="2" height="2" fill="#000"/>
      <rect x="54" y="20" width="2" height="2" fill="#000"/>
      {/* windows */}
      <rect x="30" y="20" width="4" height="4" fill={palette.hi}/>
      <rect x="11" y="26" width="2" height="3" fill={palette.hi}/>
      <rect x="51" y="26" width="2" height="3" fill={palette.hi}/>
    </g>
  );
}
function CryptSilhouette({ palette }) {
  return (
    <g>
      {/* tombstones */}
      <rect x="8" y="28" width="10" height="16" fill="#000"/>
      <rect x="6" y="26" width="14" height="2" fill="#000"/>
      <rect x="11" y="32" width="4" height="2" fill={palette.mid}/>
      <rect x="11" y="36" width="4" height="2" fill={palette.mid}/>

      <rect x="24" y="22" width="16" height="22" fill="#000"/>
      <rect x="22" y="20" width="20" height="2" fill="#000"/>
      <rect x="30" y="26" width="4" height="6" fill={palette.hi}/>

      <rect x="46" y="30" width="10" height="14" fill="#000"/>
      <rect x="44" y="28" width="14" height="2" fill="#000"/>
      <rect x="49" y="34" width="4" height="2" fill={palette.mid}/>
      {/* fog */}
      <rect x="0" y="42" width="64" height="2" fill={palette.mid} opacity="0.6"/>
    </g>
  );
}
function TowerSilhouette({ palette }) {
  return (
    <g>
      <rect x="26" y="6" width="12" height="40" fill="#000"/>
      <rect x="24" y="10" width="2" height="36" fill="#000"/>
      <rect x="38" y="10" width="2" height="36" fill="#000"/>
      <rect x="22" y="20" width="2" height="6" fill="#000"/>
      <rect x="40" y="20" width="2" height="6" fill="#000"/>
      {/* roof */}
      <polygon points="24,6 40,6 32,0" fill="#000"/>
      {/* windows glow */}
      <rect x="30" y="14" width="4" height="4" fill={palette.hi}/>
      <rect x="30" y="26" width="4" height="3" fill={palette.hi}/>
      <rect x="30" y="34" width="4" height="3" fill={palette.hi}/>
    </g>
  );
}
function MarketSilhouette({ palette }) {
  return (
    <g>
      {/* tents */}
      <polygon points="6,38 18,38 12,24" fill="#000"/>
      <rect x="6" y="38" width="12" height="6" fill="#000"/>
      <polygon points="22,40 38,40 30,22" fill="#000"/>
      <rect x="22" y="40" width="16" height="6" fill="#000"/>
      <polygon points="42,38 56,38 49,24" fill="#000"/>
      <rect x="42" y="38" width="14" height="6" fill="#000"/>
      {/* lanterns */}
      <rect x="11" y="30" width="2" height="3" fill={palette.hi}/>
      <rect x="29" y="28" width="2" height="3" fill={palette.hi}/>
      <rect x="48" y="30" width="2" height="3" fill={palette.hi}/>
      {/* stripes */}
      <rect x="24" y="32" width="2" height="8" fill={palette.mid}/>
      <rect x="28" y="32" width="2" height="8" fill={palette.mid}/>
      <rect x="32" y="32" width="2" height="8" fill={palette.mid}/>
    </g>
  );
}
function SkullSilhouette({ palette }) {
  return (
    <g>
      <rect x="20" y="12" width="24" height="20" fill={palette.hi === '#f7d96a' ? '#e8d9b0' : '#d4c5a0'}/>
      <rect x="18" y="14" width="2" height="14" fill="#d4c5a0"/>
      <rect x="44" y="14" width="2" height="14" fill="#d4c5a0"/>
      {/* eyes */}
      <rect x="24" y="18" width="5" height="6" fill="#000"/>
      <rect x="35" y="18" width="5" height="6" fill="#000"/>
      <rect x="26" y="20" width="2" height="2" fill="#ff5c66"/>
      <rect x="37" y="20" width="2" height="2" fill="#ff5c66"/>
      {/* teeth */}
      <rect x="22" y="30" width="20" height="6" fill="#d4c5a0"/>
      <rect x="24" y="30" width="2" height="6" fill="#000"/>
      <rect x="28" y="30" width="2" height="6" fill="#000"/>
      <rect x="32" y="30" width="2" height="6" fill="#000"/>
      <rect x="36" y="30" width="2" height="6" fill="#000"/>
    </g>
  );
}
function ItemSilhouette({ palette }) {
  return (
    <g>
      {/* chest */}
      <rect x="14" y="22" width="36" height="20" fill="#000"/>
      <rect x="14" y="18" width="36" height="6" fill="#000"/>
      <rect x="16" y="20" width="32" height="2" fill={palette.hi}/>
      <rect x="30" y="28" width="4" height="6" fill={palette.hi}/>
      {/* sparkle */}
      <rect x="46" y="10" width="2" height="2" fill={palette.hi}/>
      <rect x="50" y="14" width="2" height="2" fill={palette.hi}/>
      <rect x="12" y="12" width="2" height="2" fill={palette.hi}/>
    </g>
  );
}
function SpellSilhouette({ palette }) {
  return (
    <g>
      {/* pentagram-ish */}
      <rect x="30" y="8" width="4" height="4" fill={palette.hi}/>
      <rect x="20" y="20" width="4" height="4" fill={palette.hi}/>
      <rect x="40" y="20" width="4" height="4" fill={palette.hi}/>
      <rect x="24" y="34" width="4" height="4" fill={palette.hi}/>
      <rect x="36" y="34" width="4" height="4" fill={palette.hi}/>
      {/* connecting glow */}
      <rect x="28" y="22" width="8" height="8" fill="#fff" opacity="0.5"/>
      <rect x="30" y="20" width="4" height="12" fill="#fff"/>
      <rect x="26" y="24" width="12" height="4" fill="#fff"/>
    </g>
  );
}
function PortraitSilhouette({ palette }) {
  return (
    <g>
      {/* helm */}
      <rect x="22" y="10" width="20" height="16" fill="#000"/>
      <rect x="20" y="14" width="2" height="10" fill="#000"/>
      <rect x="42" y="14" width="2" height="10" fill="#000"/>
      {/* visor slit */}
      <rect x="24" y="18" width="16" height="3" fill={palette.hi}/>
      {/* plume */}
      <rect x="30" y="6" width="4" height="6" fill={palette.hi === '#f7d96a' ? '#c8313a' : palette.hi}/>
      {/* shoulders */}
      <rect x="16" y="26" width="32" height="22" fill="#000"/>
      <rect x="14" y="30" width="2" height="14" fill="#000"/>
      <rect x="48" y="30" width="2" height="14" fill="#000"/>
    </g>
  );
}

Object.assign(window, { PixFrame, PixButton, PixPip, PixBar, PixIllus });
