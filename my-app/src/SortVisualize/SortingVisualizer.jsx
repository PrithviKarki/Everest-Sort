import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms'
import {getBubbleSortAnimations} from '../sortingAlgorithms/sortingAlgorithms'
import './SortVizDesign.css';

const ANIMATION_SPEED_MS = 3;

const NUMBER_OF_ARRAY_BARS = 310;

export default class SortingVisualizer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount () {
        this.resetArray();
    }

    resetArray() {
        const array = []; 
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 730));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array); 
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar'); 
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'red' : 'turquoise';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color; 
                    barTwoStyle.backgroundColor = color; 
                }, i *  ANIMATION_SPEED_MS );
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }
    
    quickSort() {}
    
    heapSort() {}    
    
    insertionSort() {}

    bubbleSort() {
        const animations = getBubbleSortAnimations(this.state.array); 
        const arrayBars = document.getElementsByClassName('array-bar'); 
        if (arrayBars.length === 0) {
            console.error("No elements with class 'array-bar' found");
            return;
        }
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx]?.style;
                const barTwoStyle = arrayBars[barTwoIdx]?.style;
                if (!barOneStyle || !barTwoStyle) continue; // Skip if any style is undefined
                const color = i % 3 === 0 ? 'red' : 'turquoise';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color; 
                    barTwoStyle.backgroundColor = color; 
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx]?.style;
                    if (barOneStyle) {
                        barOneStyle.height = `${newHeight}px`;
                    }
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }
    
    


    render() {
        const {array} = this.state; 

        return (
            <div className='array-container'>
                {array.map((value, idx) => (
                    <div 
                        className="array-bar" 
                        key={idx}
                        style={{height: `${value}px`}}>
                    </div>
                ))}
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.insertionSort()}>Insertion Sort</button>
            </div>
        )
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i  = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) return false;
    }
    return true;
}