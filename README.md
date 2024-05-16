# README: Microservice SocialMediaService

Le microservice **SocialMediaService** gère les publications, les utilisateurs et les commentaires dans l'application sociale. Il offre des fonctionnalités pour créer, récupérer, mettre à jour et supprimer des publications, ainsi que pour gérer les utilisateurs et les commentaires associés.

## Schémas de Données

Le microservice **SocialMediaService** utilise les schémas de données suivants :

### User (Utilisateur)
Représente un utilisateur dans l'application. Le schéma inclut les champs suivants :
- `id` (ID) : Identifiant unique de l'utilisateur.
- `username` (String) : Nom d'utilisateur de l'utilisateur.
- `email` (String) : Adresse e-mail de l'utilisateur.

### Post (Publication)
Représente une publication dans l'application. Le schéma inclut les champs suivants :
- `id` (ID) : Identifiant unique de la publication.
- `userId` (ID) : Identifiant de l'utilisateur qui a publié la publication.
- `content` (String) : Contenu de la publication.

### Comment (Commentaire)
Représente un commentaire sur une publication. Le schéma inclut les champs suivants :
- `id` (ID) : Identifiant unique du commentaire.
- `postId` (ID) : Identifiant de la publication associée au commentaire.
- `userId` (ID) : Identifiant de l'utilisateur qui a commenté.
- `content` (String) : Contenu du commentaire.

## Points d'Entrée

Le microservice **SocialMediaService** expose les points d'entrée suivants pour interagir avec les utilisateurs, les publications et les commentaires :

### REST API
- `GET /posts` : Récupérer toutes les publications.
- `POST /posts` : Créer une nouvelle publication en fournissant les informations nécessaires.

### GraphQL API
- **Query:**
  - `getUser(id: ID!) : User` : Récupérer les détails d'un utilisateur spécifique en fournissant son identifiant.
  - `getAllUsers : [User]` : Récupérer tous les utilisateurs.
- **Mutation:**
  - `createUser(username: String!, email: String!) : User` : Créer un nouvel utilisateur en fournissant les informations nécessaires.

### gRPC
Le microservice **SocialMediaService** expose également une interface gRPC pour l'interaction avec les clients.

## Interactions

Le microservice **SocialMediaService** peut être interagi avec :

### API REST
Permet l'interaction avec le microservice **SocialMediaService** via des requêtes HTTP. L'API REST offre des points d'extrémité pour réaliser des opérations CRUD sur les utilisateurs, les publications et les commentaires.

### GraphQL
Facilite l'interaction avec le microservice en utilisant des requêtes, des mutations et des abonnements GraphQL. GraphQL offre une manière souple et efficace d'interroger et de manipuler les données relatives aux utilisateurs, aux publications et aux commentaires.

### gRPC
Permet l'interaction avec le microservice **SocialMediaService** via des appels RPC (Remote Procedure Call). Le service gRPC offre des méthodes déjà décrites pour créer, lire, mettre à jour et supprimer des utilisateurs, des publications et des commentaires.

### Kafka
Permet la publication et la consommation des messages liés aux événements sociaux en utilisant la messagerie Kafka. Cela permet une communication asynchrone et une architecture orientée événements pour les événements liés aux publications et aux commentaires.

---

Ce fichier README fournit un aperçu du microservice **SocialMediaService** et des interactions possibles avec ses points d'entrée et ses schémas de données. Utilisez cette documentation pour comprendre et interagir efficacement avec le service.
