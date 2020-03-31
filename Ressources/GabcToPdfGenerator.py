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