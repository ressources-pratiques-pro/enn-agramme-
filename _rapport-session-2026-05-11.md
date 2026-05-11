# Rapport de session — Site Ennéagramme

**Date** : 2026-05-11
**Repo** : `/Users/brahms/Documents/GitHub/enn-agramme-`
**Branche** : `main` (à jour avec `origin/main`)
**Dernier commit** : `278839b`

---

## 1. Vue d'ensemble — l'écosystème Diamant prend forme

Cette session, longue et dense, a essentiellement bâti **la rubrique Approche Diamant** du site. À partir d'un seul fiche-livre disponible (Facettes de l'Unité) à l'ouverture, on est passé à **quatre fiches majeures publiées**, toutes fidèles à Almaas, accompagnées de leurs documents de travail (synthèses, audits, cartographies). En parallèle, refonte complète de `explore.html` et déplacement de la fiche Expression sexuelle. Neuf commits poussés sur la journée.

---

## 2. Ce qui a été fait dans la session

### 2.1 Enrichissement de la fiche Facettes de l'Unité avec les 9 clés essentielles

**Origine** : intégration de l'ouvrage *Clefs pour l'Ennéagramme* d'Almaas (livre 23), explicitement compagnon de *Facettes de l'Unité*. Là où Facettes décrit la **perte** (illusion → difficulté → réaction), Clefs décrit la **voie de retour** : pour chaque type, une qualité essentielle réelle (aspect de l'Être) que l'idéal de l'ego imite obscurément et qui dénoue la fixation.

**Modifications apportées** :
- Bandeau livre étendu : « Facettes de l'Unité & Clés essentielles »
- Intro enrichie d'un paragraphe sur la continuité perte → retour
- Schéma SVG « Mouvement de la perte » → « Mouvement de la perte **et du retour** » : ajout d'une 4ᵉ étape ④ Clé essentielle avec arc qui remonte vers l'Idée sacrée
- **Bloc ④ Clé essentielle** ajouté dans chaque fiche-type, après ③ Réaction : nom français + anglais, description, sous-bloc « Comment elle se ressent », sous-bloc « Comment elle dénoue la fixation », citation centrale d'Almaas
- Section finale **vue d'ensemble des 9 clés** avec pastilles de couleur

**Les 9 clés essentielles** (par type) :

| Type | Clé essentielle | Texture/présence |
|---|---|---|
| 1 | La Brillance | fluide lisse sans couleur, intelligence-synthèse |
| 2 | L'Amour Fusionnel | or transparent doux qui fait fondre le cœur |
| 3 | L'Essence Personnelle | la perle blanche, individuation essentielle |
| 4 | L'Identité Essentielle | point de lumière étoilé, « Je » authentique |
| 5 | La Guidance Diamant | véhicule de diamants colorés au front |
| 6 | La Volonté Personnelle | argent chatoyant, solidité intérieure |
| 7 | Le Véhicule du Plaisir | diamants tournoyants, plaisir essentiel |
| 8 | La Force Véritable | feu rouge rubis dans le bas du corps |
| 9 | L'Amour Sans Limites | présence dorée-blanche enveloppante |

**Source de travail** : `_synthese-clefs-almaas.md`

### 2.2 Refonte du hub `approche-diamant.html`

**Décision éditoriale** : sortir de la logique « œuvres bibliographiques » pour une logique **thématique**.

- Section « L'œuvre d'Almaas » → **« Les enseignements »**
- Sous-sections : **Le socle** et **Aller plus loin**
- Renommage de toutes les cartes par titres thématiques (plus de titres de livres) :
  - *Facettes de l'Unité* → **Idées sacrées & clés essentielles**
  - *Essence* → **Qu'est-ce que l'Essence ?**
  - *La Perle Inestimable* → **La Perle — devenir une personne véritable**
  - *Le retour intérieur chez soi* → **Le retour intérieur — vue d'ensemble**
  - *Le vaisseau spatial Inquiry* → **L'Inquiry — le questionnement intérieur**
  - *Le Point de l'existence* → **L'identité essentielle et le narcissisme**
  - *L'épanouissement Maintenant* → **La présence dans l'instant**
  - *La série Cœur de Diamant* → **Cœur de Diamant — transmissions**
- **Carte « Clés pour l'Ennéagramme » supprimée** (désormais intégrée à la fiche Facettes)

### 2.3 Harmonisation typo : « Idée Sainte » → « Idée sacrée »

Convention de laïcité psycho-spirituelle. Remplacement systématique sur les pages actives (`diamant-facettes-unite.html`, `approche-diamant.html`). Almaas alterne *Holy* / *Sacred* en anglais — la version française unifie sur « sacrée », moins connotée religion.

### 2.4 Refonte complète de `explore.html`

L'ancienne page « 6 cartes-tiroirs » a été remplacée par une **page narrative scrollable en 10 mouvements**, construite pour faire comprendre l'Ennéagramme — pas juste survoler. Sources : *Personality Types* (PT) et *Understanding the Enneagram* (UTE) de Riso & Hudson, particulièrement le chapitre 14 « The Theory of the Enneagram ».

**Les 10 mouvements** :
1. L'idée fondamentale (ce n'est PAS figeant)
2. Les 3 centres d'intelligence (mental, émotionnel, instinctif)
3. Pourquoi neuf — grille triades × Horney (3×3 cliquable)
4. Ce qui anime chaque type — peur / désir + loi tragique (self-fulfilling prophecy)
5. Un type n'est pas un bloc — les 9 niveaux (exemple détaillé type 2)
6. Un diagramme vivant — flèches d'intégration/désintégration (SVG complet)
7. Les ailes — exemple 4w3 vs 4w5
8. Les sous-types instinctuels (auto-préservation / social / sexuel)
9. Les confusions classiques (5 paires + 3 pièges) — section centrale demandée
10. La théorie majeure (Horney, Freud, Jung, catégories cliniques)

Encart « À retenir » à chaque fin de section. Aucun lien sortant. **Source de travail** : `_audit-riso-hudson.md`

### 2.5 Déplacement d'« Expression sexuelle des types »

Retirée du panneau latéral de l'accueil (jugée mal placée), mise en bas de `approches.html` comme **voie particulière** distincte (couleur rose), séparée des méthodes générales (5A, 3 centres).

### 2.6 Création de `diamant-essence.html`

**Sources** : *Essence* (livre 4), *L'élixir d'illumination* (livre 3), *Essence and Sexuality* (thèse de doctorat). Page narrative scrollable en **9 mouvements** :

1. Quelque chose en vous a déjà su (3 scènes d'expérience)
2. Ce que l'Essence n'est pas (6 mises au net + schéma couches concentriques)
3. Une présence substantielle (textures quasi-physiques)
4. Les multiples visages de l'Essence (12 aspects : Force, Joie, Amour, Volonté, Paix, Compassion, Vérité, Valeur, Brillance, Conscience, Existence…)
5. **La théorie des trous** (triptyque SVG : essence → trou → remplissage par la personnalité)
6. **Reconnaître la différence Essence ↔ Personnalité** *(cœur pédagogique)* — 8 dimensions en tableaux comparatifs (Joie, Force, Amour, Paix, Volonté, Compassion, Intelligence, Présence) avec exemples concrets ordinaires
7. Le corps, organe de l'Essence (Rouge & Or, alternance fondamentale, pourquoi la sexualité s'éteint dans les couples qui s'aiment)
8. Le retour — 6 premiers pas + le piège central
9. Clôture (le « moi normal » est encore un enfant, le trou comme porte, expérience renverse pensée)

**Source de travail** : `_synthese-essence-almaas.md`

### 2.7 Création de `diamant-amour.html`

**Sources** : la trilogie *Journey of Spiritual Love* d'Almaas (*Love Unveiled* 2020, *Nondual Love* 2023, *The Inner Beloved* 2026), tous trois publiés chez Shambhala sur la base d'enseignements oraux donnés à la Ridhwan School dans les années 1990. Tous trois préfacés par Ram Dass.

**Template visuel particulier** : palette signature **rose / or / grenade** (différente du bleu nuit habituel), hero dégradé chaud, **panneaux ivoire-doré pour les citations poétiques** (effet de manuscrit enluminé sur fond nuit).

**Structure en 3 actes** + préambule + clôture (17 scènes) :

- **Préambule** : schéma 3 cercles concentriques (les 3 plans de la trilogie)
- **Acte I — L'amour comme aspect essentiel** (4 scènes) — pédagogique, ancré dans la psychologie. Le morceau central est I.2 **Les trois saveurs** : ROSE (douceur primordiale, nourrit), OR (fusion sans perte de soi, relie), GRENADE (passion magnétique, aimante). Pour chaque saveur : texture phénoménologique, fonction, reconnaissance, imitation par l'ego, exemple.
- **Acte II — L'amour comme nature de la réalité** (6 scènes) — non-duel : dimensions sans frontière, Divine Love, désamorçage du mot Dieu, corps de lumière, identité séparée (Jabba le Hutt), surrender, grâce.
- **Acte III — La voie du cœur vers le Bien-aimé** (7 scènes + avertissement préalable) — **volet mystique conservé intégralement** sur demande explicite. Vocabulaire dévotionnel assumé (Bien-aimé, pauvreté du cœur, nuit obscure). **6 citations poétiques** (Kabir, Rumi, Hafiz, journal d'Almaas) en panneaux ivoire serif italique. 14 noms du Bien-aimé tirés des traditions.
- **Clôture** : le même amour vu de trois sommets.

**Sources de travail** : `_cartographie-trilogie-amour-almaas.md` et `_synthese-amour-almaas.md`

---

## 3. Historique git de la session

```
278839b  Cree la fiche L amour - ses multiples visages (trilogie Almaas)
6759422  Cree la fiche Qu est-ce que l Essence (page narrative en 9 mouvements)
38f5183  Deplace Expression sexuelle des types de l accueil vers Voies de transformation
4b6cba4  Refonte explore.html : page narrative pedagogique en 10 mouvements
c8eec83  Refonte du hub Diamant : titres thematiques au lieu de titres de livres,
         et harmonisation Idee Sainte -> Idee sacree
36f5cc4  Integre les 9 cles essentielles (Clefs pour l Enneagramme) dans la fiche
         Facettes de l Unite
```

---

## 4. État global du site (rappel d'architecture)

### A. Comprendre l'Ennéagramme
- `index.html` — accueil avec diagramme SVG interactif
- `test-enneagramme-sans-indice.html` — test
- `explore.html` ✅ refondue en 10 mouvements
- `compatibilite.html` — affinités entre types
- `profils/type1.html` … `type9.html` — fiches profils détaillées

### B. Voies de transformation
- Hub : `approches.html`
- `approche-5a.html` — méthode des 5A (Daniels & Dion)
- `restaurer-centre-oublie.html` — Hurley & Dobson
- `expression-sexuelle.html` ✅ déplacée ici comme voie particulière

### C. Approche Diamant — Almaas
- Hub : `approche-diamant.html` ✅ refondu thématique
- **Le socle** (5 cartes)
  - ✅ **Idées sacrées & clés essentielles** (`diamant-facettes-unite.html`) — enrichi
  - ✅ **Qu'est-ce que l'Essence ?** (`diamant-essence.html`) — nouveau
  - 🔜 La Perle — devenir une personne véritable
  - 🔜 Le retour intérieur — vue d'ensemble
  - 🔜 L'Inquiry — le questionnement intérieur
- **Aller plus loin** (5 cartes)
  - ✅ **L'amour — ses multiples visages** (`diamant-amour.html`) — nouveau, trilogie
  - 🔜 L'identité essentielle et le narcissisme
  - 🔜 Se libérer du surmoi
  - 🔜 La présence dans l'instant
  - 🔜 Cœur de Diamant — transmissions

**Bilan Diamant** : 3 fiches actives sur 10, dont les trois plus structurantes (le voile et la clé / l'Essence comme notion / l'amour comme aspect-dimension-voie).

---

## 5. Perspectives — ce qu'il reste à faire

### 5.1 Court terme — finir le hub Diamant

Sept cartes encore « À venir ». Dans l'ordre suggéré de priorité (par ordre d'importance et d'accessibilité du livre source pour le grand public) :

#### Priorité haute

**🔜 La Perle — devenir une personne véritable** *(Livre 7, La Perle Inestimable)*
PDF disponible : `LA PERLE INESTIMABLE_ Livre 7 - A.H. ALMAAS.pdf` (collection bilingue). Cœur du dispositif d'Almaas : l'articulation entre personnalité et Essence aboutit à la « perle » — l'individuation essentielle, la personne véritable. Particulièrement précieux car ne se réduit ni au psychologique ni au spirituel. **C'est le couronnement du dispositif théorique d'Almaas** ; sans cette fiche, l'Essence semble flotter dans l'abstrait. Architecture probable : 7-9 mouvements, ton entre Essence (psychologique) et Amour (contemplatif).

**🔜 L'Inquiry — le questionnement intérieur** *(Livre 14, Le Vaisseau spatial Inquiry)*
PDF disponible (`LE VAISSEAU SPATIAL INQUIRY_ Livre 14 - A.H. ALMAAS.pdf`). C'est la **méthode pratique** de l'approche Diamant. Sans cette fiche, le lecteur sort des autres fiches en sachant *quoi* chercher mais pas *comment*. Indispensable pour la complétude pratique du dispositif. Architecture probable : très opérationnelle, comme la fiche Essence mais centrée sur la pratique.

#### Priorité moyenne

**🔜 L'identité essentielle et le narcissisme** *(Livre 11, Le Point de l'existence)*
PDF disponible (`The-Point-of-Existence-_A.-H.-Almaas_.pdf` — en anglais seulement). Sujet sensible et profond : pose l'aspect « Point » (l'Identité Essentielle, déjà présentée comme clé du type 4 dans Facettes), articulé avec la dynamique narcissique. Page potentiellement très belle, mais demande beaucoup de soin éditorial sur le vocabulaire psychanalytique.

**🔜 Se libérer du surmoi** *(Livre 2)*
PDF probablement à acquérir (pas vu dans le dossier `enneagramme/`). Court ouvrage, opérationnel, **excellente porte d'entrée pratique** pour les nouveaux lecteurs (la voix critique intérieure parle à tout le monde). Pourrait être placé en haut de la pile pour son accessibilité.

#### Priorité plus basse

**🔜 La présence dans l'instant** *(Livre 17, L'épanouissement Maintenant)*
PDF probablement à acquérir. Thème universel mais un peu redondant avec ce qui est déjà traité dans les autres fiches (présence, Essence, surrender).

**🔜 Le retour intérieur — vue d'ensemble** *(Livre 15, Retour intérieur chez soi)*
Présentation systématique de toute la vision Diamant — très utile mais redondant avec ce qu'on aura accumulé dans les autres fiches. À traiter en synthèse-récap après que les autres fiches soient là.

**🔜 Cœur de Diamant — transmissions** *(Livres 6, 8, 9, 12, 18)*
Série de 5 livres. Probablement à traiter comme une fiche unique de transmissions choisies, plutôt qu'à essayer de couvrir les 5 séparément.

### 5.2 Ressources disponibles dans `/Users/brahms/Documents/enneagramme/`

PDFs déjà sur disque (utilisables immédiatement) :
- **CLEFS POUR L'ENNEAGRAMME** (Livre 23) — déjà utilisé
- **ESSENCE et L'ELIXIR D'ILLUMINATION** (Livres 3-4) — déjà utilisés
- **FACETTES DE L'UNITE** (Livre 13) — déjà utilisé
- **LA PERLE INESTIMABLE** (Livre 7) — disponible, à utiliser pour la fiche Perle
- **LE VAISSEAU SPATIAL INQUIRY** (Livre 14, PDF + azw3) — disponible, à utiliser pour la fiche Inquiry
- **VOYAGE DANS LA NUIT LUMINEUSE** (Livre 10) — disponible, pourrait alimenter une fiche autobiographique
- **The Point of Existence** (Livre 11) — anglais — disponible
- **essence and sexuality** — déjà utilisé
- Dossier `love/` : Love Unveiled, Nondual Love, The Inner Beloved — déjà utilisés

PDFs à acquérir si l'on veut couvrir tout le hub :
- Livre 2 (*Se libérer du surmoi*)
- Livre 15 (*Retour intérieur chez soi*)
- Livre 17 (*L'épanouissement Maintenant*)
- Série Cœur de Diamant (livres 6, 8, 9, 12, 18)

### 5.3 Améliorations possibles sur les fiches existantes

- **`diamant-essence.html`** : éventuellement ajouter une mini-section *« Repérer l'Essence dans le quotidien »* — exercices très courts pour apprendre à reconnaître les saveurs essentielles. Optionnel mais ferait écho à la demande pédagogique forte.
- **`diamant-amour.html`** : les 6 panneaux poésie ivoire ressortent magnifiquement ; on pourrait imaginer en ajouter 1 ou 2 dans l'Acte I (rose) pour équilibrer (actuellement la poésie n'apparaît qu'à l'Acte III). À voir si ça alourdit ou enrichit.
- **`diamant-facettes-unite.html`** : la section *Citation centrale d'Almaas par type* qui était dans le rapport du 10 mai reste à intégrer (la matière est dans `_synthese-facettes-almaas.md`).

### 5.4 Cohérence transversale (audit toujours en attente)

- La convention de nommage des 9 types reste **non homogène** entre les pages (cf. rapport du 10 mai)
- Les pages secondaires `profil.html`, `type.html` mériteraient un audit — actives ? candidates à suppression ?
- Le toggle thème clair/sombre reste désactivé — ne pas le réactiver sans consigne explicite

---

## 6. Conventions utilisateur à respecter (rappel)

- Aucune référence aux ouvrages par leur titre commercial, codes livres (L13, L4…), pages, dates, noms civils — juste **A.H. Almaas**
- Pas de dogme religieux — laïcité psycho-spirituelle (pas de « Dieu » comme entité, pas de « Christ »)
- **Exception assumée pour la fiche Amour, Acte III** : vocabulaire mystique conservé intégralement (Bien-aimé, pauvreté du cœur, nuit obscure) avec avertissement préalable et désamorçage explicite par Almaas
- Aucun emoji décoratif sauf le **◆** pour le thème Diamant
- Cohérence terminologique : **mental / émotionnel / instinctif** comme noms des centres
- Convention typo unifiée : **« Idée sacrée »** et non « sainte »
- Beau visuel — schémas SVG, pas que du texte
- Toujours pousser après validation explicite (« push »)
- Commits signés `Co-Authored-By: Claude Opus 4.7 (1M context)`
- HEREDOC ne marche pas avec apostrophes — privilégier guillemets simples sans apostrophes dans le message

---

## 7. Documents de travail (préfixe `_`)

À la racine du repo, documents de session — sources fidèles, gardés comme matière de référence pour les évolutions futures :

| Fichier | Sujet |
|---|---|
| `_rapport-session-2026-05-10.md` | Rapport précédent |
| `_rapport-session-2026-05-11.md` | Ce rapport |
| `_synthese-facettes-almaas.md` | 3 facettes de la perte par type |
| `_synthese-clefs-almaas.md` | 9 clés essentielles (Clefs) |
| `_audit-riso-hudson.md` | Cartographie Riso & Hudson, 15 pépites, archi explore.html |
| `_synthese-essence-almaas.md` | Essence (livres 3, 4 + Essence and Sexuality) |
| `_cartographie-trilogie-amour-almaas.md` | Analyse structurelle de la trilogie de l'amour |
| `_synthese-amour-almaas.md` | Synthèse-matière des 3 livres sur l'amour |

---

## 8. Prompt de relance (à coller en début de prochaine session)

> Reprends le travail sur le site Ennéagramme dans `/Users/brahms/Documents/GitHub/enn-agramme-`. Lis d'abord `_rapport-session-2026-05-11.md` à la racine du repo pour le contexte complet. La rubrique Approche Diamant compte aujourd'hui 3 fiches actives sur 10 ; les priorités hautes sont **La Perle — devenir une personne véritable** et **L'Inquiry — le questionnement intérieur**, dont les PDF sources sont déjà disponibles dans `/Users/brahms/Documents/enneagramme/`. Respecte les conventions de la section 6 du rapport : pas de mention de livre/dates/codes éditoriaux, mental/émotionnel/instinctif, « Idée sacrée », vocabulaire mystique préservé seulement quand explicitement demandé, schémas SVG sobres, encarts « À retenir » en fin de section, panneaux ivoire serif italique pour les passages contemplatifs.

---

◆
