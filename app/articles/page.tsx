"use client";
import axios from 'axios';
import React, { useState } from 'react';
import Loader from '../components/common/Loader';
import { poppin } from '../constants';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

const Page = () => {
    const [langs, setLangs] = useState('en');
    const [prompt, setPrompt] = useState('');
    const [articles, setArticles] = useState([]);
    const [updates, setUpdates] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    const handlePage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const devToResponse = await axios.get(`https://dev.to/api/articles?tag=${prompt}`);
            const newsResponse = await axios.get(`https://newsapi.org/v2/everything?q=${prompt}&apiKey=dda8db681ab74cae8f51713585f96c33`);
            const youtubeResponse = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=latest updates on ${prompt} technology &key=AIzaSyB6WhAhKuxBslBDYIS2pfuM6SpsDuAFQrw`);
            console.log("dd")
            console.log(youtubeResponse)
            setArticles(devToResponse.data.slice(0, 5));
            setUpdates(newsResponse.data.articles.slice(0, 5));
            setVideos(youtubeResponse.data.items.slice(0, 5));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen w-full relative p-5">
            <div className="flex flex-col items-center mb-10">
                <h3 className={`${poppin.className} text-2xl font-medium text-center mb-4`}>
                Stay Informed: Your One-Stop Shop for Latest News with
                    <span className='textColorBg shadow'>
                    Text and Videos
                    </span>
                </h3>
                <p className={`${poppin.className} text-lg w-full max-w-5xl text-center leading-8`}>
                Drowning in news? Cut through the clutter with a platform offering the latest updates, articles, and videos – all in one place. Stay informed, stay engaged.
                </p>
            </div>

            <form className="w-full max-w-md mx-auto mb-10" onSubmit={handlePage}>
                <div className="relative rounded-lg overflow-hidden">
                    <input
                        placeholder="Enter your prompt"
                        className={`relative pr-20 bg-transparent ring-0 outline-none border border-neutral-500 text-white placeholder-white text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 ${poppin.className}`}
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <button type="submit" className="absolute right-4 top-1 text-2xl text-white cursor-pointer">
                        <ArrowForwardIcon style={{ fontSize: '1.7rem !important' }} />
                    </button>
                </div>
            </form>

            <div className="min-h-[50%] px-4 flex flex-wrap items-center justify-evenly">
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        {articles.length > 0 && (
                            <div className="w-full mb-10">
                                <h4 className={`${poppin.className} text-xl mb-4`}>Dev.to Articles:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {articles.map((article: any, index: number) => (
                                        <div key={index} className={`border border-rose-300 p-3 rounded-lg ${poppin.className}`}>
                                            <img src={article.cover_image} alt={article.title} className="w-full h-48 object-cover rounded-md mb-3" />
                                            <h5 className="font-bold">{article.title}</h5>
                                            <p>{article.description}</p>
                                            <a href={article.url} target="_blank" className="text-blue-500">Read more</a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {updates.length > 0 && (
                            <div className="w-full mb-10">
                                <h4 className={`${poppin.className} text-xl mb-4`}>Latest Updates:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {updates.map((update: any, index: number) => (
                                        <div key={index} className={`border border-rose-300 p-3 rounded-lg ${poppin.className}`}>
                                            {/* <img src={update.urlToImage} alt={update.title} className="w-full h-48 object-cover rounded-md mb-3" /> */}
                                            <h5 className="font-bold">{update.title}</h5>
                                            <p>{update.description}</p>
                                            <a href={update.url} target="_blank" className="text-blue-500">Read more</a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {videos.length > 0 && (
                            <div className="w-full">
                                <h4 className={`${poppin.className} text-xl mb-4`}>YouTube Channels:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {videos.map((video: any, index: number) => (
                                        <div key={index} className={`border border-rose-300 p-3 rounded-lg ${poppin.className}`}>
                                            <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} className="w-full h-48 object-cover rounded-md mb-3" />
                                            <h5 className="font-bold mb-2">{video.snippet.title}</h5>
                                            <p className='mb-2'>{video.snippet.description}</p>
                                            <Link href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" className="text-blue-500">Watch video</Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default Page;




