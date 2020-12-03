$(document).ready(function() {


    let startGame = $("#startGame");

    let qrcode = $("#qrcode");
    let pageAcceuil = $("#pageAcceuil");
    let containerPageJeu = $("#containerPageJeu");


    let interval = 1500;

    let sec = 00;
    let min = 00;
    let hour = 00;

    let verifTimer = false;

    var headArray = ["<img class='imgHead' src='assets/img/Anousone-Mounivongs-400.png' alt='tête Anousone'>", "<img class='imgHead' src='assets/img/frederik-noel-formateur-la-manu-formation.png' alt='tête_Fred'>", "<img class='imgHead' src='assets/img/Nicolas-Vallois-400.png' alt='tête Nicolas'>"];

    let soundA = document.getElementById("soundA");
    let soundB = document.getElementById("soundB");


    var score = 0;
    var vie = 5;
    var difficulty = 0;

    let headOnScreenCount = 0;
    let headMax = 9;




    // ------------ Fonctions -----------------




    // Lancement du jeu au clic du qrcode
    qrcode.click(function() {
        pageAcceuil.addClass("d-none");
        containerPageJeu.addClass("d-block");
    })


    // Lancement du timer au clic du bouton jouer
    startGame.click(function() {
        verifTimer = true;
        activateClock();
        $("#startGame").attr("disabled", "disabled");
    })


    function activateClock() {
        if (verifTimer) {
            addHead();
            setInterval(clock, 1000);
        } else {
            setInterval(clock, 0);
        }
    }

    // Calcule du timer
    function clock() {
        sec += 1;
        if (sec == 60) {
            min += 1;
            sec = 00;
            if (min == 60) {
                min = 00;
                hour += 1;
            }
        }
        document.getElementById("timerJeu").innerHTML = hour + ":" + min + ":" + sec;
    }



    function addHead() {

        var tabSlotImage = $(".imgTable");

        var randomPosition = Math.floor(Math.random() * tabSlotImage.length);
        var randomHead = Math.floor(Math.random() * headArray.length);

        console.log("randomPosition : " + randomPosition);

        // On récupère le slot de la position random
        var slotViser = tabSlotImage[randomPosition];


        // Si il est vide
        if ($(slotViser).text("")) {
            // On ajoute l'image dans le html
            $(slotViser).append(headArray[randomHead]);
            // $(".imgHead").fadeIn(400);

            // si on clique sur une tête, le score augmente.
            $(slotViser).children().click(function() {
                let randomSound = Math.floor(Math.random() * 2);
                score++;
                $("#score").text(score);

                if (randomSound == 1) {
                    soundA.play();
                } else {
                    soundB.play();
                }


                if (difficulty < 3) {
                    score += 10;
                } else if (difficulty <= 6) {
                    score += 20;
                    interval = 1000;
                } else if (difficulty <= 10) {
                    score += 60;
                    interval = 800;
                } else if (difficulty <= 20) {
                    score += 100;
                    interval = 600;
                } else {
                    interval = 500;
                }

                if (score > 1000) {
                    interval = 400;
                }

                difficulty++;

                // On retire la tête quand elle est cliquée.
                $(slotViser).empty();
            })

            // On la supprime au bout d'un certain temps
            setTimeout(function() {
                deleteHead(slotViser)
            }, interval);
        } else {
            if (verifTimer) {
                addHead();
            }
        }
    }


    function deleteHead(slotImage) {

        if ($(slotImage).is(':empty')) {

            // si c'est déjà vide on fait rien.

        } else {
            // $(slotImage).children().fadeOut(200);
            $(slotImage).empty();
            vie--;

            if (vie == 0) {
                verifTimer = false;
                $("#startGame").text("Rejouer");
            }
            console.log(vie);
        }

        if (verifTimer) {
            addHead();
        }
    }

});