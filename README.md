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

On utilise <v>\greheightstar</v> pour l'astérisque; on met le premier mot de chaque pièce en petites majuscules (<sc></sc>); le gras et l'italique des psaumes doivent être corrigés directement dans les PDF des partitions si nécessaire.

Les intonations des psaumes sont précédées par le numéro de verset.

Les intonations des psaumes et les reprises d'antiennes n'ont pas de lettrine.

A cause d'un problème de police, le ǽ doit être remplacé par æ, dans le gabc. Il faut faire la correction dans le PDF.

On nomme le fichier sur le modèle numéro.TypeDePièce.PremierMots.gabc

## 2. Sources de texte

Grâce à la possibilité donée par indesign de garder le lien avec les fichiers txt importés, il est possible d'apporter d'importantes modifications au texte des documents sans se casser les pieds avec le formatage indesign. En outre, n'importe qui peut corriger le texte, même s'il ne dispose pas d'indesign. Les modifications apportées pourront être répercutées dans le fichier indesign extrêmement rapidement.

## 3. Mise en forme automatique du texte

## 4. Modificatons finales à faire dans le fichier indesign
* Les fichiers txt doivent être encodés en ANSI, mais le caractère ǽ ne passe pas et est remplacé par un ?. Il faudra donc exécuter une requête Grep, remplaçant \b\?\b par ǽ.
* En latin, on met des espaces de ponctuation avant :;?!. On remplace donc [:;!?] par ~<$0
* De même, on met des espaces insécables à chasse fixe avant les astériques et les †, ainsi qu'après les marques de versets et de répons.
* Enfin, aprè avoir effectué la mise en forme, il faudra supprimer les balises, les liens et les commentaires.
	
	
	


