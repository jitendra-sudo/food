import React from 'react';
import { FaUtensils, FaClock, FaExchangeAlt, FaBookOpen } from 'react-icons/fa';
import './services.css';

const RecipeServices = () => {
    return (
        <div className="services-section" id="recipe-services">
            <div className="section-header">
                <h2 className="section-title">Culinary Companion</h2>
                <p className="section-subtitle">Your digital sous-chef for kitchen success</p>
            </div>
            
            <div className='services-grid'>
                <div className="service-card">
                    <div className="card-icon"><FaUtensils /></div>
                    <h3 className="card-title">Smart Recipe Builder</h3>
                    <p className="card-subtitle">Create dishes from pantry ingredients</p>
                    <p className="card-description">Our AI-powered tool suggests recipes based on what's in your kitchen, with dietary preference filters and skill-level adjustments.</p>
                </div>
                
                <div className="service-card">
                    <div className="card-icon"><FaClock /></div>
                    <h3 className="card-title">Multi-Stage Timer</h3>
                    <p className="card-subtitle">Master complex cooking sequences</p>
                    <p className="card-description">Manage multiple timers simultaneously with visual alerts for different cooking stages and preparation steps.</p>
                </div>

                <div className="service-card">
                    <div className="card-icon"><FaExchangeAlt /></div>
                    <h3 className="card-title">Ingredient Swap</h3>
                    <p className="card-subtitle">Adapt recipes to your needs</p>
                    <p className="card-description">Get intelligent substitution suggestions for allergies, dietary restrictions, or missing ingredients.</p>
                </div>

                <div className="service-card">
                    <div className="card-icon"><FaBookOpen /></div>
                    <h3 className="card-title">Digital Cookbook</h3>
                    <p className="card-subtitle">Organize & access recipes</p>
                    <p className="card-description">Cloud-based storage with smart categorization, meal planning tools, and grocery list generation.</p>
                </div>
            </div>
        </div>
    );
};

export default RecipeServices;