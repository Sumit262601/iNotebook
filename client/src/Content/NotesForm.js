import React from 'react';
import { FaImage } from 'react-icons/fa6';
import { MdEmojiEmotions } from 'react-icons/md';
import { FaListOl } from "react-icons/fa";

const Toolbar = () => {
    return (
        <div className="flex flex-wrap items-center divide-white sm:divide-x sm:rtl:divide-x-reverse dark:divide-white">
            <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                <button
                    type="button"
                    className="p-2 text-white text-xl rounded cursor-pointer hover:bg-[#7AB2B2] dark:text-gray-400"
                >
                    <FaImage />
                    <span className="sr-only">Upload image</span>
                </button>

                <button
                    type="button"
                    className="p-2 text-white text-xl rounded cursor-pointer hover:bg-[#7AB2B2] dark:text-gray-400"
                >
                    <MdEmojiEmotions />
                    <span className="sr-only">Add emoji</span>
                </button>
            </div>

            <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
                <button
                    type="button"
                    className="p-2 text-white text-xl rounded cursor-pointer hover:bg-[#7AB2B2] dark:text-gray-400"
                >
                    <FaListOl />
                    <span className="sr-only">Add list</span>
                </button>
            </div>
        </div>
    );
}

export default Toolbar;
