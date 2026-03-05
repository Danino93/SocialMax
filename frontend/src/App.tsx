import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import ServicesPage from './pages/Services/ServicesPage';
import InstagramServices from './pages/Services/InstagramServices';
import FacebookServices from './pages/Services/FacebookServices';
import TelegramServices from './pages/Services/TelegramServices';
import WhatsAppServices from './pages/Services/WhatsAppServices';
import TikTokServices from './pages/Services/TikTokServices';
import YouTubeServices from './pages/Services/YouTubeServices';
import GoogleBusinessServices from './pages/Services/GoogleBusinessServices';
import TwitterServices from './pages/Services/TwitterServices';
import DiscordServices from './pages/Services/DiscordServices';
import PlatformServicePage from './pages/Services/PlatformServicePage';
import ServiceLandingPage from './pages/Services/ServiceLandingPage';
import Pricing from './pages/Pricing/Pricing';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import GuidesPage from './pages/Guides/GuidesPage';
import WhatIsSMM from './pages/Guides/WhatIsSMM';
import GrowInstagram from './pages/Guides/GrowInstagram';
import TikTokMarketing from './pages/Guides/TikTokMarketing';
import AlgorithmInstagram from './pages/Guides/AlgorithmInstagram';
import TikTokMoney from './pages/Guides/TikTokMoney';
import GoogleReviews from './pages/Guides/GoogleReviews';
import BuyFollowersLegal from './pages/Guides/BuyFollowersLegal';
import YouTubeGrowth from './pages/Guides/YouTubeGrowth';
import FacebookMarketing from './pages/Guides/FacebookMarketing';
import WhatsAppBusiness from './pages/Guides/WhatsAppBusiness';
import SMMVsFacebook from './pages/Guides/SMMVsFacebook';
import DiscordGuide from './pages/Guides/DiscordGuide';
import SMMBeginners from './pages/Guides/SMMBeginners';
import FAQ from './pages/FAQ/FAQ';
import Terms from './pages/Legal/Terms';
import Privacy from './pages/Legal/Privacy';
import Reviews from './pages/Reviews/Reviews';
import SpinWheel from './pages/SpinWheel/SpinWheel';
import CaseStudies from './pages/CaseStudies/CaseStudies';
import PlatformQuiz from './pages/Quiz/PlatformQuiz';
import PackageBuilder from './pages/PackageBuilder/PackageBuilder';
import UltimateChecklist from './pages/Guides/UltimateChecklist';
import FloatingTelegramButton from './components/UI/FloatingTelegramButton';
import StickyMobileCTA from './components/UI/StickyMobileCTA';
import CursorTrail from './components/UI/CursorTrail';
import ExitIntentPopup from './components/UI/ExitIntentPopup';

function App() {
  return (
    <Router>
      <div dir="rtl">
        {/* Global components — render on all pages */}
        <FloatingTelegramButton />
        <StickyMobileCTA />
        <CursorTrail />
        <ExitIntentPopup />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/instagram" element={<InstagramServices />} />
          <Route path="/services/facebook" element={<FacebookServices />} />
          <Route path="/services/telegram" element={<TelegramServices />} />
          <Route path="/services/whatsapp" element={<WhatsAppServices />} />
          <Route path="/services/tiktok" element={<TikTokServices />} />
          <Route path="/services/youtube" element={<YouTubeServices />} />
          <Route path="/services/google-business" element={<GoogleBusinessServices />} />
          <Route path="/services/google" element={<GoogleBusinessServices />} />
          <Route path="/services/twitter" element={<TwitterServices />} />
          <Route path="/services/discord" element={<DiscordServices />} />
          <Route path="/services/spotify" element={<PlatformServicePage platform="spotify" />} />

          {/* SEO keyword landing pages (original 12) */}
          <Route path="/buy/instagram-followers" element={<ServiceLandingPage slug="instagram-followers" />} />
          <Route path="/buy/instagram-likes"     element={<ServiceLandingPage slug="instagram-likes" />} />
          <Route path="/buy/instagram-reels"     element={<ServiceLandingPage slug="instagram-reels" />} />
          <Route path="/buy/tiktok-followers"    element={<ServiceLandingPage slug="tiktok-followers" />} />
          <Route path="/buy/tiktok-views"        element={<ServiceLandingPage slug="tiktok-views" />} />
          <Route path="/buy/tiktok-likes"        element={<ServiceLandingPage slug="tiktok-likes" />} />
          <Route path="/buy/facebook-likes"      element={<ServiceLandingPage slug="facebook-likes" />} />
          <Route path="/buy/youtube-subscribers" element={<ServiceLandingPage slug="youtube-subscribers" />} />
          <Route path="/buy/youtube-views"       element={<ServiceLandingPage slug="youtube-views" />} />
          <Route path="/buy/telegram-members"    element={<ServiceLandingPage slug="telegram-members" />} />
          <Route path="/buy/whatsapp-members"    element={<ServiceLandingPage slug="whatsapp-members" />} />
          <Route path="/buy/twitter-followers"   element={<ServiceLandingPage slug="twitter-followers" />} />

          {/* SEO keyword landing pages (new 20) */}
          <Route path="/buy/spotify-followers"   element={<ServiceLandingPage slug="spotify-followers" />} />
          <Route path="/buy/discord-members"     element={<ServiceLandingPage slug="discord-members" />} />
          <Route path="/buy/google-reviews"      element={<ServiceLandingPage slug="google-reviews" />} />
          <Route path="/buy/instagram-comments"  element={<ServiceLandingPage slug="instagram-comments" />} />
          <Route path="/buy/instagram-stories"   element={<ServiceLandingPage slug="instagram-stories" />} />
          <Route path="/buy/facebook-followers"  element={<ServiceLandingPage slug="facebook-followers" />} />
          <Route path="/buy/facebook-comments"   element={<ServiceLandingPage slug="facebook-comments" />} />
          <Route path="/buy/tiktok-comments"     element={<ServiceLandingPage slug="tiktok-comments" />} />
          <Route path="/buy/twitter-likes"       element={<ServiceLandingPage slug="twitter-likes" />} />
          <Route path="/buy/twitter-retweets"    element={<ServiceLandingPage slug="twitter-retweets" />} />
          <Route path="/buy/youtube-likes"       element={<ServiceLandingPage slug="youtube-likes" />} />
          <Route path="/buy/youtube-comments"    element={<ServiceLandingPage slug="youtube-comments" />} />
          <Route path="/buy/telegram-views"      element={<ServiceLandingPage slug="telegram-views" />} />
          <Route path="/buy/whatsapp-group"      element={<ServiceLandingPage slug="whatsapp-group" />} />
          <Route path="/buy/linkedin-followers"  element={<ServiceLandingPage slug="linkedin-followers" />} />
          <Route path="/buy/pinterest-followers" element={<ServiceLandingPage slug="pinterest-followers" />} />
          <Route path="/buy/snapchat-followers"  element={<ServiceLandingPage slug="snapchat-followers" />} />
          <Route path="/buy/soundcloud-plays"    element={<ServiceLandingPage slug="soundcloud-plays" />} />
          <Route path="/buy/twitch-followers"    element={<ServiceLandingPage slug="twitch-followers" />} />
          <Route path="/buy/reddit-upvotes"      element={<ServiceLandingPage slug="reddit-upvotes" />} />

          <Route path="/pricing"    element={<Pricing />} />
          <Route path="/contact"    element={<Contact />} />
          <Route path="/about"      element={<About />} />

          {/* Guides (original 3) */}
          <Route path="/guides"                    element={<GuidesPage />} />
          <Route path="/guides/what-is-smm"        element={<WhatIsSMM />} />
          <Route path="/guides/grow-instagram"     element={<GrowInstagram />} />
          <Route path="/guides/tiktok-marketing"   element={<TikTokMarketing />} />

          {/* Guides (new 10) */}
          <Route path="/guides/instagram-algorithm-2026"          element={<AlgorithmInstagram />} />
          <Route path="/guides/how-to-make-money-tiktok"         element={<TikTokMoney />} />
          <Route path="/guides/google-reviews-guide"             element={<GoogleReviews />} />
          <Route path="/guides/is-buying-followers-legal-israel"  element={<BuyFollowersLegal />} />
          <Route path="/guides/youtube-growth-guide"             element={<YouTubeGrowth />} />
          <Route path="/guides/facebook-marketing-israel"        element={<FacebookMarketing />} />
          <Route path="/guides/whatsapp-business-tips"           element={<WhatsAppBusiness />} />
          <Route path="/guides/smm-vs-facebook-ads"              element={<SMMVsFacebook />} />
          <Route path="/guides/discord-for-businesses"           element={<DiscordGuide />} />
          <Route path="/guides/smm-beginners-guide"              element={<SMMBeginners />} />

          {/* Info pages */}
          <Route path="/faq"          element={<FAQ />} />
          <Route path="/reviews"      element={<Reviews />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/spin"         element={<SpinWheel />} />
          <Route path="/quiz"         element={<PlatformQuiz />} />
          <Route path="/build"        element={<PackageBuilder />} />
          <Route path="/guides/ultimate-boost-checklist" element={<UltimateChecklist />} />

          {/* Legal */}
          <Route path="/terms"   element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
