## Gestion du rate limit (30 requêtes par minute)

Avant toute chose, il est nécessaire de déterminer le type de rate limiting appliqué par l’API externe :

* soit une fenêtre glissante (30 requêtes sur les 60 dernières secondes),
* soit une fenêtre fixe (reset à chaque minute pile, par exemple à `HH:MM:00`).

---

## Solutions architecturales envisageables

### 1. Refaire l’API “Word-to-Image” en interne

Une première option serait de réimplémenter l’API de génération d’image.

Dans notre cas, un service *word-to-image* simple serait relativement facile à reproduire en interne, ce qui permettrait :

* d’éliminer le problème de rate limit,
* de supprimer totalement la dépendance à l’API externe,
* de mieux contrôler les performances et les coûts.

Cette solution demande cependant plus de maintenance et de ressources.


### 2. Mettre en place un système de cache

Une autre solution consiste à introduire un **système de cache** côté backend.

Par exemple :

* un cache de type **hashmap / Redis**,
* stockant les images générées sur les 1 à 2 dernières heures*(ou plus selon la capacité de stockage) et les mots les plus fréquents.

#### Cas simple (mot → image)

Avec l’API actuelle, la comparaison doit être exacte (clé = mot), car le mot est le centre de l’image.

#### Cas avancé (texte → image contextuel)

Si l’API génère des images à partir d’un contexte plus complexe, une simple comparaison exacte ne suffit plus.
Dans ce cas, on pourrait utiliser une **base de données vectorielle** et comparer les embeddings pour trouver la requête la plus proche sémantiquement.

Il est possible qu’aucune image équivalente ne soit trouvée ou que l’image pré-générée peut ne pas correspondre exactement à la demande du client.

Pour préserver l’UX, il serait alors pertinent d’indiquer clairement que l’image proposée est une approximation et de laisser la possibilité à l’utilisateur de forcer une génération personnalisée via la file d’attente.


### 3. Mettre en place un système de queue

La solution la plus classique et robuste consiste à utiliser un système de file d’attente.

Les requêtes utilisateurs sont mises en queue pendant qu'un worker consomme la queue en respectant strictement la limite de **30 requêtes par minute** vers l’API externe.

Avantages :

* respect garanti du rate limit,
* capacité à absorber les pics de trafic,
* meilleure résilience globale.

Amélioration UX / business :

* proposer des files prioritaires (par exemple pour des utilisateurs premium),
* afficher le temps d’attente estimé,
* notifier l’utilisateur lorsque l’image est prête.



## 4. Adapter le frontend

Le frontend peut appliquer une limitation du nombre de requêtes par utilisateur, basée sur l’adresse IP. Cela devrait d’empêcher 1% des utilisateur de faire 99% des requêtes.

Ensuite, des mécanismes de throttling et de debounce peuvent être mis en place :

* désactiver temporairement le bouton de génération après un clic,
* imposer un délai minimal entre deux requêtes,
* empêcher les soumissions multiples rapides.


Le frontend doit fournir un feedback clair à l’utilisateur :

* indication visuelle lorsqu’une limite est atteinte,
* message expliquant qu’un délai est nécessaire avant une nouvelle génération,
* éventuellement un compte à rebours avant la prochaine requête autorisée.

Cette approche devrait permettre de réduire significativement le trafic entrant, d’anticiper les abus, et de garantir une expérience utilisateur fluide.

## Conclusion

Pour garantir la scalabilité tout en respectant le rate limit, mon architecture combinerait :

* **Un rate limiter interne**,
* **Un cache** pour éviter les requêtes redondantes,
* **Une queue** pour lisser la charge et absorber les pics,
* **Des limitation front** pour limiter les utilisateurs hardcore,
* **Une UX adaptée** transparence et temps d'attente.

À long terme, la copie de l’API de génération permettrait d’éliminer complètement la contrainte de rate limit et d’offrir une meilleure maîtrise du système mais cela n'est possible que si l'api est assez simple.

## Diagramme

![alt text](part2/image.png)

