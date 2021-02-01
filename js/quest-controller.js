'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);
$('.play-again').on('click', onRestartGame);

function init() {
    console.log('Started...');
    // $('.quest').hide();
    createQuestsTree();
}

function onStartGuessing() {
    // TODO: hide the game-start section
    $('.game-start').hide();
    renderQuest();
    // TODO: show the quest section
    $('.quest').show();
}

function renderQuest() {
    // TODO: select the <h2> inside quest and update
    // its text by the currQuest text
    var quest = getCurrQuest();
    $('.quest h2').text(quest.txt);
}

function onUserResponse(ev) {
    var res = ev.data.ans;
    // If this node has no children
    if (isChildless(getCurrQuest())) {
        if (res === 'yes') {
            // TODO: improve UX
            $('.quest').hide();
            $('.win').show();

        } else {
            // TODO: hide and show new-quest section
            $('.quest').hide();
            $('.new-quest').show();

        }
    } else {
        // TODO: update the lastRes global var
        gLastRes = res;
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess(ev) {
    ev.preventDefault();
    var newGuess = $('#newGuess').val();
    var newQuest = $('#newQuest').val();
    // TODO: Get the inputs' values
    // TODO: Call the service addGuess
    addGuess(newQuest, newGuess, gLastRes);
    onRestartGame();
}

function onRestartGame() {
    $('.win').hide();
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;
}