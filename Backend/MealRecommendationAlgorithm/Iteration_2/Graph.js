
class Graph {
    adjacencyList;      // To store the relations of the graph
    size;               // Number of nodes in the graph
    not_visit;          // Helper set to travel again on the same node but different combinations
    finalSet;           // Stores all non repeating combinations of meals
    finalMap;           // Stores the meal plans as key and an array of [number of overlapping ingredients, accuracy to user preferences]

    constructor() {
        this.adjacencyList = new Map()
        this.size = 0
        this.not_visit = new Set()
        this.finalSet = new Set();
        this.finalMap = new Map()
    }

    // When adding a node increase size and add to the adjacency list the node as key and a map to store the edges as value
    addNode(node) {
        this.size++;
        this.adjacencyList.set(node, new Map())
    }

    // Add the weight and edge to both nodes for the graph to be undirected
    addEdge(node1, node2, weight) {
        this.adjacencyList.get(node1).set(node2, weight);
        this.adjacencyList.get(node2).set(node1, weight);
    }

    // Get all the neighbors a node has
    getNeighbors(node) {
        return this.adjacencyList.get(node);
    }

    // Function to print the graph
    printGraph() {
        var get_keys = this.adjacencyList.keys();

        for (var i of get_keys) {
            var get_values = this.adjacencyList.get(i);
            var conc = "";

            for (var j of get_values) {
                conc += j[0] + " overlap: " + j[1] + "         ";
            }

            console.log(i + " ->       " + conc);
        }
    }

    // Get the weight of the edge of two nodes
    overlapEdge(a, b) {
        return this.adjacencyList.get(a).get(b);
    }

    // Function to explore the graph
    dfs(node, visited, arr, reset) {

        arr.push(node)          // Array of combinations of meal
        visited.add(node)       // Set of visited nodes

        // If the size of the array of combinations is 3 then sort the array, put in a single string and add it to the final set of meal combinations
        if (arr.length === 3) {
            var sortedArr = [...arr].sort().join();
            this.finalSet.add(sortedArr)
            arr.pop()
        }

        // Get the neighbors of the node
        var neighbors = this.getNeighbors(node)


        neighbors.forEach((value, key) => {
            if (visited.size === this.size && reset < 0) {
                var setArray = Array.from(visited)                              // Get an array of all visited nodes

                setArray = setArray.slice(reset - 1 + this.size, reset)         // Modify the array to get rid of the nodes we already have all possible combinations starting from our parent node

                this.not_visit.add(setArray[0])                                 // Add the parent node to the not visit again set

                visited = new Set(this.not_visit)                               // Redeclare the visited set to match the ones it should not visit again
                reset++                                                         // Add one to reset (which is negative)
                this.dfs(node, visited, [], reset)                              // Do the dfs again from the same parent node but with another food on the second option
            }

            // If we havent visited the node then do the dfs
            if (!visited.has(key)) {
                this.dfs(key, visited, arr)
            }
        })
    }

    getRecommendations(nutrientsMap, USER_PRO, USER_CARBS, USER_FATS) {
        var get_keys = this.adjacencyList.keys();       // Get all nodes of the graph
        var reset = 2 - this.size                       // Reset variable to keep making combinations with the same parent node

        // For each node do a dfs and clear the not visit set to get new combinations
        for (var i of get_keys) {
            this.dfs(i, new Set(), [], reset)
            this.not_visit.clear()
        }

        // Calculate total overlapping ingredients and nutrients, as well as the accuracy of the meal plan
        for (let elem of this.finalSet) {
            var elemArr = elem.split(',')
            var totalOverlap = 0
            var totalProtein = 0
            var totalCarbs = 0
            var totalFats = 0

            for (let i = 0; i < elemArr.length; i++) {
                if (i !== elemArr.length - 1) {
                    totalOverlap += this.overlapEdge(elemArr[i], elemArr[i + 1])
                } else {
                    totalOverlap += this.overlapEdge(elemArr[0], elemArr[i])
                }

                var nutrientsArr = nutrientsMap.get(elemArr[i]);
                totalProtein += nutrientsArr[0]
                totalCarbs += nutrientsArr[1]
                totalFats += nutrientsArr[2]
            }

            var weightAverage = (totalProtein / USER_PRO + totalCarbs / USER_CARBS + totalFats / USER_FATS) / 3

            this.finalMap.set(elem, [totalOverlap, weightAverage])
        }

        // Sort the map by accuracy
        const mapSort1 = new Map([...this.finalMap.entries()].sort((a, b) => b[1][1] - a[1][1]));

        // Variable to get smallest difference of accuracy
        var smallest = 1

        // Get the samllest accuracy difference of the map
        mapSort1.forEach((value, key) => {
            if (Math.abs(1 - value[1]) < smallest) {
                smallest = Math.abs(1 - value[1])
            }
        })

        // Variables to get best meal plan
        var bestAcc = 1
        var bestOverlap = 0
        var bestPlan

        // If the difference of accuracy to 100% is lower and the quantity of overlapping ingredients is greater and is only ranging from 10% from the smallest value then make it the best meal plan
        mapSort1.forEach((value, key) => {
            if ((Math.abs(1 - value[1]) <= bestAcc) && (value[0] >= bestOverlap) && (Math.abs(1 - value[1]) <= (smallest + 0.10))) {
                bestAcc = Math.abs(1 - value[1])
                bestOverlap = value[0]
                bestPlan = key
            }
        })

        // Return an array of the best meal plan
        return bestPlan.split(',');

    }
}

module.exports = Graph
