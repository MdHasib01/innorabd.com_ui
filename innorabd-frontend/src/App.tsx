import React, { useState, useMemo } from 'react';
import { 
  CategoryType, 
  Product, 
  ProductColor, 
  CartItem, 
  PackagingOption, 
  FilterState, 
  Order 
} from './types';
import { PRODUCTS, PACKAGING_OPTIONS } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryShowcase } from './components/CategoryShowcase';
import { CategoryPills } from './components/CategoryPills';
import { FiltersSidebar } from './components/FiltersSidebar';
import { MobileFiltersModal } from './components/MobileFiltersModal';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SizeCalculatorModal } from './components/SizeCalculatorModal';
import { FitStylistQuizModal } from './components/FitStylistQuizModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LaceCraftsmanshipSection } from './components/LaceCraftsmanshipSection';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { 
  SlidersHorizontal, 
  Ruler, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpDown,
  RotateCcw,
  ShoppingBag
} from 'lucide-react';

export default function App() {
  // State management
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    laceType: '',
    bandSize: null,
    cupSize: null,
    minPrice: 0,
    maxPrice: 150,
    wired: null,
    padding: null,
    coverage: null,
    sortBy: 'featured',
    searchQuery: '',
  });

  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      product: PRODUCTS[0],
      selectedColor: PRODUCTS[0].colors[0],
      selectedBand: 34,
      selectedCup: 'C',
      quantity: 1,
    },
  ]);

  const [wishlist, setWishlist] = useState<Product[]>([PRODUCTS[1]]);
  const [selectedPackaging, setSelectedPackaging] = useState<PackagingOption>(PACKAGING_OPTIONS[0]);
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discountPercent: number;
    fixedDiscount: number;
  } | null>(null);

  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSizeCalculatorOpen, setIsSizeCalculatorOpen] = useState(false);
  const [isFitStylistOpen, setIsFitStylistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  // Unique lace types for filtering
  const availableLaceTypes = useMemo(() => {
    const types = new Set(PRODUCTS.map((p) => p.laceType));
    return Array.from(types);
  }, []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryType, number> = {
      All: PRODUCTS.length,
      'Luxury Lace': 0,
      'Push-Up & Balconette': 0,
      'Everyday & T-Shirt': 0,
      'Wireless & Bralette': 0,
      'Bridal & Red-Gold': 0,
      'Silk Sleepwear': 0,
      'Matching Panties': 0,
    };

    PRODUCTS.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });

    return counts;
  }, []);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (activeCategory !== 'All' && product.category !== activeCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesSubtitle = product.subtitle.toLowerCase().includes(q);
        const matchesLace = product.laceType.toLowerCase().includes(q);
        const matchesTags = product.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesSubtitle && !matchesLace && !matchesTags) {
          return false;
        }
      }

      // Lace Type filter
      if (filters.laceType && product.laceType !== filters.laceType) {
        return false;
      }

      // Band Size filter
      if (filters.bandSize && !product.bandSizes.includes(filters.bandSize)) {
        return false;
      }

      // Cup Size filter
      if (filters.cupSize && !product.cupSizes.includes(filters.cupSize)) {
        return false;
      }

      // Price filter
      if (product.price > filters.maxPrice) {
        return false;
      }

      // Wired / Wireless
      if (filters.wired !== null && product.wired !== filters.wired) {
        return false;
      }

      // Padding
      if (filters.padding && product.padding !== filters.padding) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'discount') return b.discountPercent - a.discountPercent;
      return 0; // featured default
    });
  }, [activeCategory, searchQuery, filters]);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    color: ProductColor,
    band: number,
    cup: string,
    quantity = 1
  ) => {
    const existingIndex = cartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedColor.name === color.name &&
        item.selectedBand === band &&
        item.selectedCup === cup
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: `cart-${Date.now()}-${Math.random()}`,
          product,
          selectedColor: color,
          selectedBand: band,
          selectedCup: cup,
          quantity,
        },
      ]);
    }
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(id);
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)));
    }
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    if (wishlist.some((p) => p.id === product.id)) {
      setWishlist(wishlist.filter((p) => p.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  // Promo code engine
  const handleApplyPromo = (code: string): boolean => {
    if (code === 'GOLDEN20') {
      setAppliedPromo({ code: 'GOLDEN20', discountPercent: 20, fixedDiscount: 0 });
      return true;
    }
    if (code === 'LACEVIP') {
      setAppliedPromo({ code: 'LACEVIP', discountPercent: 0, fixedDiscount: 15 });
      return true;
    }
    if (code === 'DISCREET') {
      setSelectedPackaging(PACKAGING_OPTIONS[1]); // Free Luxury Gift Box
      setAppliedPromo({ code: 'DISCREET', discountPercent: 10, fixedDiscount: 0 });
      return true;
    }
    return false;
  };

  // Apply size from calculator
  const handleApplySizeFilter = (bandSize: number, cupSize: string) => {
    setFilters((prev) => ({
      ...prev,
      bandSize,
      cupSize,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'All',
      laceType: '',
      bandSize: null,
      cupSize: null,
      minPrice: 0,
      maxPrice: 150,
      wired: null,
      padding: null,
      coverage: null,
      sortBy: 'featured',
      searchQuery: '',
    });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f7] text-[#1c1917] pb-16 lg:pb-0">
      {/* Global Navbar */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        cartItems={cartItems}
        wishlist={wishlist}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSizeCalculator={() => setIsSizeCalculatorOpen(true)}
        onOpenFitStylist={() => setIsFitStylistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
      />

      {/* Main Luxury Hero Banner */}
      <HeroBanner
        onSelectCategory={setActiveCategory}
        onOpenSizeCalculator={() => setIsSizeCalculatorOpen(true)}
        onOpenFitStylist={() => setIsFitStylistOpen(true)}
      />

      {/* Luxury Arched Category Section (Reference Design) */}
      <CategoryShowcase
        onSelectCategory={setActiveCategory}
        onFilterByTag={(tag) => {
          setActiveCategory('Silk Sleepwear');
          setSearchQuery(tag);
        }}
        onViewAllCollections={() => {
          setActiveCategory('Silk Sleepwear');
          setSearchQuery('');
        }}
        onAddToCart={handleAddToCart}
      />

      {/* Category Pills Strip */}
      <CategoryPills
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        categoryCounts={categoryCounts}
      />

      {/* Main Catalog View */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Catalog Control Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e7ded7]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#850b20]"></span>
              <h2 className="font-serif-luxury text-2xl font-bold text-stone-900">
                {activeCategory === 'All' ? 'All Haute Lingerie' : activeCategory}
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Showing {filteredProducts.length} mastercrafted styles with 24K gold accents & sister-size calibration.
            </p>
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex items-center gap-2">
            {/* Quick Size Guide CTA */}
            <button
              onClick={() => setIsSizeCalculatorOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#850b20] bg-white hover:bg-[#faf2eb] border border-[#d4af37]/60 rounded-xl shadow-xs cursor-pointer"
            >
              <Ruler className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{filters.bandSize && filters.cupSize ? `Filtered: ${filters.bandSize}${filters.cupSize}` : 'Size Finder'}</span>
            </button>

            {/* Mobile Filters Toggle */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-stone-700 bg-white border border-stone-200 rounded-xl shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#850b20]" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-700 shadow-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#850b20]" />
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })
                }
                className="bg-transparent font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Pill Badges */}
        {(filters.bandSize || filters.cupSize || filters.laceType || filters.wired !== null) && (
          <div className="flex flex-wrap items-center gap-2 py-3">
            <span className="text-xs font-semibold text-stone-500">Active Filters:</span>
            {filters.bandSize && (
              <span className="inline-flex items-center gap-1 bg-[#850b20] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                Band: {filters.bandSize}
                <button
                  onClick={() => setFilters({ ...filters, bandSize: null })}
                  className="hover:text-stone-300 ml-1"
                >
                  ✕
                </button>
              </span>
            )}
            {filters.cupSize && (
              <span className="inline-flex items-center gap-1 bg-[#850b20] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                Cup: {filters.cupSize}
                <button
                  onClick={() => setFilters({ ...filters, cupSize: null })}
                  className="hover:text-stone-300 ml-1"
                >
                  ✕
                </button>
              </span>
            )}
            {filters.laceType && (
              <span className="inline-flex items-center gap-1 bg-stone-800 text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
                Lace: {filters.laceType}
                <button
                  onClick={() => setFilters({ ...filters, laceType: '' })}
                  className="hover:text-stone-300 ml-1"
                >
                  ✕
                </button>
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-xs text-[#850b20] hover:underline font-bold ml-2 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Catalog Layout: Desktop Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <FiltersSidebar
                filters={filters}
                onFilterChange={(newF) => setFilters({ ...filters, ...newF })}
                onResetFilters={handleResetFilters}
                availableLaceTypes={availableLaceTypes}
              />
            </div>
          </aside>

          {/* Product Cards Grid */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#f4ebe3] text-[#850b20] flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8 opacity-60" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
                    No matching pieces found
                  </h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Try broadening your size criteria or reset filters to explore our full lace collection.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-[#850b20] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setSelectedProduct(p)}
                    onAddToCart={handleAddToCart}
                    isWishlisted={wishlist.some((w) => w.id === product.id)}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Editorial Craftsmanship Pillar Showcase */}
      <LaceCraftsmanshipSection />

      {/* Customer Reviews & Fit Community */}
      <CustomerReviewsSection />

      {/* Global Footer */}
      <Footer
        onSelectCategory={setActiveCategory}
        onOpenSizeCalculator={() => setIsSizeCalculatorOpen(true)}
        onOpenFitStylist={() => setIsFitStylistOpen(true)}
      />

      {/* Mobile Sticky Thumb Navigation */}
      <MobileBottomNav
        onSelectHome={() => {
          setActiveCategory('All');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSizeCalculator={() => setIsSizeCalculatorOpen(true)}
        onOpenFitStylist={() => setIsFitStylistOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
      />

      {/* Modals & Slide-overs */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlist.some((w) => w.id === selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        allProducts={PRODUCTS}
        onOpenSizeCalculator={() => setIsSizeCalculatorOpen(true)}
      />

      <SizeCalculatorModal
        isOpen={isSizeCalculatorOpen}
        onClose={() => setIsSizeCalculatorOpen(false)}
        onApplySizeFilter={handleApplySizeFilter}
      />

      <FitStylistQuizModal
        isOpen={isFitStylistOpen}
        onClose={() => setIsFitStylistOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        selectedPackaging={selectedPackaging}
        onSelectPackaging={setSelectedPackaging}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={() => setAppliedPromo(null)}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        selectedPackaging={selectedPackaging}
        appliedPromo={appliedPromo}
        onOrderComplete={(ord) => setOrders([ord, ...orders])}
        onClearCart={() => setCartItems([])}
      />

      <MobileFiltersModal
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        filters={filters}
        onFilterChange={(newF) => setFilters({ ...filters, ...newF })}
        onResetFilters={handleResetFilters}
        availableLaceTypes={availableLaceTypes}
        totalResultsCount={filteredProducts.length}
      />
    </div>
  );
}
