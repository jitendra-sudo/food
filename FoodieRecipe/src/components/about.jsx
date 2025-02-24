import React, { useState, useEffect, useRef } from 'react';
import { FaUtensils, FaFire, FaHeart } from 'react-icons/fa';
import recipePng from './recipes.png';
import './about.css';

function RecipePage() {
    const [isAnimated, setIsAnimated] = useState(false);
    const recipeRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsAnimated(entry.isIntersecting),
            { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
        );

        if (recipeRef.current) observer.observe(recipeRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="about-section" id="recipes" ref={recipeRef}>
            <div className="about-container">
                <header className="about-header">
                    <h1 className="about-title">Discover <span>Culinary Delights</span></h1>
                    <p className="about-subtitle">From kitchen classics to global gastronomic adventures</p>
                </header>

                <div className='about-content'>
                    <div className="about-image-wrapper">
                        <img src={recipePng} alt="Cooking ingredients" className="about-image" />
                    </div>

                    <div className="about-info">
                        <div className="about-mission">
                            <FaUtensils className="mission-icon" />
                            <h3>Our Kitchen Philosophy</h3>
                            <p>Empowering home chefs with accessible, delicious recipes for every occasion</p>
                        </div>

                        <div className="about-features">
                            <div className="feature-card">
                                <FaFire className="feature-icon" />
                                <h4>Quick Recipes</h4>
                                <p>30-minute meals for busy food lovers</p>
                            </div>
                            <div className="feature-card">
                                <FaHeart className="feature-icon" />
                                <h4>Chef's Favorites</h4>
                                <p>Curated collections from professional kitchens</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RecipePage;