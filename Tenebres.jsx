
main();

function main(){
    parametrerLangues();
    creationLivre(langue, nomDocument, bibliotheque);
}
function mySetup(){
    myDocument = app.documents.add();
    with(myDocument.viewPreferences){
    	horizontalMeasurementUnits = MeasurementUnits.inches;
    	verticalMeasurementUnits = MeasurementUnits.inches;
        rulerOrigin = RulerOrigin.pageOrigin;
    }
    //Setup the document
    with(myDocument.documentPreferences){
    	pageHeight = 5.5
    	pageWidth = 7.1875
    	facingPages = true;
    	pageOrientation = PageOrientation.portrait;
    }
    with(myDocument.textPreferences){
    	linkTextFilesWhenImporting = true;
        smartTextReflow = false;
    }
    with(myDocument.gridPreferences){
    	baselineDivision = "1pt";
        baselineStart = 0;
    }
}
function parametrerLangues(){//sort nombreDocuments (integer), nombrLangues (integer), langue (array de strings), bibliotheque (array d'arrays de fichiers txt)
    var myDialog = app.dialogs.add({name:"Paramètres généraux",canCancel:true});
	with(myDialog){
		with(dialogColumns.add()){
			with(borderPanels.add()){
				with(dialogColumns.add()){
					staticTexts.add({staticLabel:"Nb langues:"});
				}
				with(dialogColumns.add()){
					var champNombreLangues = integerEditboxes.add({editValue:2});
				}
			}
            with(borderPanels.add()){
				with(dialogColumns.add()){
					staticTexts.add({staticLabel:"Nb docs:"});
				}
				with(dialogColumns.add()){
					var champNombreDocuments = integerEditboxes.add({editValue:1});
				}
			}
		}
	}
	//Display the dialog box.
	var myResult = myDialog.show();
	if(myResult == true){//Get the values from the dialog box controls.
		nombreLangues = champNombreLangues.editValue;
        nombreDocuments = champNombreDocuments.editValue;
		//Remove the dialog box from memory.
		myDialog.destroy();
	}
	else{
		myDialog.destroy();
         exit();
	}
    //:::::::::::::::::::::::::::::::::::::::::::::
    var myDialog2 = app.dialogs.add({name:"Paramétres noms",canCancel:true});
	with(myDialog2){
        with(dialogColumns.add()){
            with(borderPanels.add()){
                with(dialogColumns.add()){
                    champsLangues = [];
                    staticTexts.add({staticLabel:"Nom des langues"});
                    for (var i = 0; i<nombreLangues; i++){
                       var etiquetteLangue = i+"";
                      etiquetteLangue = "Langue "+etiquetteLangue;
                        champsLangues[i] = textEditboxes.add({editContents:etiquetteLangue, minWidth:80});
                    }
                }
            }
            with(dialogColumns.add()){
                with(borderPanels.add()){
                    with(dialogColumns.add()){
                        champsDocuments = [];
                        staticTexts.add({staticLabel:"Nom des documents"});
                        for (var k = 1; k<=nombreDocuments; k++){
                            var etiquetteDocument = k+"";
                            etiquetteDocument = "Document "+etiquetteDocument;
                            champsDocuments[k] = textEditboxes.add({editContents:etiquetteDocument, minWidth:280});
                        }
                    }
                }
            }
		}
	}
	//Display the dialog box.
	var myResult2 = myDialog2.show();
	if(myResult2 == true){
		//Get the values from the dialog box controls.
        langue = [];
        for (var j = 0; j<nombreLangues; j++){// création de l'array langue
                langue[j] = champsLangues[j].editContents;
        }
        bibliotheque = []
        fichierTexte = [];
        nomDocument = ["Initium"];
        for (k = 1; k<=nombreDocuments;k++){
            nomDocument[k] = champsDocuments[k].editContents;
            for (var j = 0; j<nombreLangues; j++){
                    var test = true;
                    while (test) {//vérification de l'envoi d'un fichier txt
                        fichierTexte[j] = File.openDialog(nomDocument[k]+": Fichier texte "+langue[j]);
                        if (fichierTexte[j] instanceof File && fichierTexte[j].name.match(/\.txt$/i)) {test = false;}
                    }
            }
            bibliotheque[k] = fichierTexte;
            fichierTexte = [];
        }
		//Remove the dialog box from memory.
		myDialog2.destroy();
	} else {myDialog2.destroy();exit();}
    SourceStyles = File.openDialog("Indiquez la source des styles");
}
function creerCalques(myDocument, langues){//ajout d'un calque par langue
    nombreLangues = langues.length;
    mesBlocs = [];
    for(langue in langues){//langue est ici un integer
        var myLayer = myDocument.layers.add();
        myLayer.name = langues[langue];
        mesBlocs[langue]=[];
	}
}
function importerStyles(SourceStyles){//Importation des styles
    try {
        app.activeDocument.importStyles(ImportFormat.PARAGRAPH_STYLES_FORMAT, File(SourceStyles));
        app.activeDocument.importStyles(ImportFormat.CHARACTER_STYLES_FORMAT, File(SourceStyles));
        app.activeDocument.importStyles(ImportFormat.OBJECT_STYLES_FORMAT, File(SourceStyles));
    } catch (e){alert(e);exit();}
}
function creerGabarits(myDocument){//Creation des gabarits
//definition des deux variables de titres utilisées dans les en-têtes
// a faire: gérer les erreurs lors de la définition du style de paragraphe
        enormeTitre = myDocument.textVariables.add();
        enormeTitre.variableType = VariableTypes.MATCH_PARAGRAPH_STYLE_TYPE;
        enormeTitre.name = "Enorme Titre";
        enormeTitre.variableOptions.deleteEndPunctuation = true;
        enormeTitre.variableOptions.changeCase = ChangeCaseOptions.LOWERCASE;
        enormeTitre.variableOptions.appliedParagraphStyle = "enrmtit";
        enormeTitre.variableOptions.searchStrategy = SearchStrategies.LAST_ON_PAGE;
        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        titreCourant = myDocument.textVariables.add();
        titreCourant.variableType = VariableTypes.MATCH_PARAGRAPH_STYLE_TYPE;
        titreCourant.name = "Titre Courant";
        titreCourant.variableOptions.deleteEndPunctuation = true;
        titreCourant.variableOptions.changeCase = ChangeCaseOptions.LOWERCASE;
        titreCourant.variableOptions.appliedParagraphStyle = "tit";
        titreCourant.variableOptions.searchStrategy = SearchStrategies.LAST_ON_PAGE;
        titreCourant.variableOptions.textBefore = " \u2022 ";
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        titreFichier = app.activeDocument.textVariables.item("Nom de fichier"); 
 //fin définition variables   
     //Création des gabarits
    //Create a new master spread.
    var GabMatines = myDocument.masterSpreads.add();
    GabMatines.namePrefix = "M";
    GabMatines.baseName = "Matines";
    GabLaudes = myDocument.masterSpreads.add();
    GabLaudes.namePrefix = "L";
    GabLaudes.baseName = "Laudes";
    //Fin de création des gabarits
    with(GabMatines){
    	//Set up the left page (verso).
    	with(pages.item(0)){
    		with(marginPreferences){
    			columnCount = 1;
    			columnGutter = "0";
    			bottom = 0.625
    			//"left" means inside; "right" means outside.
    			left = 0.5
    			right = 0.75
    			top = 0.5625
    		}

    		with(textFrames.add(myDocument.layers.item("Calque 1"))){//Add page number.
    			geometricBounds = [0.25,0.75,0.4,1.25];
    			insertionPoints.item(0).contents = SpecialCharacters.autoPageNumber;
    			paragraphs.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("numleft");
    		}
            with(textFrames.add(myDocument.layers.item("Calque 1"))){//en-tête gauche
                // a faire: gérer les erreurs lors de la définition du style de paragraphe
                    geometricBounds = [0.25,0.75,0.4,5];
                    insertionPoints.item(0).textVariableInstances.add({associatedTextVariable:titreFichier});
                    myParagraphStyle = myDocument.paragraphStyles.item("00_Gabarit");
                    insertionPoints.item(0).applyParagraphStyle(myParagraphStyle, true);
    		}
            with(graphicLines.add(myDocument.layers.item("Calque 1"))){//ligne en-tête
                    geometricBounds = [0.45,0.75,0.45,5];
                    appliedObjectStyle = myDocument.objectStyles.item("98_ligne_fine");
             }
            }
    	with(pages.item(1)){//Set up the right page (recto)
    		with(marginPreferences){
    			columnCount = 1;
    			columnGutter = "0";
    			bottom = 0.625
    			//"left" means inside; "right" means outside.
    			left = 0.5
    			right = 0.75
    			top = 0.5625
    		}		
    		with(textFrames.add(myDocument.layers.item("Calque 1"))){//Add page number.
    			geometricBounds = [0.25,4.25,0.4,4.75];
    			insertionPoints.item(0).contents = SpecialCharacters.autoPageNumber;
    			paragraphs.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("numright");
    		}
            with(textFrames.add(myDocument.layers.item("Calque 1"))){//en-tête droit
                    geometricBounds = [0.25,0.5,0.4,4.75];
                    insertionPoints.item(0).textVariableInstances.add({associatedTextVariable:titreCourant});
                    insertionPoints.item(0).textVariableInstances.add({associatedTextVariable:enormeTitre});
                    myParagraphStyle = myDocument.paragraphStyles.item("00_Gabarit");
                    insertionPoints.item(0).applyParagraphStyle(myParagraphStyle, true);
    		}
            with(graphicLines.add(myDocument.layers.item("Calque 1"))){//ligne en-tête
                    geometricBounds = [0.45,0.5,0.45,4.75];
                    appliedObjectStyle = myDocument.objectStyles.item("98_ligne_fine");
             }
    	}
    	}
    
    with(GabLaudes){
    	with(pages.item(0)){//Set up the left page (verso).
    		appliedMaster = myDocument.masterSpreads.item("M-Matines");
    	}
    	with(pages.item(1)){//Set up the right page (recto).
    		appliedMaster = myDocument.masterSpreads.item("M-Matines");
            myDocument.activeLayer = myDocument.layers.item("Calque 1");
            var blocIndesirable = myDocument.masterSpreads.item("M-Matines").pages.item(1).textFrames.item(0).override(myDocument.masterSpreads.item("L-Laudes").pages.item(1));
            blocIndesirable.texts.item(0).remove();
            blocIndesirable.insertionPoints.item(0).textVariableInstances.add({associatedTextVariable:enormeTitre});
    	}
    }

//fin des gabarits
}
function creationLivre(langue, nomDocument, bibliotheque){//crée le nombre de documents réclamés en dupliquant le document de base et en fait un livre
        myFolder = Folder.selectDialog( "Choisissez le dossier d'enregistrement" ); 
        //var myBookFileName = myFolder + "/Tenebres.indb";
        //myBookFile = new File( myBookFileName );
        //if ( myBookFile.exists ) {alert("Un livre portant ce nom existe déjà à cet emplacement. Annulation du processus.");exit();}
        //myBook = app.books.add( myBookFile );
        var mesDocuments = [];
        for (var i = 0; i < nomDocument.length; i++){
            mySetup();
            var myFile = new File(myFolder + "/" + nomDocument[i] + ".indd");
            if ( myFile.exists ) {alert("Un fichier portant ce nom existe déjà à cet emplacement. Annulation du processus.");exit();}
            monDocumentActif = app.activeDocument.save(myFile);
            //myBook.bookContents.add(myFile);
            mesDocuments[i] = myFile;
            monDocumentActif.save();
            monDocumentActif.close();
        }
        for (var j = 1; j < nomDocument.length; j++){
            monDocumentActif = app.open(mesDocuments[j]);
            importerStyles (SourceStyles);
            creerGabarits (monDocumentActif);
            creerCalques (monDocumentActif,langue);
            importerTexte(monDocumentActif,langue, bibliotheque[j]);
            mettreEnFormeTexte (monDocumentActif);
            placerImages (monDocumentActif, "^\\l*@(.*___.*___\\u@)*([\\u\\l\\d\\.])+\\.pdf");
            monDocumentActif.save();
            //monDocumentActif.close();
        }
        //myBook.save();
        //myBook.exportFile(ExportFormat.pdfType, File(myFolder + "/ExportPDF.pdf"), false);
}
function importerTexte(myDocument,langues,fichierTexte){//importation et placement des fichiers texte pour chaque langue
    //deux tableaux de même longueur, l'un avec les noms des langues (correspondant aux noms des calques, l'autre avec les fichiers txt de chaque langue
    //la page 1 est la couverture, donc on importe le texte à la page 2.
    maPage = [];
    for (var p = 0; p < 70; p++){
        maPage[p] = myDocument.pages.add();//ajout massif de pages au document; seul moyen trouvé jusqu'à présent pour éviter les problèmes d'owerflowing liés au déclage de la mise en page à mesure qu'on ajustera la taille des blocs
        for (langue in langues){
            mesBlocs[langue][p] = maPage[p].textFrames.add(myDocument.layers.item(langues[langue]))
            mesBlocs[langue][p].geometricBounds = [0.5625,0.75,6.5625,5];
            if (p > 0){mesBlocs[langue][p].previousTextFrame = mesBlocs[langue][p-1];}
        }
    }
    myDocument.pages.everyItem().appliedMaster = myDocument.masterSpreads.item("M-Matines");//application du gabarit Matines
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    for (var i in langues){
        mesBlocs[i][1].place(fichierTexte[i]);
        if (i == 0) {//cas du latin
            myObjectStyle = myDocument.objectStyles.item("91_latin");
        } else {//cas vernaculaires
            myObjectStyle = myDocument.objectStyles.item("92_vernaculaire");
        }
        mesBlocs[i][1].applyObjectStyle(myObjectStyle, true, true);
        myCounter = 0;
        mySelection = mesBlocs[i][1];
        while (mySelection = mySelection.nextTextFrame){
           myCounter++;
           mySelection.applyObjectStyle(myObjectStyle, true, true);
        }
    }
    //on supprime les remplacements dans le style de bloc (surtout à cause du décalage)
    var  O = myDocument.pageItems.everyItem().getElements(),
        S = myDocument.objectStyles.item("91_latin"),
        P = O.length;
        while (P--){
            if (O[P].appliedObjectStyle == S)
                O[P].applyObjectStyle(S);
        }
}
function mettreEnFormeTexte(myDocument){//applique les styles de paragraphes idoines; supprime le texte parasite, applique kerning aux lettrines;
    app.findGrepPreferences = app.findChangeGrepOptions = app.changeGrepPreferences= null;
    app.findGrepPreferences.findWhat = "^/\\l+\\d*/";
    toutesBalises = myDocument.findGrep();
    for (var i=0; i<= toutesBalises.length; i++){//application des styles de paragraphe
        try {
            maBalise = toutesBalises[i].contents;
            monStyle = maBalise.slice(1,-1);
            toutesBalises[i].appliedParagraphStyle = myDocument.paragraphStyles.item(monStyle);
        }
        catch (e) {}
    }
    myDocument.changeGrep();//supression des balises
    //kearning
     app.findGrepPreferences = app.findChangeGrepOptions = app.changeGrepPreferences= null;
     app.findTextPreferences = app.findChangeTextOptions = app.changeTextPreferences= null;
     app.findTextPreferences.findWhat = "[NJ]";
     app.changeTextPreferences.changeTo = "‌^j";
     myDocument.changeText();
    function kearning(recherche, valeur){    
        app.findGrepPreferences.findWhat = "^["+recherche+"]~j";
        myPairs = myDocument.findGrep();
         for (var i=0; i< myPairs.length; i++){
                myPairs[i].insertionPoints[2].kerningValue = valeur;
        }
    }
    kearning ("CDEFHMNOPSVWY", -250);
    kearning ("ABGIJKQRTUXZ", -350);
    kearning ("L", -800);
    //fin kearning
    function remplacementGrep (recherche, remplace){
        app.findGrepPreferences = app.findChangeGrepOptions = app.changeGrepPreferences= null;
        app.findGrepPreferences.findWhat = recherche;
        app.changeGrepPreferences.changeTo = remplace;
        myDocument.changeGrep();
    }
    remplacementGrep("\\[-\\]","~_");
    remplacementGrep(" ([:;»!\\?~_])","~.$1");
    remplacementGrep("([«~_]) ","$1~.");
    remplacementGrep("(?<=\\b[vr]) ","~s");
    remplacementGrep(" (?=[\\*|†])","~s");
    remplacementGrep("\\[ae\\]","ǽ");
    remplacementGrep("\\[break\\]","\\n");
    remplacementGrep("\+([\u\l]*)\+","~-$0~-");
    remplacementGrep("\=([\u\l ,:\.]*)\=","~-$0~-");  
}
function placerImages(myDocument,balise){
        myDocument = app.documents[0];
        app.findGrepPreferences = app.findChangeGrepOptions = app.changeGrepPreferences = app.findTextPreferences = app.findChangeTextOptions = app.changeTextPreferences= null;
        app.findGrepPreferences.findWhat = balise;
        mesBalisesImages = myDocument.findGrep();
        maLongueurdeBoucle = mesBalisesImages.length;
       var myCounter = 0;
        for (var i=0; i < maLongueurdeBoucle; i++){
            var maRecherche = mesBalisesImages[i].contents;
            maRecherche = maRecherche.split('@');
            var k = maRecherche.length - 1;
            monMode = maRecherche[k-1];
            monMode = monMode.split("___");
            monMode = monMode.join("\r");
            monFichierImage = myFolder+"/Fontes/pdf/"+maRecherche[k];
            var myInsertionPoint = mesBalisesImages[i].insertionPoints[0];
                    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                    //Insertion des partitions
                   myCounter = 1;
                    var myBreak = false;
                    try {
                        while(myBreak == false){
                            if(myCounter >= 1){myInsertionPoint.contents = myInsertionPoint.contents+"\r";myInsertionPoint.appliedParagraphStyle = myDocument.paragraphStyles.item("lien");}
                            app.pdfPlacePreferences.pageNumber = myCounter;
                            myInlineFrame = myInsertionPoint.textFrames.add();
                            myInlineFrame.appliedObjectStyle = myDocument.objectStyles.item("95_part");
                            maPagePdfActive = myInlineFrame.place(File(monFichierImage))[0];
                            myInlineFrame.fit(FitOptions.FILL_PROPORTIONALLY);
                            myInlineFrame.fit(FitOptions.FRAME_TO_CONTENT); 
                            if(myCounter == 1){
                                var numeroPageActive = maPagePdfActive.pdfAttributes.pageNumber;
                                if (k > 1){
                                    monCadreMode = myInsertionPoint.textFrames.add();
                                    monCadreMode.appliedObjectStyle = myDocument.objectStyles.item("97_mode_lettrine");
                                    monCadreMode.contents = monMode;
                                }
                            }
                            else{
                                if(maPagePdfActive.pdfAttributes.pageNumber == numeroPageActive){
                                    myInlineFrame.remove();
                                    myBreak = true;
                                }
                                
                            }
                            myCounter = myCounter + 1;
                        }                
                                        
                    }
                    catch(e){}
                    mesBalisesImages = myDocument.findGrep();                
        }
        app.findGrepPreferences = app.findChangeGrepOptions = app.changeGrepPreferences = app.findTextPreferences = app.findChangeTextOptions = app.changeTextPreferences= null;
        app.findGrepPreferences.findWhat = "\\r\\r"+balise;
        myDocument.changeGrep();
}
