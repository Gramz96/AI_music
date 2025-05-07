// pages/index.js
import React, { useState } from "react";

export default function MusicGenerator() {
  const [mood, setMood] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const handleGenerate = async () => {
    if (!mood || !genre) {
      alert("Please select mood and genre");
      return;
    }

    setLoading(true);
    setAudioUrl(null);

    try {
      // Replace this URL with your backend API endpoint
      const response = await fetch("/api/generate-music", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, genre }),
      });

      const data = await response.json();
      setAudioUrl(data.audioUrl);
    } catch (err) {
      console.error(err);
      alert("Error generating music");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-4">AI Music Generator</h1>
      <p className="text-lg text-gray-600 mb-8">Select a mood and genre to generate your custom music track</p>

      <div className="flex flex-col space-y-4 w-full max-w-sm">
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Mood</option>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="chill">Chill</option>
          <option value="energetic">Energetic</option>
        </select>

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Genre</option>
          <option value="reggae">Reggae</option>
          <option value="afrobeat">Afrobeats</option>
          <option value="hiphop">Hip Hop</option>
          <option value="pop">pop</option>
        </select>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Language</option>
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="french">French</option>
          <option value="swahili">Swahili</option>
        </select>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Music"}
        </button>
      </div>

      {audioUrl && (
        <div className="mt-8 text-center">
          <audio controls src={audioUrl} className="mb-4" />
          <a
            href={audioUrl}
            download="generated-music.mp3"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
