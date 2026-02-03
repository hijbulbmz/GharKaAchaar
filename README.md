# Ghar Ka Achaar

Authentic homemade Indian pickles website built with pure HTML, CSS, and JavaScript.

## Project Overview

Ghar Ka Achaar is a static website for a homemade Indian pickle brand. The website is designed to be lightweight, fast, and easily deployable on static hosting platforms like GitHub Pages, Netlify, or Vercel.

## Technology Stack

- **HTML5** - Semantic markup and structure
- **CSS3** - Mobile-first responsive design with CSS variables
- **Vanilla JavaScript** - Interactive features and WhatsApp ordering
- **No frameworks** - Pure vanilla web technologies
- **No backend** - Static frontend only

## Features

- 📱 Mobile-first responsive design
- 🎨 Traditional Indian color scheme
- 🛒 WhatsApp ordering integration
- 🍽️ Product showcase
- 📝 SEO-friendly structure
- ⚡ Fast loading and performant

## Project Structure

```
GharKaAchaar/
│
├── index.html              # Main HTML file
├── assets/                 # Static assets
│   ├── images/            # Product and brand images
│   └── icons/             # Favicon and icons
├── css/
│   └── style.css          # Main stylesheet with mobile-first approach
├── js/
│   └── main.js            # JavaScript functionality
└── README.md              # Project documentation
```

## Color Scheme

The website uses traditional Indian pickle colors defined as CSS variables:

- `--mustard-yellow`: #FFD700
- `--traditional-red`: #DC143C
- `--dark-green`: #006400
- `--brown`: #8B4513
- `--light-brown`: #D2691E
- `--cream`: #FFF8DC

## Key Features

### Mobile Menu
- Responsive hamburger menu for mobile devices
- Smooth transitions and animations

### WhatsApp Ordering
- Integrated WhatsApp ordering system
- Pre-filled messages for easy ordering
- Product-specific ordering options

### Product Display
- Dynamic product grid layout
- Responsive card design
- Image fallback handling

### Performance
- Optimized for fast loading
- Minimal JavaScript footprint
- Efficient CSS with utility classes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Deployment

### GitHub Pages
1. Push the code to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Select the main branch as source

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command to empty (static site)
3. Set publish directory to root folder

### Vercel
1. Import your GitHub repository to Vercel
2. Configure as a static site
3. Deploy automatically

## Customization

### Adding Products
Edit the `products` array in `js/main.js`:

```javascript
const products = [
    {
        id: 1,
        name: 'Your Product Name',
        description: 'Product description',
        price: '₹Price',
        image: 'assets/images/your-image.jpg'
    }
];
```

### Updating WhatsApp Number
Change the phone number in `js/main.js`:

```javascript
const phoneNumber = '+91XXXXXXXXXX'; // Replace with your WhatsApp number
```

### Adding Images
Place product images in the `assets/images/` folder and update the paths in the products array.

## Development

### Local Development
Simply open `index.html` in a web browser. No build process required.

### Code Structure
- **Semantic HTML5** for better accessibility and SEO
- **Mobile-first CSS** with responsive breakpoints
- **Modular JavaScript** with clear function separation
- **CSS Variables** for easy theme customization

## Future Enhancements

- [ ] Product image gallery
- [ ] Customer testimonials
- [ ] Recipe blog section
- [ ] Order tracking system
- [ ] Multi-language support
- [ ] PWA features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For any inquiries or support, please reach out through the website's contact section or WhatsApp ordering system.

---

**Ghar Ka Achaar** - Taste the Tradition! 🌶️
