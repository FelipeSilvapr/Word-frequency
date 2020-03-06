counts = document.getElementById('counts');
textInput = document.getElementById('inputText');

counts.addEventListener('click', frequency, false);

function frequency() {
    var text = textInput.value;
    var words = treatString(text); 
    console.log(words);
    makeTable(words);   
}

function treatString(string){
    var wordsFiltered = string.replace(/[()",.]/g,"");    
    console.log(wordsFiltered);
    var arrayOfWords = wordsFiltered.split(" ");    
    console.log(arrayOfWords);
    var countedWords = counted(arrayOfWords);
    var orderedWords = unique(countedWords);
    putInOrder(orderedWords);
    return orderedWords;
}

function putInOrder(array) {
    array.sort(function (a, b) {
        // Understand that later
        // Organize in order of times and if needed alphabetically
        if (a.times === b.times) {
            return (a.word < b.word) ? -1 : (a.word > b.word) ? 1 : 0;
        } else {
            return (a.times > b.times) ? -1 : 1;
        }
        //return b.times - a.times || a.word - b.word;
    });
}

function counted(words) {
    var wordsArr = words.map(lowerCase);

    function lowerCase(elem) {
        return elem.toLowerCase();
    }

    var counted = [];
    var time;
    var wd;
    for (let i = 0; i < wordsArr.length; i++) {
        time = 0;
        wd = wordsArr[i];
        for (let j = 0; j < wordsArr.length; j++) {
            if (wordsArr[i] === wordsArr[j]) {
                time++;
            }
        }
        counted.push({ word: wd, times: time });
    }
    return counted;
}

function unique(array) {
    var multipleWords = [];
    var n;
    for (let i = 0; i < array.length; i++) {
        n = 0;
        for (let j = 0; j < multipleWords.length; j++) {
            if (array[i].word === multipleWords[j].word) {
                n++;
            }
        }
        if (n === 0) {
            multipleWords.push(array[i]);
        }
    }
    return multipleWords;

}

function makeTable(array){
        
    var container = document.getElementById('tableWords');
    container.innerHTML = null;

    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');

    for(let i = 0; i < array.length; i++){

        var row = document.createElement('tr');

        var rank = document.createElement('td');
        var name = document.createElement('td');
        var freq = document.createElement('td');

        var rankText = document.createTextNode(i + 1);
        var nameText = document.createTextNode(array[i].word);
        var freqText = document.createTextNode(array[i].times);

        rank.append(rankText);
        name.append(nameText);
        freq.append(freqText);

        row.append(rank);
        row.append(name);
        row.append(freq);

        tableBody.append(row);

    }

    table.append(tableBody);
    table.setAttribute('border', '2');
    container.append(table);
}