'use client';

import React, { useState } from 'react';
import { fal } from "@fal-ai/client";

export default function ImageGenerator() {
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateImage = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const stream = await fal.stream("workflows/bakursky/landscape-image-generation", {
        input: {
        }
      });

      let finalResult = null;
      for await (const event of stream) {
        console.log("Streaming event:", event);
      }

      const result = await stream.done();
      console.log("Final result:", result);

      // Extract the URL from the result
      if (result.output && result.output.images && result.output.images.length > 0) {
        const imageUrl = result.output.images[0].url;
        setGeneratedImage(imageUrl);
      } else {
        throw new Error("No image URL found in the result");
      }
    } catch (err) {
      console.error("Detailed error:", err);
      setError(`Image generation failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <button 
        onClick={generateImage} 
        disabled={isLoading}
        className={`
          px-4 py-2 rounded 
          ${isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 text-white hover:bg-blue-600'
          }
        `}
      >
        {isLoading ? 'Generating...' : 'Generate Landscape'}
      </button>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {generatedImage && (
        <div className="mt-4">
          <img 
            src={generatedImage} 
            alt="Generated Landscape" 
            className="max-w-full h-auto rounded shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
