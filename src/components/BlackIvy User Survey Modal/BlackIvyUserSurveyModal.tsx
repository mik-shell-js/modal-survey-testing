import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import * as Constants from './Options/constants';
import FadeIn from "./fadein";


interface BlackIvyUserSurveyModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const BlackIvyUserSurveyModal: React.FC<BlackIvyUserSurveyModalProps> = ({ open, onOpenChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isGradSchool, setIsGradSchool] = useState(false);
    // State for all dropdowns
    const [formData, setFormData] = useState({
        gender: "",
        location: "",
        employer: "",
        industry: "",
        undergradSchool: "",
        classYear: "",
        gradClassYear: "",
        graduateSchool: "",
        degreeType: "",
    });

    // Refs for all dropdowns
    const selectRefs = useRef<{ [key: string]: HTMLSelectElement | null }>({});

    // Function to resize select elements dynamically
    const handleResize = () => {
        Object.keys(selectRefs.current).forEach((key) => {
            const selectElement = selectRefs.current[key];
            if (selectElement) {
                const context = document.createElement("canvas").getContext("2d");
                if (context) {
                    context.font = "14px sans-serif"; // Match select element's font
                    const selectedValue = formData[key as keyof typeof formData] || "";
                    const textWidth = context.measureText(
                        selectedValue === "Other" ? "Other (Please Specify)" : selectedValue
                    ).width;

                    const padding = 40; // Extra padding for dropdown arrow and borders
                    const minWidth = 155; // Minimum width
                    const newWidth = Math.max(textWidth + padding, minWidth);

                    selectElement.style.width = `${newWidth}px`;
                }
            }
        });
    };

    // useEffect to run handleResize() whenever form data changes
    useEffect(() => {
        handleResize();
    }, [formData]); // Runs when any select field value changes

    // Resize again when Grad School checkbox is toggled
    useEffect(() => {
        if (isGradSchool) {
            setTimeout(() => {
                handleResize();
            }, 50); // Ensure resizing occurs after rendering
        }
    }, [isGradSchool]);

    const hobbyListRef = useRef<HTMLDivElement>(null);

    const scrollToNextSet = () => {
        if (hobbyListRef.current) {
            const firstNonPrioritizedElement = hobbyListRef.current.querySelector(
                `[data-hobby="${CSS.escape(remainingHobbies[0])}"]`
            );

            if (firstNonPrioritizedElement) {
                console.log("Scrolling to:", remainingHobbies[0]); // find hobby in array before start

                firstNonPrioritizedElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                });
            } else {
                console.warn("Element not found for", remainingHobbies[0]); // not found
            }
        }
    };

    // Function to handle changes for dropdowns
    const handleSelectChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // const [searchQuery, setSearchQuery] = useState<{ [key: string]: string }>({});

    // const handleSearchChange = (field: string, value: string) => {
    //     setSearchQuery((prev) => ({ ...prev, [field]: value }));
    // };

    // const filteredOptions = (options: string[], field: string) => {
    //     return options.filter((option) =>
    //         option.toLowerCase().includes((searchQuery[field] || "").toLowerCase())
    //     );
    // };

    // const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState({ day: "", month: "", year: "" });
    // const [location, setLocation] = useState("");
    // const [employer, setEmployer] = useState("");
    // const [undergradSchool, setUndergradSchool] = useState("");
    // const [classYear, setClassYear] = useState("");
    const [gradClassYear, setGradClassYear] = useState("");
    // const [graduateSchool, setGraduateSchool] = useState("");
    const [degreeType, setDegreeType] = useState("");
    // const [currentHobbyPage, setCurrentHobbyPage] = useState(1);
    const [hobbies, setHobbies] = useState<string[]>([]);
    const [isConfirmed, setIsConfirmed] = useState(false); // Track if "I Confirm" is clicked
    const [errorMessage, setErrorMessage] = useState(""); // Error message to display if user tries to submit without completing all fields
    const [selectedOther, setSelectedOther] = useState(false);
    const [customInput, setCustomInput] = useState("");
    const maxHobbies = 5;
    const pages = [1, 2, 3, 4, 5]; // Array to represent the total number of pages

    // const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});

    // const updateDropdownOpen = (field: string, isOpen: boolean) => {
    //     setDropdownOpen((prev) => ({ ...prev, [field]: isOpen }));
    // };

    const prioritizedHobbies = [
        "Arts & Crafts",
        "Fashion & Styling",
        "Brunch & Foodie Meetups",
        "Book Club",
        "Community Service",
        "Cooking & Baking",
        "Fitness",
        "Entrepreneurship",
        "Financial Literacy & Investing",
    ];

    const remainingHobbies = Constants.hobbyOptions.filter(
        (hobby) => !prioritizedHobbies.includes(hobby)
    );


    const renderProgressBar = () => {
        const totalSteps = pages.length;
        const currentStep = currentPage;

        return (
            <div className="mb-4 -mt-10 flex flex-col items-center">
                <div className="flex items-center justify-center">
                    <div className="flex">
                        {Array.from({ length: totalSteps }, (_, index) => (
                            <React.Fragment key={index}>
                                <div
                                    className={`w-6 h-6 rounded-full border-2 ${index < currentStep ? "bg-[#f14421] border-[#f14421]" : "bg-gray-300 border-gray-400"
                                        }`}
                                ></div>
                                {index < totalSteps - 1 && (
                                    <div
                                        className={`w-8 h-1 mt-[10px] ${index < currentStep - 1 ? "bg-[#f14421]" : "bg-gray-300"
                                            }`}
                                    ></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const nextPage = () => currentPage < 5 && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    const handleHobbySelect = (hobby: string) => {
        if (hobbies.includes(hobby)) {
            setHobbies(hobbies.filter((item) => item !== hobby));
        } else if (hobbies.length < maxHobbies) {
            setHobbies([...hobbies, hobby]);
        }
    };


    const renderPageContent = () => {
        switch (currentPage) {
            case 1:
                return (
                    <div className="space-y-14">
                        <div className="flex items-center space-x-2">
                            {/* Gender Dropdown */}
                            <label className="block text-black font-medium">Gender:</label>
                            <select
                                ref={(el) => {
                                    selectRefs.current.gender = el;
                                }}
                                className="h-[25px] p-1 border-[1px] border-black rounded-md text-sm/[15px] text-left text-black select-dropdown"
                                value={formData.gender}
                                onChange={(e) => handleSelectChange("gender", e.target.value)}
                            >
                                <option value=""></option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Non-Binary">Non-Binary</option>
                                <option value="Prefer Not To Answer">Prefer Not To Answer</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="flex items-center space-x-2">
                            <label className="text-black font-medium">Date of Birth:</label>
                            <div className="flex space-x-2">
                                <select
                                    className="w-24 h-[25px] p-1 border-[1px] mt-[4px] border-black rounded-md text-sm/[15px] text-left text-black select-dropdown"
                                    value={dateOfBirth.month}
                                    onChange={(e) => setDateOfBirth({ ...dateOfBirth, month: e.target.value })}
                                >
                                    <option value=""></option>
                                    {[
                                        "January",
                                        "February",
                                        "March",
                                        "April",
                                        "May",
                                        "June",
                                        "July",
                                        "August",
                                        "September",
                                        "October",
                                        "November",
                                        "December",
                                    ].map((month, index) => (
                                        <option key={index} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                                <span className="text-black  font-bold text-lg mt-1">/</span>
                                <select
                                    className="w-[48px] h-[25px] p-1 border-[1px] mt-[4px] border-black rounded-md text-sm/[15px] text-left text-black select-dropdown"
                                    // className=" w-4 h-[25px] p-2 border-[1px] mt-[4px] -ml-2 border-black rounded-md text-black select-dropdown"
                                    value={dateOfBirth.day}
                                    onChange={(e) => setDateOfBirth({ ...dateOfBirth, day: e.target.value })}
                                >
                                    <option value=""></option>
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                        <option key={day} value={day}>
                                            {day}
                                        </option>
                                    ))}
                                </select>
                                <span className="text-black font-bold text-lg mt-1">/</span>
                                <select
                                    className="w-16 h-[25px] p-1 border-[1px] mt-[4px] border-black rounded-md text-sm/[15px] text-left text-black select-dropdown"
                                    value={dateOfBirth.year}
                                    onChange={(e) => setDateOfBirth({ ...dateOfBirth, year: e.target.value })}
                                >
                                    <option value=""></option>
                                    {Array.from({ length: 100 }, (_, i) => 2010 - i).map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-12">

                        <div className="flex items-center space-x-4">
                            {/* Location Dropdown */}
                            <label className="block text-black font-medium">Location:</label>
                            <select
                                ref={(el) => {
                                    selectRefs.current.location = el;
                                }}
                                className="h-[25px] p-1 border-[1px] border-black rounded-md text-sm/[15px] text-left text-black select-dropdown"
                                value={formData.location}
                                onChange={(e) => handleSelectChange("location", e.target.value)}
                            >
                                <option value=""></option>
                                {Constants.locations.map((locationOption, index) => (
                                    <option key={index} value={locationOption}>
                                        {locationOption === "Other" ? "Other (Please Specify)" : locationOption}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center space-x-3">
                            {/* Employer Dropdown */}
                            <label className="block text-black font-medium">Employer:</label>
                            <select
                                ref={(el) => {
                                    selectRefs.current.employer = el;
                                }}
                                className="h-[25px] p-1 border-[1px] border-black rounded-md text-sm/[15px] text-left text-black select-dropdown"
                                value={formData.employer}
                                onChange={(e) => handleSelectChange("employer", e.target.value)}
                            >
                                <option value=""></option>
                                {Constants.employers.map((employerOption, index) => (
                                    <option key={index} value={employerOption}>
                                        {employerOption === "Other" ? "Other (Please Specify)" : employerOption}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center space-x-4">
                            {/* Industry Dropdown */}
                            <label className="block text-black font-medium">Industry:</label>
                            <select
                                ref={(el) => {
                                    selectRefs.current.industry = el;
                                }}
                                className="h-[25px] p-1 border-[1px] border-black rounded-md text-sm/[15px] text-left text-black select-dropdown"
                                value={formData.industry}
                                onChange={(e) => handleSelectChange("industry", e.target.value)}
                            >
                                <option value=""></option>
                                {Constants.industry.map((industryOption, index) => (
                                    <option key={index} value={industryOption}>
                                        {industryOption === "Other" ? "Other (Please Specify)" : industryOption}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-8">
                        <div className="flex items-center space-x-4">
                            {/* Undergrad School Dropdown */}
                            <label className="block text-black font-medium">Undergrad School:</label>
                            <select
                                ref={(el) => {
                                    selectRefs.current.undergradSchool = el;
                                }}
                                className="w-[155px] h-[25px] p-1 border-[1px] border-black rounded-md text-sm/[15px] text-left text-black select-dropdown"
                                value={formData.undergradSchool}
                                onChange={(e) => handleSelectChange("undergradSchool", e.target.value)}
                            >
                                <option value=""></option>
                                {Constants.undergradSchools.map((school, index) => (
                                    <option key={index} value={school}>
                                        {school}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center space-x-4">
                            {/* Class Year Dropdown */}
                            <label className="block text-black font-medium">Class Year:</label>
                            <select
                                ref={(el) => {
                                    selectRefs.current.classYear = el;
                                }}
                                className="h-[25px] p-1 border-[1px] border-black rounded-md text-sm/[15px] text-left text-black select-dropdown"
                                value={formData.classYear}
                                onChange={(e) => handleSelectChange("classYear", e.target.value)}
                            >
                                <option value=""></option>
                                {Array.from({ length: 100 }, (_, i) => 2032 - i).map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center space-x-4">
                            <input
                                type="checkbox"
                                className="w-4 h-4"
                                checked={isGradSchool}
                                onChange={(e) => setIsGradSchool(e.target.checked)}
                            />
                            <label className="block text-black font-medium">
                                I currently attend or have been admitted into a graduate school
                            </label>
                        </div>

                        {/* Graduate School Dropdown (conditional) */}
                        {isGradSchool && (
                            <>
                                <div className="flex items-center space-x-4">
                                    <label className="block text-black font-medium">Graduate School:</label>
                                    <select
                                        ref={(el) => {
                                            selectRefs.current.graduateSchool = el;
                                        }}
                                        className="w-[155px] h-[25px] p-1 border-[1px] border-black rounded-md text-sm/[15px] text-left text-black select-dropdown"
                                        value={formData.graduateSchool}
                                        onChange={(e) => handleSelectChange("graduateSchool", e.target.value)}
                                    >
                                        <option value=""></option>
                                        {Constants.gradSchools.map((school, index) => (
                                            <option key={index} value={school}>
                                                {school}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <label className="text-black font-medium">Class Year:</label>
                                    <select
                                        className="min-w-[155px] w-auto max-w-fit h-[25px] p-1 border-[1px] border-black rounded-md text-sm/[15px] text-left text-black select-dropdown"
                                        value={gradClassYear}
                                        onChange={(e) => setGradClassYear(e.target.value)}
                                    >
                                        <option value=""></option>
                                        {Array.from({ length: 100 }, (_, i) => 2032 - i).map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <label className="block text-black font-medium">Degree Type:</label>
                                    <select
                                        className="min-w-[155px] w-auto max-w-fit h-[25px] p-1 border-[1px] border-black rounded-md text-sm/[15px] text-left text-black select-dropdown"
                                        value={degreeType}
                                        onChange={(e) => setDegreeType(e.target.value)}
                                    >
                                        <option value=""></option>
                                        <option value="Master's">Master's</option>
                                        <option value="PhD">PhD</option>
                                    </select>
                                </div>
                            </>
                        )}
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-4">
                        <label className="block text-black font-bold text-lg text-center">
                            Please select your 5 favorite hobbies/interests:
                        </label>

                        {/* Scrollable Hobby List */}
                        <div
                            ref={hobbyListRef}
                            className="flex flex-wrap gap-3 items-start pl-8 p-4 max-h-[20rem] overflow-y-auto snap-y scroll-smooth border-0 border-gray-300 rounded-md no-scrollbar">
                            {/* Show prioritized hobbies first */}
                            {[...prioritizedHobbies, ...remainingHobbies].map((hobby, index) => (
                                <FadeIn key={hobby} duration={index * 100}> {/* Fade-in effect */}
                                    <button
                                        data-hobby={hobby}
                                        className={`px-5 py-2 rounded-[17px] border-2 text-center text-black border-black font-medium text-sm transition-all duration-200
                    ${hobbies.includes(hobby)
                                                ? "bg-[#094333] text-white"
                                                : "bg-transparent hover:bg-[#094333] hover:text-white"
                                            }`}
                                        onClick={(e) => {
                                            if (hobby === "Other") {
                                                // Prevent closing input when clicking inside it
                                                e.preventDefault();
                                                if (!selectedOther) {
                                                    setSelectedOther(true);
                                                    handleHobbySelect(hobby);
                                                }
                                            } else {
                                                handleHobbySelect(hobby);
                                            }

                                            // If the third selection happens, scroll to first non-prioritized hobby
                                            if (hobbies.length === 2) {
                                                setTimeout(scrollToNextSet, 300);
                                            }
                                        }}
                                    >
                                        {hobby === "Other" ? (
                                            <div className="flex items-center gap-4 justify-start">
                                                Other
                                                {selectedOther && (
                                                    <input
                                                        type="text"
                                                        className="mt-2 border-2 rounded-full p-1 text-black w-3/4"
                                                        placeholder="Enter your hobby"
                                                        value={customInput}
                                                        onClick={(e) => e.stopPropagation()} // Prevents closing on click
                                                        onKeyDown={(e) => e.stopPropagation()} // Prevents closing when typing space
                                                        onChange={(e) => setCustomInput(e.target.value)}
                                                    />
                                                )}
                                            </div>
                                        ) : (
                                            hobby
                                        )}
                                    </button>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-4">
                        <h1 className="text-black text-xl">
                            Data Use Confirmation:
                        </h1>
                        <p className="text-black text-sm/7 text-justify">
                            By submitting this application, I hereby acknowledge and consent that BLACKIVY will collect, store, and use my personal
                            information for internal purposes only. These purposes include, but are not limited to, outreach, experience planning,
                            marketing initiatives, and enhancing the overall experience for BLACKIVY members. I understand that BLACKIVY will protect
                            my information in accordance with applicable privacy laws and will not share it with external parties without my explicit
                            consent unless required by law.
                        </p>
                        <div className="flex items-center space-x-4">
                            <input
                                type="checkbox"
                                className="w-4 h-4"
                                checked={isConfirmed}
                                onChange={(e) => {
                                    setIsConfirmed(e.target.checked);
                                    if (e.target.checked) {
                                        setErrorMessage(""); // Clear error message on check
                                    }
                                }}
                            />
                            <label className="text-black font-medium">
                                I Confirm
                            </label>
                        </div>
                        {/* Error Message */}
                        {errorMessage && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mt-3 text-sm">
                                {errorMessage}
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
            <Dialog.Content className="fixed inset-0 flex justify-center items-center z-50">
                <Dialog.Title className="sr-only">BlackIvy User Survey</Dialog.Title>

                {/* Modal Container */}
                <div className="relative bg-white rounded-2xl py-20 px-10 shadow-lg max-w-md w-full flex flex-col items-center">

                    {/* Logo Wrapper for Centered Border */}
                    <div className="relative flex justify-center">
                        {/* Logo */}
                        <Image
                            src="/B logo.png" // Replace with actual logo path
                            alt="BlackIvy Logo"
                            width={40}
                            height={40}
                            className="w-[60px] h-[62px] z-10 -mt-[7rem] ml-[2px]"
                        />
                        {/* Border */}
                        <div className="absolute -top-[5rem] -z-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[75px] w-[75px] border-[1.75rem] border-white rounded-full"></div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 w-full flex justify-center">{renderProgressBar()}</div>

                    {/* Page Content */}
                    <div className="mt-6 w-full">{renderPageContent()}</div>

                    {/* Navigation Buttons */}
                    <div className="flex flex-col-reverse gap-2 w-full mt-20">
                        <button
                            disabled={currentPage === 1}
                            onClick={prevPage}
                            className="text-black font-bold underline text-md px-4 py-2 w-full text-center"
                        >
                            Back
                        </button>
                        <button
                            onClick={() => {
                                if (currentPage === 5) {
                                    if (isConfirmed) {
                                        onOpenChange(false);
                                    } else {
                                        setErrorMessage("Please confirm the data use confirmation to continue.");
                                    }
                                } else {
                                    nextPage();
                                }
                            }}
                            className="bg-red-500 text-white text-md px-4 py-2 rounded-full w-[55%] m-auto shadow-lg"
                        >
                            {currentPage === 5 ? "Finish" : "Next"}
                        </button>
                    </div>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default BlackIvyUserSurveyModal;