// store all cards
const my_cards = {}
var card_counter = 0

// // - store q
// // - store a
// // - save card
var my_card = []
// function get_q() {
//     var q_card = document.getElementById('Qin')
//     console.log("Unchecked input: " + q_card.value)  // for me
//     if (q_card.value.length != 0) {
//         var inputQ = q_card.value
//         console.log("Checked input: " + inputQ)  // for me
//         my_card.push(inputQ)
//     // check if input is still empty
//     } else {
//         alert('You forgot to put the question? In the question box?')
//     }
// }


function get_qa() {
    var q_card = document.getElementById('Qin')
    var a_card = document.getElementById('Ain')
    console.log("Unchecked input: " + q_card.value)  // for me
    console.log("Unchecked input: " + a_card.value)  // for me
    if (q_card.value.length != 0) {
        var inputQ = q_card.value
        console.log("Checked input: " + inputQ)  // for me
        my_card.push(inputQ)
    // check if input is still empty
    } else {
        alert('You forgot to put the question? In the question box?')
    }
    if (a_card.value.length != 0) {
        var inputA = a_card.value
        console.log("Checked input: " + inputA)  // for me

        // add my_card to my_cards
        // clear fields
        if (my_card.length == 1) {
            my_card.push(inputA)
            console.log(my_card)  // for me
            card_counter += 1
            my_cards[card_counter] = my_card
            make_card(my_card[0], my_card[1], card_counter)
            my_card = []
            document.getElementById('Qin').value = ''
            document.getElementById('Ain').value = ''
            console.log("My cards = " + JSON.stringify(my_cards))
        } else {
            alert('You forgot to put the question? In the question box?')
        }

    // check if input is still empty
    } else {
        alert('You forgot to put the answer. In the answer box.')
    }
}

// - create card in html
function make_card(card_q, card_a, count) {
    var vis_q = document.createElement('div');
    var vis_a = document.createElement('div');
    vis_q.className = 'cardQ'
    vis_a.className = 'cardA'
    vis_q.id = 'Q' + count
    vis_a.id = 'A' + count
    document.body.appendChild(vis_q);
    document.body.appendChild(vis_a);
    vis_q.innerHTML = card_q
    vis_a.innerHTML = card_a
}

// delete most recent card
function del_a_card() {
    if (card_counter > 0) {
        delete my_cards[card_counter]
        var my_q = document.getElementById('Q'+card_counter)
        document.body.removeChild(my_q)
        var my_a = document.getElementById('A'+card_counter)
        document.body.removeChild(my_a)
        card_counter -= 1
        console.log("My cards = " + JSON.stringify(my_cards))
    } else {
        alert("No cards to delete.")
    }
}

// send all cards
function send_cards(my_cards) {
    fetch("http://localhost: ", {
        method: "POST", 
        body: JSON.stringify(my_cards)
      })
      .then(res => {
        console.log("Request complete! response:", res);
      });
}