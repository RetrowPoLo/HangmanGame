$(document ).ready(function() {


    // Hide some element of the page such has :
    // - win and loose text
    // - replay button
    $('#win').hide()
    $('#loose').hide()
    $('#replay-btn').hide()
    $('#replay-btn').on('click', function() {
        location.reload();
    });


    // Initial state of the image
    $('#hangman').html('<img src="./Assets/Img/HangmanImg/Hangman0.png" alt="...">')


    // Check the letter when a letter button is clicked :
    // - if its true the button is disabled and change color for green
    // - if its false the button is also disabled and change color for red this time
    $('button').on('click', function () {
        CheckLetter( ($(this).html()) )
        if ( goodLetter == true ) {
            $(this).addClass('btn-success disabled').removeClass('btn-outline-dark')
        } else {
            $(this).addClass('btn-danger disabled').removeClass('btn-outline-dark')
        }
    })


    // Dictionnary of word to choose from and play
    const dictionnary = ["aigle", "objet", "lapin", "lit", "eau", "lezard", "maire", "mur", "camion", "porte", "algorithme", "noeud", "france", "fil", "pendu", "jeu", "tringle", "urne", "physique", "jupe", "mains", "cuir", "flux", "spirale", "nid", "framboise", "frelon", "habitude", "voiture", "chaux", "brique", "agent", "vol"];
    let mysteryWord = ""
    let goodLetter
    let userError = 0
    let userErrorVerif = false


    // That line is to compare if the value in the array a are the same in array b 
    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);


    // Function to take a random word in the dictionnary of word
    function randomIntFromInterval(min, max) { // min and max included   
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    // Mystery word take a word in the dico then make it in the array "letters" that slice the word into letters
    mysteryWord = dictionnary[randomIntFromInterval(0, dictionnary.length - 1)]
    let letters = mysteryWord.split("")


    // Create a copy of letters array named copyLetters and create a var for the index of a certain letter, 
    let copyLetters = letters.slice()
    let posLetters

    // Create an array with the same amout of element in the letters array but the element are empty ("") -> letters = ["l","i","t"]  copyLetters = ["","",""]
    for (let i = 0; i < copyLetters.length; i++) {
        copyLetters[i] = [" "]
    }

    // Hide the mystery word in the html right div and show the number of letters in this word
    $('#mystery-word').html( letters )
    $('#mystery-word').hide()
    $('#letter').prepend( mysteryWord.length )


    // Function that check if the letter button pressed is in the mystery word or not
    function CheckLetter (letter) {

        // for each element in the array letters ...
        letters.every(element => {

            // Make sure all of the letter are in lower case
            if ( element === ( letter.toLowerCase() ) ) {

                // Collect the index of the right letter
                posLetters = letters.indexOf(element)
                // Then add it to the copy of the array letters to check after if its the same or not
                copyLetters.splice(posLetters,1, letters[posLetters])
                // Then display the letter that has been found in the right place
                $('#letters').html("")
                $('#letters').append(copyLetters.join(""))
                goodLetter = true
                userErrorVerif = false
                return

            } else {

                goodLetter = false
                userErrorVerif = true
                return true

            }
        });
        
        // If the player didn't find a letter this turn ...
        if ( userErrorVerif === true) {

            userError = userError + 1

            // According to the error that the user as done, it change the state of the hangman ( draw new line in the real game )
            if (userError === 1) {
                $('#hangman').html('<img src="./Assets/Img/HangmanImg/Hangman1.png" alt="...">')
            }

            if (userError === 2) {
                $('#hangman').html('<img src="./Assets/Img/HangmanImg/Hangman2.png" alt="...">')
            }

            if (userError === 3) {
                $('#hangman').html('<img src="./Assets/Img/HangmanImg/Hangman3.png" alt="...">')
            }

            if (userError === 4) {
                $('#hangman').html('<img src="./Assets/Img/HangmanImg/Hangman4.png" alt="...">')
            }

            if (userError === 5) {
                $('#hangman').html('<img src="./Assets/Img/HangmanImg/Hangman5.png" alt="...">')
            }

            if (userError === 6) {
                $('#hangman').html('<img src="./Assets/Img/HangmanImg/Hangman6.png" alt="...">')
            }

            if (userError === 7) {
                // Show the last state of the image wich is when the player lost
                // Then display the loose text, disable all of the letter button and show the replay button
                $('#hangman').html('<img src="./Assets/Img/HangmanImg/Hangman7.png" alt="...">')
                $('button').addClass('disabled')
                $('#loose').append( mysteryWord )
                $('#loose').show()
                $('#replay-btn').removeClass('disabled')
                $('#replay-btn').show()
            }
        }

        // Verify win comparing the array letters wich is the original word and the copy of letters wich is empty at the begining and gradually filling up
        if ( equals(letters, copyLetters) === true ) {
            // Show the win text, disable all of the letter button and show the replay button
            $('#win').show()
            $('button').addClass('disabled')
            $('#replay-btn').removeClass('disabled')
            $('#replay-btn').show()
        }

    }

});