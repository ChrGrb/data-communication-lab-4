// Matrix determining how likely a failure is when going from node A to node B
//      A   B   C   D   E   F   G
// A    1   .32 .32 1   1   1   1
// B    .32 1   1   1   .71 1   1
// C    .32 1   1   1   .34 1   .53
// D    1   1   1   1   1   .33 1
// E    1   .71 .34 1   1   1   .34
// F    1   1   1   .33 1   1   .43
// G    1   1   .53 1   .34 .43 1

var globalMatrix = [
    [1, .32, .32, 1, 1, 1, 1], 
    [.32, 1, 1, 1, .71, 1, 1],
    [.32, 1, 1, 1, .34, 1, .53],
    [1, 1, 1, 1, 1, .33, 1],  
    [1, .71, .34, 1, 1, 1, .34],
    [1, 1, 1, .33, 1, 1, .43],
    [1, 1, .53, 1, .34, .43, 1] 
]



// Recursive function
// Parameters:
// - matrix: 2-dim matrix with probabilities of failure between nodes
// - size: Number of nodes
// - currentPos: current node
// - destinationPos: node that should be reached
const findDest = (matrix, size, currentPos, destinationPos) => {
    // Check if end node is reached
    if(currentPos == destinationPos) {
        return true;
    }

    for(var i = 0; i < size; i++) {
        if(connected(matrix[currentPos][i])) {
            // Converting matrix to json and back to avoid copying a reference to the original matrix
            var newMatrix = JSON.parse(JSON.stringify(matrix));
            // Set the currently visited field to 1 to avoid going in circles
            newMatrix[currentPos][i] = 1;
            newMatrix[i][currentPos] = 1;
            // Recursive call to search for end field in the next node
            if(findDest(newMatrix, size, i, destinationPos) == true) {
                return true;
            }
        }
    }

    // This point is reached if there was no way to the end node found
    return false;
}


// Connected function, that simulates a node connection success/failure
const connected = (failureProbability) => {
    return Math.random() >= failureProbability
}

var successCounter = 0;
var failureCounter = 0;

const amountTests = 10000;

for(var i = 0; i < amountTests; i++) {
    if(findDest(globalMatrix, 7, 0, 6)) {
        successCounter++;
    } else {
        failureCounter++;
    }
}

console.log("Successful tries: " + successCounter);
console.log("Failed tries: " + failureCounter);
console.log("Reliability: " + successCounter / amountTests);

