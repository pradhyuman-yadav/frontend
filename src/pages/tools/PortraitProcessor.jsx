import React, { useState, useRef } from "react";
import styles from "./PortraitProcessor.module.css";

const PortraitProcessor = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backgroundStyle, setBackgroundStyle] = useState("solid");
  const [outputFormat, setOutputFormat] = useState("jpeg");
  const [analysis, setAnalysis] = useState(null);
  const fileInputRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match(/image\/(jpeg|png|webp)/)) {
      setError("Please select a valid image file (JPEG, PNG, or WebP)");
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB");
      return;
    }

    setSelectedImage(file);
    setError(null);

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleProcessPortrait = async () => {
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    setLoading(true);
    setError(null);
    setProcessedImage(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("background_style", backgroundStyle);
      formData.append("output_format", outputFormat);

      const response = await fetch(
        `${API_URL}/tools/portrait-processor`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to process portrait");
      }

      const data = await response.json();

      if (data.success) {
        setProcessedImage(data.data.processed_image);
        setAnalysis(data.data.analysis);
      } else {
        setError(data.message || "Failed to process portrait");
      }
    } catch (err) {
      setError(err.message || "An error occurred while processing the portrait");
      console.error("Portrait processing error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;

    // Convert base64 to blob
    const base64Data = processedImage.split(",")[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: `image/${outputFormat}` });

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `portrait-processed-${new Date().getTime()}.${outputFormat}`;
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPreviewImage(null);
    setProcessedImage(null);
    setAnalysis(null);
    setError(null);
    setBackgroundStyle("solid");
    setOutputFormat("jpeg");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Portrait Processor</h1>
        <p>
          Transform your portrait with professional enhancements and custom backgrounds
        </p>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.uploadSection}>
          <div
            className={styles.uploadBox}
            onClick={() => fileInputRef.current?.click()}
            style={{
              cursor: "pointer",
              borderColor: error ? "#ff4444" : "inherit",
            }}
          >
            {previewImage ? (
              <div className={styles.previewContainer}>
                <img src={previewImage} alt="Preview" className={styles.previewImage} />
                <p className={styles.fileName}>{selectedImage?.name}</p>
              </div>
            ) : (
              <div className={styles.uploadPrompt}>
                <svg
                  className={styles.uploadIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <p>Click to select or drag and drop your portrait</p>
                <p className={styles.fileInfo}>JPEG, PNG, or WebP • Max 10MB</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageSelect}
              className={styles.fileInput}
            />
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}
        </div>

        <div className={styles.controlsSection}>
          <div className={styles.controlGroup}>
            <label htmlFor="background-style">Background Style</label>
            <select
              id="background-style"
              value={backgroundStyle}
              onChange={(e) => setBackgroundStyle(e.target.value)}
              disabled={loading}
              className={styles.select}
            >
              <option value="solid">Solid Color</option>
              <option value="gradient">Gradient</option>
              <option value="blur">Blurred</option>
            </select>
          </div>

          <div className={styles.controlGroup}>
            <label htmlFor="output-format">Output Format</label>
            <select
              id="output-format"
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              disabled={loading}
              className={styles.select}
            >
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
            </select>
          </div>

          <button
            onClick={handleProcessPortrait}
            disabled={!selectedImage || loading}
            className={styles.processButton}
          >
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                Processing...
              </>
            ) : (
              "Process Portrait"
            )}
          </button>

          {selectedImage && !processedImage && (
            <button onClick={handleReset} className={styles.resetButton}>
              Clear
            </button>
          )}
        </div>
      </div>

      {processedImage && (
        <div className={styles.resultsSection}>
          <h2>Processed Portrait</h2>

          <div className={styles.imageComparison}>
            <div className={styles.comparisonItem}>
              <h3>Original</h3>
              <img src={previewImage} alt="Original" />
            </div>

            <div className={styles.comparisonItem}>
              <h3>Processed</h3>
              <img src={processedImage} alt="Processed" />
            </div>
          </div>

          {analysis && (
            <div className={styles.analysisSection}>
              <h3>Analysis Details</h3>
              <div className={styles.analysisGrid}>
                <div className={styles.analysisItem}>
                  <span className={styles.label}>Face Detected:</span>
                  <span className={styles.value}>
                    {analysis.face_detected ? "Yes" : "No"}
                  </span>
                </div>
                <div className={styles.analysisItem}>
                  <span className={styles.label}>Original Size:</span>
                  <span className={styles.value}>
                    {analysis.original_size?.[0]}x{analysis.original_size?.[1]}px
                  </span>
                </div>
                <div className={styles.analysisItem}>
                  <span className={styles.label}>Background Style:</span>
                  <span className={styles.value}>
                    {analysis.background_style}
                  </span>
                </div>
                <div className={styles.analysisItem}>
                  <span className={styles.label}>Output Format:</span>
                  <span className={styles.value}>{analysis.output_format}</span>
                </div>
              </div>
            </div>
          )}

          <div className={styles.actionButtons}>
            <button onClick={handleDownload} className={styles.downloadButton}>
              Download
            </button>
            <button onClick={handleReset} className={styles.newButton}>
              Process Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortraitProcessor;