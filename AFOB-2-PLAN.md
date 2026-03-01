# AFOB-2 Implementation Plan: Contact Information

## Status: IN PROGRESS

## Checklist

### Functional Requirements
- [ ] Display complete street address ⚠️ **NEEDS INPUT FROM JANNEY**
- [x] Show phone number: (346) 257-1588 (already implemented)
- [x] Display email: hello@affairsofbeauty.com (already implemented)
- [ ] Enhance contact form validation
- [ ] Update Google Maps embed with specific location ⚠️ **NEEDS ADDRESS**
- [x] Show business hours clearly (already implemented)

### Visual Requirements
- [x] Contact info prominently displayed on Contact page
- [x] Footer includes phone, email, address
- [ ] Update map to be more specific
- [x] Contact form styled consistently

### Technical Requirements
- [ ] Enhanced form validation (email format, required fields, phone format)
- [x] Form submission handling (mailto: already implemented)
- [x] Click-to-call on mobile (already implemented: tel: links)
- [x] Click-to-email (already implemented: mailto: links)
- [ ] Enhanced schema.org markup for business contact info
- [ ] Add ARIA labels for accessibility

### Testing Requirements
- [ ] Test form validation (empty fields, invalid email)
- [ ] Test form submission
- [ ] Test phone click-to-call on mobile
- [ ] Test email click-to-email
- [ ] Verify schema markup with Google testing tool
- [ ] Test responsive layout on mobile/tablet

## Implementation Steps

1. ✅ Review current implementation
2. ⏳ Enhance form validation with better UX
3. ⏳ Add comprehensive ARIA labels
4. ⏳ Enhance schema.org markup
5. ⏳ Create test suite
6. ⏳ Get street address from Janney
7. ⏳ Update Google Maps embed
8. ⏳ Update schema.org with full address
9. ⏳ Test on staging
10. ⏳ Deploy to production

## What's Already Implemented

### Existing Features ✅
- Phone number displayed in navbar, contact section, footer
- Email displayed in contact section, footer
- Business hours displayed in contact section
- Contact form with basic validation
- Google Maps embed (currently showing all of Florida)
- Schema.org markup with phone/email
- Click-to-call links (tel:)
- Click-to-email links (mailto:)

### What Needs Enhancement

#### 1. Form Validation
- Add phone number format validation
- Better error messages
- Field-level validation feedback
- Prevent submission with invalid data

#### 2. Accessibility (ARIA)
- Add aria-label to all form fields
- Add aria-required to required fields
- Add aria-invalid for validation errors
- Add role attributes where needed

#### 3. Schema.org Markup
- Add complete streetAddress (when available)
- Add postalCode
- Add city
- Enhance with more business details

#### 4. Google Maps
- Update embed to show specific business location (when address available)
- Make it more interactive

## Blocking Items

⚠️ **REQUIRES JANNEY'S INPUT:**
- Complete street address (street, city, zip code)
- Confirm if business hours are accurate

## Notes

The current implementation already has most features in place. The main missing piece is the specific street address, which is needed for:
1. Displaying on the contact page
2. Updating the Google Maps embed
3. Completing the schema.org markup
4. Meeting the acceptance criteria

All other technical enhancements can be completed and tested without the address.
