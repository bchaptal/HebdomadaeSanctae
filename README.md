# HebdomadaeSanctae
Cérémonies majeures et Ténèbres de la Semaine Sainte

## 1. Génération des partitions PDF

Pour l'instant on utilise Illuminare Score Editor (https://apps.illuminarepublications.com/gregorio/), peut-être cela changera-t-il un jour.

Les fichiers gabc de la plupart des pièces sont disponibles sur https://gregobase.selapa.net.

Les Psaumes se trouvent sur http://bbloomf.github.io/jgabc/psalmtone.html (qui peut aussi être utilisé pour générer les versets).

Pour les gabc des pièces qui ne se trouvent pas sur les sites sus-mentionnés, on peut utiliser l'excellent outil http://bbloomf.github.io/jgabc/transcriber.html.

### Conventions:

%fontsize: 13 pour les antiennes (première fois), 12 pour les reprises, les psaumes, les répons, etc.

%spacing: vichi;

%font: OFLSortsMillGoudy;

%width: 4.84;

%height: 20 (pour préserver l'unité de fichier en cas de pièce très longue (Credo, Lamentations);

On utilise <v>\greheightstar</v> pour l'astérisque; le gras et l'italique des psaumes doivent être corrigés directement dans les PDF des partitions si nécessaire.

Les intonations des psaumes sont précédées par le numéro de verset.

Les intonations des psaumes et les reprises d'antiennes n'ont pas de lettrine.

A cause d'un problème de police, le ǽ doit être remplacé par æ, dans le gabc. Il faut ajouter une rustine dans Indesign. Attention: les quarts et demi barres satent en cas de correction du pdf.

Une petite astuce de lisibilité du fichier GABC : allez à la ligne après chaque incise, la lecture et la modification deviennent tout de suite plus rapide (à défaut d’être à jamais désagréable...)

On nomme le fichier sur le modèle numéro.TypeDePièce.PremierMots.gabc

## 2. Sources de texte

Grâce à la possibilité donée par indesign de garder le lien avec les fichiers txt importés, il est possible d'apporter d'importantes modifications au texte des documents sans se casser les pieds avec le formatage indesign. En outre, n'importe qui peut corriger le texte, même s'il ne dispose pas d'indesign. Les modifications apportées pourront être répercutées dans le fichier indesign extrêmement rapidement.

## 3. Mise en forme automatique du texte

#### Remarques générales pour le design

1. Numéros de page en haut
2. En-tête en petites majuscules
3. Antiennes en pleine page traduction
4. Psaumes latins en mono-colonne
5. Remplacer i par j (diphtongues)
6. Grasser et italiquer les partoches des psaumes
7. Omittiur Gloria Patri à la fin du psaume 1
8. Ant.8.G en Gras bas de casse
9. Eviter les retours lignes pour une seule syllabe


## 4. Modificatons finales à faire dans le fichier indesign
* Les fichiers txt doivent être encodés en ANSI, mais le caractère ǽ ne passe pas et est remplacé par un ?. Il faudra donc exécuter une requête Grep, remplaçant \b\?\b par ǽ.
* En latin, on met des espaces de ponctuation avant :;?!. On remplace donc [:;!?] par ~<$0
* De même, on met des espaces insécables à chasse fixe avant les astériques et les †, ainsi qu'après les marques de versets et de répons.
* Les marques + et = utilisées pour délimiter les syllabes en gras et celles en italiques ont tendance à induire une césure sans tiret. Il faut donc insérer des traits d'union conditionnels en remplaçant "\+([\u\l]*)\+" et "\=([\u\l ,:\.]*)\=" par "~-$0~-"
* Enfin, après avoir effectué la mise en forme, il faudra supprimer les balises, les liens et les commentaires.
Super outils pour indesign: XStrings.
http://www.kerntiff.co.uk/free-stuff/xchange-strings-xstrings
C'est un outil très puissant pour le Rechercher/Remplacer en séries, avec nombre illimité de requêtes enregistrables dans des listes groupées.


	
	
	
	
	


