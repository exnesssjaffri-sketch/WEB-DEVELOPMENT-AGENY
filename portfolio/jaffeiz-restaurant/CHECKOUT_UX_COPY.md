# 🧾 Jaffeiz Restaurant — Checkout & Billing UX Copy

> **Tone:** Trustworthy, modern, appetizing, clear  
> **Audience:** Local Karachi diners + International customers ordering worldwide delivery  
> **Purpose:** Complete user-facing text for the 4-step checkout flow

---

## Overview: The 4-Step Checkout Flow

The checkout experience is divided into 4 clear, reassuring steps. Each step builds trust and keeps the customer informed about what's happening and why.

```
Step 1: 📱 Phone Verification  →  Step 2: 📧 Email Confirmation
     →  Step 3: 💳 Payment Details  →  Step 4: ⏳ Prep Time Notice
     →  ✅ Order Confirmed
```

---

## Step 1: Secure Phone Verification

### Header
```
📱 Verify Your Phone Number
```

### Description (explaining why we need it)
```
We'll send a quick one-time code to your phone. This helps us keep your order secure,
prevent spam bookings, and send you real-time delivery updates so you know exactly
when your food is on its way.
```

### Form Label
```
Phone Number
```

### Input Placeholder
```
e.g. 03XX-XXXXXXX  or  +1 (555) 000-0000
```

### Button Text
```
📨 Send Verification Code
```

### Resend Link (appears after sending)
```
Didn't receive the code? <a href="#">Send again</a> (30s)
```

### Success Message (after OTP verified)
```
✅ Phone verified! Your order updates will be sent here.
```

### Error Message (if wrong code)
```
❌ That code doesn't match. Please check and try again.
```

### Microcopy (below the button)
```
🔒 Your number is only used for order updates. We never spam or share your data.
```

---

## Step 2: Email Confirmation

### Header
```
📧 Where should we send your receipt?
```

### Description
```
Enter your email to receive a detailed digital receipt, a full breakdown of your order,
and a tracking link so you can follow your meal from our kitchen to your doorstep.
```

### Form Label
```
Email Address
```

### Input Placeholder
```
your@email.com
```

### Button Text
```
📄 Send Receipt & Tracking
```

### Success Message (after email entered)
```
✅ We'll email your receipt and tracking details to this address.
```

### Microcopy (below the input)
```
No spam, no newsletters — just your order info. We respect your inbox.
```

---

## Step 3: Payment Details & Card Acceptance

### Section Header
```
💳 Secure Payment
```

### Trust-Building Header
```
We accept all major cards — Visa, Mastercard, American Express
```

### Trust-Building Microcopy Line
```
🔒 Your payment is encrypted and processed securely. We use industry-standard SSL
encryption to protect every transaction. Your card details are never stored on our servers.
```

### Card Icons (visual reference)
```
[Visa] [Mastercard] [American Express] [JazzCash] [EasyPaisa]
```

### Form Fields

| Field | Label | Placeholder |
|-------|-------|-------------|
| Cardholder Name | `Cardholder Name` | `Name as it appears on your card` |
| Card Number | `Card Number` | `1234 5678 9012 3456` |
| Expiry Date | `Expiry Date` | `MM/YY` |
| CVV | `CVV` | `123` |

### Payment Method Selector (for non-card options)
```
Or pay with:
[Cash on Delivery] [JazzCash] [EasyPaisa]
```

### Button Text
```
🔒 Pay Now — Rs. [Total Amount]
```

### Microcopy below Pay button
```
🔐 SSL Encrypted  •  PCI Compliant  •  100% Secure
```

---

## Step 4: Order Prep & Waiting Time Warning

### Section Header (appears as a notice before final payment confirmation)
```
⏳ A quick note before you order…
```

### Notice Copy
```
At Jaffeiz, every meal is made fresh to order — just like you'd expect from
a authentic Pakistani kitchen.

Because we prepare each dish from scratch using traditional recipes and
hand-picked spices, please allow:

🕐 **20–30 minutes** for standard orders
🕐 **35–45 minutes** for large orders (Family Feast or 6+ items)

Trust us — good things take time. Your patience means you get the freshest,
most flavorful Jaffeiz experience possible. 🔥
```

### Checkbox (user must acknowledge)
```
☐ I understand that my order will be freshly prepared and may take 20–30 minutes.
```

### Final Button Text
```
✅ Yes, I'm Ready — Place My Order
```

### Alternative Button (if they need to review)
```
← Review My Order
```

---

## Success / Confirmation Screen (After Payment)

### Header
```
🎉 Order Confirmed!
```

### Body Copy
```
Thank you, [Customer Name]!

Your Jaffeiz order is now in the hands of our chefs. Here's what happens next:

1. 👨‍🍳 **Our kitchen starts prepping** — fresh, from scratch
2. 🔥 **Your meal is cooked to perfection** — just the way you like it
3. 🚀 **Your order is on its way** — you'll get a tracking update via SMS

**Order Summary**
━━━━━━━━━━━━━━━━━━━━━
🆔 Order #: JZ-[random 6 digits]
📧 Receipt sent to: [email]
📱 Tracking updates: [phone]
📍 Delivering to: [address]
💰 Total charged: Rs. [amount]
━━━━━━━━━━━━━━━━━━━━━

We'll text you the moment your driver is on the way. Get ready for
an unforgettable taste of Pakistan! 🇵🇰✨
```

### Button Text
```
Awesome, Thanks! 🎉
```

---

## Complete HTML Copy Snippets (Ready to Implement)

### Cart Billing Form (Delivery Checkout) — Updated Copy

```html
<!-- Step 1: Phone Verification -->
<div class="checkout-step" data-step="1">
    <div class="step-header">
        <span class="step-number">1</span>
        <h3>📱 Verify Your Phone Number</h3>
    </div>
    <p class="step-description">
        We'll send a quick one-time code to your phone. This helps us keep your order secure,
        prevent spam bookings, and send you real-time delivery updates so you know exactly
        when your food is on its way.
    </p>
    <div class="form-group">
        <label for="cart-delivery-phone">Phone Number</label>
        <input type="tel" id="cart-delivery-phone" placeholder="e.g. 03XX-XXXXXXX  or  +1 (555) 000-0000" required />
    </div>
    <button type="button" class="btn btn-primary" id="send-otp-btn">📨 Send Verification Code</button>
    <p class="field-microcopy">🔒 Your number is only used for order updates. We never spam or share your data.</p>
</div>

<!-- Step 2: Email Confirmation -->
<div class="checkout-step" data-step="2" style="display: none;">
    <div class="step-header">
        <span class="step-number">2</span>
        <h3>📧 Where should we send your receipt?</h3>
    </div>
    <p class="step-description">
        Enter your email to receive a detailed digital receipt, a full breakdown of your order,
        and a tracking link so you can follow your meal from our kitchen to your doorstep.
    </p>
    <div class="form-group">
        <label for="cart-delivery-email">Email Address</label>
        <input type="email" id="cart-delivery-email" placeholder="your@email.com" required />
    </div>
    <p class="field-microcopy">No spam, no newsletters — just your order info. We respect your inbox.</p>
</div>

<!-- Step 3: Payment Details -->
<div class="checkout-step" data-step="3" style="display: none;">
    <div class="step-header">
        <span class="step-number">3</span>
        <h3>💳 Secure Payment</h3>
    </div>
    <p class="step-description">
        We accept all major cards — Visa, Mastercard, American Express
    </p>
    <p class="trust-microcopy">
        🔒 Your payment is encrypted and processed securely. We use industry-standard SSL
        encryption to protect every transaction. Your card details are never stored on our servers.
    </p>
    <div class="card-icons">
        <span class="card-icon">💳 Visa</span>
        <span class="card-icon">💳 Mastercard</span>
        <span class="card-icon">💳 Amex</span>
    </div>
    <div class="form-group">
        <label for="cart-delivery-name">Full Name</label>
        <input type="text" id="cart-delivery-name" placeholder="Enter your full name" required />
    </div>
    <div class="form-group">
        <label for="cart-delivery-address">Delivery Address</label>
        <textarea id="cart-delivery-address" rows="2" placeholder="House #, Street, City" required></textarea>
    </div>
    <div class="form-group">
        <label for="cart-payment-method">Payment Method</label>
        <select id="cart-payment-method">
            <option value="card">💳 Credit / Debit Card</option>
            <option value="cod">💵 Cash on Delivery</option>
            <option value="jazzcash">📱 JazzCash</option>
            <option value="easypaisa">📱 EasyPaisa</option>
        </select>
    </div>
    <p class="field-microcopy">🔐 SSL Encrypted • PCI Compliant • 100% Secure</p>
</div>

<!-- Step 4: Prep Time Notice -->
<div class="checkout-step" data-step="4" style="display: none;">
    <div class="step-header">
        <span class="step-number">4</span>
        <h3>⏳ A quick note before you order…</h3>
    </div>
    <div class="prep-notice">
        <p>At Jaffeiz, every meal is made <strong>fresh to order</strong> — just like you'd expect from an authentic Pakistani kitchen.</p>
        <p>Because we prepare each dish from scratch using traditional recipes and hand-picked spices, please allow:</p>
        <ul class="prep-times">
            <li>🕐 <strong>20–30 minutes</strong> for standard orders</li>
            <li>🕐 <strong>35–45 minutes</strong> for large orders (Family Feast or 6+ items)</li>
        </ul>
        <p class="prep-closing">Trust us — good things take time. Your patience means you get the freshest, most flavorful Jaffeiz experience possible. 🔥</p>
    </div>
    <label class="checkbox-label">
        <input type="checkbox" id="prep-acknowledge" required />
        I understand that my order will be freshly prepared and may take 20–30 minutes.
    </label>
    <button type="submit" class="btn btn-primary" id="place-order-btn" disabled>
        ✅ Yes, I'm Ready — Place My Order
    </button>
    <button type="button" class="btn btn-secondary" id="review-order-btn">← Review My Order</button>
</div>
```

### Booking Billing Form (Table Reservation) — Updated Copy

```html
<!-- Step 1: Phone Verification -->
<div class="checkout-step" data-step="1">
    <div class="step-header">
        <span class="step-number">1</span>
        <h3>📱 Verify Your Phone Number</h3>
    </div>
    <p class="step-description">
        We'll send a quick code to confirm your number. This prevents no-shows and lets us
        reach you if anything changes with your reservation.
    </p>
    <div class="form-group">
        <label for="book-phone">Phone Number</label>
        <input type="tel" id="book-phone" placeholder="+1 (555) 000-0000" required />
    </div>
    <button type="button" class="btn btn-primary">📨 Send Verification Code</button>
    <p class="field-microcopy">🔒 Your number is kept private and only used for your reservation.</p>
</div>

<!-- Step 2: Email Confirmation -->
<div class="checkout-step" data-step="2" style="display: none;">
    <div class="step-header">
        <span class="step-number">2</span>
        <h3>📧 Get your booking confirmation</h3>
    </div>
    <p class="step-description">
        We'll email you a confirmation with your booking details, a calendar invite,
        and a link to modify or cancel your reservation if plans change.
    </p>
    <div class="form-group">
        <label for="book-email">Email Address</label>
        <input type="email" id="book-email" placeholder="your@email.com" required />
    </div>
    <p class="field-microcopy">Your email is only used for this reservation. No marketing emails.</p>
</div>

<!-- Step 3: Payment Details -->
<div class="checkout-step" data-step="3" style="display: none;">
    <div class="step-header">
        <span class="step-number">3</span>
        <h3>💳 Secure Payment</h3>
    </div>
    <p class="step-description">
        We accept all major cards — Visa, Mastercard, American Express
    </p>
    <p class="trust-microcopy">
        🔒 Your payment is encrypted and processed securely. Your card details are never stored on our servers.
    </p>
    <!-- existing billing form fields -->
    <p class="field-microcopy">🔐 SSL Encrypted • PCI Compliant • 100% Secure</p>
</div>

<!-- Step 4: Prep Time Notice (for bookings, this is about table readiness) -->
<div class="checkout-step" data-step="4" style="display: none;">
    <div class="step-header">
        <span class="step-number">4</span>
        <h3>⏳ Before we confirm your table…</h3>
    </div>
    <div class="prep-notice">
        <p>When you arrive at Jaffeiz, your table and your experience are prepared fresh — just for you.</p>
        <p>To ensure everything is perfect when you walk in, please arrive within <strong>15 minutes</strong> of your booked time. If you're running late, just give us a call and we'll hold your table.</p>
        <p>Your table will be ready and waiting. All we ask is a little heads-up if your plans change. 🙏</p>
    </div>
    <label class="checkbox-label">
        <input type="checkbox" id="booking-acknowledge" required />
        I understand that my table will be held for 15 minutes past the reservation time.
    </label>
    <button type="submit" class="btn btn-primary" id="confirm-booking-btn" disabled>
        ✅ Confirm My Booking
    </button>
</div>
```

---

## CSS Micro-Styles for the Checkout Copy

Add these styles to `styles.css` to make the copy look polished:

```css
/* Checkout Step Styling */
.checkout-step {
    padding: 24px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    margin-bottom: 20px;
    border: 1px solid rgba(193, 154, 43, 0.2);
}

.step-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
}

.step-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: #c19a2b;
    color: #0a0a0a;
    font-weight: 700;
    border-radius: 50%;
    font-size: 14px;
}

.step-header h3 {
    margin: 0;
    font-size: 18px;
    color: #f5f5f5;
}

.step-description {
    color: #b0b0b0;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 20px;
}

.field-microcopy {
    color: #888;
    font-size: 12px;
    margin-top: 8px;
    font-style: italic;
}

.trust-microcopy {
    color: #c19a2b;
    font-size: 13px;
    padding: 12px 16px;
    background: rgba(193, 154, 43, 0.08);
    border-radius: 8px;
    margin-bottom: 20px;
    line-height: 1.5;
}

.card-icons {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.card-icon {
    padding: 6px 14px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    font-size: 13px;
    color: #ccc;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Prep Time Notice */
.prep-notice {
    background: rgba(193, 154, 43, 0.06);
    border-left: 3px solid #c19a2b;
    padding: 16px 20px;
    border-radius: 0 8px 8px 0;
    margin-bottom: 20px;
}

.prep-notice p {
    color: #d0d0d0;
    font-size: 14px;
    line-height: 1.7;
    margin-bottom: 12px;
}

.prep-notice p:last-child {
    margin-bottom: 0;
}

.prep-times {
    list-style: none;
    padding: 0;
    margin: 12px 0;
}

.prep-times li {
    padding: 6px 0;
    font-size: 15px;
    color: #f0f0f0;
}

.prep-closing {
    font-style: italic;
    color: #c19a2b !important;
}

.checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 14px;
    color: #b0b0b0;
    margin-bottom: 20px;
    cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
    margin-top: 2px;
    width: 18px;
    height: 18px;
    accent-color: #c19a2b;
    cursor: pointer;
}

/* Step navigation buttons */
.step-actions {
    display: flex;
    gap: 12px;
    margin-top: 16px;
}

.step-actions .btn {
    flex: 1;
}

/* OTP verification inline */
.otp-verify-section {
    display: none;
    margin-top: 16px;
    padding: 16px;
    background: rgba(193, 154, 43, 0.05);
    border-radius: 8px;
    border: 1px solid rgba(193, 154, 43, 0.15);
}

.otp-verify-section.show {
    display: block;
    animation: fadeInUp 0.3s ease;
}

.otp-input-row {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin: 12px 0;
}

.otp-input-row input {
    width: 44px;
    height: 50px;
    text-align: center;
    font-size: 1.4rem;
    font-weight: 700;
    background: rgba(255,255,255,0.08);
    border: 2px solid rgba(255,255,255,0.15);
    border-radius: 8px;
    color: #fff;
    outline: none;
    transition: border-color 0.3s ease;
}

.otp-input-row input:focus {
    border-color: #c19a2b;
}

.otp-input-row input.filled {
    border-color: #28a745;
    background: rgba(40, 167, 69, 0.1);
}

.otp-timer-checkout {
    text-align: center;
    font-size: 0.85rem;
    color: #888;
    margin-top: 8px;
}

.otp-success-msg {
    color: #28a745;
    font-size: 0.9rem;
    font-weight: 600;
    text-align: center;
    padding: 8px;
    display: none;
}

/* Step divider */
.step-divider {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 16px 0;
    color: #555;
    font-size: 0.85rem;
}

.step-divider::before,
.step-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.08);
}