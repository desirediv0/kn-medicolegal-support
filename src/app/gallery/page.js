"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayCircle, X } from "lucide-react";

const images = [
    { src: "/hero-banner1.jpg", title: "Workshop: Risk Management", description: "In-person training session" },
    { src: "/dr-kohli.png", title: "Expert Panel", description: "Medicolegal discussion" },
    { src: "/dr-narula.png", title: "Clinical Guidance", description: "Case preparation" },
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

    const openModal = (item, type) => {
        setModalItem(item);
        setModalType(type);
    };

    const closeModal = () => {
        setModalItem(null);
        setModalType(null);
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
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {images.map((img) => (
                                <button
                                    key={img.src}
                                    onClick={() => openModal(img, "image")}
                                    className="group rounded-lg border border-gray-200 bg-white overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
                                >
                                    <div className="relative aspect-[4/3] w-full">
                                        <Image
                                            src={img.src}
                                            alt={img.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                                        />
                                    </div>
                                    <div className="p-4 space-y-1">
                                        <h3 className="text-sm font-semibold text-gray-900">{img.title}</h3>
                                        <p className="text-xs text-gray-600">{img.description}</p>
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
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                            <div>
                                <h3 className="text-base font-semibold text-gray-900">{modalItem.title}</h3>
                                {modalItem.description && <p className="text-xs text-gray-600">{modalItem.description}</p>}
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                aria-label="Close modal"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="bg-black">
                            {modalType === "image" && (
                                <div className="relative w-full h-full min-h-[320px]">
                                    <div className="relative aspect-[16/9] w-full">
                                        <Image
                                            src={modalItem.src}
                                            alt={modalItem.title}
                                            fill
                                            className="object-contain bg-black"
                                            sizes="100vw"
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
