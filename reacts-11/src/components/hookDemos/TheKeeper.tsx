'use client'
import React, { useState } from 'react';

export default function TheKeeper() {
    //!!!remember to always declare at the top of your component

    //Temporary state for user's current checkbox selection.
    const [selectedFruits, setSelectedFruits] = useState([]);
    //Final confirmed fruits, updated only on form submission.
    const [fruits, setFruits] = useState([]);

    //data sample
    const fruitChoices = [

        {
            "id": 1,
            "name": "apple",
            "icon": "🍎"
        }, {
            "id": 2,
            "name": "pear",
            "icon": "🍐"
        }, {
            "id": 3,
            "name": "kiwi",
            "icon": "🥝"
        }, {
            "id": 4,
            "name": "strawberry",
            "icon": "🍓"
        }];
    //Dynamic checkbox logic with clean state updates.    
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        setSelectedFruits(prev =>
            checked ? [...prev, value] : prev.filter(name => name !== value)
        );
    }

    //Uses previous state pattern to accumulate confirmed fruits.
    const addFruit = e => {

        e.preventDefault();
        const newItem = selectedFruits.map((name, i) => ({
            id: fruits.length + i,
            name
        }));
        // with "prev" we make sure we get the latest state possible
        //and accumulate previous choices
        setFruits((prev) => [...fruits, ...newItem]);
        //Resets UI to let user start a fresh selection.
        setSelectedFruits([]);
    }

    const clearList = (e) => {
        setFruits([]);
    }
    return (
        <>
            <form onSubmit={addFruit}>
                <fieldset>
                    <legend>Choose a Fruite for Your Salad</legend>

                    {fruitChoices.map(fruitChoice => (
                        <label htmlFor={fruitChoice.id} key={fruitChoice.id}
                            className='min-h-[20px]'>
                            <input id={fruitChoice.id} type='checkbox'
                                value={fruitChoice.name}
                                checked={selectedFruits.includes(fruitChoice.name)}
                                onChange={handleCheckboxChange}></input>
                            {fruitChoice.icon};
                        </label>
                    ))}
                </fieldset>
                <button type="submit" className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
                    Add Fruits
                </button>

            </form>
            <ul className='mt-4 list-disc pl-5'>
                {fruits.map(fruit => (
                    <li key={fruit.id}>
                        {fruit.name}
                    </li>
                ))}
            </ul>
            <button onClick={clearList} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
                Clear List
            </button>

        </>


    )
}