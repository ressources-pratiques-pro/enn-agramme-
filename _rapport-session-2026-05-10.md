# Rapport de session — Site Ennéagramme

**Date** : 2026-05-10
**Repo** : `/Users/brahms/Documents/GitHub/enn-agramme-`
**Branche** : `main` (à jour avec `origin/main`)
**Dernier commit** : `bf94c22`

---

## 1. Ce qui a été fait dans cette session

### 1.1 Enrichissement de `diamant-facettes-unite.html` — les 3 facettes par type

Avant cette session, chaque fiche-type contenait un bloc unique « La fixation — le voile ». L'utilisateur a demandé d'enrichir la fiche pour refléter fidèlement la structure d'Almaas : pour chaque type, **3 facettes** distinctes découlent de la perte d'une Idée Sainte.

**Démarche** : extraction du PDF `Facettes de l'Unité` (602 pages) en texte plat avec PyMuPDF, puis lecture méthodique des chapitres 11 à 19 (un par type) via un sous-agent. Synthèse fidèle sauvegardée dans `_synthese-facettes-almaas.md` avec citations et références de paragraphes [L13Fxx_xx].

**Modifications apportées** :
- Nouveau **schéma SVG « Mouvement de la perte »** : Idée Sainte → ① Illusion → ② Difficulté → ③ Réaction (couleurs : rose / ambre / violet)
- **Données réécrites** pour les 9 types : champs `illusion`, `difficulty`, `reaction` (chacun avec `name` + `desc`) remplacent l'ancien champ `fixation` unique
- **Rendu HTML** : 3 blocs colorés numérotés ①②③ par type
- **CSS** : nouvelles classes `.facet3.illusion / .difficulty / .reaction`

**Tableau de synthèse Almaas** (intégré au site) :

| Type | Idée Sainte | Illusion | Difficulté | Réaction |
|---|---|---|---|---|
| 1 | Perfection | Jugement comparatif | Être mauvais (wrongness) | Auto-amélioration / vouloir avoir raison |
| 2 | Volonté/Liberté | Volonté séparée (orgueil) | Castration humiliante | Action obstinée |
| 3 | Harmonie/Loi/Espérance | Vanité (agent indépendant) | Impuissance | Lutte / activité (striving) |
| 4 | Origine | Identité séparée | Déconnexion / abandon | Contrôle |
| 5 | Omniscience/Transparence | Séparation | Isolement déficient | Retrait / évitement |
| 6 | Foi/Force | Cynisme | Insécurité peureuse | Suspicion défensive |
| 7 | Sagesse/Plan/Travail | Pouvoir diriger son déploiement | Désorientation | Planification |
| 8 | Vérité | Dualité | Sentiment d'être mauvais/coupable | Auto-reproche → vengeance |
| 9 | Amour | Amour conditionnel/localisé | Infériorité | S'endormir (paresse de l'âme) |

### 1.2 Correction de la page `compatibilite.html`

Audit demandé sur la fonctionnalité « choisir 2 profils → afficher les affinités ». Trois problèmes trouvés et corrigés :

1. **`types.json`** — les types 2 à 9 avaient `name: "Type N"` au lieu de leur nom propre. Donc le panneau affichait `"3 · Type 3"` au lieu de `"3 · Le Performeur"`. Corrigé pour les 9 types avec la convention de nommage du site (Le Perfectionniste / Le Donneur / Le Performeur / Le Romantique / L'Observateur / Le Loyal Sceptique / L'Épicurien / Le Protecteur / Le Médiateur).

2. **Cache buster manquant** — `fetch("assets/data/types.json")` sans paramètre de version : les navigateurs cachaient l'ancien fichier. Ajouté `?v=2`.

3. **Logique de clic défectueuse** — impossible de sélectionner le même type pour A et B (ex. duo 6-6, 9-9). Pourtant les 9 fiches « duos identiques » existent dans `duos-palmer-synthese.json`. Logique réécrite pour autoriser ce cas.

### 1.3 Suite à un audit IA externe

Deux finitions :
- `profil.html:428` — lien cassé vers `explorer-enneagramme.html` (inexistant) → corrigé en `explore.html`
- `compatibilite.html` — accents manquants restaurés (`Sélectionne`, `Réinitialiser`, `synthèse`, `hiérarchie`, `affichée`)

### 1.4 Outillage

- `.claude/launch.json` mis à jour pour utiliser `python3 -m http.server` (le webrick fallback de Claude Preview avait des soucis avec les symlinks)

---

## 2. Historique git de la session

```
bf94c22  Corrige le lien casse vers explore.html dans profil.html et restaure les accents manquants
0c5bf4e  Enrichit Facettes de l Unite avec les 3 facettes par type (Almaas) et corrige la page Affinite
eb71186  (commit antérieur) Ajoute la section L approche Diamant et la fiche Facettes de l Unite
```

---

## 3. État global du site (rappel d'architecture)

### A. Connaître son type
- `index.html` — accueil avec diagramme SVG interactif
- `test-enneagramme-sans-indice.html` — test
- `compatibilite.html` — affinités entre types ✅ corrigé
- `profils/type1.html` … `type9.html` — fiches profils détaillées
- `explore.html`, `profil.html` ✅ lien corrigé, `type.html`

### B. Voies de transformation
- Hub : `approches.html`
- `approche-5a.html` — méthode des 5A (Daniels & Dion)
- `restaurer-centre-oublie.html` — Hurley & Dobson

### C. Approche Diamant — Almaas
- Hub : `approche-diamant.html`
- Première fiche-livre : `diamant-facettes-unite.html` ✅ enrichie avec les 3 facettes
- 4 cartes fondamentales et 5 cartes d'approfondissement encore « À venir »

### D. Autres
- `expression-sexuelle.html`

---

## 4. Perspectives — ce qu'il reste à faire

### 4.1 Court terme — Approche Diamant (autres fiches-livres)

Le hub `approche-diamant.html` annonce 9 cartes (« À venir » pour 8 d'entre elles). Dans l'ordre suggéré :

**Cartes fondamentales** :
- [ ] **Essence** (Livre 4) — fondement : qu'est-ce que l'Essence chez Almaas
- [ ] **La Perle Inestimable** (Livre 7) — l'individuation essentielle
- [ ] **Le retour intérieur chez soi** (Livre 15)
- [ ] **Le vaisseau spatial Inquiry** (Livre 14) — méthodologie

**Cartes d'approfondissement** :
- [ ] Clés pour l'Ennéagramme
- [ ] Le Point de l'existence (Livre 11)
- [ ] Se libérer du surmoi (Livre 2)
- [ ] L'épanouissement Maintenant (Livre 17)
- [ ] La série Cœur de Diamant (Livres 6, 8, 9, 12, 18)

**Méthode** : pour chaque livre, extraire le PDF correspondant en texte plat (PyMuPDF), déléguer à un sous-agent la lecture des chapitres clés, produire une synthèse, puis intégrer dans une page-fiche au format de `diamant-facettes-unite.html`.

### 4.2 Améliorations possibles sur `diamant-facettes-unite.html`

- [ ] Ajouter une **citation centrale d'Almaas** par type (déjà extraite dans `_synthese-facettes-almaas.md`, références [L13Fxx_xx] disponibles) — serait à intégrer en encadré contemplatif sous les 3 facettes
- [ ] Vérifier sur mobile que les 3 blocs `.facet3` se présentent bien (numérotation absolue à gauche peut être étroite)
- [ ] Le schéma SVG « Mouvement de la perte » : tester l'affichage sur écrans étroits (viewBox 780×230) — peut-être prévoir un layout vertical en mobile

### 4.3 Cohérence transversale (audit)

- [ ] La convention de nommage des 9 types n'est pas homogène entre les pages :
    - `profils/type*.html` : noms multiples (« Le Battant / L'Exécutant »)
    - `diamant-facettes-unite.html` et `compatibilite.html` (après fix) : noms uniques
    - Décider d'une convention canonique et l'appliquer partout
- [ ] Plusieurs pages secondaires (`profil.html`, `type.html`, `explore.html`) — voir si elles sont encore actives ou candidates à suppression
- [ ] Le toggle thème clair/sombre a été annulé (cf. mémoire) — ne pas réessayer sans consigne

### 4.4 Notes techniques

- Le fichier `_synthese-facettes-almaas.md` à la racine est un document de travail (préfixe `_`). Source de référence pour les futures évolutions du contenu Almaas.
- Le fichier `_rapport-session-2026-05-10.md` (ce document) est aussi un doc de travail.
- Le PDF d'Almaas est extractible facilement avec :
  ```python
  import fitz
  doc = fitz.open('FACETTES DE L UNITE - ... .pdf')
  with open('/tmp/facettes.txt','w') as f:
      for i,p in enumerate(doc):
          f.write(f'\n===== PAGE {i+1} =====\n'); f.write(p.get_text())
  ```
- Les autres PDFs disponibles dans `/Users/brahms/Documents/enneagramme/` :
    - `My_best_self_using_the_Enneagram_to_z_library_sk_1lib_sk_.pdf` (Hurley & Dobson — déjà utilisé pour `restaurer-centre-oublie.html`)
    - `The Enneagram, Relationships and Intimacy_ - Dion, Suzanne.pdf`
    - `Whats_my_type_use_the_Enneagram_syst_z_library_sk_1lib_sk_.pdf`

---

## 5. Conventions utilisateur à respecter (rappel)

- Aucune référence aux ouvrages, codes livres (L13, L4…), pages, dates, noms civils — juste **A.H. Almaas**
- Pas de dogme religieux — laïcité psycho-spirituelle (pas de « Dieu », pas de « Christ »)
- Aucun emoji décoratif sauf le **◆** pour le thème Diamant
- Cohérence terminologique : **mental / émotionnel / instinctif** comme noms des centres (jamais « intellectuel/relationnel/créatif »)
- Beau visuel — schémas SVG, pas que du texte
- Toujours pousser après validation explicite (« push »)
- Commits signés `Co-Authored-By: Claude Opus 4.7 (1M context)`
- HEREDOC ne marche pas en raison d'apostrophes — privilégier guillemets simples sans apostrophes dans le message

---

## 6. Prompt de relance (à coller en début de prochaine session)

> Reprends le travail sur le site Ennéagramme dans `/Users/brahms/Documents/GitHub/enn-agramme-`. Lis d'abord `_rapport-session-2026-05-10.md` à la racine du repo pour le contexte complet. Le travail prioritaire est la création de la prochaine fiche-livre de l'Approche Diamant (voir section 4.1 du rapport). Respecte les conventions de la section 5 : pas de mention de livre/dates/auteur, pas de religion, beau visuel SVG, pas d'emoji décoratif sauf ◆.
