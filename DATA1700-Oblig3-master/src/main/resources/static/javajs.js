
function Billett(film, antall, fornavn, etternavn, telefonnr, epost) {
    this.film = film;
    this.antall = antall;
    this.fornavn = fornavn;
    this.etternavn = etternavn;
    this.telefonnr = telefonnr;
    this.epost = epost;
}

function inputValideringFilm() {
    let film = document.getElementById("filmValg").value;
    let ut = document.getElementById("feilFilm");

    if (film == "Velg film:") {
        ut.innerHTML = "Film må velges!";
        return null;
    }
    else {
        ut.innerHTML = "";
        return film;
    }
}

function inputValideringAntall() {
    let antall = document.getElementById("antall").value;
    let ut = document.getElementById("feilAntall");

    if (antall == "") {
        ut.innerHTML = "Antall må velges!";
        return null;
    }
    else if (isNaN(antall)) {
        ut.innerHTML = "Antall må være et heltall!";
        return null;
    }

    antall = parseFloat(antall);
    if (antall < 1) {
        ut.innerHTML = "Antall må være høyere enn null!";
        return null;
    }

    else if (!(antall % 1 == 0)) {
        ut.innerHTML = "Antall må være et heltall!";
        return null;
    }

    else {
        ut.innerHTML = "";
        return antall;
    }
}

function inputValideringBlank(obj, objFeil, feilmelding) {
    let verdi = document.getElementById(obj).value;
    let ut = document.getElementById(objFeil);

    if (verdi.trim() == "") {
        ut.innerHTML = "Må skrive noe inn i " + feilmelding;
        return null;
    }
    else {
        ut.innerHTML = "";
        return verdi;
    }
}

function nullstill() {
    document.getElementById("filmValg").value = "Velg film:";
    document.getElementById("antall").value = "";
    document.getElementById("fornavn").value = "";
    document.getElementById("etternavn").value = "";
    document.getElementById("telefonnr").value = "";
    document.getElementById("epost").value = "";
    $("#divFeil").html("");
}

function opprettBillett() {
    let film = inputValideringFilm();
    let antall = inputValideringAntall();
    let fornavn = inputValideringBlank("fornavn", "feilFornavn", "fornavnet!" );
    let etternavn = inputValideringBlank("etternavn", "feilEtternavn", "etternavnet!");
    let telefonnr = inputValideringBlank("telefonnr", "feilTelefonnr", "telefonnr!");
    let epost = inputValideringBlank("epost", "feilEpost", "epost!");

    if (film != null && antall != null && fornavn != null && etternavn != null && telefonnr != null && epost != null) {
        let billett = new Billett(film, antall, fornavn, etternavn, telefonnr, epost);
        $.post("/leggTilBillett", billett, function() {
            nullstill();
            $.post("/hentAlleBilletter", function(billettArray) {
                visTabell(billettArray);
            })
            .fail(function (jqXHR) {
                const json = $.parseJSON(jqXHR.responseText);
                $('#divFeil').html(json.message);
            });
        })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $('#divFeil').html(json.message);
        });
    }
}

function visTabell(billettArray) {

    let ut = "<table class='table table-light table-striped table-hover'><tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th></tr>";
    const billettTabellDivsort = billettArray.sort(compare);
    for (billett of billettTabellDivsort) {
        ut += "<tr>";
        ut += "<td>" + billett.film + "</td>";
        ut += "<td>" + billett.antall + "</td>";
        ut += "<td>" + billett.fornavn + "</td>";
        ut += "<td>" + billett.etternavn + "</td>";
        ut += "<td>" + billett.telefonnr + "</td>";
        ut += "<td>" + billett.epost + "</td>";
        ut += "</tr>";
    }

    ut += "</table>";

    document.getElementById("billettTabellDiv").innerHTML = ut;
}

function compare(a, b) {
    if ( a.etternavn < b.etternavn ){
        return -1;
    }
    if ( a.etternavn > b.etternavn ){
        return 1;
    }
    return 0;
}


function slettBillettene() {
    $.post("/slettAlleBilletter", function() {
        document.getElementById('billettTabellDiv').innerHTML = "";
        nullstill();
    })
    .fail(function (jqXHR) {
        const json = $.parseJSON(jqXHR.responseText);
        $('#divFeil').html(json.message);
    });
}