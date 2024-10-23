const counter = document.getElementById("counter")
const obenInput = document.getElementById("obenIn")
const obenOut = document.getElementById("obenOut")
const obenOut2 = document.getElementById("obenOut2")
const obenOut3 = document.getElementById("obenOut3")
const replaceInput = document.getElementById("replaceInput")
const deobOption = document.getElementById("deobOption")

const textIn = document.getElementById("textIn")
const textOut1 = document.getElementById("textOut1")
const textOut2 = document.getElementById("textOut2")
const textOut3 = document.getElementById("textOut3")


document.addEventListener("DOMContentLoaded", function() {
    console.log("test")
    replaceInput.value = "ob"
    obenInput.value = "example input"
    updateOutput()
  });


obenInput.addEventListener("input", function () {
    updateOutput()

    //makes output expand with text being added
    scroll = Math.max(obenInput.scrollHeight, 150)
    scrollIn = scroll + "px";
    obenInput.style.height = scrollIn;
})

replaceInput.addEventListener("input", function () {
    updateOutput()
})

deobOption.addEventListener("input", function () {
    updateOutput()

    if(deobOption.checked == true){
        textIn.textContent = "Obenglobish In"
        textOut1.textContent = "Obenglobish^-1 Output"
        textOut2.textContent = "Obenglobish^-2 Output"
        textOut3.textContent = "Obenglobish^-3 Output"
    } else {
        textIn.textContent = "English In"
        textOut1.textContent = "Obenglobish Output"
        textOut2.textContent = "Obenglobish^2 Output"
        textOut3.textContent = "Obenglobish^3 Output"
    }
})


function updateOutput(){
    const input = obenInput.value
    
    if(deobOption.checked == false){
        var oben1 = obIfy(input)
        obenOut.textContent = oben1

        var oben2 = obIfy(oben1)
        obenOut2.textContent = oben2

        var oben3 = obIfy(oben2)
        obenOut3.textContent = oben3

    } else {
        var oben1 = deObify(input)
        obenOut.textContent = oben1

        var oben2 = deObify(oben1)
        obenOut2.textContent = oben2

        var oben3 = deObify(oben2)
        obenOut3.textContent = oben3
    }
}

//deobifys a input
function deObify(input){
    let ob = replaceInput.value
    let output = ""
    let i = 0
    while(i < input.length){
        if(isObAtI(input, i, ob) == true){
            output = output.concat(input[i + ob.length])
            i = i + ob.length + 1
        } else {
            output = output.concat(input[i])
            i = i + 1
        }
    }

    return output
}

//checks if a ob is at i to de-obify
function isObAtI(string, iter, ob){

    if(string.length <= (iter + ob.length)){
        return false
    }
    
    for(i = 0; i < ob.length; i++){
        if(ob[i] != string[i + iter]){
            return false
        } 
    }

    afterOb = string[ob.length + iter]

    if((afterOb == "y" || afterOb == "Y")){
        
        if(string.length == iter + ob.length + 1){
            return true
        }

        return isSpaceLike(string[ob.length + iter + 1])
    }

    if ( !isVowel(afterOb)){
        return false
    }

    return true
}

// checks if the current index is worthy of a ob
//      returns true if it is
//      return false if not
function checkAddObAtI(input, i){
    letter = input.charAt(i);
    isCurrVowel = isVowel(letter);
    isEndOfWord = false;

    //checks if letter is end of word
    if(i == input.length - 1){
        isEndOfWord = true;
    } else {
        nextLetter = input.charAt(i + 1);
        isEndOfWord = isSpaceLike(nextLetter);
    }

    //if previous is vowel never ob
    if(i != 0){
        prevChar = input.charAt(i - 1)
        if(isVowel(prevChar) == true){
            return false;
        }
    }

    //takes care of "e"
    if((letter == "e" || letter == "E") && isEndOfWord == true){
        //dont if another vowel is in the word
        if (backtraceContainsVowel(input, i - 1)){
            return false;
        } else {
            return true;
        }   
    }

    //takes care of "y" cases
    if((letter == "y" || letter == "Y")){
        
        //ob if y at endd
        if (isEndOfWord == true){
            return true;
        }

        //obs if y inbetween 2 consonant
        if(i != 0 && (i != input.length - 1)){
            prevChar = input.charAt(i - 1);
            nextChar = input.charAt(i + 1);

            if((isVowel(prevChar) || isVowel(nextChar) || isSpaceLike(prevChar) || isSpaceLike(nextChar))){
                return false;
            }     
            
            return true;
        }
        
        //all special case of y covered dont ob
        return false;
    }

    //takes care of other vowels
    if (isCurrVowel == true){
        return true;
    } 
    
    //next is a consonant
    return false;
}

//moves backwards from word end to see if it has a vowel
function backtraceContainsVowel(string, iter){

    for(i = iter; i > -1; i--){
        letterOn = string.charAt(i);

        if(isVowel(letterOn)){
            return true;
        }

        if(isSpaceLike(letterOn)){
            return false;
        }
    }

    return false;
}

//takes a word a obifys it
//returns the word
function obIfy(input) {
    let ob = replaceInput.value;
    let output = "";

    //loops through all letters of a input
    //  if ob worthy adds a ob there
    for(let i = 0; i < input.length; i++){
        letter = input.charAt(i);

        if(checkAddObAtI(input, i) == true){
            output = output.concat(ob, letter);
        } else {
            output = output.concat(letter);
        }
    }

    return output
}

const vowels = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
function isVowel(char){
    return vowels.has(char)
}

const spaceLike = new Set([10 , 32]) // new line 10, space 32, 
function isSpaceLike(letter){
    code = letter.charCodeAt(0)
    return spaceLike.has(code)
}