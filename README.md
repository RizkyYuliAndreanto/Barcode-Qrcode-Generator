# 🔲 CodeGen Pro - QR Code & Barcode Generator

**Live Demo:** [https://rizkyyuliandreanto.github.io/Barcode-Qrcode-Generator](https://rizkyyuliandreanto.github.io/Barcode-Qrcode-Generator)

A professional, user-friendly web application for generating QR codes and barcodes with custom styling options. Built with React and modern web technologies.

## ✨ Features

### 🔲 QR Code Generation

- Support for various data types (URLs, text, email, phone, WiFi, location)
- Multiple error correction levels (L, M, Q, H)
- Custom size and styling options
- Quick preset templates

### 🏷️ Barcode Generation

- 9 barcode formats supported:
  - CODE128 (General text/numbers)
  - CODE39 (Industry/inventory)
  - EAN13 (Retail products - 13 digits)
  - EAN8 (Small products - 8 digits)
  - UPC (USA/Canada)
  - ITF14 (Distribution/packaging)
  - MSI (Inventory/warehouse)
  - Pharmacode (Pharmaceutical)
  - Codabar (Libraries/blood banks)

### 🎨 Customization Options

- **Background Types:**
  - Solid colors
  - Gradient backgrounds
  - Pattern backgrounds (coming soon)
- **Styling:**
  - Adjustable margins
  - Custom colors for code and background
  - Border radius and shadow effects
  - Font size control for barcodes

### 📥 Export Options

- **PNG Format:** High-quality raster images for print and web
- **SVG Format:** Scalable vector graphics for design and resizing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/RizkyYuliAndreanto/Barcode-Qrcode-Generator.git
cd Barcode-Qrcode-Generator
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite
- **QR Code:** qrcode library
- **Barcode:** jsbarcode library
- **Export:** html2canvas, file-saver
- **Styling:** Modern CSS with responsive design
- **Deployment:** GitHub Pages with GitHub Actions

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:

- Desktop computers (1920px+)
- Laptops (1366px+)
- Tablets (768px+)
- Mobile phones (320px+)

## 🎯 Use Cases

### QR Codes

- Website URLs and social media links
- Contact information (vCard)
- WiFi network credentials
- Email addresses and phone numbers
- GPS coordinates and locations
- SMS messages with pre-filled text

### Barcodes

- Product inventory and retail items
- Asset tracking and management
- Library and document management
- Pharmaceutical products
- Distribution and packaging

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Rizky Yuli Andreanto**

- GitHub: [@RizkyYuliAndreanto](https://github.com/RizkyYuliAndreanto)
- LinkedIn: [Rizky Yuli Andreanto](https://linkedin.com/in/rizkyyuliandreanto)

## 🙏 Acknowledgments

- [QRCode.js](https://github.com/davidshimjs/qrcodejs) for QR code generation
- [JsBarcode](https://github.com/lindell/JsBarcode) for barcode generation
- [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for the amazing development experience
- [GitHub Pages](https://pages.github.com/) for free hosting

---

⭐ **Star this repository if you find it helpful!**
