# Алшаполия · Промпты для генерации арта карт v0.2

Готовые подсказки для нейросетей (Midjourney v6/v7, SDXL, Flux, Imagen, DALL·E). На каждую из 80 карт.

## Как пользоваться

1. Скопируй **стилевой блок** ниже один раз (это «голос» твоей колоды).
2. Открой нужную карту в этом файле — копируй `prompt` и подставляй вместо `[STYLE]`.
3. Для Midjourney: `[STYLE] [card prompt] --ar 4:3 --style raw --s 250`.
4. Для Flux/SDXL: добавь negative prompt снизу.

Если хочешь, чтобы карты выглядели как один набор — **не меняй стилевой блок между картами**. Меняй только описание предмета.

---

## Стилевой блок (вставляй в каждый промпт)

```
16-bit pixel art, Sega Mega Drive aesthetic (1992-1995 era),
dark gothic fantasy, 64x48 sprite resolution, limited palette of ~16 colors,
chunky 2-pixel-wide strokes, no anti-aliasing, hard pixel edges,
dithering for shading and gradients, painterly background with simple geometric foreground,
moody chiaroscuro lighting with one strong light source,
deep purple/indigo backgrounds, gold and bone-white accents
```

## Негативные подсказки (для SDXL/Flux)

```
3d render, smooth gradients, photorealistic, modern illustration,
anti-aliased edges, blur, motion blur, depth of field, bokeh,
hd, 4k, octane render, unreal engine,
text, watermark, signature, frame, border, ui
```

## Палитра по фракциям

При генерации можно подсказать модели:

- **Рыцари Зари**: gold `#e8b84c`, bone `#e8d9b0`, azure `#4b88c2`, deep blue `#1f3f6b`
- **Орден Червя**: purple `#9558d6`, dark purple `#4a1f7a`, blood red `#c8313a`, bone `#e8d9b0`
- **Вольное Купечество**: gold `#e8b84c`, ochre `#a85a2a`, leather brown `#5a3f10`, deep red `#7a1820`
- **Высший Ковен**: azure `#4b88c2`, sky blue `#7ab3e8`, deep blue `#1f3f6b`, silver `#b8a778`
- **Нейтральные (квесты/фортуна)**: dark purple panel `#2a1f48`, bone, single faction accent

---

## КРЕАТУРЫ · РЫЦАРИ ЗАРИ

### kn_acolyte — Послушник Зари (1m · 1/2)
```
[STYLE], palette: gold + bone + dark purple — young novice in pale gold robe holding small wooden lantern, gothic monastery archway behind, soft single candle glow, simple peaceful expression, half-body portrait
```

### kn_pilgrim — Пилигрим Зари (2m · 2/3, Священное)
```
[STYLE], palette: gold + bone + dark purple — cloaked pilgrim with walking staff and faint golden halo, dusty road behind, dawn light on tarnished chestplate, weary but resolute, half-body
```

### kn_shieldman — Щитоносец (2m · 1/4, Защитник)
```
[STYLE], palette: gold + bone + azure — stoic knight crouched behind massive kite shield blocking arrows mid-flight, battered helm with visor down, blue and gold tabard, front view
```

### kn_vanguard — Рыцарь Авангарда (3m · 3/3, Защитник)
```
[STYLE], palette: gold + bone + azure — knight in full battered plate armor with longsword raised, ruined battlefield with broken banners, golden lion crest on shield, heroic pose
```

### kn_chaplain — Капеллан (3m · 2/4, при появлении: +2 HP)
```
[STYLE], palette: gold + bone + azure — warrior priest in golden vestments with battle mace and gold chalice, glowing palm releasing healing light, war banner behind, kind but tired face
```

### kn_bannerman — Знаменосец (3m · 2/3, аура +1 ATK)
```
[STYLE], palette: gold + bone + azure — knight holding torn golden battle banner aloft against wind, soldiers rallying in silhouette behind, defiant expression
```

### kn_paladin — Паладин Восхода (4m · 4/4, Священное + Защитник) RARE
```
[STYLE], palette: gold + bone + bright gold halo — armored paladin with glowing two-handed sword, golden divine aura, kneeling on broken cathedral tomb, helmet under arm, scarred noble face
```

### kn_healer — Целительница Лазури (3m · 2/3, раз в ход: лечит 2) RARE
```
[STYLE], palette: azure + bone + gold accents — young female cleric in azure-and-gold robes with hood down, glowing palms releasing soft blue light, floating glyphs around hands
```

### kn_archstrateg — Архистратиг (5m · 4/6, аура EoT +1/+1) EPIC
```
[STYLE], palette: gold + azure + bone, ornate — grizzled veteran general in ornate gold-and-azure plate, deep scar across face, holding parchment battle map, war room ruins behind, banners
```

### kn_aldrich — Сир Альдрих, Меч Зари (5m · 5/5, Священное+Стремительность+воскрешение) LEGENDARY
```
[STYLE], palette: brilliant gold + bone + dark purple — legendary armored knight mid-swing with brilliant golden two-handed sword, holy fire trailing behind blade, broken army of skeletons collapsing at feet, dramatic backlight, hero pose
```

---

## КРЕАТУРЫ · ОРДЕН ЧЕРВЯ

### nc_servant — Костяной Слуга (1m · 1/1, deathrattle: draw)
```
[STYLE], palette: purple + bone + dark purple — small skeletal servant carrying a tray of bones with shaking hands, hollow purple-glowing eye sockets, tattered shroud, crypt corridor with dripping water
```

### nc_skel — Скелет-копейщик (2m · 2/2)
```
[STYLE], palette: purple + bone — gaunt skeleton warrior with rusted iron spear and broken helm, purple necromantic glow in eye sockets, single ribcage rib missing, dusty crypt
```

### nc_zombie — Зомби-рекрут (2m · 1/3, Защитник)
```
[STYLE], palette: purple + sickly green + brown — bloated rotting undead in ragged peasant armor, arms outstretched, sickly green tint to skin, swamp mist rising, blank stare
```

### nc_rot — Гниль Кладбища (2m · 2/2, deathrattle: +1/+1)
```
[STYLE], palette: dark purple + sickly green + bone — writhing mass of black ichor and bone fragments crawling between gravestones, fungi blooms in cracks, lone candle flickering
```

### nc_summoner — Призыватель Тлена (3m · 2/3, призывает Скелета)
```
[STYLE], palette: purple + bone + bright purple glow — hooded necromancer holding skull-tipped staff, two ghostly skeletons rising from broken earth, swirling purple mist, no face visible
```

### nc_boneweaver — Костеплёт (3m · 3/2, при появлении: 1 dmg)
```
[STYLE], palette: purple + bone + faint red — skeletal mage weaving thread of bones in air like loom, half-formed bone monster taking shape behind, glowing fingertips
```

### nc_reaper — Жнец из Костницы (3m · 3/3, Удар) RARE
```
[STYLE], palette: deep purple + bone + faint red — tall hooded reaper figure with curved scythe glowing dark purple, skull face barely visible under hood, scattered bones at feet, fog
```

### nc_plague — Чумной Жрец (4m · 3/4, debuff at появлении) RARE
```
[STYLE], palette: purple + sickly green + bone — plague priest in beak mask and ragged purple robes, pouring sickly green liquid from chalice, swirling flies, grim cathedral background
```

### nc_chamber — Чёрная Палата (4m · 2/5, проклятия) EPIC
```
[STYLE], palette: dark purple + bone + faint red glow — thirteen hooded figures forming perfect circle around black altar, glowing red runes on floor between candles, top-down composition
```

### nc_velekor — Лич Велекор (5m · 4/6, EoT revive) LEGENDARY
```
[STYLE], palette: dark purple + bone + bright purple — ancient lich king with crown of black bones, robe of shadow and rags, glowing purple eyes, seated on throne of skulls, ornate macabre detail
```

---

## КРЕАТУРЫ · ВОЛЬНОЕ КУПЕЧЕСТВО

### mr_spy — Шпион Гильдии (1m · 1/1, Незримость + scry)
```
[STYLE], palette: gold + leather brown + deep red — hooded scout in dark leather cloak looking over shoulder, silver dagger in belt, dim alley shadows behind, single torch light
```

### mr_cabinboy — Юнга Корабельный (1m · 2/1)
```
[STYLE], palette: leather brown + bone + red — scrappy young sailor in dirty white shirt with rope and short blade, ship rigging behind, mischievous grin, dock at sunset
```

### mr_merc — Наёмник Базара (2m · 3/2)
```
[STYLE], palette: leather brown + gold + deep red — scarred mercenary with curved scimitar drawn, gold earring, leather armor with brass studs, exotic bazaar awnings and incense smoke behind
```

### mr_smuggler — Контрабандист (2m · 2/2, deathrattle: +20⚜)
```
[STYLE], palette: leather brown + gold + dark blue — shifty smuggler with crate clutched under cloak, gold coins falling unnoticed from torn pocket, dockside lantern at night, moored ship in mist
```

### mr_alchemist — Алхимик-аптекарь (3m · 2/3, draw)
```
[STYLE], palette: leather brown + green + gold — bent old apothecary with leather apron and brass goggles, shelves of glowing colored potions, green smoke from beaker on table
```

### mr_caravan — Караванщик (3m · 3/3, +⚜ EoT)
```
[STYLE], palette: brown + gold + warm sunset orange — burly merchant with whip and leather ledger, two pack mules loaded with crates and bundles, dusty trade road at sunset, distant town
```

### mr_hound — Гончая Гильдии (3m · 3/2, Стремительность) RARE
```
[STYLE], palette: black + gold + deep red — lean black hunting dog with gold spiked collar, fangs bared mid-snarl, racing through smoke and embers, motion lines, low-angle dynamic shot
```

### mr_changer — Меняла Чёрного Базара (4m · 3/4, pay→draw) RARE
```
[STYLE], palette: gold + deep red + leather — fat moneychanger at stall with brass scales, piles of gold coins, pulling gold tooth with pliers, market torchlight, greedy smirk
```

### mr_baron — Барон Купечества (4m · 3/4, draw 2 give 1) EPIC
```
[STYLE], palette: deep red velvet + gold + ivory — elegant aristocrat in velvet doublet and gold chains, sipping red wine, signing parchment with quill, vaulted chamber with hanging tapestries
```

### mr_archon — Архонт Гильдии (5m · 4/5, draw per tile) LEGENDARY
```
[STYLE], palette: gold + ivory + deep red — regal merchant archon on raised platform overseeing busy port from above, flowing golden cloak, three masks on chains at belt, crown shaped from coins
```

---

## КРЕАТУРЫ · ВЫСШИЙ КОВЕН

### ch_raven — Рунический Ворон (1m · 1/2, battlecry draw)
```
[STYLE], palette: dark blue + azure + bone — raven with glowing azure runes etched on feathers, perched on open grimoire, single eye glowing arcane blue, candle wax on book edge
```

### ch_apprentice — Ученик Архимага (2m · 1/3, spell synergy)
```
[STYLE], palette: azure + indigo + gold accent — young apprentice mage in oversized blue robes, glowing spellbook open in nervous hands, sparks of arcane energy in air, study tower window
```

### ch_warden — Стражник Башни (2m · 1/4, Защитник)
```
[STYLE], palette: indigo + azure + silver — stone golem warden with azure arcane runes glowing on chest, holding ornate halberd, standing in tower archway, motionless guard pose
```

### ch_summoner — Призыватель Стихий (3m · 2/3, при появлении: 1 dmg)
```
[STYLE], palette: azure + multi-color elemental accents — mage with four small swirling elemental orbs around hands (fire, water, wind, earth), robe of deep azure, focused expression
```

### ch_golem — Эфирный Голем (3m · 3/4, Эфирный)
```
[STYLE], palette: azure + translucent white + silver — translucent crystalline humanoid golem floating, refracting blue arcane energy through faceted body, ethereal smoke trail around
```

### ch_crystal — Хранитель Кристаллов (3m · 2/4, сэйв маны)
```
[STYLE], palette: indigo + bright azure + silver — robed mage holding huge glowing geometric blue crystal aloft, beams of light shooting from facets onto dark sanctum walls
```

### ch_battlemage — Боевой Маг (3m · 3/3, 2 dmg battlecry) RARE
```
[STYLE], palette: azure + deep blue + silver armor — armored battle-mage with staff topped by lightning sphere, blue lightning crackling around staff, battle stance, smoke
```

### ch_owl — Сова Архимага (4m · 3/3, -1 spell cost) RARE
```
[STYLE], palette: deep indigo + azure + bone — majestic horned owl with brilliant azure glow in eyes, perched on stack of ancient grimoires, single candle flame nearby, watchful pose
```

### ch_avatar — Воплощение Маны (5m · 4/4, scales with spells) EPIC
```
[STYLE], palette: pure azure + cyan + silver glow — humanoid figure made entirely of swirling blue mana energy, glowing veins of light, geometric arcane patterns inscribed in chest
```

### ch_selestria — Архимаг Селестрия (5m · 4/5, draw 2 + spell repeat) LEGENDARY
```
[STYLE], palette: silver + azure + deep indigo — elegant elder archmage in long silver-azure robes with high collar, floating ankh of stars before chest, glowing third eye on forehead, observatory of constellations behind
```

---

## ЗАКЛИНАНИЯ

Заклинания обычно без персонажей — это эффект. Композиция: эффект в центре, фон фракционный.

### kn_sp_rays — Лучи Зари
```
[STYLE], palette: gold + bone — golden divine light beams piercing through tall gothic stone window, ascending dust motes, no characters
```

### kn_sp_strike — Священный Удар
```
[STYLE], palette: gold + white-hot + dark purple — blazing golden sword mid-arc striking down, white-hot blade trail, target shattering into ash and light
```

### kn_sp_seal — Печать Защиты RARE
```
[STYLE], palette: gold + azure — glowing golden geometric sigil floating over a kneeling knight's chest, shield of light enveloping body, particles
```

### kn_sp_dawn — Свет Восхода EPIC
```
[STYLE], palette: gold + sunrise orange + bone — sunburst breaking over ranks of armored knights from above, every figure haloed in golden light, banners snapping in wind, wide shot
```

### nc_sp_curse — Проклятье
```
[STYLE], palette: dark purple + faint green — purple necrotic energy curling around a victim's throat, hex sigil burning on forehead, mouth open in scream, close-up
```

### nc_sp_raise — Поднять Падшего
```
[STYLE], palette: purple + bone + dark earth — skeletal hand rising from churned grave dirt amid scattered bones, purple necromantic glow leaking from cracks in ground
```

### nc_sp_bones — Ливень Костей RARE
```
[STYLE], palette: dark purple + bone + grey — rain of bones and skull fragments falling from oppressive grey sky onto battlefield of impaled silhouettes, wide composition
```

### nc_sp_overlord — Зов Властелина EPIC
```
[STYLE], palette: dark purple + blood red + bone — huge skeletal warlord emerging from circular purple portal, surrounded by kneeling sacrificed cultists, blood pooling at edge of circle
```

### mr_sp_score — Куш
```
[STYLE], palette: gold + leather brown — torn leather sack spilling gold coins onto cobblestone, single ruby glinting on top of pile, single lantern beam from above
```

### mr_sp_trade — Скупой Торг
```
[STYLE], palette: leather + gold + parchment — two hands exchanging coin pouch and rolled scroll over dark stone table, candle dripping wax onto wood, no faces shown
```

### mr_sp_bribe — Подкуп RARE
```
[STYLE], palette: gold + leather + deep red — hand sliding gold coin into a soldier's gauntlet from below, the soldier turning his head with smirk under helm, close-up
```

### mr_sp_buyout — Откуп Контракта EPIC
```
[STYLE], palette: deep red + gold + parchment + smoke — torn contract burning over a kneeling figure, golden coins paid to black-cloaked broker on side, dramatic backlight
```

### ch_sp_bolt — Молния
```
[STYLE], palette: bright azure + indigo — bright blue lightning bolt striking down through cloudy dark sky, summoner's hand visible at top with crackling fingertips, dynamic vertical
```

### ch_sp_blast — Эфирный Взрыв
```
[STYLE], palette: azure + cyan + white — concentric circles of pure arcane azure energy exploding outward from central point, creature silhouette caught at center, radial composition
```

### ch_sp_freeze — Заморозка RARE
```
[STYLE], palette: azure + ice white + silver — creature fully encased in jagged blue ice crystals frozen mid-pose, frost spreading on stone ground around it, breath misting
```

### ch_sp_meteor — Метеор EPIC
```
[STYLE], palette: deep blue + bright violet + orange impact — massive flaming blue-violet meteor smashing into battlefield from above, shockwave rings, debris flying, dramatic wide angle
```

---

## КВЕСТЫ

Квестовые карты — это **сценки**, не персонажи. Композиция шире, как мини-иллюстрация.

### qst_caravan — Заброшенный Обоз
```
[STYLE], palette: foggy purple + brown wood + bone — abandoned merchant caravan on misty forest road, broken wheels, scattered wooden crates, single raven on overturned corpse, dim overcast morning
```

### qst_pilgrim — Слепой Пилигрим
```
[STYLE], palette: bone + foggy purple — elderly blind pilgrim with milky cataracts and weathered walking staff, ragged cloak with hood up, alone on long foggy mountain road
```

### qst_well — Голос из Колодца
```
[STYLE], palette: deep purple + silver moonlight — old stone well overgrown with ivy in moonlight, small pale child's hand reaching up from darkness inside, single lantern abandoned on edge
```

### qst_usurer — Сделка с Ростовщиком
```
[STYLE], palette: deep red velvet + gold + brown wood — dwarf moneylender at dark wooden stall, brass scales tipped with gold, stack of parchment contracts, ink quill, lit by single oil lamp
```

### qst_shade — Раненая Тень
```
[STYLE], palette: silver mist + dark purple + faint blue — ethereal shadow creature bleeding silver mist, lying on cobblestone road, partially transparent body, sad glowing eyes, no other characters
```

### qst_bonecaravan — Костяной Караван
```
[STYLE], palette: dark purple + bone + purple flame — old wooden wagon driven by headless coachman holding reins, skeletons sitting upright in cart, single lantern with purple flame
```

### qst_scroll — Свиток в Башне RARE
```
[STYLE], palette: indigo + gold + bone parchment — ancient parchment scroll glowing with arcane runes lying on broken stone table, dust motes floating, abandoned mage tower interior, faint moonlight
```

### qst_child — Дитя Кладбища RARE
```
[STYLE], palette: bone + deep purple + cold blue — small pale child sitting on cracked tombstone, holding tattered rag doll, eyes glowing cold blue, low fog at feet, no adults visible
```

### qst_chapel — Заколоченная Часовня
```
[STYLE], palette: dark wood + purple + faint glow — abandoned gothic chapel with rotting wooden boards nailed across heavy door, faint warm glow leaking through cracks, overgrown approach
```

### qst_demon — Сделка с Демоном EPIC
```
[STYLE], palette: black + blood red + deep purple — hooded figure waiting at midnight crossroads, glowing red eyes barely visible under hood, one gloved hand outstretched with smoke curling, full moon behind
```

### qst_moon — Лунный Странник RARE
```
[STYLE], palette: blood red + silver + dark purple — silhouette of robed wanderer walking under huge blood-red moon, mouth open in song, mist trailing from feet, dreamlike landscape
```

### qst_crown_act1 — Корона Алшаполии · Акт I LEGENDARY
```
[STYLE], palette: gold + bone + dark purple — ancient stone keeper figure presenting a glowing rusted crown on velvet cushion in outstretched hands, broken throne room behind with collapsed pillars
```

---

## ФОРТУНА

### frt_purse — Найденный Кошель
```
[STYLE], palette: gold + leather brown + stone — leather pouch of coins fallen on cobblestone alley, single gold coin escaped to side, lantern light from above catching glint
```

### frt_ambush — Засада Разбойников
```
[STYLE], palette: dark green + brown leather + dull steel — three masked bandits stepping out from forest mist with crossbows raised, dim torchlight on dirty masks, ambush composition
```

### frt_blessing — Благословение Жреца
```
[STYLE], palette: gold + bone + warm — kindly old priest with white beard raising hands, releasing soft golden light onto kneeling figure below, small candlelit gothic shrine, peaceful
```

### frt_witchcurse — Проклятие Ведьмы
```
[STYLE], palette: sickly green + dark purple + bone — old hag witch pointing crooked finger, green hex sigil floating from fingertip, raven on her shoulder, twisted swamp hut behind
```

### frt_trader — Странный Торговец
```
[STYLE], palette: deep purple + gold + glowing accents — cloaked merchant under low hood with faint blue eyes visible, mismatched glowing wares (orbs, vials, gems) laid on dark cloth
```

### frt_plague — Чума
```
[STYLE], palette: muted brown + sickly green + grey — wide shot of plague-stricken medieval village, doors marked with red painted crosses, lone plague doctor in beak mask walking street
```

### frt_fair — Ярмарка
```
[STYLE], palette: warm orange + red + gold — colorful medieval fair with jugglers and a jester, food stalls under strings of paper lanterns, busy evening crowd, festive mood
```

### frt_darkpact — Тёмный Договор
```
[STYLE], palette: black + blood red + parchment — feather quill drawing red blood signature on parchment contract, demonic horned seal at bottom glowing red, melted candle wax, close-up
```

### frt_moonlight — Лунный Свет
```
[STYLE], palette: silver + deep blue + dark forest — soft silver moonlight pouring through tree branches onto solitary figure looking up at full moon, peaceful nightscape, distant owl
```

### frt_dreams — Хорошие Сны
```
[STYLE], palette: warm dawn orange + bone + dark earth — figure sleeping peacefully by extinguished campfire embers, soft warm dawn light just breaking, peaceful expression, ash drifting
```

### frt_illomen — Дурной Знак
```
[STYLE], palette: black + grey stone + single red — single black raven perched on weathered stone cross in fog, looking directly at viewer with one glowing red eye, ominous tight composition
```

### frt_foolsluck — Удача Дурака
```
[STYLE], palette: bright multi-color motley + gold — wide-grinning jester juggling skulls and gold coins together, motley patchwork costume, lopsided three-pointed hat with bells, mid-air pose
```

---

## Жетоны (бонус)

### tok_skeleton — Жетон-Скелет
```
[STYLE], palette: purple + bone — small simple skeleton warrior with single rusted dagger, hollow purple eyes, generic and minimalist, half-body for token use
```

### tok_guardian — Жетон-Страж
```
[STYLE], palette: dark purple + bone + faint red — large hulking bone guardian with patchwork armor of fused skulls, blank glowing red eyes, intimidating front pose
```

### tok_shade — Жетон-Тень
```
[STYLE], palette: silver mist + dark purple — fast-moving silver-mist creature in mid-leap, transparent body trailing mist, glowing white eyes, motion blur lines
```

---

## Советы по генерации

- **Сначала 1 карту**, посмотри как модель интерпретировала стиль — потом гоняй пакетом
- В Midjourney полезно добавить `--seed XXXXX` чтобы держать единый стиль между картами
- Если модель слишком «3D» — добавь в промпт `flat colors, no gradients`
- Если изображения слишком «милые» — добавь `grim, severe, brutal`
- На квестовых и фортунах — без героя крупным планом, фокус на сцене
- Если будешь печатать — генерируй в 4× размере (256×192 минимум) и потом ресайз с nearest-neighbor

## Workflow для пакетной генерации

Если хочешь автоматизировать через API (Stability, OpenAI Images, Replicate):

```python
import json
data = json.load(open('cards.json'))
STYLE = "16-bit pixel art, Sega Mega Drive aesthetic..."  # стилевой блок
NEG = "3d render, smooth gradients, photorealistic..."     # негатив

for card in data['cards']:
    if 'art_keywords' not in card:
        continue
    prompt = f"{STYLE}, {card['art_keywords']}"
    # вызов твоего API
    generate(prompt=prompt, negative=NEG, name=card['id'], size="512x384")
```

Готово. Жми.
