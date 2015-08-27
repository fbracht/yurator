
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
		Array("a ", "sua ", "vulnerabilidade", "vulner&aacutevel")
	];

	this.temas = [
		Array("a ", "sua ", "homofobia", "homof&oacutebico"),
		Array("a ", "sua ", "misoginia", "mis&oacutegino"),
		Array("a ", "sua ", "xenofobia", "xenof&oacutebico"),
		Array("o ", "seu ", "transsexualismo", "transsexual"),
		Array("o ", "seu ", "feminismo", "feminista"),
		Array("a ", "sua ", "felicidade", "feliz"),
		Array("a ", "sua ", "vulnerabilidade", "vulner&aacutevel"),
		Array("o ", "seu ", "machismo", "machista"),
		Array("o ", "seu ", "ego&iacutesmo", "ego&iacutesta"),
		Array("o ", "seu ", "altru&iacutesmo", "altru&iacutesta"),
		Array("a ", "sua ", "liberdade", "livre"),
		Array("o ", "seu ", "preconceito", "preconceituoso")
	];

	this.temasPositivos = [
		Array("o ", "seu ", "altru&iacutesmo", "altru&iacutesta"),
		Array("a ", "sua ", "liberdade", "livre"),
		Array("o ", "seu ", "feminismo", "feminista"),
		Array("a ", "sua ", "\"interessantisse\"", "interessante"),
		Array("a ", "sua ", "felicidade", "feliz"),
		Array("a ", "sua ", "vulnerabilidade", "vulner&aacutevel")
	];

	this.temasNegativos = [
		Array("o ", "seu ", "ego&iacutesmo", "ego&iacutesta"),
		Array("a ", "sua ", "homofobia", "homof&oacutebico"),
		Array("a ", "sua ", "misoginia", "mis&oacutegino"),
		Array("a ", "sua ", "xenofobia", "xenof&oacutebico"),
		Array("o ", "seu ", "machismo", "machista"),
		Array("o ", "seu ", "preconceito", "preconceituoso")
	];

	this.temasPolemicos = [
		Array("a ", "sua ", "liberdade", "livre"),
		Array("o ", "seu ", "altru&iacutesmo", "altru&iacutesta"),
		Array("o ", "seu ", "transexualismo", "transsexual"),
		Array("a ", "sua ", "felicidade", "feliz", "machista")
	];

	this.frases = [
		Array("@1 @2 > @3 @4?",
			Array(this.temasNegativos, tipoTemaEnum.SIMPLES,
				  this.temasPositivos, tipoTemaEnum.SUB,
				  this.temasPositivos, tipoTemaEnum.SIMPLES,
				  this.temasNegativos, tipoTemaEnum.SUB)),
		Array("O que &eacute pior, ser @1 ou ser @2?",
			Array(this.temasNegativos, tipoTemaEnum.SUB,
				  this.temasNegativos, tipoTemaEnum.SUB)),
		Array("O que voc&ecircs prefeririam, ser @1 ou ser @2?",
			Array(this.temas, tipoTemaEnum.SUB,
				  this.temas, tipoTemaEnum.SUB)),
		Array("Gente, voc&ecircs preferem uma vida @1 ou uma vida @2?",
			Array(this.temasPositivos, tipoTemaEnum.SUB,
				  this.temasPositivos, tipoTemaEnum.SUB)),
		Array("Voc&ecirc trocaria @1 por @2?",
			Array(this.temasPositivos, tipoTemaEnum.POS,
				  this.temasPositivos, tipoTemaEnum.POS)),
	    Array("Qual voc&ecircs preferem? A: @1. B: @2.",
	    	Array(this.temasNeutros, tipoTemaEnum.POS,
				  this.temasNeutros, tipoTemaEnum.POS)),
	    Array("Voc&ecirc abriria m&atildeo de @1 para acabar com @2?",
	    	Array(this.temasPositivos, tipoTemaEnum.POS,
				  this.temasNegativos, tipoTemaEnum.ART)),
	    Array("@1 &eacute uma quest&atildeo pol&ecircmica, n&eacute?",
	    	Array(this.temasPolemicos, tipoTemaEnum.SIMPLES))
  	];
}

Yuri.prototype.getRandomElement = function (vec) {
	return vec[Math.floor(Math.random()*vec.length)];
}

Yuri.prototype.getTema = function(tipo, tema) {
	if (tipo == tipoTemaEnum.ART)
		return tema[0] + tema[2];

	else if (tipo == tipoTemaEnum.ART_POS)
		return tema[0] + tema[1] + tema[2];

	else if (tipo == tipoTemaEnum.POS)
		return tema[1] + tema[2];

	else if (tipo == tipoTemaEnum.SIMPLES)
		return tema[2];

	else if (tipo == tipoTemaEnum.SUB)
		return tema[3];
}

Yuri.prototype.yurar = function() {
	var tema;
	var i;
	var j;
	var fraseEDados = this.getRandomElement(this.frases);

	var frase = fraseEDados[0];
	var dadosSubstituir = fraseEDados[1];

	for(i = 0, j = 1; i < dadosSubstituir.length; i = i + 2, j++) {
		tema = this.getRandomElement(dadosSubstituir[i]);

		frase = frase.replace("@" + j, this.getTema(dadosSubstituir[i+1], tema))
	}

	frase = frase.capitalizeFirstLetter();

	return frase;
}
