'use client'
import React, { useState, useEffect } from 'react';

const Snipping = ({ children }: { children: React.ReactNode }) => {
    const [snipping, setSnipping] = useState<boolean>(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [endX, setEndX] = useState(0);
    const [endY, setEndY] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.shiftKey ) {
                setSnipping(true);
            }
        };
    
        const handleMouseDown = (e: MouseEvent) => {
            if (snipping) {
                setStartX(e.clientX);
                setStartY(e.clientY);
            }
        };
    
        const handleMouseMove = (e: MouseEvent) => {
            if (snipping) {
                setEndX(e.clientX);
                setEndY(e.clientY);
            }
        };
    
        const handleMouseUp = (e: MouseEvent) => {
           setSnipping(false);
           captureContent();
        };
    
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [snipping]); // Dependency array ensures that event listeners are added/removed only when 'snipping' state changes

    const captureContent = () => {
        const elements: any = document.elementsFromPoint(startX, startY);
        let content = '';
        elements.forEach((element: any) => {
            if (isElementInSelection(element)) {
                if (element.tagName === 'IMG') {
                    content += `<img src="${(element as HTMLImageElement).src}" alt="Captured Image">`;
                } else if (element.nodeType === Node.TEXT_NODE) {
                    content += element.textContent || '';
                }
            }
        });
        window.localStorage.setItem('capturedContent', content);
    };

    const isElementInSelection = (element: Element) => {
        const rect = (element as HTMLElement).getBoundingClientRect();
        const elementStartX = rect.left;
        const elementStartY = rect.top;
        const elementEndX = rect.right;
        const elementEndY = rect.bottom;

        return (
            (elementStartX <= endX && elementEndX >= startX) &&
            (elementStartY <= endY && elementEndY >= startY)
        );
    };

    return (
        <div className="">
            {children}
        </div>
    );
};

export default Snipping;
