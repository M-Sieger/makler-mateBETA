// 📁 src/components/ExportButtons.jsx

import React from 'react';

import {
  exportExposeWithImages as exportExposeAsPDF,
} from '../utils/pdfExportExpose'; // 📄 PDF-Export mit GPT-Text + Bildern

export default function ExportButtons({ formData, output, selectedStyle }) {
  // 📁 JSON als Datei speichern
  const handleExportJSON = () => {
    const fullData = { ...formData, output, selectedStyle };
    const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expose-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // 📋 GPT-Text in Zwischenablage kopieren
  const handleCopy = () => {
    const safeText = typeof output === 'string' ? output : JSON.stringify(output, null, 2);
    navigator.clipboard.writeText(safeText);
    alert('📋 Text kopiert!');
  };

  // 📄 PDF exportieren
  const handleExportPDF = async () => {
    try {
      const gptText =
        typeof output === 'string'
          ? output
          : output?.text || output?.content || '[Kein GPT-Text]';

      const images = (formData?.images || []).filter(img =>
        typeof img === 'string' && img.startsWith('data:image')
      );
      const captions = Array.isArray(formData?.captions)
        ? formData.captions
        : images.map(() => '');

      await exportExposeAsPDF(gptText, images, captions);
    } catch (error) {
      console.error('❌ Fehler beim PDF-Export:', error);
    }
  };

  return (
    <div className="button-group">
      {/* 🟨 Sekundärbutton: JSON exportieren */}
      <button className="btn btn-secondary" onClick={handleExportJSON}>
        📁 JSON exportieren
      </button>

      {/* 🟨 Sekundärbutton: Text kopieren */}
      <button className="btn btn-secondary" onClick={handleCopy}>
        📋 Text kopieren
      </button>

      {/* 🔵 Primärbutton: PDF exportieren */}
      <button className="btn btn-secondary" onClick={handleExportPDF}>
  📄 PDF exportieren
</button>
    </div>
  );
}
