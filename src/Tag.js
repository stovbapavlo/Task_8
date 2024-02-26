import React, { forwardRef } from 'react';
import Draggable from 'react-draggable';
import './Tag.css';

const Tag = forwardRef(({ x, y, isSelected, onDelete, onSelect, id }, ref) => {
    return (
        <Draggable
            disabled={!isSelected}
            defaultPosition={{ x, y }}
        >
            <div
                ref={ref}
                className={`tag ${isSelected ? 'selected' : ''}`}
                style={{ position: 'absolute', top: 0, left: 0 }}
                onClick={() => onSelect(id)}
            >
                <div className="tag-content">
                    <span>{'lorem'}</span>
                </div>
                {isSelected && (
                    <button className="delete-button" onClick={onDelete}>
                        &times;
                    </button>
                )}
            </div>
        </Draggable>
    );
});

export default Tag;
