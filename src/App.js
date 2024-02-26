import React, { useState, useRef, useCallback } from 'react';
import Tag from './Tag';
import './App.css';
import Draggable from 'react-draggable';

const App = () => {
    const [targets, setTargets] = useState([]);
    const imgRef = useRef(null);
    const [selectedTargetId, setSelectedTargetId] = useState(null);

    const handleClick = (e) => {
        const imgRect = imgRef.current.getBoundingClientRect();
        const x = e.clientX - imgRect.left;
        const y = e.clientY - imgRect.top;

        if (x >= 0 && x <= imgRect.width && y >= 0 && y <= imgRect.height) {
            if (targets.length < 4) {
                const newTarget = { x, y, text: 'lorem', id: Date.now() }; //унікальний ідентифікатор
                setTargets([...targets, newTarget]);
            } else {
                alert('Maximum number of tags reached');
            }
        }
    };

    const handleSelect = useCallback((id) => {
        if (selectedTargetId === id) {
            setSelectedTargetId(null);
        } else {
            setSelectedTargetId(id);
        }
    }, [selectedTargetId]);
    const handleDelete = (idToDelete) => {
        setTargets(targets.filter(target => target.id !== idToDelete));
        setSelectedTargetId(null);
    };

    return (
        <div className="App">
            <div className="tagging-wrapper" onDoubleClick={handleClick} style={{ position: 'relative' }}>
                <img ref={imgRef} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/React_Logo_SVG.svg/1024px-React_Logo_SVG.svg.png" alt="" />
                {targets.map((target) => (
                    <Draggable
                        key={target.id}
                        handle=".tag-content"
                        position={{ x: target.x, y: target.y }}
                        bounds="parent" // .tagging-wrapper - також не працює
                    >
                        <Tag
                            x={target.x}
                            y={target.y}
                            isSelected={selectedTargetId === target.id}
                            onDelete={() => handleDelete(target.id)}
                            onSelect={() => handleSelect(target.id)}
                            id={target.id}
                        />
                    </Draggable>
                ))}
            </div>
        </div>
    );
};

export default App;
