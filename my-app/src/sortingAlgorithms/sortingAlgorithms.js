export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
};

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2); 
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations); 
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
    mainArray, 
    startIdx, 
    middleIdx, 
    endIdx, 
    auxiliaryArray, 
    animations,
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1; 
    while (i <= middleIdx && j <= endIdx) {
        animations.push([i,j]);
        animations.push([i,j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]){
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        animations.push([i,i]);
        animations.push([i,i]);
        animations.push([k,auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        animations.push([j,j]);
        animations.push([j,j]);
        animations.push([k,auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

export function getBubbleSortAnimations(array) {
    const animations = [];
    const auxiliaryArray = array.slice(); // Clone the array
    bubbleSortHelper(auxiliaryArray, animations);
    return animations;
}

function bubbleSortHelper(auxiliaryArray, animations) {
    const n = auxiliaryArray.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Compare the adjacent elements
            animations.push([j, j + 1]); // Change color to indicate comparison
            animations.push([j, j + 1]); // Revert the color after comparison
            if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
                // Swap the elements if they are in the wrong order
                animations.push([j, auxiliaryArray[j + 1]]);
                animations.push([j + 1, auxiliaryArray[j]]);
                let temp = auxiliaryArray[j];
                auxiliaryArray[j] = auxiliaryArray[j + 1];
                auxiliaryArray[j + 1] = temp;
            } else {
                // No swap, push the same heights again
                animations.push([j, auxiliaryArray[j]]);
                animations.push([j + 1, auxiliaryArray[j + 1]]);
            }
        }
    }
}
