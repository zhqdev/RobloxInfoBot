RbxHelper

RbxHelper est un bot Discord simple dédié aux joueurs Roblox. Il permet d’afficher l’avatar d’un joueur, d’obtenir les infos d’un groupe (nom, description, membres) et de consulter le rang d’un joueur dans un groupe, directement depuis Discord via des commandes faciles à utiliser. Parfait pour les communautés Roblox.

Commandes

- !avatar <pseudo> : affiche l’avatar Roblox du joueur.
- !groupe <groupId> : affiche les informations d’un groupe Roblox.
- !rang <pseudo> <groupId> : affiche le rang d’un joueur dans un groupe.

Installation

1. Clone ce dépôt :
   git clone https://github.com/tonpseudo/RbxHelper.git
   cd RbxHelper

2. Installe les dépendances :
   npm install

3. Crée un fichier .env à la racine avec ton token Discord :
   DISCORD_TOKEN=ton_token_ici

4. Lance le bot :
   node index.js

Prérequis

- Node.js v16 ou plus
- Un bot Discord avec son token (https://discord.com/developers/applications)
