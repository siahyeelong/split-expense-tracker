import { People } from "./People.js"
import { transactions } from "./test_data.js";

function print2DArray(data) {
    const keys = Object.keys(data); // Get all keys (person1, person2, etc.)

    // Print header row
    console.log("     " + keys.map(key => key.padEnd(8)).join(" "));

    // Print each row
    keys.forEach(rowKey => {
        const row = data[rowKey];
        const rowData = keys.map(colKey => String(row[colKey] || 0).padEnd(8)).join(" "); // Use 0 if key doesn't exist
        console.log(rowKey.padEnd(10) + rowData);
    });
}

function generate_matrix(peopleData, transactions) {
    // This function initialises the 2D matrix with respect to all participants in this group
    const people = peopleData.getAllPeople()
    const debt_matrix = [] // a 2D array containing the amount. debt_matrix[x][y] = a --> x owes y $a

    // initialise debt matrix
    people.forEach(px => {
        debt_matrix[px.personKey] = []
        people.forEach(py => {
            debt_matrix[px.personKey][py.personKey] = 0
        })
    })
    const debt_matrix_reduced = structuredClone(debt_matrix)
    const debt_matrix_simplified = structuredClone(debt_matrix)

    // for each recipient, log how much they owe the payer according to an even-split
    transactions.forEach(transaction => {
        const payer = transaction.payer
        const recipients = transaction.recipients
        const amount = transaction.price / recipients.length

        recipients.forEach(recipient => {
            if (recipient !== payer)
                debt_matrix[recipient][payer] = amount
        })
    })

    // generate the reduced debt matrix 'debt_matrix_reduced'. if A owes B $5, but B owes A $2, then A only owes B $3
    Object.keys(debt_matrix).forEach(px => {
        Object.keys(debt_matrix[px]).forEach(py => {
            if (px !== py) {
                // (I owe you) - (you owe me)
                debt_matrix_reduced[px][py] = debt_matrix[px][py] - debt_matrix[py][px]
                // if I owe you -ve, then I owe you $0
                if (debt_matrix_reduced[px][py] < 0) debt_matrix_reduced[px][py] = 0
            }
        })
    })

    // generate the simplified debt matrix 'debt_matrix_simplified'. 
    // for a group where there will be owers and there will be owed, generate the minimum transactions such that everybody's 
    // transaction is accounted for. owers will pay what they owe, and the owed will receive what they are owed.
    const total_give = [] // total that each person owes 
    const total_receive = [] // total that each person is expecting to receive
    const equivalent_to_give = [] // combines total_give and total_receive. +ve value indicates overall this person owes some money. -ve value indicates overall this person will be receiving money. 0 means they can be excluded from the simplified transactions, since they neither owe nor are owed money.

    people.forEach(person => {
        total_give[person.personKey] = 0
        total_receive[person.personKey] = 0
    })


    Object.keys(debt_matrix).forEach(px => {
        Object.keys(debt_matrix[px]).forEach(py => {
            total_give[px] += debt_matrix_reduced[px][py] // sum all rows
            total_receive[py] += debt_matrix_reduced[px][py] // sum all columns
        })
    })

    people.forEach(person => {
        equivalent_to_give[person.personKey] = total_give[person.personKey] - total_receive[person.personKey]
    })
    // notice that if you sum up the values in equivalent_to_give, it is always 0. 

    const givers = []
    const receivers = []

    Object.keys(equivalent_to_give).forEach(person => {
        const amount = equivalent_to_give[person]

        if (amount < 0) receivers[person] = -1 * amount // -ve givers are receivers
        else if (amount > 0) givers[person] = amount
        // for those who have to give 0, they will be excluded since they don't matter
    })

    console.log(givers)
    console.log(receivers)

    // function that returns the key with the greatest value in a given dictionary
    function max(dict) {
        let highestKey = null
        let max = 0
        for (let key in dict) {
            if (dict[key] > max) {
                highestKey = key
                max = dict[key]
            }
        }
        return highestKey
    }


    do {

        let max_giver = max(givers)
        let max_receiver = max(receivers)

        let amt_giver = givers[max_giver]
        let amt_receiver = receivers[max_receiver]

        let amt_given = Math.min(amt_giver, amt_receiver)
        let amt_left = amt_giver - amt_receiver
        if (amt_left > 0) { // giver still has money left after giving
            givers[max_giver] = amt_left // amount left to be given
            receivers[max_receiver] = 0 // receiver satisfied
        } else { // receiver still needs money after receiving OR receiver and giver both satisfied
            givers[max_giver] = 0 // giver satisfied
            receivers[max_receiver] = -1 * amt_left // amount left to be received
        }
        debt_matrix_simplified[max_giver][max_receiver] += amt_given // update matrix to show giver gives receiver amt_given

    } while (max(givers) && max(receivers));
    console.warn(givers, "\n", receivers)


    console.log("\nOG\n")
    print2DArray(debt_matrix)
    console.log("\nreduced\n")
    print2DArray(debt_matrix_reduced)
    console.log("\nsimplified\n")
    print2DArray(debt_matrix_simplified)
}



generate_matrix(People, transactions)