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
    // transaction is accounted for. 


    console.log("\nOG\n")
    print2DArray(debt_matrix)
    console.log("\nreduced\n")
    print2DArray(debt_matrix_reduced)
    console.log("\nsimplified\n")
    print2DArray(debt_matrix_simplified)
}



generate_matrix(People, transactions)