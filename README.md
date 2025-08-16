# GlowCart - Beauty E-commerce App

A beautiful cosmetic e-commerce mobile application built with React Native Expo, featuring a modern UI design and seamless user experience.

## 🌟 Features

- **Onboarding Screen** - Welcome screen with app introduction
- **Authentication** - Login and Register screens with form validation
- **Product Catalog** - Browse cosmetic products fetched from API
- **Search & Filter** - Real-time product search functionality
- **Product Details** - Detailed product view with images, ratings, and reviews
- **User Profile** - Profile management with various options
- **Shopping Cart** - Add products to cart functionality
- **Responsive Design** - Works seamlessly on various screen sizes

## 📱 Screens

1. **Onboarding Screen** - App introduction and get started button
2. **Login Screen** - Email/password login with social login options
3. **Register Screen** - Account creation with validation
4. **Home Screen** - Product listing with search functionality
5. **Product Details Screen** - Detailed product information
6. **Profile Screen** - User profile and app settings

## 🛠 Technical Stack

- **React Native Expo** - Cross-platform mobile development
- **React Navigation** - Screen navigation and routing
- **Context API** - State management for authentication and products
- **Axios** - HTTP client for API calls
- **Expo Vector Icons** - Beautiful icons throughout the app
- **Custom Components** - Reusable UI components

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd glowcart
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open the Expo Go app on your phone and scan the QR code, or run on an emulator:
```bash
# For Android emulator
npm run android

# For iOS simulator
npm run ios
```

## 🔧 Project Structure

```
glowcart/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CustomButton.js
│   │   ├── CustomInput.js
│   │   ├── Header.js
│   │   ├── ProductCard.js
│   │   └── SearchBar.js
│   ├── screens/            # App screens
│   │   ├── OnboardingScreen.js
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── HomeScreen.js
│   │   ├── ProductDetailsScreen.js
│   │   └── ProfileScreen.js
│   ├── navigation/         # Navigation configuration
│   │   └── MainTabNavigator.js
│   ├── services/          # API services
│   │   └── api.js
│   └── store/             # State management
│       ├── AuthContext.js
│       └── ProductContext.js
├── App.js                 # Main app component
├── package.json
├── app.json              # Expo configuration
├── eas.json             # EAS Build configuration
└── README.md
```

## 🌐 API Integration

The app uses [DummyJSON](https://dummyjson.com/products) API to fetch product data. The products are filtered to show only cosmetic-related items based on:

- Product title keywords (mascara, lipstick, perfume, etc.)
- Description content
- Category classification

## 🎨 UI/UX Design

- **Color Scheme**: Pink theme (#FF69B4) for a beauty-focused aesthetic
- **Typography**: Clean, modern fonts with proper hierarchy
- **Components**: Custom reusable components for consistency
- **Animations**: Smooth transitions and interactive elements
- **Responsive**: Optimized for various screen sizes

## 📱 Building for Production

### Using EAS Build

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Login to your Expo account:
```bash
eas login
```

3. Configure your project:
```bash
eas build:configure
```

4. Build for Android (APK):
```bash
eas build --platform android --profile preview
```

5. Build for iOS:
```bash
eas build --platform ios --profile preview
```

6. For production builds:
```bash
eas build --platform all --profile production
```

## 🔍 Testing

1. **Manual Testing**: Test all screens and user flows
2. **Device Testing**: Test on various devices and screen sizes
3. **API Testing**: Verify API calls and error handling
4. **Performance**: Check loading times and smooth animations

## ⚡ Performance Optimizations

- **FlatList** for efficient product rendering
- **Image optimization** with error handling
- **Lazy loading** for better performance
- **Memoization** of expensive operations
- **Optimized re-renders** with proper state management

## 📋 Known Issues & Assumptions

- Mock authentication (no real backend integration)
- Mock user data in profile screen
- Limited product filtering (based on available API data)
- Social login buttons are UI-only (not functional)
- Reviews and ratings are mocked data

## 🚀 Future Enhancements

- Real authentication backend
- Payment integration
- Order management
- Push notifications
- Wishlist functionality
- Advanced filtering and sorting
- Dark theme support
- Offline support

## 📞 Support

For any issues or questions, please contact:
- Email: support@glowcart.com
- GitHub Issues: [Create an issue](your-repo-url/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- [DummyJSON API](https://dummyjson.com/) for providing product data
- [Expo](https://expo.dev/) for the amazing development platform
- [React Navigation](https://reactnavigation.org/) for navigation solutions
- [Expo Vector Icons](https://icons.expo.fyi/) for beautiful icons

---

**Development Time**: Approximately 8-10 hours

**Note**: This is a demonstration project built for educational purposes. All product data is sourced from DummyJSON API and user authentication is mocked for development purposes.