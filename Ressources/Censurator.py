# -*-coding:UTF-8 -*
# Censurator v 1.0

# Infos à récupérer
# -Chemin et nom du fichier vidéo (on ne prendra pas en charge les DVD)
# -Plages à censurer, composées d’une heure de début et d’une heure de fin

# Fichier généré
#-Liste de lecture xspf permettant de voir le film sans les scènes indiquées en entrée (à ouvrir avec VLC)

# Programme
import sys
import os

print ("""
********************************************
*               CENSURATOR                 *
********************************************
Ce programme génère une liste de lecture au format xspf,
lisible par VLC, excluant les scènes à censurer dont vous
aurez indiqué les temps de début et de fin.
        """)

adresseFichier = input ("Chemin d'accès au fichier :")
adresseFichier = adresseFichier.replace("\\","/")
adresseFichier = adresseFichier.replace("//","/")
essenceFichier = os.path.isfile(adresseFichier) # renvoie True si l'entrée est bien un fichier

while essenceFichier != True :
        adresseFichier = input ("Le fichier indiqué n'existe pas. Chemin d'accès au fichier :")
        adresseFichier = adresseFichier.replace("\\","/")
        adresseFichier = adresseFichier.replace("//","/")
        essenceFichier = os.path.isfile(adresseFichier) # renvoie True si l'entrée est bien un fichier

nomFichier = adresseFichier.split('/')[-1] # renvoie le nom du fichier
cheminFichier = "/".join (adresseFichier.split ('/')[0:-1]) # renvoie le chemin du dossier

# Création de la fonction conversionTemps, convertissant un temps en hhmmss en un temps en secondes
def conversionTemps (tempsEntree):
	"""entrée: temps (int) sur la forme hhmmss
		sortie: temps en nombre de secondes
		fonctionnement: utilisation des opérateurs // et %"""
	hh = tempsEntree // 10000
	ss = tempsEntree % 100
	mm = (tempsEntree-hh*10000-ss) / 100
	tempsSortie = hh * 3600 + mm * 60 + ss
	tempsSortie = int (tempsSortie)
	return tempsSortie

# Fonction verificationEntier, qui prend en paramètre un message à afficher (str),
# vérifie que la réponse de l'utilisateur soit un entier et retourne le nombre obtenu (int) en le convertissant.
def verificationEntier (message):
        nombre = ""
        while type(nombre) != (int):
                nombre = input (message)
                try :
                        nombre = int (nombre)
                except ValueError :
                        print ("Saisissez un nombre.")
        nombre = conversionTemps (nombre)
        return nombre
 
dureeTotale = verificationEntier ("Durée totale du film (hhmmss):")

# Initialisation
debutPiste = [0]
finPiste = [0]
debutPiste[0] = 0 # initialisation quelconque, ne sert à rien
finPiste [0] = 0 # debut de la liste de lecture

# Construction des listes debutPiste et finPiste contenant respectivement
# les temps de début et de fin des scènes que l'on souhaite censurer
i = 1
ajoutPiste = 1
while ajoutPiste == 1 :
        debut = verificationEntier ("Début de la scène à censurer (hhmmss):")
        # On s'assure que le temps saisi est supérieur au temps précédent,
        # pour éviter des listes de lecture incohérentes...
        while debut <= finPiste[i-1] :
            debut = verificationEntier ("Saisissez un temps postérieur à votre précédente saisie. Début de la scène à censurer (hhmmss):")
        debutPiste.append(debut)
        fin = verificationEntier ("Fin de la scène à censurer (hhmmss):")
        # Meme remarque que précédemment
        while fin <= debutPiste[i] :
            fin = verificationEntier ("Saisissez un temps postérieur à votre précédente saisie. Fin de la scène à censurer (hhmmss):")
        finPiste.append(fin)
        i += 1
        ajoutPiste = verificationEntier ("Voulez-vous ajouter une scène (1 pour oui / 0 pour non)?")

nombrePistes = i - 1
debutPiste.append(dureeTotale) # on insère la durée totale du film à la fin de la liste debutPiste (nécessaire pour la suite)

# Envoi du message de confirmation
print ("""Opération réussie. Votre fichier se trouve à l'adresse """ + cheminFichier + "/" + nomFichier + """.xspf
Gardez le fichier original et le fichier xspf dans le même répertoire pour que cela fonctionne.""")

# Création du fichier xspf, qui est désigné comme sortie standard...
sys.stdout = open ("{}/{}.xspf".format(cheminFichier, nomFichier), "w")

print ("""<?xml version="1.0" encoding="UTF-8"?>
<playlist xmlns="http://xspf.org/ns/0/" xmlns:vlc="http://www.videolan.org/vlc/playlist/ns/0/" version="1">
	<title>Liste de lecture</title>
	<trackList>""")

# écriture des tracks successifs
j = 0
while j <= nombrePistes :
        print ("""
<track>
        <location>file:///{}</location>
	<extension application="http://www.videolan.org/vlc/playlist/0">
		<vlc:id>{}</vlc:id>
                <vlc:option>start-time={}</vlc:option>
                <vlc:option>stop-time={}</vlc:option>
	</extension>
</track>
""".format(nomFichier, j, finPiste[j], debutPiste[j+1]))
        j += 1
# écriture de la suite du fichier
print ("""</trackList>
	<extension application="http://www.videolan.org/vlc/playlist/0">""")

# écriture de l'enchaînement des tracks
k = 0
while k <= nombrePistes :
        print ("""<vlc:item tid='"""+ str(k) +"""'/>""")
        k += 1

# écriture de la fin du fichier
print ("""</extension>
</playlist>""")

# On met le programme en pause
sys.stdout = sys.__stdout__
input ("Appuyez sur ENTREE pour fermer ce programme...")