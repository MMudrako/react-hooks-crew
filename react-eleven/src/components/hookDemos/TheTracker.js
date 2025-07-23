'use client'
import React, { useEffect, useState } from 'react';

export default function TheTracker() {

    const [selectedFruits, setSelectedFruits] = useState([]);
    const [fruits, setFruits] = useState([]);
    const [message, setMessage] = useState('');

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

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        setSelectedFruits(prev =>
            checked ? [...prev, value] : prev.filter(name => name !== value)
        );
    }

    const addFruit = e => {

        e.preventDefault();
        const newItem = selectedFruits.map((name, i) => ({
            id: fruits.length + i,
            name
        }));
        setFruits((prev) => [...fruits, ...newItem]);
        setSelectedFruits([]);
    }

    const clearList = (e) => {
        setFruits([]);
        setMessage("");
    }
    //fires whenever the fruits array updates
    useEffect(() => {

        let timeOutId;

        //triggeres a message showing the update was successful
        if (fruits.length === 0) {
            timeOutId = setTimeout(() => {
                setMessage("Still thinking? How about strawberry?")
            }, 5000);
        } else if (fruits.length > 0 && fruits.length <= 4) {
            setMessage("Nice pick!, Anything else?")
        } else {
            setMessage("Be carefull, too many fruits can get you an upset stomach. Would you like to clear the list and start over?")

        }

        return () => clearTimeout(timeOutId);
        //Encapsulates dependency-based reactions without manual event handling
        //if left empty will run only once on mount    
    }, [fruits]);

    return (
        <>
            <div>
                <h3 className='text-alert'>
                    {message}
                </h3>
            </div>
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