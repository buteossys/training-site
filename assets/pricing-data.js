// This file stores pricing data to be used by pricing.html
// Data extracted and simplified from "Pricing Tables.docx"

const pricingCatalog = {
    coreServices: {
        title: "Core Service Offerings Summary",
        headers: ["Service Name", "User's Base Price", "Core Included Features", "Key Assumptions & Limitations for Price Point"],
        services: [
            {
                name: "Basic Website",
                price: "$500",
                features: "Custom design (limited scope), up to 5 pages, deployment & hosting setup, 3rd party links, responsive/mobile-first, basic SEO, contact form, 1 revision round.",
                assumptions: "\"Custom design\" based on pre-defined framework or limited concepts. Strict adherence to 5-page limit. Hosting costs are client's responsibility post-setup. Content provided by client."
            },
            {
                name: "Basic Mobile App",
                price: "$1000",
                features: "Custom design (limited scope), iOS & Android compatible (cross-platform), up to 5 screens/features, deployment assistance, basic user authentication (if needed), 1 revision round.",
                assumptions: "\"Custom design\" using component-based approach. Cross-platform framework (e.g., React Native, Flutter). App store developer account fees are client's responsibility. Backend/API development beyond basic authentication is extra. Content provided by client."
            },
            {
                name: "Basic AI Phone Agent",
                price: "$1000",
                features: "Scheduling, ordering (simple), company info (FAQ), one basic 3rd party integration, standard voice, rule-based/keyword conversational flow.",
                assumptions: "\"AI\" is rule-based/keyword-driven, not advanced NLP/ML. \"One integration\" limited to pre-approved, simple APIs (e.g., standard calendar). Phone number and any associated telephony costs are client's responsibility. Limited to a defined number of conversational intents."
            }
        ]
    },
    websiteUpgrades: {
        title: "Website Upgrade Modules & Pricing Tiers",
        headers: ["Upgrade Module Category", "Tier Name/Type", "Key Features Included", "Suggested Pricing Model", "Estimated Price Range/Add-on Cost", "Notes"],
        upgrades: [
            { category: "E-commerce", tier: "Starter E-commerce", features: "Basic cart, up to 20-50 products, 1 payment gateway (Stripe/PayPal), simple inventory.", model: "Fixed Add-on", price: "+$1,000", notes: "Assumes plugin/platform integration." },
            { category: "E-commerce", tier: "Advanced E-commerce", features: "Larger catalog, customer accounts, multiple gateways, shipping integration, discounts.", model: "Fixed Add-on", price: "+$2,000 - $5,000", notes: "" },
            { category: "3rd Party Integrations", tier: "Simple API Integration", features: "Widget embed, 1-way data sync, basic form integration.", model: "Per Integration", price: "+$500", notes: "For well-documented, standard APIs." },
            { category: "3rd Party Integrations", tier: "Complex API Integration", features: "Custom workflow, 2-way sync, proprietary API.", model: "Per Integration (Custom Quote often needed)", price: "+$2,000-$5,000", notes: "Requires discovery." },
            { category: "Server-Side Functionality", tier: "Basic Backend", features: "Simple CMS for sections, basic DB for dynamic content, form-to-DB.", model: "Fixed Add-on", price: "+$1,000", notes: "" },
            { category: "Server-Side Functionality", tier: "Advanced Backend", features: "Custom admin panel, complex data operations.", model: "Fixed Add-on (or Custom Quote)", price: "+$3,000 - $10,000+", notes: "Scope dependent." },
            { category: "User Accounts & Profiles", tier: "Standard", features: "Registration, login, password recovery, basic profiles.", model: "Fixed Add-on", price: "+$500", notes: "" },
            { category: "CMS Integration", tier: "Standard", features: "Integration of common CMS (e.g., WordPress, Strapi) with existing design, basic training.", model: "Fixed Add-on", price: "+$1,000", notes: "Client manages CMS content." }
        ]
    },
    mobileAppUpgrades: {
        title: "Mobile App Upgrade Modules & Pricing Tiers",
        headers: ["Upgrade Module Category", "Tier Name/Type", "Key Features Included", "Suggested Pricing Model", "Estimated Price Range/Add-on Cost", "Notes"],
        upgrades: [
            { category: "E-commerce (In-App)", tier: "Starter In-App E-commerce", features: "Basic product list, simple cart, 1 payment gateway SDK.", model: "Fixed Add-on", price: "+$1,000", notes: "" },
            { category: "E-commerce (In-App)", tier: "Advanced In-App E-commerce", features: "Larger catalog, search/filter, customer accounts, order history.", model: "Fixed Add-on", price: "+$3,000 - $7,000+", notes: "" },
            // ... Add more mobile app upgrades from the document as needed
             { category: "Enhanced UX: Push Notifications", tier: "Advanced Setup", features: "Segmentation, scheduled, rich media, A/B testing integration.", model: "Fixed Add-on", price: "+$500", notes: "Platform subscription costs may apply."}
        ]
    },
    aiPhoneAgentUpgrades: {
        title: "AI Phone Agent Upgrade Modules & Pricing Tiers",
        headers: ["Upgrade Module Category", "Tier Name/Type", "Key Features Included", "Suggested Pricing Model", "Estimated Price Range/Add-on Cost", "Notes"],
        upgrades: [
            { category: "Operational Scope", tier: "Multi-Location Support", features: "Logic for location-specific info/routing.", model: "Fixed Add-on", price: "+$500 - $3,000", notes: "Complexity dependent." },
            { category: "Advanced Integrations", tier: "Expanded Integration", features: "Integration with additional CRM, advanced scheduling, inventory etc.", model: "Per Major Integration", price: "+$1,500 - $5,000", notes: "For moderately complex APIs." },
            // ... Add more AI phone agent upgrades from the document
        ]
    },
    customPricingConsiderations: {
        title: "Custom Pricing Considerations",
        headers: ["Model", "Description", "Pros", "Cons", "Ideal Use Case for This Design Stream"],
        models: [
            { name: "Time & Materials (T&M)", description: "Client pays for actual hours worked at agreed rates.", pros: "Flexibility for changing scope; transparency of effort.", cons: "Budget uncertainty for client; requires high trust & good PM.", use_case: "Projects with evolving or unclear initial scope; agile development; R&D projects." },
            { name: "Fixed-Price (Phased Scope)", description: "Agreed total price for a very clearly defined scope, often broken into phases.", pros: "Budget certainty for client (if scope is fixed).", cons: "Risky for developer if scope creeps or is underestimated; requires detailed upfront specification.", use_case: "Well-defined MVPs; projects with highly stable and documented requirements." },
            // ... Add more custom pricing models
        ]
    }
};