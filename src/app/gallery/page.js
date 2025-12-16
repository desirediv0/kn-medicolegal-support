"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayCircle, X } from "lucide-react";

const images = [
    { src: "/gallery/img1.jpeg" },
    { src: "/gallery/img2.jpeg" },
    { src: "/gallery/img3.jpeg" },
    { src: "/gallery/img4.jpeg" },
    { src: "/gallery/img5.jpeg" },
    { src: "/gallery/img6.jpeg" },
    { src: "/gallery/img7.jpeg" },
    { src: "/gallery/img8.jpeg" },
    { src: "/gallery/img9.jpeg" },
];

const videos = [
    {
        title: "Medicolegal Compliance Overview",
        description: "Key compliance checkpoints for hospitals",
        embedUrl: "https://www.youtube.com/embed/Bey4XXJAqS8",
    },
    {
        title: "Handling Legal Notices",
        description: "Step-by-step approach for clinicians",
        embedUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
    },
];

export default function GalleryPage() {
    const [activeTab, setActiveTab] = useState("images");
    const [modalItem, setModalItem] = useState(null);
    const [modalType, setModalType] = useState(null); // "image" or "video"
    const [modalImageIndex, setModalImageIndex] = useState(null);

    const openModal = (item, type, index = null) => {
        setModalItem(item);
        setModalType(type);
        setModalImageIndex(index);
    };

    const closeModal = () => {
        setModalItem(null);
        setModalType(null);
        setModalImageIndex(null);
    };

    return (
        <main className="min-h-screen bg-white text-gray-900">
            {/* Header */}
            <section className="border-b border-gray-200 bg-gray-50">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 md:py-16 lg:px-16">
                    <div className="max-w-4xl space-y-3">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900">Gallery</h1>
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                            A documentation-style collection of images and videos from workshops, training, and medicolegal sessions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Tabs */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
                    <div className="flex gap-1 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab("images")}
                            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === "images" ? "border-gray-900 text-gray-900" : "border-transparent text-gray-600"
                                }`}
                        >
                            Images
                        </button>
                        <button
                            onClick={() => setActiveTab("videos")}
                            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === "videos" ? "border-gray-900 text-gray-900" : "border-transparent text-gray-600"
                                }`}
                        >
                            Videos
                        </button>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 md:py-16">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
                    {activeTab === "images" && (
                        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {images.map((img, index) => (
                                <button
                                    key={img.src}
                                    onClick={() => openModal(img, "image", index)}
                                    className="group relative rounded-lg border border-gray-200 bg-white overflow-hidden focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all hover:shadow-lg hover:border-gray-300"
                                >
                                    <div className="relative aspect-[4/3] w-full">
                                        <Image
                                            src={img.src}
                                            alt={`Gallery Image ${index + 1}`}
                                            fill
                                            className={`object-cover ${index === 1 ? 'object-top' : ''} group-hover:scale-105 transition-transform duration-300`}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {activeTab === "videos" && (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {videos.map((vid) => (
                                <button
                                    key={vid.title}
                                    onClick={() => openModal(vid, "video")}
                                    className="group rounded-lg border border-gray-200 bg-white overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
                                >
                                    <div className="relative aspect-video w-full bg-gray-100 flex items-center justify-center">
                                        <PlayCircle className="h-10 w-10 text-gray-700" />
                                    </div>
                                    <div className="p-4 space-y-1">
                                        <h3 className="text-sm font-semibold text-gray-900">{vid.title}</h3>
                                        <p className="text-xs text-gray-600">{vid.description}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Modal */}
            {modalItem && (
                <div
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-lg max-w-5xl w-full overflow-hidden shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-end px-4 py-3 border-b border-gray-200">
                            <button
                                onClick={closeModal}
                                className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                aria-label="Close modal"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="bg-black">
                            {modalType === "image" && modalItem && (
                                <div className="relative w-full flex items-center justify-center" style={{ minHeight: '400px', maxHeight: '90vh', height: '80vh' }}>
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={modalItem.src}
                                            alt="Gallery Image"
                                            fill
                                            className={`bg-black ${modalImageIndex === 1 ? 'object-top object-cover' : 'object-contain'}`}
                                            sizes="100vw"
                                            priority
                                        />
                                    </div>
                                </div>
                            )}
                            {modalType === "video" && (
                                <div className="relative aspect-video w-full">
                                    <iframe
                                        src={modalItem.embedUrl}
                                        title={modalItem.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
