# Harvest-In: Complete Website Rebuild Specification

## Project Overview
**Harvest-In** is a comprehensive agricultural marketplace platform for Ghana that connects farmers, buyers, agents, and administrators through a single ecosystem. It enables direct farm-to-market sales with fair pricing, multiple transport options, and role-based dashboards.

---

## Technology Stack
- **Frontend Framework**: React 18 with TypeScript + Vite
- **Styling**: Tailwind CSS 3.4 with ShadcnUI components
- **Backend**: Supabase (PostgreSQL + Auth)
- **State Management**: React Context API + TanStack React Query
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **UI Components**: 50+ ShadcnUI components
- **Notifications**: Sonner Toast + Native Toast system
- **Testing**: Vitest + React Testing Library

---

## Database Schema
### Core Tables
1. **profiles** - User information (full_name, email, phone, location, avatar_url, bio)
2. **products** - Farmer listings (name, category, price, quantity, location, is_available, farmer_id)
3. **orders** - Transactions (user_id, product_id, quantity, total_price, status, transport_type)
4. **payments** - Payment tracking (order_id, farmer_amount, platform_fee, status)
5. **agent_products** - Agent inventory management
6. **notifications** - User notifications system

### Enums
- **user_role**: 'buyer' | 'farmer' | 'agent' | 'admin'
- **order_status**: 'pending' | 'confirmed' | 'in_transit' | 'delivered' | 'cancelled'
- **payment_status**: 'pending' | 'completed' | 'failed'

---

## Page Architecture & Routes

### 1. **Landing Page** (`/`)
**Component**: `src/pages/Index.tsx`

**Features**:
- Hero section with call-to-action buttons
- Value propositions display (fair prices, direct connection, support)
- How it works section explaining three user roles
- Statistics showcase (500+ farms, 10K+ customers, 90% to farmers)
- Role-based CTAs directing to appropriate signup flows
- Responsive design with image galleries

**Functions**:
- Navigation to marketplace for buyers
- Navigation to farmer dashboard for sellers
- Navigation to agent center for logistics partners
- User role detection and conditional rendering

---

### 2. **Authentication Page** (`/auth`)
**Component**: `src/pages/Auth.tsx`

**Features**:
- Role-based signup/login interface
- Four role templates with custom fields:
  - **Buyer**: Full Name, Email, Location, Password
  - **Farmer**: Full Name, Location, MoMo Number, Phone, Email, Password
  - **Agent**: Full Name, Agrilink ID (validation), Email, Password
  - **Admin**: Agrilink ID (validation), Email, Password
- Email/password validation
- Agrilink ID server-side verification for agents and admins
- Toggle between login and signup modes
- Error handling and feedback messages
- Redirect after successful auth based on role and referrer

**Functions**:
- User registration with role assignment
- Email/password authentication
- ID verification for restricted roles
- Session initialization
- Conditional form field rendering based on role
- Error state management

---

### 3. **Marketplace Page** (`/marketplace`)
**Component**: `src/pages/Marketplace.tsx`

**Sub-Components**:
- `MarketProductCard` - Individual product listings
- `CategoryFilter` - Filter by produce type
- `TransportSelector` - Choose delivery method
- `BuyerOrderSummary` - Cart and checkout preview
- `Header` - Navigation and search

**Features**:
- Browse all available produce listings
- Filter by category: Vegetables, Fruits, Tubers, Grains, Legumes, Spices
- Search by product name or location
- Product cards showing: image, name, price, quantity, farmer location, rating
- Quantity selector for each product
- Transport option selection:
  - Motorbike (Express, ₵20)
  - Tricycle (Recommended, ₵30)
  - Small Car (Climate-controlled, ₵50)
  - Small Truck (Bulk orders, ₵80)
- Real-time order summary with totals
- Multi-item order placement
- Order history and tracking

**Functions**:
- Product search and filtering
- Quantity management
- Transport cost calculation
- Order creation and submission
- Payment processing integration
- Order status tracking

---

### 4. **Farmer Dashboard** (`/farmer`)
**Component**: `src/pages/FarmerDashboard.tsx`

**Sub-Components**:
- `AddListingDialog` - Create new product listings
- `ProductsTable` - Manage listings
- Notification system

**Features**:
- Overview stats:
  - Active Listings count
  - Total Products count
  - Categories count
  - Estimated inventory value
- Produce listing management:
  - Add new listings (name, category, price, quantity, description)
  - Edit existing listings
  - Delete listings
  - Toggle availability (show/hide from marketplace)
- Product categories: Vegetables, Fruits, Tubers, Grains, Legumes, Spices
- Order notifications and management
- Earnings tracking
- Mobile responsiveness

**Functions**:
- CRUD operations for product listings
- Availability toggling
- Listing deletion with confirmation
- Real-time product status updates
- Image uploads for produce
- Quantity management
- Price updates

---

### 5. **Agent Dashboard** (`/agent`)
**Component**: `src/pages/AgentCenter.tsx`

**Sub-Components**:
- `AddProductDialog` - Manage inventory from farmers
- `ProductsTable` - View and manage products
- `OrdersTable` - Track and manage deliveries

**Features**:
- Overview stats:
  - Pending Orders count
  - Active Deliveries count
  - Products Listed count
  - Total Earnings
- Order management:
  - View pending orders
  - Confirm orders for delivery
  - Update delivery status
  - Track completed orders
- Commission tracking (percentage of delivery fees)
- Product inventory management
- Customer contact information
- Delivery route optimization

**Functions**:
- Order acceptance/confirmation
- Delivery status updates (pending → confirmed → in_transit → delivered)
- Commission calculation
- Customer contact management
- Delivery address tracking
- Performance metrics

---

### 6. **Admin Dashboard** (`/admin`)
**Component**: `src/pages/AdminDashboard.tsx`

**Sub-Components**:
- `AdminAnalytics` - Platform metrics visualization
- `AdminOrdersTable` - Complete order history
- `AdminUsersTable` - User management
- `AdminProductsTable` - Product moderation
- `AdminPaymentsTable` - Payment tracking

**Tabs**:
1. **Overview** - Key metrics and analytics
2. **Orders** - All platform orders with filters
3. **Users** - User management and role assignment
4. **Products** - Product moderation and approval
5. **Payments** - Payment tracking and settlement

**Features**:
- Platform statistics:
  - Total Orders
  - Total Users
  - Platform Revenue (10% of all sales)
  - Farmer Payouts (90% to farmers)
  - Revenue breakdown by role
- Complete order history with status tracking
- User management:
  - View all users
  - Filter by role (buyer/farmer/agent/admin)
  - User verification
  - Suspend/deactivate accounts
- Product moderation:
  - Review new listings
  - Remove inappropriate products
  - Track product categories
- Payment settlement:
  - Track all transactions
  - Calculate farmer payouts
  - Monitor platform fees
  - Generate payment reports

**Functions**:
- Analytics and reporting
- Order moderation
- User management and role assignment
- Product approval/rejection
- Payment settlement automation
- Revenue tracking
- Dispute resolution

---

### 7. **Admin Login Page** (`/admin/login`)
**Component**: `src/pages/AdminLogin.tsx`

**Features**:
- Dedicated admin login interface
- Agrilink ID and password verification
- Admin role enforcement
- Session management
- Redirect to admin dashboard on success

---

### 8. **Settings Page** (`/settings`)
**Component**: `src/pages/Settings.tsx`

**Features**:
- User profile management:
  - Full name, email, phone
  - Location/address
  - Bio/description
  - Avatar upload
- Profile picture with camera capture option
- Account security settings
- Preference management
- Privacy settings
- Save/cancel functionality

**Functions**:
- Profile data update
- Image upload and cropping
- Field validation
- Confirmation messages

---

### 9. **USSD Demo Page** (`/ussd`)
**Component**: `src/pages/USSDDemo.tsx`

**Features**:
- Interactive USSD menu simulation
- Multi-screen navigation
- Category browsing (Vegetables, Fruits, Tubers, Grains)
- Product selection with pricing
- Order quantity input
- Order confirmation flow
- Mobile-first design

**Functions**:
- Menu navigation
- Category browsing
- Product selection
- Order placement
- Input handling

---

### 10. **Not Found Page** (`/*`)
**Component**: `src/pages/NotFound.tsx`

**Features**:
- 404 error display
- Navigation back to home
- Helpful message

---

## Authentication & Authorization

### Context: `AuthContext.tsx`
**State Management**:
- `user` - Current authenticated user (Supabase User object)
- `session` - Active session
- `loading` - Auth state initialization loading

**Methods**:
- `signUp(email, password, fullName, role)` - Register new user with role
- `signIn(email, password)` - Login user
- `signOut()` - Logout user

**Features**:
- Supabase auth integration
- Session persistence
- Auth state listener setup
- Auto-login on page refresh
- Role-based context data

### Guards: `RoleGuard.tsx` & `AuthGuard.tsx`
- Prevent unauthorized access
- Redirect to appropriate login based on role
- Session validation
- Role verification

---

## Core Components

### Navigation & Layout
1. **Navbar** - Main navigation with logo, role-specific links, logout
2. **Header** - Page headers with role-based content
3. **NotificationBell** - User notifications and alerts
4. **NavLink** - Reusable navigation link component
5. **CameraCapture** - Image capture for profile pictures

### Marketplace Components
1. **MarketProductCard** - Product listing card with images and details
2. **CategoryFilter** - Category selection interface
3. **TransportSelector** - Delivery method selection with pricing
4. **BuyerOrderSummary** - Cart preview and checkout
5. **HeroSection** - Hero banner on marketplace

### Farmer Components
1. **AddListingDialog** - Form to create new product listings
2. **ProductsTable** - List of farmer's products with actions

### Agent Components
1. **AddProductDialog** - Inventory management
2. **ProductsTable** - Agent inventory display
3. **OrdersTable** - Delivery order management

### Admin Components
1. **AdminAnalytics** - Charts and metrics visualization
2. **AdminOrdersTable** - Orders data table with filters
3. **AdminUsersTable** - Users management table
4. **AdminProductsTable** - Products moderation table
5. **AdminPaymentsTable** - Payment tracking table

### UI Components (ShadcnUI)
- Button, Input, Label, Textarea, Card, Dialog, Tabs
- Dropdown Menu, Alert Dialog, Context Menu, Select
- Badge, Avatar, Skeleton, Progress, Checkbox
- Radio Group, Toggle, Switch, Slider
- Accordion, Collapsible, Separator, Divider
- Form, Popover, Command, Calendar, Date Picker
- Drawer, Sheet, Sidebar, Resizable, Scroll Area
- Tooltip, Toast, Notification, Carousel
- And 20+ more ShadcnUI components

---

## Custom Hooks

### `useAuth()` - Authentication
- Access auth context (user, session, loading, methods)

### `useProducts()` - Product Management
- `useAvailableProducts()` - Fetch all marketplace products
- `useAgentProducts()` - Fetch agent's products
- `useFarmerProducts()` - Fetch farmer's products with CRUD operations

### `useOrders()` - Order Management
- `useAgentOrders()` - Track agent deliveries
- `useAdminOrders()` - View all platform orders

### `useAdminData()` - Admin Dashboard
- `useAdminOrders()` - All orders with analytics
- `useAdminUsers()` - All users with filtering
- `useAdminProducts()` - All products with moderation
- `useAdminStats()` - Platform statistics
- `useAdminPayments()` - Payment tracking

### `useImageUpload()` - Image Handling
- Upload images to Supabase storage
- Generate public URLs
- Handle image errors

### `useUserRole()` - Role Detection
- Determine current user's role
- Check role permissions

### `useToast()` - Notifications
- Show success, error, info messages
- Auto-dismiss toasts

---

## Key Features & Functions

### 1. Marketplace Functionality
- **Product Discovery**: Search, filter by category, location-based browsing
- **Dynamic Pricing**: Real-time price display based on availability
- **Transport Selection**: Multiple delivery options with cost calculation
- **Order Management**: Multi-item orders with quantity selection
- **Payment Processing**: Integration with Supabase for payment tracking

### 2. Farmer Features
- **Listing Management**: Full CRUD for produce listings
- **Inventory Control**: Track quantities and update availability
- **Earnings Dashboard**: View total sales and payouts
- **Order Notifications**: Real-time alerts on new orders

### 3. Agent Features
- **Order Coordination**: Accept and manage deliveries
- **Performance Tracking**: Monitor earnings and completed orders
- **Inventory Management**: Manage products from associated farmers
- **Commission Calculation**: Automatic commission tracking

### 4. Admin Features
- **Platform Analytics**: Revenue, user growth, order trends
- **User Management**: Create, verify, suspend, delete users
- **Payment Settlement**: Calculate and process farmer payouts
- **Content Moderation**: Review and approve product listings
- **Dispute Resolution**: Handle order and payment issues

### 5. USSD (Offline) Access
- **Menu-based Navigation**: Text-based marketplace access
- **Simple Transactions**: Order placement without internet
- **Category Browsing**: Offline product discovery
- **Confirmation Workflow**: Order verification and summary

### 6. Authentication & Security
- **Email/Password Auth**: Supabase authentication
- **Role-based Access**: Separate interfaces for each role
- **ID Verification**: Agent and admin ID validation
- **Session Management**: Persistent login
- **Protected Routes**: Authorization guards on all pages

---

## Data Flow

### User Registration
1. User selects role on Auth page
2. System shows role-specific form fields
3. User submits registration data
4. Server validates fields and creates account
5. User receives confirmation email (if configured)
6. System creates user profile record
7. User redirected to role-specific dashboard

### Product Listing
1. Farmer navigates to dashboard
2. Clicks "Add Listing"
3. Fills form with produce details and uploads image
4. System validates data
5. Product saved to database and marked as available
6. Product immediately appears in marketplace for buyers

### Marketplace Order
1. Buyer browses marketplace with filters
2. Selects products and quantities
3. Chooses transport method
4. Reviews order summary (items + shipping + fee)
5. Proceeds to checkout
6. Payment processed via Supabase
7. Order created and sent to farmer
8. Agent assigned for logistics
9. Buyer receives order confirmation

### Agent Delivery
1. New order notification sent to agents
2. Agent reviews order details and accepts
3. Agent coordinates pickup with farmer
4. Marks order as "in transit"
5. Upon delivery, marks as "delivered"
6. System calculates commission
7. Farmer receives 90% payout
8. Platform retains 10% fee

---

## UI/UX Specifications

### Color System
- **Primary**: Deep Lemon Green (#2D6A4F)
- **Secondary**: Golden Yellow (#D4A574)
- **Accent**: Warm Orange (#E63946)
- **Background**: Light Off-white (#F8F9FA)
- **Foreground**: Dark Gray/Black (#1F2937)
- **Muted**: Light Gray (#6B7280)
- **Border**: Light Gray (#E5E7EB)

### Typography
- **Headings**: Bold, 28px-48px (for h1-h3)
- **Body Text**: Regular, 14px-16px
- **Small Text**: 12px-13px (for labels, hints)
- **Line Height**: 1.5-1.6 for readability

### Responsive Breakpoints
- Mobile: 375px - 600px
- Tablet: 600px - 1024px
- Desktop: 1024px+

### Layout Patterns
- Container max-width: 1280px
- Spacing scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px
- Grid system: 12-column responsive
- Flexbox for alignment and distribution

---

## Performance Optimizations

1. **Code Splitting**: Lazy-loaded route components
2. **Image Optimization**: Product images with fallbacks
3. **Query Caching**: React Query for data fetching
4. **Memoization**: useMemo for expensive computations
5. **Debouncing**: Search and filter inputs
6. **Pagination**: Large data sets paginated
7. **Lazy Loading**: Images loaded on scroll

---

## Error Handling

1. **Network Errors**: Retry logic with exponential backoff
2. **Validation Errors**: Real-time form validation with Zod
3. **Auth Errors**: Redirect to login on session expiry
4. **API Errors**: User-friendly error messages
5. **Fallback UIs**: Loading states and empty states

---

## Testing Strategy

- **Unit Tests**: Individual hooks and utilities
- **Component Tests**: UI component rendering and interactions
- **Integration Tests**: Auth flows and data fetching
- **E2E Tests**: Complete user journeys (sign up → order → delivery)

---

## Deployment & DevOps

- **Frontend Hosting**: Vercel
- **Backend Database**: Supabase (PostgreSQL)
- **Environment Variables**: Supabase URL and API keys
- **Build Command**: `vite build`
- **Dev Command**: `vite dev`
- **CI/CD**: GitHub Actions for automated testing and deployment

---

## Future Enhancements

1. **Mobile App**: React Native version
2. **Payment Gateway**: Mobile Money (MTN, Vodafone) integration
3. **Analytics Dashboard**: Advanced reporting for farmers
4. **Recommendation Engine**: ML-based product suggestions
5. **Video Streaming**: Live market updates from farms
6. **Blockchain**: Supply chain transparency
7. **Weather API**: Crop planning tools
8. **Pricing Optimization**: Dynamic pricing based on demand
9. **Social Features**: Farmer profiles and reviews
10. **Subscription Model**: Premium services for agents

---

## File Structure

```
src/
├── assets/                 # Images and media
├── components/
│   ├── ui/                 # ShadcnUI components
│   ├── admin/              # Admin-specific components
│   ├── agent/              # Agent-specific components
│   ├── farmer/             # Farmer-specific components
│   ├── marketplace/        # Marketplace components
│   ├── Navbar.tsx
│   ├── AuthGuard.tsx
│   ├── RoleGuard.tsx
│   └── ...
├── contexts/
│   └── AuthContext.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useProducts.ts
│   ├── useOrders.ts
│   ├── useAdminData.ts
│   └── ...
├── integrations/
│   └── supabase/
│       ├── client.ts
│       └── types.ts
├── pages/
│   ├── Index.tsx            # Landing page
│   ├── Auth.tsx             # Authentication
│   ├── Marketplace.tsx      # Buyer marketplace
│   ├── FarmerDashboard.tsx
│   ├── AgentCenter.tsx
│   ├── AdminDashboard.tsx
│   ├── AdminLogin.tsx
│   ├── Settings.tsx
│   ├── USSDDemo.tsx
│   └── NotFound.tsx
├── lib/
│   └── utils.ts
├── App.tsx
└── main.tsx
```

---

## Rebuild Instructions

To rebuild the entire website:

1. **Setup Backend**: Connect Supabase project with proper tables and RLS policies
2. **Install Dependencies**: `npm install` or `pnpm install`
3. **Configure Environment**: Add Supabase URL and anon key to `.env`
4. **Database Schema**: Run migrations to create all required tables
5. **Build UI Components**: Ensure all ShadcnUI components are installed
6. **Implement Pages**: Build pages in order: Index → Auth → Marketplace → Dashboards
7. **Connect API**: Link all pages to Supabase backend
8. **Style & Customize**: Apply branding and customizations
9. **Test All Flows**: Manual and automated testing
10. **Deploy**: Push to Vercel and configure production

---

## Summary

Harvest-In is a multi-role agricultural marketplace with:
- **10+ Pages** handling different user journeys
- **6 Distinct User Roles** with specialized interfaces
- **50+ UI Components** from ShadcnUI
- **15+ Custom Hooks** for business logic
- **Real-time Data Sync** via Supabase
- **Responsive Design** for mobile-first experience
- **USSD Fallback** for low-bandwidth users
- **Comprehensive Admin Panel** for platform management

The platform enables farmers to reach buyers directly, buyers to access fresh produce, agents to earn through logistics, and admins to manage the entire ecosystem.
