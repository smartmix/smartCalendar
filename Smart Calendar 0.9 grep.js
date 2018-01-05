var nome = "Smart Calendar";
var versione = "0.9";
var scriptLink = '#';
var utilityFolder = 'SmartCalendar_utility';
var settingsFile = 'calendario.js';
var presetsFile = 'presets.txt';
var presetsFilePath = File(getScriptPath()+'/'+utilityFolder+'/'+presetsFile);


var prefs = {
    'startDay' : [1,'gen'] , //il giorno da cui deve iniziar il calcolo del calendario. Default 1 gennaio
    'endDay' : [31,'dic'], // il giorno in cui deve finire il calendario. Default 31 dicembre
	'ordineGenerazione' : ['[numero]','[tab]','[giorno]','[tab]','[santo]','[tab]','[luna]','[fine paragrafo]'],
	'santi' : true,
	'zeroNum1cifra' : true, //inserisce uno zero davanti ai numeri a una cifra
	'nomeMese' : 3, // quanto lungo deve essere il nome del mese, se impostato su 0 non viene tagliato
	'nomeGiorno' : 3,
	'scriviNomeMese' : true,
	'interruzioneCorniceMese' : true,
	'tipoLuna' : 'lune3',
	
    //gli stili da generare paragrafo e carattere	
	//se crea nuovi stili è false gli stili già essitenti
	'stylesPrefs' : {
		'createNewStyles' : true, //se true crea dei nuovi stili di paragrafo e carattere anche se nel documento esistno già
		'prefissoStili' : 'prefisso_', //il prefisso da usare per gli stili di paragrafo (indispensabile se crea nuovi stili è true),
		'fontLune' : 'Moon Phases - smartmix.it',
		'lune1' : ['a','b','c','d'],
		'lune2' : ['A','B','C','D'],
		'lune3' : ['e','f','g','h'],
		
		'styles' : {
			'stileParFestivi' : {
				'active' : true,
				'name' : 'festivi',
			},
			'stileParFeriali' : {
				'active' : true,
				'name' : 'feriali',
			},
			'stileParMesi' : {
				'active' : true,
				'name' : 'mesi',
			},
			'stileCarMesi' : {
				'active' : true,
				'name' : 'mesi',
			},
			'stileCarNumero' : {
				'active' : true,
				'name' : 'numero',
			},
			
			'stileCarGiorno' : {
				'active' : true,
				'name' : 'giorno',
			},
			
			'stileCarSanto' : {
				'active' : true,
				'name' : 'santo',
			},
			
			'stileCarLune' : {
				'active' : true,
				'name' : 'lune',
				'type' : 'lune3',
			},
			
			'stileCarCounter' : {
				'active' : true,
				'name' : 'counter',
			},
			
			'stileCarSettimana' : {
				'active' : true,
				'name' : 'settimana',
			}
		}
	},
	'specialChars' : {
		'fineParagrafo' : '\r',
		'chBeforeMonth': '', //il carattere che compare prima del mese
		'chAfterMonth' : '\r', // il carattere che compare dopo il mese
		'intRigaForzata' : '\n',
		//'intPagina' : SpecialCharacters.pageBreak,
		//'intCornice' : ScpecialCharacters.frameBreak,
		'tabulazione' : '\t'
	}
}


var sep = '|||';
var sepL = '///';

var defaultPreset = ['Default Preset',true,true,true,'completi','completi',1,'[numero]' + sepL + '[tab]' + sepL + '[giorno]' + sepL + '[tab]' + sepL + '[santo]' + sepL + '[tab]' + sepL + '[luna]'+ sepL + '[fine paragrafo]'];

var smartmixPreset = '\
tornado|||true|||true|||false|||completi|||completi|||1|||[numero]///[tab]///[giorno]///[tab]///[santo]///[tab]///[luna]///[fine paragrafo]///[anno]///[luna]///[giorno]///[mese]\
Ski club Fossò tavolo|||false|||true|||true|||abbreviati|||completi|||1|||[numero]///[inter. riga forzata]///[giorno]///[fine paragrafo]\
Auto Carrozzeria Moderna|||false|||true|||true|||iniziale|||completi|||1|||[giorno]///[tab]///[numero]///[fine paragrafo]\
parrocchia Cazzago|||true|||true|||true|||abbreviati|||abbreviati|||1|||[numero]///[tab]///[luna]///[inter. riga forzata]///[tab]///[giorno]///[tab]///[santo]///[fine paragrafo]\
Calendario coin|||false|||true|||false|||abbreviati|||abbreviati|||1|||[tab]///[numero]///[inter. riga forzata]///[tab]///[tab]///[giorno]///[inter. riga forzata]///[tab]///[tab]///[santo]///[tab]///[luna]///[fine paragrafo]';



//importo il file di impostazione
try {
	
	var scriptPath = getScriptPath();
    var calendarFile = scriptPath+'/' + utilityFolder + '/'+settingsFile;
	$.evalFile(calendarFile);	
    var calendarFile = true;

}catch(e){
    //impossibile trovare il file oppure c'è un errore javascript
	alert('Errore.\nIl file' + settingsFile + ' deve essere presente all\'interno della cartella SmartCalendar_utility.\n\nDownload the lastest version at '+scriptLink);
	exit();
}



if(calendarFile==true){
    //writeCalendar(calGen(2018,prefs),prefs);
	mainWindow();
}


function mainWindow(){
	var oggi = new Date();
	
	var w = new Window('dialog',nome);
	
	var presetPanel = w.add('panel',[0,0,600,50],'Preset');
		presetPanel.orientation = 'row';
		var newPreset = presetPanel.add('panel',[300,0,600,50]);
			var savePreset = newPreset.add ('button',[7,5,127,32],'Salva predefinito...');
			var nomePreset = newPreset.add ('edittext',[132,5,287,32],'New Preset');
	
			savePreset.onClick = function(){
				var currentSettings = new Array();
				
			}
			
		presetPanel.add('statictext',[10,10,150,30],'Scegli il predefinito');
			var presetsList = presetPanel.add('dropdownlist',[125,10,270,30],getPresetsName());
			presetsList.onChange = function(){
				var preset2use = elaboratePreset(readPresets()[presetsList.selection.index]);
				//prefs.ordineGenerazione = preset2use[preset2use.length-1].split(sepL);
			}
		
	var riga1 = w.add('group',[0,50,600,300]);
		var scriptInfo = riga1.add('panel',[0,6,295,110]);
			scriptInfo.add('statictext',[10,10,295,30],'Progettato da smartmix.it');
			scriptInfo.add('statictext',[10,10,295,60],'Ver. beta - segnala errori a info@smartmix.it');
			scriptInfo.add('statictext',[10,50,295,90],'Attenzione: Esegui un attento controllo del calendario generato prima di distribuirlo',{multiline: true});
	
		var baseSettingsPanel = riga1.add('panel',[0,120,295,240],'Informazioni di base');
			baseSettingsPanel.add('statictext',[10,10,50,30],'Anno');
			var anno = baseSettingsPanel.add('edittext',[42,10,110,30],oggi.getFullYear()+1);
	
			var startMese = baseSettingsPanel.add('checkbox',[10,40,295,60],'Scrivi il nome del mese quando inizia');
			startMese.value = true;
	
			var pgBreakAfterM = baseSettingsPanel.add('checkbox',[10,60,295,80],'Interr. di cornice quando finisce il mese');
			pgBreakAfterM.value = true;
			
			var nZero = baseSettingsPanel.add('checkbox',[10,80,295,100],'Zero davanti ai numeri ad una cifra');
			nZero.value = true;
	
	
		var customSettingsPanel = riga1.add('panel',[305,6,600,240]);
			var cutSettingsPanel = customSettingsPanel.add('group',[5,5,286,170]);
				var cutDayPanel = cutSettingsPanel.add('group',[0,10,281,82.5]);
					var giorniCompleti = cutDayPanel.add('radiobutton',[0,0,281,20],'Giorno completi (es. Lunedì)');
					var giorniAbbreviati = cutDayPanel.add('radiobutton',[0,25,281,45],'Giorni abbreviati (es. Lun)');
					var giorniIniziale = cutDayPanel.add('radiobutton',[0,50,281,70],'Giorni iniziale (es. L)');
					giorniCompleti.value = true;
					
				var cutMonthPanel = cutSettingsPanel.add('group',[0,100,281,165]);
					var mesiCompleti = cutMonthPanel.add('radiobutton',[0,0,281,20],'Mesi completi (es. Gennaio)');
					var mesiAbbreviati = cutMonthPanel.add('radiobutton',[0,25,281,50],'Mesi abbreviati (es. Gen)');
					mesiCompleti.value = true;
				
			var moonSettingsPanel = customSettingsPanel.add('panel',[5,175,286,225],'Scegli lo stile della luna');
				var luna1 = moonSettingsPanel.add('radiobutton',[5,15,90,30],'Luna 1');
				var luna2 = moonSettingsPanel.add('radiobutton',[80,15,185,30],'Luna 2');
				var luna3 = moonSettingsPanel.add('radiobutton',[160,15,280,30],'Luna 3');
				luna1.value = true;
	
	
	
	var riga2 = w.add('group',[0,250,600,500]);
	riga2.orientation = 'row';
	
		var el = riga2.add('edittext',[0,0,110,25]);
		var adEl = riga2.add('button',[120,0,235,25],'Aggiungi >')
		adEl.onClick = function(){
			list.add('item',el.text,list.index);
			el.text ='';
		}
		
		var optionalValue = riga2.add('listbox',[0, 30, 235, 250],["[numero]","[giorno]","[santo]","[luna]","[mese]","[anno]","[tab]","[fine paragrafo]","[inter. riga forzata]","[interruzione pagina]","[interruzione cornice]"]);
	
		
		var add2list = riga2.add('button',[240,120,275,150],'>');
		add2list.onClick = function(){
			list.add('item',optionalValue.selection,list.index);
		}
		
		riga2.add('statictext',[285,0,510,20],'Ordine di generazione');
		var list = riga2.add('listbox',[285, 30, 510, 250],prefs.ordineGenerazione);
	
		var su = riga2.add('button',[520,30,600,60],'su');
		var giu = riga2.add('button',[520,60,600,90],'giu');
		var rimuovi = riga2.add('button',[520,218,600,250],'rimuovi');
	
		su.onClick = function(){
			var n = list.selection.index;
			if (n > 0){
				muovi (list.items [n-1], list.items [n]);
				list.selection = n-1;
			}
		}
		
		giu.onClick = function(){
			var n = list.selection.index;
			if (n < list.items.length-1){
				muovi (list.items [n+1], list.items [n]);
				list.selection = n+1;
			}
		}
		
		rimuovi.onClick = function(){
			list.remove (list.selection);
		}
		
		function muovi (x,y){
			var temp = x.text;
			x.text = y.text;
			y.text = temp;
		}
	
		
	
	
	
	var rigaBottoni = w.add('group');
		var genera = rigaBottoni.add('button',undefined,'genera',{name:'ok'});
		var chiudi = rigaBottoni.add('button',undefined,'chiudi');
	
		chiudi.onClick = function(){w.close();}
	
	
	
	//var gPub = w.add('group');
			
			
			
			
	w.show();
	
	
}




/*
*******************************************
* la funzione principale: genera il calendario e restituise un oggetto js

***********************************
* struttura dell'oggetto calendario
***********************************

calendario = {

    'anno' : 2018, //l'anno scelto
    'mesi' : {
		'gen': {
			'nome':'gennaio',
			'giorni:{
				1: {
					'numero' : 1,
					'giorno' : 'lunedì',
					'santo' : 'il nome del santo',
					'festivo' : true / false
					'luna' : numero
					'counter' : il numero del giorno nell anno
					'settimana' : se lunedì numero oppure false
				}
			}
		},
        'gli altri mesi'{
            ....
        }
    }
}

*******************************************
*/

function calGen(anno,prefs){
	
	
	//la variabile che conterrà tutto il calendario
	var calendario = {};
    calendario['anno'] = anno;
    calendario['mesi'] = {};
    var mesi = calendario['mesi'];
	
	//cancello da calSettings il 29 febbrario nel caso in cui l'anno non sia bisestile
	var bisestile = bisestileCalc(anno);
	
	
	/*
	****************
	* giorno di partenza
	* 
	* calcolo del giorno di partenza dell'anno partendo da una data conosciuta: domenica 1 gennaio 2012
	* è stato scelto il 2012 perché è un anno bisestile
	* 
	****************
	*/
	
	var day2day0 = 0;
	for (i=calSettings.utility.zero.anno; i<anno; i++){
		var annoBisesto = bisestileCalc(i);
		
		if(annoBisesto==true){
			day2day0 += 366;
		}else{
			day2day0 += 365;
		}
		
	}
	
	//il giorno da cui inizia l'anno
	var day = (day2day0%7);
	
	
	
	/*
	***************
	* generazione del calendario, mancano ancora i giorni mobili		
	***************
	*/
	
	var nMese = 0;
    var counterGiorni = 0;
	var settimana = 1;
    
    //variabili che servono per la pasqua
	var pasqua = false;
	var primavera = false; //questa variabile di attiva dopo il 21 marzo, pasqua è la prima domenica di luna piena dopo il 21 marzo
	var iniziaAdAspettarePasqua = false; //si attiva quando passata la primavera arriva la luna piena
	
    var IVavvento = false;
    var natale = 359;
    if(annoBisesto==true){ natale=360; }
	
	for(mese in calSettings.mesi ){
		
		mesi[mese] = {};
		mesi[mese]['nome'] = cut(calSettings.mesi[mese]['nome'],prefs.nomeMese);
		mesi[mese]['giorni'] = {};
		
		var numero = 1;
		var festivo;
		
        //un santo per ogni giorno, passo tutti i santi e genero il calendario di base
		for(santo in calSettings.mesi[mese]['santi']){
			mesi[mese]['giorni'][numero] = {};
			counterGiorni ++;
			
			
			
			//aggiongo lo zero davanti ai numeri ad una cifra se richiesto
			if(prefs.zeroNum1cifra == false){
				mesi[mese]['giorni'][numero]['numero'] = numero;
			}else{
				if(String(numero).length == 1) {var numm = '0'+String(numero); }else{var numm = String(numero);}
				mesi[mese]['giorni'][numero]['numero'] = numm;
			}
			
			
			mesi[mese]['giorni'][numero]['giorno'] = cut(calSettings.giorni[day],prefs.nomeGiorno);
			mesi[mese]['giorni'][numero]['santo'] = calSettings.mesi[mese]['santi'][santo];
			mesi[mese]['giorni'][numero]['counter'] = counterGiorni;
			
			//festivo o feriale
			if(day==0){
				mesi[mese]['giorni'][numero]['festivo'] = true;
			}else{
				mesi[mese]['giorni'][numero]['festivo'] = false;
			}
			
			//aggiunta lune
			var luna = faseLuna (new Date(parseInt(anno),nMese,numero));
			mesi[mese]['giorni'][numero]['luna']=luna;
			
			
			if(day==1){
				mesi[mese]['giorni'][numero]['settimana'] = settimana;
				settimana++;
			}
            
            if(calSettings.festivi[mese][numero] ){
                mesi[mese]['giorni'][numero]['santo'] = calSettings.festivi[mese][numero];
                mesi[mese]['giorni'][numero]['festivo'] = true;
            }
			
			
			
			//calcolo pasqua
			if(primavera==false & mese == 'mar' & numero == 21) {
                //È il 21 marzo, primavera
				primavera = true;
			}
			
			if(iniziaAdAspettarePasqua==false & primavera==true & luna==3){
                //È la prima luna piena di piemavera
				iniziaAdAspettarePasqua = true;
			}
			
			if(pasqua==false & iniziaAdAspettarePasqua == true){
				if(day==0){
					//la pirma domenica di luna piena dopo il 21 marzo. Pasqua
                    pasqua = counterGiorni;
				}
			}
            
            
            
            
            //calcolo IV di avvento, ultima domenica prima di natale
            if(IVavvento == false & mese=='dic' & counterGiorni>(natale-7) & day == 0) {
                IVavvento = counterGiorni;
            }
			
			
			//imposto a 0 i giorno quando arrivano alla fine della settimana oppure aggiungo di uno
			if(day==calSettings.giorni.length-1) {
				day=0;
			}else{
				day ++;
			}
			
			numero ++;
			
		}
		
		numero = 1;
		nMese ++;
		
	}
    
    
    //aggiunta dei giorni mobili
    for (mese in mesi){
        for(giorno in mesi[mese]['giorni']){
            
            var giornoCorrente = mesi[mese]['giorni'][giorno]['counter'];
            
            for(festaMobile in calSettings['giorni mobili'] ){
                
                //starter descrive il giorno di partenza da cui calcolare la festa mobile
                var starter;
                if(calSettings['giorni mobili'][festaMobile]['start']=='pasqua'){
                    starter = pasqua;
                }else if(calSettings['giorni mobili'][festaMobile]['start']=='IVavvento'){
                    starter = IVavvento;
                }else{
                    alert('attenzione stai tentando di calcolare una festa mobile non prevista');
                }
                
                var giornoMobile = starter + calSettings['giorni mobili'][festaMobile]['giorno'];
                
                if(giornoCorrente == giornoMobile){
                    mesi[mese]['giorni'][giorno]['santo'] = calSettings['giorni mobili'][festaMobile]['nome'];
                    
                    if(calSettings['giorni mobili'][festaMobile]['festivo'] == true){
                        mesi[mese]['giorni'][giorno]['festivo'] = true;
                    }
                }           
            }           
        }
    }
    
    //alert(calendario['mesi']['mar']['giorni'][31]['luna']);
        
    return calendario;
    
} //fine di calGen


/*
****************************
* Funzione che scrive in indesign il calendario generato con formattazione custom

</frBreak>

****************************
*/

function writeCalendar(calendario,prefs){
    
    var myDocument= app.documents.item(0);	
    var myPage = myDocument.pages.item(0);
    var calendarText = '';
    
    //verifico se esiste già un box di testo selezionat
    //se esiste scrivo il calendario dentro alla selezione
    //se non esiste genero una casella di testo nella prima pagina del documento: dimensioni A4 CON CORNICE DI 10 mm
    if(app.selection.length==1){
		var myTextFrame = app.selection[0].insertionPoints[0];
	}else{ 
	    var myTextFrame = myPage.textFrames.add();
		myTextFrame.geometricBounds = [10, 10, 287 , 200];
	}
	
	var ordine = prefs.ordineGenerazione;
	var moons = prefs.stylesPrefs[prefs.tipoLuna];
    var c = 0;
		
	for (mese in calendario['mesi']){
		
		if(prefs.interruzioneCorniceMese == true & c!=0){
			calendarText += '</frBreak>';
		}
		
		if(prefs.scriviNomeMese == true){
			
            calendarText += '<ps month>';
            calendarText += prefs.specialChars.chBeforeMonth;
            calendarText += '<cs month>';
			calendarText += calendario['mesi'][mese]['nome'];
            calendarText += '</cs month>';
            calendarText += '</ps month>';
			calendarText += '\r';
			
		}
		
		
		for(giorno in calendario['mesi'][mese]['giorni']) {
			var thisDay = calendario['mesi'][mese]['giorni'][giorno];
			
            calendarText += '<ps festivo'+thisDay.festivo+'>';
			//passo l'ordine di generazione e creo i blocco giorno
			for(ch in ordine){
				
				if(ordine[ch] == '[giorno]'){
                    calendarText += '<cs giorno>'+thisDay['giorno']+'</cs giorno>';
				}else if(ordine[ch] == '[numero]'){
					calendarText += '<cs numero>'+thisDay['numero']+'</cs numero>';
				}else if(ordine[ch] == '[santo]'){
					calendarText += '<cs santo>'+thisDay['santo']+'</cs santo>';
				}else if(ordine[ch] == '[luna]'){
					
					
					if(thisDay['luna']!=0){
						
						//myTextFrame.parentStory.characters.item(-1).applyCharacterStyle(stileCarLune,true);
						
						if(thisDay['luna'] == 1 ){
                            calendarText += '<cs luna>'+moons[0]+'</cs luna>';
						}else if(thisDay['luna'] == 2 ){
                            calendarText += '<cs luna>'+moons[1]+'</cs luna>';
                        }else if(thisDay['luna'] == 3 ){
							calendarText += '<cs luna>'+moons[2]+'</cs luna>';
						}else if(thisDay['una'] == 4 ){
							calendarText += '<cs luna>'+moons[3]+'</cs luna>';
						}
					}
					
		        	
				}else {
					
				}
				
			}
			
			
			calendarText += '</ps festivo'+thisDay.festivo+'>';
			calendarText += '\r';
            c++;
			
		}
	}
	
	
	
	
        
    myTextFrame.parentStory.insertionPoints.item(-1).contents = calendarText;
    applyStyles();
	grepSpecialCh('</frBreak>', '~R');
	grepSpecialCh('</pgBreak>', '~P');
}



function applyStyles(){
     //importo i font attivi
	var myDocument= app.documents.item(0);
    var fonts = myDocument.fonts;
	
	/*
	***************************************
	* creazione degli stili di paragrafo e di carattere
	***************************************
	*/
	
	var style2gen;
	
	//stile paragrafo festivi
	style2gen = 'stileParFestivi';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileParFestivi = myDocument.paragraphStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name });
				try{festiviStyle.appliedFont = app.fonts.item('Arial Black');}catch(errore){}
			}catch(errore){
				var stileParFestivi = myDocument.paragraphStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
			}
		}else{
			var stileParFestivi = myDocument.paragraphStyles.item(prefs.stylesPrefs.styles[style2gen].name);
		}
		
		grepStyle('ps',stileParFestivi,'festivotrue');
		
    }
	
	
	//stile paragrafo feriali
	style2gen = 'stileParFeriali';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileParFeriali = myDocument.paragraphStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name });
				try{festiviStyle.appliedFont = app.fonts.item('Arial Black');}catch(errore){}
			}catch(errore){
				var stileParFeriali = myDocument.paragraphStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
			}
		}else{
			var stileParFeriali = myDocument.paragraphStyles.item(prefs.stylesPrefs.styles[style2gen].name);
		}
		
		grepStyle('ps',stileParFeriali,'festivofalse');
		
    }
	
	
	//stile paragrafo mesi
	style2gen = 'stileParMesi';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileParMesi = myDocument.paragraphStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name });
				try{festiviStyle.appliedFont = app.fonts.item('Arial Black');}catch(errore){}
			}catch(errore){
				var stileParMesi = myDocument.paragraphStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
			}
		}else{
			var stileParMesi = myDocument.paragraphStyles.item(prefs.stylesPrefs.styles[style2gen].name);
		}
		
		grepStyle('ps',stileParMesi,'month');
		
    }
	
	
	//stile carattere mesi
	style2gen = 'stileCarMesi';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileCarMesi = myDocument.characterStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name });
			}catch(errore){
				var stileCarMesi = myDocument.characterStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
			}
		}else{
			var stileCarMesi = myDocument.characterStyles.item(prefs.stylesPrefs.styles[style2gen].name);
		}
		
		grepStyle('cs',stileCarMesi,'month');
    }
	
	//stile carattere numero
	style2gen = 'stileCarNumero';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileCarNumero = myDocument.characterStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name });
			}catch(errore){
				var stileCarNumero = myDocument.characterStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
			}
		}else{
			var stileCarNumero = myDocument.characterStyles.item(prefs.stylesPrefs.styles[style2gen].name);
		}
		
		grepStyle('cs',stileCarNumero,'numero');
		
    }
	
	
	//stile carattere giorno
	style2gen = 'stileCarGiorno';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileCarGiorno = myDocument.characterStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name });
			}catch(errore){
				var stileCarGiorno = myDocument.characterStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
			}
		}else{
			var stileCarGiorno = myDocument.characterStyles.item(prefs.stylesPrefs.styles[style2gen].name);
		}
		
		grepStyle('cs',stileCarGiorno,'giorno');
		
    }
	
	
	//stile carattere santo
	style2gen = 'stileCarSanto';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileCarSanto = myDocument.characterStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name });
			}catch(errore){
				var stileCarSanto = myDocument.characterStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
			}
		}else{
			var stileCarSanto = myDocument.characterStyles.item(prefs.stylesPrefs.styles[style2gen].name);
		}
		
		grepStyle('cs',stileCarSanto,'santo');
    }
	
	
	//stile carattere lune
	style2gen = 'stileCarLune';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		var fontLune = prefs.stylesPrefs.fontLune;
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileCarLune = myDocument.characterStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name });
				try{stileCarLune.appliedFont = app.fonts.item(fontLune);}catch(errore){alert('devi installare la font '+fontLune+' per vedere correttamente le lune');}
			}catch(errore){
				var stileCarLune = myDocument.characterStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
				try{stileCarLune.appliedFont = fontLune;}catch(errore){alert('devi installare la font '+fontLune+' per vedere correttamente le lune');}
			}
		}else{
			var stileCarLune = myDocument.characterStyles.item(prefs.stylesPrefs.styles[style2gen].name);
			try{stileCarLune.appliedFont = fontLune;}catch(errore){alert('devi installare la font '+fontLune+' per vedere correttamente le lune');}
		}
		
		grepStyle('cs',stileCarLune,'luna');
		
    }
	
	
	
	//stile carattere counter
	style2gen = 'stileCarCounter';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileCarCounter = myDocument.characterStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name });
			}catch(errore){
				var stileCarCounter = myDocument.characterStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
			}
		}else{
			var stileCarCounter = myDocument.characterStyles.item(prefs.stylesPrefs.styles[style2gen].name);
		}
    }
	
	
	
	//stile carattere settimana
	style2gen = 'stileCarSettimana';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileCarSettimana = myDocument.characterStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name });
			}catch(errore){
				var stileCarSettimana = myDocument.characterStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
			}
		}else{
			var stileCarSettimana = myDocument.characterStyles.item(prefs.stylesPrefs.styles[style2gen].name);
		}
    }
}





/*
**************
* utility *****
***************
*/




//calcolo dell'anno bisestile
function bisestileCalc (year) {
	
	var startBisestile = calSettings.utility.zero.anno;
	var bisestile;
	
	if(((year - startBisestile)%4)==0){
		bisestile = true;
	}else{
		bisestile = false;
		delete calSettings['mesi']['feb']['santi']['29'];
		calSettings['mesi']['feb']['numero giorni'] = '28';
	}
	return bisestile;
}



/* 
* FUNZIONE PER IL CALCOLO DELLA FASE LUNARE
* Attenzione! da perfezionare, potrebbe sbagliare di un giorno
* @see http://forum.html.it/forum/showthread/t-905453.html
*/

function faseLuna(DG) { // RITORNA 3 SE C'E' LA LUNA PIENA
	DR = new Date(2000,0,1);	// data di riferimento
	TL = (((DG - DR) / 1000) + 2114500) % 2551443;
	RV = 1
	if (TL < 2508243){RV=0;} //0 // CALANTE DA ULTIMO
	if (TL < 1956782.25){RV=4;} // 4 ULTIMO QUARTO
	if (TL < 1870382.25){RV=0;} //0 // CALANTE DA PIENA
	if (TL < 1318921.5){RV=3;} // 3  PIENA
	if (TL < 1232521.5){RV=0;} //0 // CRESCENTE DA PRIMO
	if (TL < 681060.75){RV=2;} // 2 PRIMO QUARTO
	if (TL < 594660.75){RV=0;} //0 // CRESCENTE DA NUOVA
	if (TL < 43200){RV=1;} // 1 NUOVA
	return RV
}




//funzione che taglia il nome dei giorni e dei mesi
function cut(string,num){
	
	if(num==0){
		return string;
	}else{
		return string.slice(0,(num));
	}
}


function grepStyle(type,stileName,string2find){
	
	//type ps o cs
	
	myDocument= app.documents.item(0);
	
	app.findGrepPreferences = NothingEnum.nothing; // now empty the find what field!!! that's important!!!
    app.changeGrepPreferences = NothingEnum.nothing; // empties the change to field!!! that's important!!!
	app.findChangeGrepOptions.includeFootnotes = true;
    app.findChangeGrepOptions.includeHiddenLayers = false;
    app.findChangeGrepOptions.includeLockedLayersForFind = false;
    app.findChangeGrepOptions.includeLockedStoriesForFind = true;
    app.findChangeGrepOptions.includeMasterPages = true;
	
	if(type=='ps'){
		app.findGrepPreferences.findWhat = '(<ps '+string2find+'>)(.+?)(</ps '+string2find+'>)';
		app.changeGrepPreferences.appliedParagraphStyle = stileName;
	}else if(type=='cs'){
		app.findGrepPreferences.findWhat = '(<cs '+string2find+'>)(.+?)(</cs '+string2find+'>)';
		app.changeGrepPreferences.appliedCharacterStyle = stileName;
	}
	
	app.changeGrepPreferences.changeTo = '$2';
	myDocument.changeGrep();
	
	app.findGrepPreferences = NothingEnum.nothing; // now empty the find what field!!! that's important!!!
    app.changeGrepPreferences = NothingEnum.nothing; // empties the change to field!!! that's important!!!
	
}

function grepSpecialCh(ch2find,ch2replace){
	myDocument= app.documents.item(0);
	
	app.findGrepPreferences = NothingEnum.nothing; // now empty the find what field!!! that's important!!!
    app.changeGrepPreferences = NothingEnum.nothing; // empties the change to field!!! that's important!!!
	app.findChangeGrepOptions.includeFootnotes = true;
    app.findChangeGrepOptions.includeHiddenLayers = false;
    app.findChangeGrepOptions.includeLockedLayersForFind = false;
    app.findChangeGrepOptions.includeLockedStoriesForFind = true;
    app.findChangeGrepOptions.includeMasterPages = true;
	app.findGrepPreferences.findWhat = ch2find;
	app.changeGrepPreferences.changeTo = ch2replace;
	myDocument.changeGrep();
	
	app.findGrepPreferences = NothingEnum.nothing; // now empty the find what field!!! that's important!!!
    app.changeGrepPreferences = NothingEnum.nothing; // empties the change to field!!! that's important!!!
}


//get the current script folder path
function getScriptPath() {
	try { 
    return app.activeScript.parent.fsName; 
  } catch(e) { 
    return File(e.fileName); 
  }
}



/* 
******************************
* funzioni per l'elaborazione dei preset
******************************
*/


function getPresetsName(){
	var presetArray = readPresets();
	//createPresetsFile();
	var nomi = new Array();
	var elenco = new Array();
	for(key in presetArray){
		var elencoKey = String(presetArray[key]);
		elenco = elencoKey.split(sep);
		nomi[key]= elenco[0];
	}
	
	return nomi;
}


function createPresetsFile(){
	if(!presetsFilePath.exists){		
		presetsFilePath.open('w');
		presetsFilePath.encoding = "UTF-8";
		presetsFilePath.write(elaboratePreset(defaultPreset)  + smartmixPreset);
		presetsFilePath.close();
	}
}

function addPreset(arrayPreset){
	createPresetsFile();
	presetsFilePath.open('a');
	presetsFilePath.encoding = "UTF-8";
	presetsFilePath.write('\n' + elaboratePreset(arrayPreset));
	presetsFilePath.close();
}

function readPresets(){
	createPresetsFile();
	presetsFilePath.open('r');
	var arrayRighe = new Array;
	arrayRighe = presetsFilePath.read().split('\n');
	return arrayRighe;
}


function elaboratePreset(inputString){	
	if (typeof inputString == 'string'){
		return inputString.split(sep);
	}else{
		return inputString.join(sep);
	}
}



