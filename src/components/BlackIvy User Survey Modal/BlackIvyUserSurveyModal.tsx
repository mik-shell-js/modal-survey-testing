// app/components/BlackIvy User Survey Modal/BlackIvyUserSurveyModal.tsx

import React, { useState, useRef } from 'react';
import * as Dialog from "@radix-ui/react-dialog"; // Importing Radix UI Dialog for modal functionality
import { Button } from '../ui/Button/button';
import { Card } from '../ui/card/card';
import { CardContent } from '../ui/card/cardContent';

interface Option {
    label: string;
    emoji: string;
    description?: string;
}

interface SurveyPage {
    question: string;
    options: Option[];
    isMultiSelect?: boolean;
}

interface BlackIvyUserSurveyModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const BlackIvyUserSurveyModal: React.FC<BlackIvyUserSurveyModalProps> = ({ open, onOpenChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState<Record<number, Record<string, boolean>>>({});
    const [statusSelection, setStatusSelection] = useState<string | null>(null);
    const modalContentRef = useRef<HTMLDivElement>(null);
    const [customInput, setCustomInput] = useState<string>("");

    const basePages: SurveyPage[] = [
        {
            question: "What best describes your current professional status?",
            options: [
                {
                    label: "University Affiliate",
                    description: "You are currently a student or pursuing academic research.",
                    emoji: "🎓",
                },
                {
                    label: "Industry Professional",
                    description: "You are currently working in industry.",
                    emoji: "💼",
                },
            ],
        },
    ];

    const industryPage: SurveyPage = {
        question: "Choose your Industry!",
        options: [
            { label: "Aerospace and Defense", emoji: "✈️" },
            { label: "Agriculture and Farming", emoji: "🌾" },
            { label: "Arts and Design", emoji: "🎨" },
            { label: "Automotive", emoji: "🚗" },
            { label: "Consulting", emoji: "💼" },
            { label: "Education", emoji: "📚" },
            { label: "Energy and Utilities", emoji: "⚡" },
            { label: "Entertainment and Media", emoji: "🎭" },
            { label: "Environmental Services", emoji: "🌍" },
            { label: "Fashion and Apparel", emoji: "👗" },
            { label: "Finance and Banking", emoji: "🏦" },
            { label: "Government and Public Administration", emoji: "🏛️" },
            { label: "Healthcare and Medical", emoji: "🩺" },
            { label: "Hospitality and Tourism", emoji: "👨‍🍳" },
            { label: "Legal Services", emoji: "⚖️" },
            { label: "Manufacturing and Production", emoji: "🏭" },
            { label: "Marketing and Advertising", emoji: "📢" },
            { label: "Nonprofit and Social Services", emoji: "❤️" },
            { label: "Transportation and Logistics", emoji: "🚚" },
            { label: "Pharmaceuticals and Biotechnology", emoji: "💊" },
            { label: "Real Estate and Construction", emoji: "🏗️" },
            { label: "Retail and Consumer Goods", emoji: "🛍️" },
            { label: "Sports and Recreation", emoji: "⚽" },
            { label: "Technology and IT", emoji: "💻" },
            { label: "Telecommunications", emoji: "📡" },
            { label: "Other", emoji: "❓" },
        ],
        isMultiSelect: false,
    };

    const degreePage: SurveyPage = {
        question: "What is your Degree Path or Research Focus?",
        options: [
            { label: "Aerospace Engineering", emoji: "✈️" },
            { label: "Agricultural Sciences", emoji: "🌾" },
            { label: "Fine Arts & Design", emoji: "🎨" },
            { label: "Automotive Engineering", emoji: "🚗" },
            { label: "Business & Management", emoji: "💼" },
            { label: "Education & Teaching", emoji: "📚" },
            { label: "Energy Science & Engineering", emoji: "⚡" },
            { label: "Media & Communication Studies", emoji: "🎭" },
            { label: "Environmental Science & Sustainability", emoji: "🌍" },
            { label: "Fashion & Textile Studies", emoji: "👗" },
            { label: "Finance & Economics", emoji: "🏦" },
            { label: "Political Science & Public Administration", emoji: "🏛️" },
            { label: "Health Sciences & Medicine", emoji: "🩺" },
            { label: "Hospitality & Tourism Management", emoji: "👨‍🍳" },
            { label: "Law & Legal Studies", emoji: "⚖️" },
            { label: "Industrial & Manufacturing Engineering", emoji: "🏭" },
            { label: "Marketing & Consumer Behavior", emoji: "📢" },
            { label: "Social Work & Nonprofit Studies", emoji: "❤️" },
            { label: "Logistics & Supply Chain Management", emoji: "🚚" },
            { label: "Pharmaceutical Sciences & Biotechnology", emoji: "💊" },
            { label: "Urban Planning & Real Estate Development", emoji: "🏗️" },
            { label: "Retail & Consumer Studies", emoji: "🛍️" },
            { label: "Sports Management & Kinesiology", emoji: "⚽" },
            { label: "General Studies", emoji: "🎓" },
            { label: "Computer Science & Information Technology", emoji: "💻" },
            { label: "Telecommunications & Networking", emoji: "📡" },
            { label: "Other", emoji: "❓" },
        ],
        isMultiSelect: false,
    };


    const universityPage: SurveyPage = {
        question: 'Choose your Alma Mater!',
        options: [
            { label: 'Brown University', emoji: '🟤' },
            { label: 'Columbia University', emoji: '🔵' },
            { label: 'Cornell University', emoji: '🐻' },
            { label: 'Dartmouth College', emoji: '🌲' },
            { label: 'Harvard University', emoji: '🟥' },
            { label: 'Princeton University', emoji: '🐯' },
            { label: 'University of Pennsylvania', emoji: '🔴' },
            { label: 'Yale University', emoji: '🐶' },
        ],
        isMultiSelect: false,
    };

    const locationPage: SurveyPage = {
        question: "Where are you located?",
        options: [
            { label: 'Atlanta, GA', emoji: '🍑' },
            { label: 'Austin, TX', emoji: '🤠' },
            { label: 'Baltimore, MD', emoji: '🏈' },
            { label: 'Boston, MA', emoji: '🏀' },
            { label: 'Charlotte, NC', emoji: '🏁' },
            { label: 'Chicago, IL', emoji: '🌬️' },
            { label: 'Columbus, OH', emoji: '🌰' },
            { label: 'Dallas, TX', emoji: '🌵' },
            { label: 'Denver, CO', emoji: '🏔️' },
            { label: 'Detroit, MI', emoji: '🚗' },
            { label: 'Hanover, NH', emoji: '🎓' },
            { label: 'Houston, TX', emoji: '🚀' },
            { label: 'Ithaca, NY', emoji: '🌳' },
            { label: 'Las Vegas, NV', emoji: '🎰' },
            { label: 'Los Angeles, CA', emoji: '🌴' },
            { label: 'Miami, FL', emoji: '🌊' },
            { label: 'Minneapolis, MN', emoji: '❄️' },
            { label: 'Nashville, TN', emoji: '🎸' },
            { label: 'New Haven, CT', emoji: '🦉' },
            { label: 'New York City, NY', emoji: '🗽' },
            { label: 'Orlando, FL', emoji: '🎢' },
            { label: 'Philadelphia, PA', emoji: '🦅' },
            { label: 'Phoenix, AZ', emoji: '🌵' },
            { label: 'Pittsburgh, PA', emoji: '🏒' },
            { label: 'Portland, OR', emoji: '🌲' },
            { label: 'Princeton, NJ', emoji: '🐯' },
            { label: 'Providence, RI', emoji: '⚓' },
            { label: 'Raleigh, NC', emoji: '🏡' },
            { label: 'San Diego, CA', emoji: '🌞' },
            { label: 'San Francisco, CA', emoji: '🌉' },
            { label: 'San Jose, CA', emoji: '🤖' },
            { label: 'Seattle, WA', emoji: '☔' },
            { label: 'Tampa, FL', emoji: '🐊' },
            { label: 'Washington, D.C.', emoji: '🏛️' },
            { label: 'Accra, Ghana', emoji: '🇬🇭' },
            { label: 'Addis Ababa, Ethiopia', emoji: '🇪🇹' },
            { label: 'Amsterdam, Netherlands', emoji: '🇳🇱' },
            { label: 'Beijing, China', emoji: '🇨🇳' },
            { label: 'Cairo, Egypt', emoji: '🇪🇬' },
            { label: 'Casablanca, Morocco', emoji: '🇲🇦' },
            { label: 'Cape Town, South Africa', emoji: '🇿🇦' },
            { label: 'Johannesburg, South Africa', emoji: '🇿🇦' },
            { label: 'Dakar, Senegal', emoji: '🇸🇳' },
            { label: 'Dubai, UAE', emoji: '🇦🇪' },
            { label: 'Hong Kong', emoji: '🇭🇰' },
            { label: 'Kingston, Jamaica', emoji: '🇯🇲' },
            { label: 'Lagos, Nigeria', emoji: '🇳🇬' },
            { label: 'London, UK', emoji: '🇬🇧' },
            { label: 'Paris, France', emoji: '🇫🇷' },
            { label: 'Seoul, South Korea', emoji: '🇰🇷' },
            { label: 'Tokyo, Japan', emoji: '🇯🇵' },
            { label: 'Other', emoji: '❓' },
        ],
        isMultiSelect: false,
    };

    const hobbiesPage: SurveyPage = {
        question: "What are your hobbies and interests?",
        options: [
            { label: 'Creative Writing', description: 'Share your poetry, short stories, and writing projects!', emoji: '📝' },
            { label: 'Photography & Videography', description: 'Discuss cameras, editing, and share your best shots!', emoji: '📸' },
            { label: 'Fitness & Wellness', description: 'Talk workouts, nutrition, and self-care routines!', emoji: '🏋️‍♂️' },
            { label: 'Self-Improvement', description: 'Books, productivity hacks, and leveling up your mindset!', emoji: '📖' },
            { label: 'Skincare & Beauty', description: 'Share your favorite products, routines, and beauty tips!', emoji: '💄' },
            { label: 'Fashion & Style', description: 'Talk all things fashion, from streetwear to high-end looks!', emoji: '👗' },
            { label: 'Tech & Gadgets', description: 'Discuss the latest tech trends, gadgets, and innovations!', emoji: '💻' },
            { label: 'DIY & Crafting', description: 'Share your DIY projects, crafts, and handmade creations!', emoji: '🎨' },
            { label: 'Music Lovers', description: 'Talk about your favorite artists, albums, and concerts!', emoji: '🎶' },
            { label: 'Film & TV Buffs', description: 'Discuss your favorite movies, TV shows, and theories!', emoji: '🎬' },
            { label: 'Anime & Manga', description: 'Chat about your favorite anime, manga, and recommendations!', emoji: '📖' },
            { label: 'Gaming', description: 'Talk about your favorite video games, consoles, and strategies!', emoji: '🎮' },
            { label: 'Sports & Athletics', description: 'From basketball to F1, discuss all things sports!', emoji: '🏀' },
            { label: 'Outdoor Adventures', description: 'Hiking, camping, and outdoor fun!', emoji: '⛰️' },
            { label: 'Foodies & Cooking', description: 'Share recipes, food hacks, and favorite meals!', emoji: '🍽️' },
            { label: 'Travel Enthusiasts', description: 'Discuss dream destinations, travel tips, and adventures!', emoji: '✈️' },
            { label: 'Mental Health & Wellness', description: 'A space to talk mindfulness, self-care, and well-being!', emoji: '🧘' },
            { label: 'Finance & Investing', description: 'Talk about budgeting, stocks, and financial goals!', emoji: '💰' },
            { label: 'Parenting & Family', description: 'Discuss all things parenthood and family life!', emoji: '🍼' },
            { label: 'Spirituality & Mindfulness', description: 'A space to discuss meditation, manifestation, and more!', emoji: '☯️' },
            { label: 'Car Enthusiasts', description: 'Talk about car mods, dream cars, and road trips!', emoji: '🚗' },
            { label: 'Comedy & Memes', description: 'Share jokes, funny memes, and hilarious content!', emoji: '😂' },
            { label: 'Pets & Animals', description: 'Share pictures, tips, and stories about your pets!', emoji: '🐶' },
            { label: 'Baddies in Luxury', description: 'A space for luxury lifestyle discussions!', emoji: '💎' },
            { label: 'Astrology & Tarot', description: 'Discuss zodiac signs, tarot readings, and cosmic vibes!', emoji: '🔮' },
            { label: 'Board Games & Tabletop RPGs', description: 'From Monopoly to DnD, talk all things tabletop!', emoji: '🎲' },
            { label: 'Languages & Learning', description: 'Discuss learning new languages and study tips!', emoji: '🌍' },
            { label: 'Entrepreneurship & Startups', description: 'Talk about business ideas, startups, and side hustles!', emoji: '🚀' },
            { label: 'Other', description: 'Have an interest that’s not listed? Share it here!', emoji: '❓' },
        ],
        isMultiSelect: true,
    };

    const pages = [
        ...basePages,
        ...(statusSelection === "University Affiliate" ? [degreePage] : []),
        ...(statusSelection === "Industry Professional" ? [industryPage] : []),
        universityPage,
        locationPage,
        hobbiesPage,
    ];

    const nextPage = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
            if (modalContentRef.current) {
                modalContentRef.current.scrollTop = 0;
            }
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSelectOption = (optionLabel: string) => {
        const currentPageData = pages[currentPage - 1];

        if (currentPage === 1) {
            setStatusSelection(optionLabel);
        }

        if (optionLabel === "Other") {
            setCustomInput(""); // Clear the input box when "Other" is selected
        }

        if (currentPageData.isMultiSelect) {
            setSelectedOptions((prev) => ({
                ...prev,
                [currentPage]: {
                    ...prev[currentPage as number],
                    [optionLabel]: !prev[currentPage as number]?.[optionLabel],
                },
            }));
        } else {
            setSelectedOptions({
                ...selectedOptions,
                [currentPage]: { [optionLabel]: true },
            });
        }
    };

    const renderOptions = () => {
        const currentPageOptions = pages[currentPage - 1].options;

        return (
            <>
                {currentPageOptions.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelectOption(option.label)}
                        className={`flex flex-col items-start p-4 border rounded-lg cursor-pointer w-full min-w-[50px] text-wrap ${selectedOptions[currentPage]?.[option.label] ? "bg-orange-300" : "hover:bg-orange-200"
                            }`}
                    >
                        <div className="flex items-center space-x-4">
                            <span className="text-2xl">{option.emoji}</span>
                            <div>
                                <p className="font-semibold text-lg">{option.label}</p>
                                {option.description && <p className="text-sm text-white">{option.description}</p>}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Input box for "Other" */}
                {selectedOptions[currentPage]?.["Other"] && (
                    <div className="mt-4">
                        <label htmlFor="customInput" className="block text-sm font-medium text-gray-300">
                            Please specify:
                        </label>
                        <input
                            id="customInput"
                            type="text"
                            value={customInput}
                            onChange={(e) => setCustomInput(e.target.value)}
                            className="p-4 mt-1 block w-full rounded-md border-orange-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm text-black"
                            placeholder="Type your response here"
                        />
                    </div>
                )}
            </>
        );
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
            <Dialog.DialogTitle>
                <Dialog.Content className="fixed inset-0 flex justify-center items-center z-50">
                    <div
                        ref={modalContentRef}
                        className="bg-orange-500 rounded-lg shadow-lg p-6 max-w-3xl w-full overflow-y-auto max-h-[70vh]">
                        <Card className='bg-[#303338]'>
                            <CardContent>
                                <div className="mb-4">
                                    <p className="text-orange-500 text-sm">
                                        Question {currentPage} of {pages.length}
                                    </p>
                                    <h2 className="text-xl font-bold mb-4">{pages[currentPage - 1].question}</h2>
                                    {/* Grid layout for options */}
                                    <div className="grid grid-flow-row sm:grid-flow-col gap-2 lg:grid-flow-row">
                                        {renderOptions()}
                                    </div>
                                </div>
                                {/* Navigation buttons */}
                                <div className="flex justify-between mt-6">
                                    <Button
                                        disabled={currentPage === 1}
                                        onClick={prevPage}
                                        variant="primary"
                                        className="mr-2 text-white"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        onClick={nextPage}
                                        disabled={currentPage === pages.length}
                                        variant="primary"
                                    >
                                        {currentPage === pages.length ? 'Finish' : 'Next'}
                                    </Button>
                                    <Dialog.Close asChild>
                                        <Button onClick={() => onOpenChange(false)}>Close</Button>
                                    </Dialog.Close>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </Dialog.Content>
            </Dialog.DialogTitle>
        </Dialog.Root>
    );
};

export default BlackIvyUserSurveyModal;