# AGRI — Recettes Agricoles (synchronisé entre appareils)

Suivi des ventes et charges agricoles par culture (Moringa feuilles/graines, Ricin, et toute culture que tu ajoutes), dans le même esprit que GBAKA.

## Fonctionnalités
- **Ventes** : quantité × prix unitaire = montant calculé automatiquement, avec unité (kg, sac, tonne…) et acheteur
- **Charges** : catégories agricoles (semences, engrais, main d'œuvre, irrigation…) rattachées à une culture ou "Général"
- **Cultures** : marge par culture, quantités vendues, prix moyen/kg, meilleur prix obtenu et auprès de qui
- **Caisse, Historique, graphique 12 mois** : comme GBAKA

## Déploiement (comme GBAKA)
```bash
git init
git add .
git commit -m "Premier envoi"
git branch -M main
git remote add origin https://github.com/isaackoussa/agri.git
git push -u origin main
```
Puis sur https://app.netlify.com : **Add new project → Import an existing project → GitHub** → choisis le dépôt `agri`.

## Variables d'environnement à ajouter sur Netlify
Dans **Project configuration → Environment variables** :
- `NETLIFY_SITE_ID` : l'identifiant du site (Site configuration → Site details → Site ID)
- `NETLIFY_AUTH_TOKEN` : un jeton personnel (avatar → User settings → Applications → New access token)

Redéploie ensuite (Deploys → Trigger deploy) pour que la synchronisation fonctionne.
