Donc pour le rate limit a 30 par minutes il faudrait déjà déterminer si la minute est glissante ou si ça se reset à 00.

Pour les système qu'on peut implémenter:

1. Refaire leur API
Pour le coup le word to image serait assez facile a refaire et on n'aurait plus ce problème.
2. Avoir un système de cache
On pourrait avoir un système de hashmap qui va prendre une image déjà généré dans les deux dernières heures ou moins selon le stockage.
Avec l'api actuelle on devrait faire de la comparaison exacte car on voit le mot sur l'image mais si c'est un générateur d'image a partir d'un contexte on devrait utiliser une base de donnée vectorielle et trouver la phrase al plus proche.
Il y a de grande chance pour qu'on ne trouve rien dans notre historique ou que le résultat prégénéré de convienne pas au client. Il faudrait donc marquer que l'image n'est pas complétement ce qu'ils ont demandé et leur donner la possibiliter d'aller directement dans la queue.
3. Un système de queue
Classic, mais on peut vendre des passe prioritaires

Dans

![alt text](part2/diagram.png)