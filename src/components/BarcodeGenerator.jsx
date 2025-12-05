import { useState, useRef, useEffect } from 'react'
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode'
import { saveAs } from 'file-saver'
import html2canvas from 'html2canvas'
import './BarcodeGenerator.css'

const BarcodeGenerator = () => {
  const [text, setText] = useState('Hello World! QR Code Generator')
  const [codeType, setCodeType] = useState('QR') // 'QR' atau 'BARCODE'
  const [format, setFormat] = useState('CODE128')
  const [width, setWidth] = useState(2)
  const [height, setHeight] = useState(100)
  const [displayValue, setDisplayValue] = useState(true)
  const [fontSize, setFontSize] = useState(20)
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF')
  const [lineColor, setLineColor] = useState('#000000')
  const [margin, setMargin] = useState(10)
  
  // QR Code specific settings
  const [qrSize, setQrSize] = useState(300)
  const [qrErrorLevel, setQrErrorLevel] = useState('M')
  
  // Advanced background options
  const [backgroundType, setBackgroundType] = useState('solid') // 'solid', 'gradient', 'pattern'
  const [gradientColor1, setGradientColor1] = useState('#ffffff')
  const [gradientColor2, setGradientColor2] = useState('#f0f9ff')
  const [gradientDirection, setGradientDirection] = useState('45')
  const [pattern, setPattern] = useState('dots')
  const [borderRadius, setBorderRadius] = useState(0)
  const [shadow, setShadow] = useState(false)
  
  const canvasRef = useRef(null)
  const downloadRef = useRef(null)

  // Format barcode yang tersedia
  const barcodeFormats = [
    'CODE128', 'CODE39', 'EAN13', 'EAN8', 'UPC', 
    'ITF14', 'MSI', 'pharmacode', 'codabar'
  ]

  // Get dynamic background color
  const getDynamicBackground = () => {
    if (backgroundType === 'gradient') {
      return `linear-gradient(${gradientDirection}deg, ${gradientColor1}, ${gradientColor2})`
    }
    return backgroundColor
  }

  // Generate QR Code atau Barcode
  useEffect(() => {
    if (canvasRef.current && text) {
      try {
        const bgColor = backgroundType === 'solid' ? backgroundColor : '#ffffff'
        
        if (codeType === 'QR') {
          // Generate QR Code
          QRCode.toCanvas(canvasRef.current, text, {
            width: qrSize,
            margin: margin / 10,
            color: {
              dark: lineColor,
              light: bgColor
            },
            errorCorrectionLevel: qrErrorLevel
          })
        } else {
          // Generate Barcode
          JsBarcode(canvasRef.current, text, {
            format: format,
            width: width,
            height: height,
            displayValue: displayValue,
            fontSize: fontSize,
            background: bgColor,
            lineColor: lineColor,
            margin: margin,
            textAlign: "center",
            textPosition: "bottom",
            textMargin: 2,
            fontOptions: "",
            font: "monospace"
          })
        }
      } catch (error) {
        console.error('Error generating code:', error)
      }
    }
  }, [text, codeType, format, width, height, displayValue, fontSize, backgroundColor, lineColor, margin, qrSize, qrErrorLevel, backgroundType, gradientColor1, gradientColor2])

  // Download sebagai PNG
  const downloadPNG = async () => {
    if (downloadRef.current) {
      try {
        const canvas = await html2canvas(downloadRef.current, {
          backgroundColor: backgroundColor,
          scale: 2
        })
        canvas.toBlob((blob) => {
          const fileName = codeType === 'QR' 
            ? `qrcode-${text.substring(0, 10)}.png`
            : `barcode-${text}.png`
          saveAs(blob, fileName)
        })
      } catch (error) {
        console.error('Error downloading PNG:', error)
      }
    }
  }

  // Download sebagai SVG
  const downloadSVG = async () => {
    try {
      if (codeType === 'QR') {
        // Generate QR Code SVG
        const svgString = await QRCode.toString(text, {
          type: 'svg',
          width: qrSize,
          margin: margin / 10,
          color: {
            dark: lineColor,
            light: backgroundColor
          },
          errorCorrectionLevel: qrErrorLevel
        })
        const blob = new Blob([svgString], { type: 'image/svg+xml' })
        saveAs(blob, `qrcode-${text.substring(0, 10)}.svg`)
      } else {
        // Generate Barcode SVG
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        JsBarcode(svg, text, {
          format: format,
          width: width,
          height: height,
          displayValue: displayValue,
          fontSize: fontSize,
          background: backgroundColor,
          lineColor: lineColor,
          margin: margin
        })
        
        const svgData = new XMLSerializer().serializeToString(svg)
        const blob = new Blob([svgData], { type: 'image/svg+xml' })
        saveAs(blob, `barcode-${text}.svg`)
      }
    } catch (error) {
      console.error('Error downloading SVG:', error)
    }
  }

  // Generate random content
  const generateRandom = () => {
    if (codeType === 'QR') {
      const sampleTexts = [
        'https://www.google.com',
        'Hello World from QR Code!',
        'Contact: +6281234567890',
        'Email: example@gmail.com',
        'WiFi:WIFI:T:WPA;S:MyNetwork;P:password123;;',
        'Location: Jakarta, Indonesia',
        `Generated on ${new Date().toLocaleDateString()}`
      ]
      const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)]
      setText(randomText)
    } else {
      const randomNum = Math.floor(Math.random() * 1000000000000).toString()
      setText(randomNum)
    }
  }

  // Preset QR Code templates
  const qrPresets = [
    { name: '📱 Website URL', value: 'https://www.example.com' },
    { name: '📧 Email', value: 'mailto:example@gmail.com' },
    { name: '📞 Phone', value: 'tel:+6281234567890' },
    { name: '📍 Location', value: 'geo:37.7749,-122.4194' },
    { name: '📶 WiFi', value: 'WIFI:T:WPA;S:NetworkName;P:password123;;' },
    { name: '💬 SMS', value: 'sms:+6281234567890?body=Hello!' }
  ]

  const usePreset = (preset) => {
    setText(preset.value)
    setCodeType('QR')
  }

  return (
    <div className="barcode-generator">
      <div className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">⚡</div>
            <h1>CodeGen Pro</h1>
          </div>
          <p className="subtitle">Professional QR Code & Barcode Generator</p>
          <div className="features-tags">
            <span className="feature-tag">📱 QR Codes</span>
            <span className="feature-tag">🏷️ Barcodes</span>
            <span className="feature-tag">🎨 Custom Design</span>
            <span className="feature-tag">📥 HD Download</span>
          </div>
        </div>
      </div>

      <div className="generator-container">
        <div className="controls">
          <div className="control-section">
            <h3>📝 Data & Type</h3>
            
            <div className="control-group">
              <label htmlFor="codeType" className="tooltip-label">
                Type:
                <span className="tooltip">
                  Pilih jenis code yang ingin dibuat. QR Code untuk data kompleks (URL, text panjang), Barcode untuk angka/text sederhana
                </span>
              </label>
              <select
                id="codeType"
                value={codeType}
                onChange={(e) => {
                  setCodeType(e.target.value)
                  if (e.target.value === 'QR') {
                    setText('Hello World! QR Code Generator')
                  } else {
                    setText('1234567890')
                  }
                }}
                className="type-selector"
              >
                <option value="QR">🔲 QR Code (Untuk URL, Text, Data)</option>
                <option value="BARCODE">🏷️ Barcode (Untuk Produk, Inventory)</option>
              </select>
            </div>

            <div className="control-group">
              <label htmlFor="text">{codeType === 'QR' ? 'Text/URL/Data:' : 'Text/Number:'}:</label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={codeType === 'QR' ? 'Masukkan text, URL, atau data lainnya' : 'Masukkan text atau angka'}
                rows={codeType === 'QR' ? 3 : 1}
              />
            </div>
            
            {codeType === 'BARCODE' && (
              <div className="control-group">
                <label htmlFor="format" className="tooltip-label">
                  Barcode Format:
                  <span className="tooltip">
                    Pilih format barcode sesuai kebutuhan. CODE128 untuk text/angka umum, EAN13 untuk produk retail
                  </span>
                </label>
                <select
                  id="format"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                >
                  <option value="CODE128">CODE128 - Umum untuk text/angka</option>
                  <option value="CODE39">CODE39 - Industri/inventory</option>
                  <option value="EAN13">EAN13 - Produk retail (13 digit)</option>
                  <option value="EAN8">EAN8 - Produk kecil (8 digit)</option>
                  <option value="UPC">UPC - Amerika/Kanada</option>
                  <option value="ITF14">ITF14 - Distribusi/packaging</option>
                  <option value="MSI">MSI - Inventory/warehouse</option>
                  <option value="pharmacode">Pharmacode - Farmasi</option>
                  <option value="codabar">Codabar - Perpustakaan/darah</option>
                </select>
              </div>
            )}

            {codeType === 'QR' && (
              <div className="control-group">
                <label htmlFor="qrErrorLevel" className="tooltip-label">
                  Error Correction:
                  <span className="tooltip">
                    Level koreksi error QR Code. Semakin tinggi, semakin tahan terhadap kerusakan tapi QR lebih complex
                  </span>
                </label>
                <select
                  id="qrErrorLevel"
                  value={qrErrorLevel}
                  onChange={(e) => setQrErrorLevel(e.target.value)}
                >
                  <option value="L">Low (~7%) - Untuk QR bersih</option>
                  <option value="M">Medium (~15%) - Standar umum</option>
                  <option value="Q">Quartile (~25%) - Tahan lecet ringan</option>
                  <option value="H">High (~30%) - Maksimal perlindungan</option>
                </select>
              </div>
            )}

            <button onClick={generateRandom} className="random-btn" title={`Generate random ${codeType === 'QR' ? 'QR Code data (URL, email, text)' : 'barcode number'} untuk testing`}>
              🎲 Generate Random {codeType === 'QR' ? 'QR Code' : 'Barcode'}
            </button>

            {codeType === 'QR' && (
              <div className="presets-section">
                <h4>📋 Quick Presets:</h4>
                <div className="presets-grid">
                  {qrPresets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => usePreset(preset)}
                      className="preset-btn"
                      title={preset.value}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="control-section">
            <h3>📏 Ukuran & Dimensi</h3>
            
            {codeType === 'QR' ? (
              <div className="control-group">
                <label htmlFor="qrSize">QR Size:</label>
                <div className="range-input">
                  <input
                    id="qrSize"
                    type="range"
                    min="150"
                    max="500"
                    value={qrSize}
                    onChange={(e) => setQrSize(parseInt(e.target.value))}
                  />
                  <span className="range-value">{qrSize}px</span>
                </div>
              </div>
            ) : (
              <div className="control-row">
                <div className="control-group">
                  <label htmlFor="width">Width:</label>
                  <div className="range-input">
                    <input
                      id="width"
                      type="range"
                      min="1"
                      max="5"
                      step="0.5"
                      value={width}
                      onChange={(e) => setWidth(parseFloat(e.target.value))}
                    />
                    <span className="range-value">{width}</span>
                  </div>
                </div>
                
                <div className="control-group">
                  <label htmlFor="height">Height:</label>
                  <div className="range-input">
                    <input
                      id="height"
                      type="range"
                      min="50"
                      max="200"
                      value={height}
                      onChange={(e) => setHeight(parseInt(e.target.value))}
                    />
                    <span className="range-value">{height}px</span>
                  </div>
                </div>
              </div>
            )}

            <div className="control-group">
              <label htmlFor="margin">Margin:</label>
              <div className="range-input">
                <input
                  id="margin"
                  type="range"
                  min="0"
                  max="50"
                  value={margin}
                  onChange={(e) => setMargin(parseInt(e.target.value))}
                />
                <span className="range-value">{margin}px</span>
              </div>
            </div>

            {codeType === 'BARCODE' && (
              <div className="control-group">
                <label htmlFor="fontSize">Font Size:</label>
                <div className="range-input">
                  <input
                    id="fontSize"
                    type="range"
                    min="10"
                    max="30"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                  />
                  <span className="range-value">{fontSize}px</span>
                </div>
              </div>
            )}
          </div>

          <div className="control-section">
            <h3>🎨 Background & Style</h3>
            
            <div className="control-group">
              <label htmlFor="backgroundType" className="tooltip-label">
                Background Type:
                <span className="tooltip">
                  Pilih jenis background: Solid (warna polos), Gradient (gradasi warna), Pattern (pola)
                </span>
              </label>
              <select
                id="backgroundType"
                value={backgroundType}
                onChange={(e) => setBackgroundType(e.target.value)}
                className="modern-select"
              >
                <option value="solid">🎯 Solid Color - Warna Polos</option>
                <option value="gradient">🌈 Gradient - Gradasi Warna</option>
                <option value="pattern">📄 Pattern - Pola Background</option>
              </select>
            </div>

            {backgroundType === 'solid' && (
              <div className="control-group">
                <label htmlFor="backgroundColor">Background Color:</label>
                <div className="color-input">
                  <input
                    id="backgroundColor"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                  />
                  <span className="color-value">{backgroundColor}</span>
                </div>
              </div>
            )}

            {backgroundType === 'gradient' && (
              <>
                <div className="control-row">
                  <div className="control-group">
                    <label htmlFor="gradientColor1">Color 1:</label>
                    <div className="color-input">
                      <input
                        id="gradientColor1"
                        type="color"
                        value={gradientColor1}
                        onChange={(e) => setGradientColor1(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="control-group">
                    <label htmlFor="gradientColor2">Color 2:</label>
                    <div className="color-input">
                      <input
                        id="gradientColor2"
                        type="color"
                        value={gradientColor2}
                        onChange={(e) => setGradientColor2(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="control-group">
                  <label htmlFor="gradientDirection">Direction:</label>
                  <div className="range-input">
                    <input
                      id="gradientDirection"
                      type="range"
                      min="0"
                      max="360"
                      value={gradientDirection}
                      onChange={(e) => setGradientDirection(e.target.value)}
                    />
                    <span className="range-value">{gradientDirection}°</span>
                  </div>
                </div>
              </>
            )}

            <div className="control-group">
              <label htmlFor="lineColor">{codeType === 'QR' ? 'QR Color:' : 'Code Color:'}:</label>
              <div className="color-input">
                <input
                  id="lineColor"
                  type="color"
                  value={lineColor}
                  onChange={(e) => setLineColor(e.target.value)}
                />
                <span className="color-value">{lineColor}</span>
              </div>
            </div>

            <div className="control-row">
              <div className="control-group">
                <label htmlFor="borderRadius">Border Radius:</label>
                <div className="range-input">
                  <input
                    id="borderRadius"
                    type="range"
                    min="0"
                    max="20"
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(parseInt(e.target.value))}
                  />
                  <span className="range-value">{borderRadius}px</span>
                </div>
              </div>
            </div>

            <div className="control-group">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={shadow}
                  onChange={(e) => setShadow(e.target.checked)}
                />
                <span className="toggle-slider"></span>
                Drop Shadow
              </label>
            </div>

            {codeType === 'BARCODE' && (
              <div className="control-group">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={displayValue}
                    onChange={(e) => setDisplayValue(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                  Tampilkan Text
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="preview-section">
          <div className="preview-header">
            <h3>👁️ Live Preview</h3>
            <div className="preview-info">
              <span className="info-item">Type: <strong>{codeType}</strong></span>
              {codeType === 'QR' && <span className="info-item">Size: <strong>{qrSize}px</strong></span>}
            </div>
          </div>
          
          <div 
            className={`barcode-preview ${backgroundType} ${shadow ? 'with-shadow' : ''}`} 
            ref={downloadRef}
            style={{
              background: getDynamicBackground(),
              borderRadius: `${borderRadius}px`,
              boxShadow: shadow ? '0 10px 30px rgba(0,0,0,0.15)' : 'none'
            }}
          >
            <div className="canvas-container">
              <canvas ref={canvasRef}></canvas>
            </div>
          </div>
          
          <div className="download-section">
            <div className="download-header">
              <h4>📥 Download Options</h4>
              <p>Choose your preferred format</p>
            </div>
            <div className="download-buttons">
              <button 
                onClick={downloadPNG} 
                className="download-btn primary"
                title="Download sebagai PNG - Format gambar berkualitas tinggi, cocok untuk print dan web"
              >
                <span className="btn-icon">🖼️</span>
                <div className="btn-content">
                  <span className="btn-title">PNG Image</span>
                  <span className="btn-desc">Untuk print & web</span>
                </div>
              </button>
              <button 
                onClick={downloadSVG} 
                className="download-btn secondary"
                title="Download sebagai SVG - Format vector scalable, cocok untuk desain dan resize tanpa blur"
              >
                <span className="btn-icon">📄</span>
                <div className="btn-content">
                  <span className="btn-title">SVG Vector</span>
                  <span className="btn-desc">Scalable & crisp</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="help-section">
        <div className="help-content">
          <h3>📚 Panduan Penggunaan</h3>
          <div className="help-grid">
            <div className="help-item">
              <h4>🔲 QR Code</h4>
              <p>Cocok untuk: URL website, kontak, WiFi, lokasi, email, dan data text panjang. Bisa discan oleh smartphone.</p>
            </div>
            <div className="help-item">
              <h4>🏷️ Barcode</h4>
              <p>Cocok untuk: produk retail, inventory, nomor seri. Butuh scanner khusus barcode.</p>
            </div>
            <div className="help-item">
              <h4>🎨 Background</h4>
              <p>Solid: warna polos. Gradient: gradasi 2 warna. Pattern: pola dekoratif (coming soon).</p>
            </div>
            <div className="help-item">
              <h4>📥 Download</h4>
              <p>PNG: untuk print dan web. SVG: untuk desain, bisa resize tanpa pecah.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button 
        className="scroll-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Kembali ke atas"
      >
        ⬆️
      </button>
    </div>
  )
}

export default BarcodeGenerator