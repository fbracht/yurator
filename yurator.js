
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var tipoTemaEnum = {
		SIMPLES: 0,
		ART: 1,
		POS: 2,
		ART_POS: 3,
		SUB: 4
	};

function Yuri() {

	this.temasNeutros = [
		Array("o ", "seu ", "transsexualismo", "transsexual"),
		Array("o ", "seu ", "feminismo", "feminista"),
		Array("a ", "sua ", "felicidade", "feliz"),
		Array("a ", "sua ", "vulnerabilidade", "vulnerável")
	];

	this.temas = [
		Array("a ", "sua ", "homofobia", "homofóbico"),
		Array("a ", "sua ", "misoginia", "misógino"),
		Array("a ", "sua ", "xenofobia", "xenofóbico"),
		Array("o ", "seu ", "transsexualismo", "transsexual"),
		Array("o ", "seu ", "feminismo", "feminista"),
		Array("a ", "sua ", "felicidade", "feliz"),
		Array("a ", "sua ", "vulnerabilidade", "vulnerável"),
		Array("o ", "seu ", "machismo", "machista"),
		Array("o ", "seu ", "egoísmo", "egoísta"),
		Array("o ", "seu ", "altruísmo", "altruísta"),
		Array("a ", "sua ", "liberdade", "livre"),
		Array("o ", "seu ", "preconceito", "preconceituoso")
	];

	this.temasPositivos = [
		Array("o ", "seu ", "altruísmo", "altruísta"),
		Array("a ", "sua ", "liberdade", "livre"),
		Array("o ", "seu ", "feminismo", "feminista"),
		Array("a ", "sua ", "\"interessantisse\"", "interessante"),
		Array("a ", "sua ", "felicidade", "feliz"),
		Array("a ", "sua ", "vulnerabilidade", "vulnerável")
	];

	this.temasNegativos = [
		Array("o ", "seu ", "egoísmo", "egoísta"),
		Array("a ", "sua ", "homofobia", "homofóbico"),
		Array("a ", "sua ", "misoginia", "misógino"),
		Array("a ", "sua ", "xenofobia", "xenofóbico"),
		Array("o ", "seu ", "machismo", "machista"),
		Array("o ", "seu ", "preconceito", "preconceituoso")
	];

	this.temasPolemicos = [
		Array("a ", "sua ", "liberdade", "livre"),
		Array("o ", "seu ", "altruísmo", "altruísta"),
		Array("o ", "seu ", "transexualismo", "transsexual"),
		Array("a ", "sua ", "vulnerabilidade", "vulnerável"),
		Array("a ", "sua ", "felicidade", "feliz", "machista")
	];

	this.frasesProntas = [
		"Fifa 16 tem times femininos. Fuck Yeah!",
		"Acho que vou doar meu rim.",
		"Se você falar pra alguém te estuprar ainda é estupro?",
		"O que acontece se voce tocar a Song of Time dentro da Lua?",
		"Tô pensando se tento virar modelo de barba.",
		"Pão de queijo não se compara. Pão de queijo se come.",
		"Alguém topa um café?",
		"Ser cuzão privilegiado ou hipócrita privilegiado?"
		];

	this.frases = [
		Array("@1 @2 > @3 @4?",
			Array(this.temasNegativos, tipoTemaEnum.SIMPLES,
				  this.temasPositivos, tipoTemaEnum.SUB,
				  this.temasPositivos, tipoTemaEnum.SIMPLES,
				  this.temasNegativos, tipoTemaEnum.SUB)),
		Array("O que é pior, ser @1 ou ser @2?",
			Array(this.temasNegativos, tipoTemaEnum.SUB,
				  this.temasNegativos, tipoTemaEnum.SUB)),
		Array("O que vocês prefeririam, ser @1 ou ser @2?",
			Array(this.temas, tipoTemaEnum.SUB,
				  this.temas, tipoTemaEnum.SUB)),
		Array("Gente, vocês preferem uma vida @1 ou uma vida @2?",
			Array(this.temasPositivos, tipoTemaEnum.SUB,
				  this.temasPositivos, tipoTemaEnum.SUB)),
		Array("Você trocaria @1 por @2?",
			Array(this.temasPositivos, tipoTemaEnum.POS,
				  this.temasPositivos, tipoTemaEnum.POS)),
	    Array("Qual vocês preferem? A: @1. B: @2.",
	    	Array(this.temasNeutros, tipoTemaEnum.POS,
				  this.temasNeutros, tipoTemaEnum.POS)),
	    Array("Você abriria mão de @1 para acabar com @2?",
	    	Array(this.temasPositivos, tipoTemaEnum.POS,
				  this.temasNegativos, tipoTemaEnum.ART)),
	    Array("@1 é uma questão polêmica.",
	    	Array(this.temasPolemicos, tipoTemaEnum.SIMPLES))
  	];
}

Yuri.prototype.getRandomElement = function (vec) {
	return vec[Math.floor(Math.random()*vec.length)];
}

Yuri.prototype.getTema = function(tipo, tema) {
	
	switch(tipo) {
		case tipoTemaEnum.ART:
		return tema[0] + tema[2];
		
		case tipoTemaEnum.ART_POS:
		return tema[0] + tema[1] + tema[2];
		
		case tipoTemaEnum.POS:
		return tema[1] + tema[2];
		
		case tipoTemaEnum.SIMPLES:
		return tema[2];
		
		case tipoTemaEnum.SUB:
		return tema[3];
	}
}

Yuri.prototype.yurar = function() {
	var tema;
	var i;
	var j;
	var frase;
	var fraseEDados;
	var dadosSubstituir; 
	
	if (Math.random() < .15) {
		frase = this.getRandomElement(this.frasesProntas);
	}
	else {
		fraseEDados = this.getRandomElement(this.frases);
	
		frase = fraseEDados[0];
		dadosSubstituir = fraseEDados[1];
	
		for(i = 0, j = 1; i < dadosSubstituir.length; i = i + 2, j++) {
			tema = this.getRandomElement(dadosSubstituir[i]);
	
			frase = frase.replace("@" + j, this.getTema(dadosSubstituir[i+1], tema))
		}	
	}
	
	frase = frase.capitalizeFirstLetter();

	return frase;
}
