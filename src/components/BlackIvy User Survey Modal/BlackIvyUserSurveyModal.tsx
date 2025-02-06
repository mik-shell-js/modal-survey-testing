import React, { useState, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../ui/Button/button";

interface BlackIvyUserSurveyModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const BlackIvyUserSurveyModal: React.FC<BlackIvyUserSurveyModalProps> = ({ open, onOpenChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState({ day: "", month: "", year: "" });
    const [location, setLocation] = useState("");
    const [employer, setEmployer] = useState("");
    const [undergradSchool, setUndergradSchool] = useState("");
    const [classYear, setClassYear] = useState("");
    const [graduateSchool, setGraduateSchool] = useState("");
    const [degreeType, setDegreeType] = useState("");
    const [hobbies, setHobbies] = useState<string[]>([]);
    const maxHobbies = 5;
    const pages = [1, 2, 3, 4, 5]; // Array to represent the total number of pages

    const renderProgressBar = () => {
        const progress = (currentPage / pages.length) * 100; // Calculate progress percentage

        return (
            <div className="mb-4">
                {/* Page Number */}
                <p className="text-center text-black font-bold text-lg mb-2">
                    {currentPage} out of {pages.length}
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 relative">
                    <div
                        style={{ width: `${progress}%` }}
                        className="bg-red-500 h-full rounded-full"
                    ></div>
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
                    <div className="space-y-4">
                        <div>
                            <label className="block text-black font-bold">Gender:</label>
                            <select
                                className="w-full p-2 border rounded-lg"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Non-Binary">Non-Binary</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-black font-bold">Date of Birth:</label>
                            <div className="flex space-x-2">
                                <select
                                    className="p-2 border rounded-lg"
                                    value={dateOfBirth.day}
                                    onChange={(e) => setDateOfBirth({ ...dateOfBirth, day: e.target.value })}
                                >
                                    <option value="">Day</option>
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                        <option key={day} value={day}>
                                            {day}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className="p-2 border rounded-lg"
                                    value={dateOfBirth.month}
                                    onChange={(e) => setDateOfBirth({ ...dateOfBirth, month: e.target.value })}
                                >
                                    <option value="">Month</option>
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
                                <select
                                    className="p-2 border rounded-lg"
                                    value={dateOfBirth.year}
                                    onChange={(e) => setDateOfBirth({ ...dateOfBirth, year: e.target.value })}
                                >
                                    <option value="">Year</option>
                                    {Array.from({ length: 100 }, (_, i) => 2025 - i).map((year) => (
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
                    <div className="space-y-4">
                        <div>
                            <label className="block text-black font-bold">Location:</label>
                            <select
                                className="w-full p-2 border rounded-lg"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                <option value="">Select Location</option>
                                <option value="USA">USA</option>
                                <option value="Canada">Canada</option>
                                <option value="UK">UK</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-black font-bold">Employer:</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-lg"
                                value={employer}
                                onChange={(e) => setEmployer(e.target.value)}
                                placeholder="Enter Employer"
                            />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-black font-bold">Undergrad School:</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-lg"
                                value={undergradSchool}
                                onChange={(e) => setUndergradSchool(e.target.value)}
                                placeholder="Enter Undergrad School"
                            />
                        </div>
                        <div>
                            <label className="block text-black font-bold">Class Year:</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-lg"
                                value={classYear}
                                onChange={(e) => setClassYear(e.target.value)}
                                placeholder="Enter Class Year"
                            />
                        </div>
                        <div>
                            <label className="block text-black font-bold">Graduate School:</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-lg"
                                value={graduateSchool}
                                onChange={(e) => setGraduateSchool(e.target.value)}
                                placeholder="Enter Graduate School"
                            />
                        </div>
                        <div>
                            <label className="block text-black font-bold">Degree Type:</label>
                            <select
                                className="w-full p-2 border rounded-lg"
                                value={degreeType}
                                onChange={(e) => setDegreeType(e.target.value)}
                            >
                                <option value="">Select Degree Type</option>
                                <option value="Bachelor's">Bachelor's</option>
                                <option value="Master's">Master's</option>
                                <option value="PhD">PhD</option>
                            </select>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-2">
                        <label className="block text-black font-bold">
                            Please select your 5 favorite hobbies/interests:
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {["Art & Crafts", "Cooking & Baking", "Fitness & Wellness", "Gaming", "Music"].map(
                                (hobby) => (
                                    <button
                                        key={hobby}
                                        className={`p-2 rounded-lg border ${hobbies.includes(hobby) ? "bg-red-500 text-white" : "bg-white"
                                            }`}
                                        onClick={() => handleHobbySelect(hobby)}
                                    >
                                        {hobby}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div>
                        <p className="text-black text-sm">
                            By submitting this application, I acknowledge and consent to BlackIvy's data policies.
                        </p>
                        <Button
                            className="mt-4 bg-red-500 text-white w-full"
                            onClick={() => onOpenChange(false)} // Pass 'false' to close the modal
                        >
                            I Confirm
                        </Button>
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
                <div className="relative bg-yellow-300 rounded-lg p-6 shadow-lg max-w-md w-full">
                    {/* Logo */}
                    <img
                        src="/orange B logo.png" // Replace with the actual logo path
                        alt="BlackIvy Logo"
                        className="absolute top-[-45px] left-1/2 transform -translate-x-1/2 h-auto w-12"
                    />

                    {/* Progress Bar */}
                    {renderProgressBar()}

                    {/* Page Content */}
                    {renderPageContent()}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-6">
                        <Button
                            disabled={currentPage === 1}
                            onClick={prevPage}
                            className="bg-gray-300 text-black px-4 py-2 rounded-lg"
                        >
                            Back
                        </Button>
                        <Button
                            onClick={nextPage}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                            {currentPage === 5 ? "Finish" : "Next"}
                        </Button>
                    </div>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default BlackIvyUserSurveyModal;