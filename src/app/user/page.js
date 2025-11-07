"use client";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Paperclip, Send, X, PaperclipIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function User() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        const newFiles = acceptedFiles.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        );
        setFiles((prev) => [...prev, ...newFiles]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true,
    });

    const handleRemoveFile = (file) => {
        setFiles((prev) => prev.filter((f) => f.name !== file.name));
    };

    const handleSend = () => {
        if (!input.trim() && files.length === 0) return;

        const newMessage = {
            id: Date.now(),
            text: input.trim(),
            files,
            sender: "user",
        };

        setMessages((prev) => [...prev, newMessage]);
        setInput("");
        setFiles([]);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white text-black">
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-sm p-3 rounded-2xl ${msg.sender === "user"
                                ? "bg-gray-200 text-black"
                                : "bg-gray-100 text-gray-800"
                                }`}
                        >
                            {msg.text && <p className="text-sm">{msg.text}</p>}
                            {msg.files?.length > 0 && (
                                <div className="mt-2 space-y-1">
                                    {msg.files.map((file) => (
                                        <div
                                            key={file.name}
                                            className="flex items-center gap-2 text-xs bg-gray-50 border border-gray-200 rounded-lg px-2 py-1"
                                        >
                                            <Paperclip size={14} />
                                            <span className="truncate">{file.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Upload preview */}
            {files.length > 0 && (
                <div className="flex flex-wrap gap-2 px-4 pb-2">
                    {files.map((file) => (
                        <div
                            key={file.name}
                            className="relative bg-gray-100 border border-gray-300 rounded-lg p-2 flex items-center gap-2"
                        >
                            <span className="text-xs truncate max-w-[120px]">{file.name}</span>
                            <button
                                onClick={() => handleRemoveFile(file)}
                                className="absolute -top-1 -right-1 bg-gray-200 hover:bg-gray-300 rounded-full p-0.5"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Input Bar */}
            <div className="p-4 border-t border-gray-300 bg-gray-50">
                <div className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-2 gap-2 max-w-6xl mx-auto">
                    {/* File upload button */}
                    <div {...getRootProps()} className="cursor-pointer">
                        <Input {...getInputProps()} />
                        <PaperclipIcon className="text-gray-500 hover:text-black" size={20} />
                    </div>

                    {/* Input field */}
                    <textarea
                        className="flex-1 bg-transparent outline-none resize-none text-sm text-black placeholder-gray-500 py-1"
                        rows={1}
                        placeholder="Ask anything"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />

                    {/* Send button */}
                    <Button
                        onClick={handleSend}
                        className="bg-green-500 hover:bg-green-600 text-white rounded-full px-3 py-2 transition-all"
                    >
                        <Send size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
