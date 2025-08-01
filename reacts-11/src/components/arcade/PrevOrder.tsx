'use client'
import React, { useEffect, useState, useRef } from 'react';

export default function TheArchivist() {

    const [selectedFruits, setSelectedFruits] = useState([]);
    const [selectedDressing, setSelectedDressing] = useState(null)
    const [fruits, setFruits] = useState([]);
    const [message, setMessage] = useState('');
    const [step, setStep] = useState(1);

    //Ref container to persist historical state
    const previousInputs = useRef([]);
    const outputListRef = useRef(null);

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

    const dressings = [
        { id: 1, name: 'french vanilla yogurt', color: 'bg-french-vanilla' },
        { id: 2, name: 'chocolate ice cream', color: 'bg-chocolate-icecream' },
        { id: 3, name: 'whipped cream', color: 'bg-whipped-cream' },
        { id: 4, name: 'honey-lime', color: 'bg-honey-lime' }
    ];


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
            name,
            "icon": fruitChoices.find((fruit) => fruit.name === name).icon
        }));
        setFruits((prev) => [...fruits, ...newItem]);
        setSelectedFruits([]);
        console.log("newItem", newItem)
    }

    const clearList = (e) => {
        setFruits([]);
        setMessage("");
    }

    const handleDressingChange = (e) => {
        const { value } = e.target;
        const found = dressings.find((dressing) => dressing.name === value);
        setSelectedDressing(found);
        setStep(3);

    }

    useEffect(() => {

        let timeOutId;


        if (fruits.length === 0) {
            timeOutId = setTimeout(() => {
                setMessage("Still thinking? How about strawberry?")
            }, 5000);
        } else if (fruits.length > 0 && fruits.length < 4) {
            setMessage("Nice pick!, click next now")
        } else {
            setMessage("Be carefull, too many fruits can get you an upset stomach. Would you like to clear the list and start over?")

        }


        return () => clearTimeout(timeOutId);

    }, [fruits])

    useEffect(() => {


        if (step === 2) {
            setMessage("Let's top it up! Select a Dressing for Your Salad")
        }

    }, [step]);

    useEffect(() => {
        if (step === 3 && outputListRef.current && selectedDressing?.color) {

            //updates ref without triggering re-render
            previousInputs.current = [...fruits];
            setMessage("Your salad is ready:");
            outputListRef.current.classList.add(selectedDressing.color);
        }
    }, [step, selectedDressing, fruits])

    return (
        <>
            <div>
                <h3 className='text-alert'>
                    {message}
                </h3>
            </div>
            {step === 1 && (
                <form onSubmit={addFruit}>

                    <fieldset>
                        {fruits.length === 0 && (<legend>Choose Fruites for Your Salad</legend>)}


                        {fruitChoices.map(fruitChoice => (
                            <label htmlFor={fruitChoice.id} key={fruitChoice.id}
                                className='min-h-[20px]'>
                                <input id={fruitChoice.id} type='checkbox'
                                    value={fruitChoice.name}
                                    checked={selectedFruits.includes(fruitChoice.name)}
                                    onChange={handleCheckboxChange}></input>
                                {fruitChoice.icon}{" "}
                            </label>
                        ))}
                        <button type="submit" className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
                            Add Fruits
                        </button>
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
                        {fruits.length > 0 && (
                            <button onClick={() => {
                                setStep(2);
                            }} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
                                Next
                            </button>
                        )}
                    </fieldset>
                </form>
            )}
            {/*Demonstrates restoring UI state from a ref vault.*/}
            {step === 1 && previousInputs.current.length > 0 && (
                <aside className='mt-4 p-3 border rounded bg-gray-100' >
                    <h4 className='font-bold'>Previous Order:</h4>
                    <div className='flex flex-wrap pag-2 mt-2'>
                        {previousInputs.current.map((fruit) => (
                            <span key={fruit.id} className="text-2xl">
                                {fruit.icon}{fruit.name}
                            </span>
                        ))}
                    </div>
                </aside>
            )}
            {step === 2 && (
                <>

                    <div className='flex flex-col m-3 pl-2'>
                        {dressings.map(d => (
                            <label htmlFor="dressing"
                                key={d.id}>
                                <input
                                    type="radio"
                                    name="dressing"
                                    value={d.name}
                                    onChange={handleDressingChange}
                                />
                                {d.name}
                            </label>
                        ))}
                    </div>

                </>
            )} {step === 3 &&
                (
                    <>

                        <ul ref={outputListRef} className='mt-4 list-disc pl-5 rounded-2xl w-1/2'>
                            {
                                fruits.map((fruit, index) => (
                                    <li className='list-none inline pl-2'
                                        key={fruit.id}
                                    >
                                        {fruit.icon}
                                        {index < fruits.length - 1 && ' &'}
                                    </li>
                                ))}
                        </ul>
                        <h3 className='mt-3 pl-1.5'>In the {selectedDressing.name} dressing</h3>

                        <button
                            onClick={() => {
                                setFruits([]);
                                setSelectedFruits([]);
                                setSelectedDressing(null);
                                setStep(1);
                                setMessage("Welcome back! Start crafting your next salad.");
                            }}
                            className='mt-4 px-3 py-1 bg-green-500 text-white rounded'>
                            Try Again
                        </button>


                    </>
                )}
        </>


    )
}