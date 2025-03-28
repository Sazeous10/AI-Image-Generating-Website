import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
    });
    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);

    const generateImg = async () => {
        if (form.prompt) {
            try {
                setGeneratingImg(true);
                const response = await fetch("https://ai-image-generating-website.onrender.com/api/v1/dalle", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ prompt: form.prompt }),
                });
                const data = await response.json();
                setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
            } catch (error) {
                alert(error);
            } finally {
                setGeneratingImg(false);
            }
        } else {
            alert('Please enter a prompt');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.prompt && form.photo) {
            setLoading(true);
            try {
                const response = await fetch('https://ai-image-generating-website.onrender.com/api/v1/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                });
                await response.json();
                navigate('/');
            } catch (error) {
                alert(error);
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please enter a prompt and generate an image');
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({ ...form, prompt: randomPrompt });
    };
    return (
        <section className="max-w-7xl mx-auto">
            <div className='mt-10'>
            <div className='justify-items-center p-8 rounded-[20px] shadow-2xl border border-gray-300 bg-gray-100'>
            <div className='justify-items-center'>
                <h1 className="font-extrabold text-[#222328] text-[32px]">Generate Your Image</h1>
                <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
                    Imagine and Generate stunning images through AI
                </p>
                <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
                and post them at Imagify Gallery
                </p>
            </div>

            <hr class="border-t border-black border-[2px] w-full mt-5"></hr>

            <form className="mt-10 max-w-3xl" onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
                    <div className='flex flex-col gap-5'>
                    <FormField
                        LabelName="Your name"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={form.name}
                        handleChange={handleChange}
                    />
                    <FormField
                        LabelName="Prompt"
                        type="text"
                        name="prompt"
                        placeholder="a bowl of soup that looks like a monster, knitted out of wool"
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurpriseMe
                        handleSurpriseMe={handleSurpriseMe}
                    />
                    </div>
                    <div className='justify-items-center'>
                    <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 sm:w-80 sm:h-80 flex justify-center items-center shadow-xl">
                        {form.photo ? (
                            <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain" />
                        ) : (
                            <img src={preview} alt="preview" className="w-9/12 h-9/12 object-contain opacity-40" />
                        )}
                        {generatingImg && (
                            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                                <Loader />
                            </div>
                        )}
                    </div>
                    </div>
                </div>
                <div className="mt-5 flex gap-5 justify-self-center shadow-2xl">
                    <button
                        type="button"
                        onClick={generateImg}
                        className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:scale-105"
                    >
                        {generatingImg ? 'Generating...' : 'Generate'}
                    </button>
                </div>
                <div className="mt-10 justify-items-center">
                    <p className="mt-2 text-[#666e75] text-[14px]">
                        Post the generated image with others in the Imagify Gallery
                    </p>
                    <button
                        type="submit"
                        className="shadow-2xl mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:scale-105"
                    >
                        {loading ? 'Sharing...' : 'Share with the community'}
                    </button>
                </div>
            </form>
            </div>
            </div>
        </section>
    );
};

export default CreatePost;