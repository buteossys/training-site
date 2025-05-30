document.addEventListener('DOMContentLoaded', function() {
    // --- AWS S3 Configuration (USER MUST CONFIGURE THESE) ---
    const S3_BUCKET_NAME = 'tfs-staff'; // Replace with your bucket name
    const S3_BUCKET_REGION = 'us-east-1'; // Replace with your bucket region e.g., 'us-east-1'
    const S3_IDENTITY_POOL_ID = 'us-east-1:d0db8e7d-4138-4b6a-a47f-7649f598a628'; // Replace with your Cognito Identity Pool ID


    // Initialize AWS SDK
    // Ensure the AWS SDK script is loaded in training.html before this script
    if (typeof AWS === 'undefined') {
        console.error("AWS SDK not loaded. Make sure aws-sdk.min.js is included in training.html");
        // Display error to user?
        const submissionStatusEl = document.getElementById('submissionStatus');
        if (submissionStatusEl) {
             submissionStatusEl.textContent = 'Error: AWS SDK failed to load. Please contact support.';
             submissionStatusEl.style.color = 'red';
        }
        return; // Stop execution if SDK is missing
    }

    AWS.config.update({
        region: S3_BUCKET_REGION,
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: S3_IDENTITY_POOL_ID
        })
    });

    const s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: S3_BUCKET_NAME }
    });
    // --- End of AWS S3 Configuration ---


    const trainingWorkflow = document.getElementById('training-workflow');
    const steps = Array.from(trainingWorkflow.querySelectorAll('.training-step'));
    const traineeForm = document.getElementById('traineeForm');
    const submissionStatusEl = document.getElementById('submissionStatus');

    let currentStepIndex = 0;
    let traineeData = {};
    let quizAnswers = {
        module1: {},
        module2: {},
        module3: {}
    };

    // --- Training Module Content (Extracted and Formatted from "Sales Training 1.docx") ---
    // NOTE: Tables from the docx are represented here as descriptive paragraphs or lists for simplicity in HTML injection.
    // For precise table layouts, more complex HTML generation or CSS would be needed.
    const moduleContents = {
        module1: `
            <h3>Module 1: Understanding Our Services & Pricing Structure</h3>
            <p>  This initial module is designed to provide the sales team with a robust understanding of the diverse services offered within our "design stream." It will also detail the pricing structures associated with these services.</p>
            <p> A primary focus will be on equipping the team to articulate the inherent value of each offering and to justify the associated costs, particularly when engaging with clients who may not have a technical background.</p>
            <p> The goal is to build confidence in presenting our solutions as valuable investments for our clients' businesses.</p>

            <h4>Section 1.1: Introduction to Our "Design Stream" – What We Offer</h4>
            <p>  Our "design stream" encompasses a range of digital solutions tailored to meet the evolving needs of modern businesses. These services are designed to establish, enhance, and optimize a client's online presence and operational efficiency.</p>
            <p>  Understanding this spectrum of offerings is crucial, as it allows the sales team to guide clients from foundational solutions to more sophisticated, custom-tailored options as their business needs evolve and grow. This journey represents a long-term value partnership.</p>

            <h5>Core Offerings Overview:</h5>
            <ul>
                <li><strong>Basic Website:</strong>   This service provides the fundamental digital footprint for any business, acting as their primary online "storefront" or information hub. A basic website typically includes essential pages such as a Homepage, About Us, Services/Products, and a Contact page.  The aim is to create a professional, accessible online presence that clearly communicates the client's brand and offerings.  The investment for such foundational sites can range significantly based on the number of pages and initial design complexity, generally starting from around $1,000 and potentially going up to $20,000 for more polished small business sites.</li>
                <li><strong>Basic Mobile App:</strong>   In an increasingly mobile-first world, a basic mobile app offers a more direct and engaging channel to connect with customers compared to a mobile-responsive website. These are dedicated applications developed for smartphone operating systems (iOS and Android).  They can provide a richer user experience and often include functionalities beyond what a standard website can offer, such as offline access or deeper integration with device features.  The cost for a basic mobile application can start from $5,000 and extend to $50,000 or more, depending on the initial feature set and platform requirements.</li>
                <li><strong>Basic AI Phone Agent:</strong>   This solution introduces intelligent automation to client communication. It moves beyond simple interactive voice response (IVR) systems (e.g., "press 1 for sales").  A basic AI phone agent is designed to understand natural language, answer frequently asked questions, gather information, and intelligently route calls to the appropriate human agent or department.  This enhances customer service efficiency and availability. Development costs for AI-powered agents, including chatbots which share similar technology, can range from $8,000 for rule-based systems to $60,000 or more for conversational AI with learning capabilities.</li>
            </ul>

            <h5>Key Upgrades – Adding Power and Functionality:</h5>
            <p>  The true strength of our offerings lies in their adaptability and the potential for enhancement. Upgrades should be positioned not merely as add-on features but as strategic investments that multiply the value of the initial service, enabling new revenue streams, streamlining operations, or facilitating more complex and personalized user interactions.</p>
            <ul>
                <li><strong>E-commerce Functionality:</strong>   This critical upgrade transforms a website or mobile app into a direct sales channel. It enables clients to list products or services, manage inventory, provide a shopping cart experience for customers, and securely process online payments.  This is a direct path to increasing revenue and market reach.  Integrating e-commerce capabilities can range from $15,000 to $30,000 or more, depending on the complexity of the store and the number of integrations required.</li>
                <li><strong>3rd Party Integrations:</strong>   In today's interconnected digital ecosystem, the ability for different software systems to communicate is paramount. This upgrade allows the client's website, mobile app, or AI phone agent to connect seamlessly with other essential business tools they already use or plan to use.  Common examples include Customer Relationship Management (CRM) systems, payment gateways, email marketing platforms, accounting software, and social media channels.  These integrations enhance operational efficiency, improve data accuracy, and automate workflows.   The cost of a single API integration can range from $2,000 to over $30,000, with ongoing maintenance potentially adding to this. For instance, an e-commerce API integration might cost between $10,000 and $20,000.</li>
                <li><strong>Server-Side Functions:</strong>   While client-side functions dictate what a user sees and interacts with visually in their browser, server-side functions are the "behind-the-scenes" engine. Explained non-technically, these are the complex logic and processes that run on the web server.  They enable more sophisticated features such as user accounts and login capabilities, personalized content delivery, data processing and storage, and custom business workflows that go far beyond simple information display.  The development of these backend functionalities is a significant factor in the cost of more advanced web applications.</li>
                <li><strong>Multi-Location Support (for AI Phone Agents):</strong>  This upgrade enhances the AI Phone Agent for businesses operating across multiple physical locations or serving distinct geographical areas.  The agent can be programmed to provide location-specific information (e.g., hours, services, contact details for the nearest branch), route calls based on the caller's location or query, and manage interactions in a way that reflects the distributed nature of the client's business.  This level of customization and integration contributes to the overall complexity and cost of the AI agent solution.</li>
            </ul>

            <h5>Custom Software Solutions:</h5>
            <p>  This represents our premium tier of service, designed for clients with unique, complex, or highly specialized business requirements that cannot be adequately addressed by standard off-the-shelf products or our basic service packages. Custom software development involves a deep discovery phase to fully understand the client's challenges and objectives, followed by the design, development, and deployment of a completely bespoke solution.  This is a consultative process, and pricing is determined by factors such as the project's scope, the intricacy of the required functionalities, the chosen technology stack, and the total development hours.  Typical investments for custom software can range from $50,000 to $250,000 for small to mid-sized enterprise applications, with more complex systems potentially exceeding $1 million.</p>
            <p>  The progression from "Basic" services with targeted upgrades to fully "Custom" solutions represents a value journey for our clients. As their business grows and their digital needs become more sophisticated, our range of offerings allows us to support them at every stage, reinforcing our role as a long-term strategic partner.</p>

            <h4>Section 1.2: Deciphering Our Pricing: Value and Structure</h4>
            <p>  Understanding our pricing philosophy and structure is essential for effectively communicating the value of our services to clients. Our approach is built on principles that foster trust and ensure clients perceive our solutions as worthwhile investments.</p>
            <h5>General Principles:</h5>
            <ul>
                <li><strong>Transparency:</strong>   We believe in clear and straightforward pricing. Clients should understand what they are paying for and the value they receive in return.  Published prices, where feasible, build trust and help potential customers make informed decisions.</li>
                <li><strong>Value-Based Approach:</strong>   Our pricing is not solely based on the hours spent on development but reflects the tangible value, return on investment (ROI), and strategic advantages our solutions provide to the client's business. The sales team's role is to articulate this value clearly.</li>
                <li><strong>Tiered Options:</strong>   For many of our services, we offer tiered packages. This approach allows us to cater to a diverse range of client needs, from those requiring basic functionality to those seeking more comprehensive solutions, all while accommodating different budget levels.  This is a common and effective practice in presenting service offerings.</li>
            </ul>
            <h5>Detailed Pricing Structures:</h5>
            <p>  The following structures provide a framework for discussing pricing. Specific figures will be provided internally, but these ranges are informed by industry research and reflect the complexity and value of the services.  It's important to note that these are estimates, and final pricing for more complex projects, especially those involving custom development or extensive integrations, will be determined after a thorough needs assessment.</p>
            <h6>Basic Website & Common Upgrades:</h6>
            <p>  These are often presented in tiered packages, such as "Starter Web Presence," "Business Growth Website," and "E-commerce Pro." Each tier will clearly list the included features (e.g., number of pages, design customization level, contact forms, basic SEO setup).  Effective pricing pages clearly articulate the value and features of each tier.</p>
            <p><em>Indicative Price Ranges:</em></p>
            <ul>
                <li> Simple/Basic Websites: $500. A 10-page website with custom design could be around $1,500 - $5,000.</li>
                <li> Websites with Custom Design & Features: $1,000 - $20,000+.</li>
                <li> E-commerce Add-on (to an existing site or as part of a package): $2,500 (for premium plugins and freelance help) up to $15,000 - $30,000 for more robust solutions.</li>
                <li> CMS Integration (e.g., WordPress): Adding a CMS to manage content can range from using free open-source options (plus developer customization time) to enterprise solutions. Simple integrations might cost $5,000 - $15,000. Using WordPress with a ready-made theme can be around $1,000, but custom business websites on such platforms can range from $8,000 to $60,000.</li>
            </ul>
            <p> Optional add-ons can be presented with clear pricing, perhaps using toggles in proposals to show clients the impact of different choices, similar to how SaaS pricing pages operate.</p>
            <h6>Basic Mobile App & Common Upgrades:</h6>
            <p> Tiered packages could include "Essential App," "Interactive App," and "Commerce App." Features per tier should emphasize mobile-specific advantages like offline capabilities, push notifications for engagement, and access to device hardware (camera, GPS).</p>
             <p><em>Indicative Price Ranges:</em></p>
            <ul>
                <li> Basic Apps (simple login, content display): $5,000 - $50,000. Some sources indicate a range of $45,000 - $80,000 for basic apps with login and content display.</li>
                <li> Medium Complexity Apps (messaging, payment processing, GPS, social media integration): $32,000 - $48,000 , or even $80,000 - $200,000.</li>
                <li> E-commerce Features (within an app): Payment Gateway Integration (e.g., Stripe, PayPal): $5,000 - $10,000. Transaction fees (e.g., 2.9% + $0.30) are also a factor.</li>
                <li> Push Notifications: Adding this feature can cost $1,500 - $3,500. More advanced push notification services have tiered monthly fees based on subscribers and features.</li>
                <li> Offline Data Storage: Can range from simple local storage (included in basic app cost) to more complex synchronization, with custom data storage app development estimated around $37,500.</li>
            </ul>
             <h6>Basic AI Phone Agent & Common Upgrades:</h6>
            <p> Packages might be "Smart Answering," "Integrated Support Agent," and "Multi-Location Pro Agent." Features would scale with tiers: sophistication of Natural Language Processing (NLP), number and complexity of third-party integrations (e.g., CRM, helpdesk), level of customization, and capabilities for multi-location support.</p>
            <p><em>Indicative Price Ranges:</em></p>
            <ul>
                <li> Rule-Based Chatbots (simpler automation): $8,000 - $15,000.</li>
                <li> Contextual/Conversational AI Chatbots (more advanced, like our AI Phone Agent): $20,000 - $60,000+.</li>
                <li> Generative AI chatbots can range from $30,000 to $120,000.</li>
                <li> Third-Party Integrations (per integration, e.g., CRM, Salesforce): $3,000 - $10,000. Custom integrations with internal databases or APIs can be $5,000 - $10,000 for setup, or monthly fees like $299/month with some providers.</li>
                <li> Multi-Channel/Omni-Channel Capability: Adding $5,000 - $12,000 to the cost.  This is relevant if the AI agent needs to work across different communication platforms.</li>
            </ul>
             <h6>Custom Software Solutions Pricing Approach:</h6>
            <p>  It is crucial to explain that custom software is not an off-the-shelf product with a fixed price. The investment is determined by a collaborative process of discovery and detailed planning.</p>
            <p> Key factors influencing price include:</p>
            <ul>
                 <li> Project Scope & Complexity: The number of features, intricacy of business logic, and user roles. Each additional integration point can add 10-25% to the baseline cost.</li>
                 <li> Technology Stack: The choice of programming languages, frameworks, and databases.</li>
                 <li>  Development Hours: The time required for design, development, testing, and project management. Developer rates vary by region and experience, e.g., North American developers $80-$250/hour, Eastern European $30-$80/hour.</li>
            </ul>
             <p>  The sales process is consultative, involving a thorough needs assessment followed by a detailed proposal outlining the scope, timeline, and investment. Typical Project Ranges:</p>
             <ul>
                <li> Small-scale projects/MVPs: $20,000 - $80,000.</li>
                <li> Medium-complexity solutions / Small to Mid-sized Business Projects: $50,000 - $250,000.</li>
                <li> Large enterprise-grade platforms: $200,000 - $1,000,000+.</li>
             </ul>
            <p> The "why" behind these price points is directly linked to the complexity of the work and the value delivered.  For instance, custom design and development inherently costs more due to the bespoke nature of the work and tailored functionality.  Similarly, incorporating AI or sophisticated server-side logic requires specialized expertise and more intensive development effort.  Each third-party integration adds value but also development time and cost for configuration, mapping, and testing.</p>
             <p>  Furthermore, it is essential to discuss the Total Cost of Ownership (TCO) with clients. Beyond the initial investment, there can be recurring costs: website/app hosting, maintenance retainers (often 15-25% of initial cost annually, or monthly fees like $50-$2500 for e-commerce), software subscriptions (plugins, CMS, API usage fees like $0-$3000+/month for headless CMS), and future updates.  Cloud solutions involve ongoing subscriptions, unlike the large upfront CAPEX for in-house setups which have their own operational costs (power, IT staff).  Transparently addressing these manages expectations and builds partnerships.</p>
            <h5>Key Table 1: Service & Upgrade Pricing Overview</h5>
            <p>  (*View Pricing Tables file/page for actual tables*) The pricing tables serve as a quick reference, linking services and investment levels to client benefits.  Use this as a starting point, always focusing on value delivered.</p>

            <h4>Section 1.3: Effectively Communicating Price & Value to Clients</h4>
            <p>  The way pricing is presented is often as crucial as the price itself. A clear, confident, and value-focused approach builds trust.</p>
            <h5>Leveraging Pricing Presentation Best Practices:</h5>
             <p>  Principles from effective SaaS pricing pages apply:</p>
            <ul>
                <li>  <strong>Clarity and Simplicity:</strong> Present pricing cleanly. Ensure distinctions between tiers are obvious.</li>
                <li> <strong>Clear Calls to Action (CTAs):</strong> Guide the client towards the next step.</li>
                <li>  <strong>Feature Comparison:</strong> Clearly compare features in tiered options to help informed choices.</li>
                <li>  <strong>Highlighting Value:</strong> Prominently display key benefits and value propositions for each tier/service.</li>
                <li>  <strong>Social Proof and Trust Signals:</strong> Reference successful projects or anonymized case study highlights.</li>
                <li>  <strong>Proactive FAQ Addressing:</strong> Anticipate and address common pricing questions.</li>
            </ul>
            <h5>Focusing on ROI and Business Outcomes:</h5>
            <p> The most effective way to justify price is connecting it to client goals and ROI.</p>
            <ul>
                <li>  <strong>Discovery is Key:</strong> Ask insightful questions to uncover costs of current problems or potential gains. (e.g., "How many leads lost?", "Cost of manual handling?").</li>
                <li>  <strong>Benefit-Driven Language:</strong> Translate features into benefits linked to financial/operational improvements (e.g., "Agent understands inquiries accurately, improving satisfaction by X% and reducing handling time by Y hours").</li>
            </ul>
            <h5>Handling Price Objections (Preview):</h5>
            <p> (More detail in Module 3)</p>
            <ul>
                <li> <strong>Acknowledge and Validate:</strong> "I understand budget is important."</li>
                <li> <strong>Reiterate Value:</strong> Gently restate unique value and outcomes.</li>
                <li> <strong>Explain Costs or Offer Alternatives:</strong> Break down costs or discuss phased approaches/other tiers if feasible.</li>
            </ul>
            <h5>Using Analogies for Complex Pricing:</h5>
            <p> For variable pricing like Custom Software:</p>
            <blockquote>"Developing custom software is like commissioning an architect for a custom home. Cost depends on size, design complexity, materials, unique features. We create a detailed blueprint – our proposal – matching your needs and outlining the investment."</blockquote>
            <p>  Presenting pricing reinforces value. When clients understand the 'why' and see the path to objectives, price becomes a logical investment. This consultative approach turns pricing from a hurdle into a collaborative step.</p>
        `,
        module2: `
            <h3>Module 2: Mastering Key Industry Concepts (for Non-Technical Conversations)</h3>
            <p>  To effectively sell our services, the team must discuss industry concepts clearly and non-technically, translating features into benefits and guiding clients.</p>

            <h4>Section 2.1: Web Presence: Website vs. Mobile App</h4>
            <p>  Understanding the distinction between websites (accessed via browser) and native mobile apps (installed from app stores) is fundamental.</p>
            <h5>Core Explanation:</h5>
            <p>  Website/Web App: Accessed through an internet browser (Chrome, Safari) on any connected device. Users type address or click link.</p>
            <p>  Native Mobile App: Software designed for a specific mobile OS (iOS, Android), downloaded/installed from an app store.</p>
            <h5>Key Differences for Clients (Summary of Table):</h5>
             <ul>
                <li> <strong>Accessibility:</strong> Web=Browser+Internet; App=Installed, possible offline use.</li>
                <li> <strong>Functionality:</strong> Web=Limited by browser; App=Can use device features (camera, GPS, push notifications).</li>
                <li> <strong>User Experience:</strong> Web=Can vary by browser; App=Generally smoother, integrated, personalized, uses touch gestures.</li>
                <li> <strong>Performance:</strong> Web=Slower (fetches from server); App=Generally faster (local data), not always internet reliant.</li>
                <li> <strong>Development:</strong> Web=Simpler, cheaper, faster (single codebase); App=More complex, expensive (esp. iOS & Android), specialized skills.</li>
                <li> <strong>Updates:</strong> Web=Live immediately server-side; App=Users download/install from store.</li>
                <li> <strong>Customer Reach:</strong> Web=Broad (browser users); App=Discoverable via stores, requires download but allows direct engagement.</li>
            </ul>
            <h5>When to Recommend Which:</h5>
            <ul>
                <li><strong>Website:</strong>   Ideal for initial online presence, broad visibility, information delivery, content marketing, SEO focus, limited budgets, quick launch.</li>
                <li><strong>Native Mobile App:</strong>   Recommended for deep, regular engagement, reliance on device features (GPS, camera), offline needs, personalization, push notifications, building loyal communities, frequent access services.</li>
            </ul>
            <p>  Mobile apps drive engagement and loyalty through personalization, device features, and higher user time spent compared to mobile websites.   It's a strategic tool for intimate customer connection.  Push notifications allow proactive engagement.  This justifies potentially higher investment for businesses aiming for a dedicated user base.</p>

            <h4>Section 2.2: Design Approaches: Template vs. Custom Solutions</h4>
            <p>  A key decision: pre-designed template vs. custom-built.  Analogy: Template = choosing pre-designed house plan; Custom = hiring architect for unique home.</p>
            <h5>Comparison Points (Summary of Table):</h5>
             <ul>
                 <li>  <strong>Uniqueness/Brand Identity:</strong> Template=Generic look, challenging for distinct identity;   Custom=Unique, reflects brand accurately, enhances authority.</li>
                 <li>  <strong>Flexibility/Scalability:</strong> Template=Limited customization, can hinder growth;   Custom=Complete flexibility, easily adapted and scaled.</li>
                 <li>  <strong>Development Time:</strong> Template=Faster (days/weeks);   Custom=Longer (weeks/months), involves planning, design, coding, testing.</li>
                 <li> <strong>Cost:</strong> Template=Lower upfront;   Custom=Higher upfront, potential higher long-term ROI.</li>
                 <li>  <strong>SEO:</strong> Template=May have bloated code, generic structure, limited optimization;  Custom=Full control for optimal SEO (clean code, structure, speed).</li>
                 <li>  <strong>User Experience (UX):</strong> Template=General best practices, not tailored;   Custom=Designed for target audience, better engagement/conversions.</li>
                 <li> <strong>Support/Maintenance:</strong> Template=Relies on provider/community, updates can be issues; Custom=Direct support from agency, tailored maintenance.</li>
            </ul>
             <p>  While templates have low initial cost, consider hidden costs: limited customization, potentially hampered SEO, needing earlier rebuilds. Frame custom as investment in durable, scalable, branded asset, more cost-effective long-term.</p>
             <p> At Buteos Systems we have developed our own adaptive templates to streamline the customization process.</p>
             <p> The table comparison helps guide clients based on budget, ambition, and need for unique presence.</p>


            <h4>Section 2.3: Intelligent Assistance: Automation vs. AI Phone Agents</h4>
            <p>  Understanding the difference between basic automation and sophisticated AI agents is important.   Analogy: Automation = "trusty old bicycle" (rule-based, fixed path); AI agent = "self-driving car" (learns, adapts, suggests).</p>
            <h5>Core Explanation:</h5>
            <ul>
                <li>  <strong>Traditional Automation:</strong> Performs repetitive, rule-based tasks (e.g., Basic IVR with keypad input). Strict "if-then" logic, predictable but rigid.</li>
                 <li>  <strong>AI Phone Agents:</strong> Leverage AI (NLP, ML). Understand spoken language/nuances, interpret intent, learn from interactions, make real-time decisions. Handle dynamic, complex interactions.</li>
            </ul>
             <h5>Key Differences for Clients (Summary of Table):</h5>
            <ul>
                <li> <strong>Task Handling:</strong> Automation=Simple, repetitive, "on-script"; AI=Dynamic challenges, complex issues, understands context.</li>
                <li> <strong>Adaptability/Learning:</strong> Automation=Rigid, no learning; AI=Adaptive, learns from interactions (AI Model Training), improves over time.</li>
                <li> <strong>Decision Making:</strong> Automation=Predefined script; AI=Real-time decisions based on data/patterns.</li>
                <li> <strong>Conversation Quality:</strong> Automation=Mechanical, limited; AI=Aims for natural, human-like, understands varied phrasing.</li>
                <li> <strong>Complexity Handled:</strong> Automation=Very simple, predictable; AI=More complex, accesses info, applies knowledge.</li>
                <li> <strong>Use Cases:</strong> Automation=Basic FAQs, simple routing; AI=Personalized support, complex inquiries, lead qual, scheduling, dynamic info.</li>
                <li> <strong>Integration Potential:</strong> Automation=Limited; AI=Deep integration with business systems (CRMs, DBs) for context (AI Integration Development).</li>
            </ul>
             <h5>Our "Basic AI Phone Agent":</h5>
            <p>  Aligned with "self-driving car" model. Foundational AI, capacity to learn, broader interactions than simple automation. Uses NLP, can be trained for nuanced responses.  Upgrades like multi-location support show advanced capabilities.</p>
            <p>  True value is enhancing customer experience (personalization, efficiency) and scaling operations.   Continuous learning improves handling of diverse queries. Offers consistent 24/7 service, freeing human staff.  Scalable, personalized, intelligent experience justifies investment.</p>

            <h4>Section 2.4: Website Architecture: Static vs. Dynamic Sites</h4>
            <p>  Understanding static vs. dynamic is key for recommending the right architecture.   Analogy: Static = printed poster (fixed content); Dynamic = digital billboard (changing content).</p>
            <h5>Core Explanation:</h5>
             <ul>
                <li>  <strong>Static Websites:</strong> Pre-built HTML/CSS/JS files. Server sends exact file. Content fixed unless developer manually edits/uploads.</li>
                <li>  <strong>Dynamic Websites:</strong> Generate content "on the fly" using server-side languages (PHP, Python) and databases. Content assembled upon request, allowing personalization, interaction, easy updates.</li>
            </ul>
            <h5>Key Differences for Clients (Summary of Table):</h5>
            <ul>
                 <li> <strong>Content Updates:</strong> Static=Manual code editing; Dynamic=Easy via CMS (Content Management System), no coding needed.</li>
                 <li> <strong>Interactivity:</strong> Static=Limited (simple forms); Dynamic=High (logins, comments, e-commerce, personalized content).</li>
                 <li> <strong>Database Needs:</strong> Static=None usually; Dynamic=Relies heavily on database.</li>
                 <li> <strong>Performance:</strong> Static=Typically very fast (pre-built); Dynamic=Can be slower (server processing/DB queries), optimizable.</li>
                 <li> <strong>Security:</strong> Static=Generally more secure (fewer components); Dynamic=More potential vulnerabilities (DB, scripts), requires robust security.</li>
                 <li> <strong>Cost:</strong> Static=Lower upfront dev/hosting; Dynamic=Higher initial dev cost (backend, DB, CMS), hosting can be more.</li>
                 <li> <strong>Scalability (Content):</strong> Static=Cumbersome to add many pages; Dynamic=Easy via CMS, structure adapts.</li>
             </ul>
            <h5>When to Recommend Which:</h5>
            <ul>
                <li><strong>Static Website:</strong>   Ideal for small, informational sites with infrequent changes (brochures, portfolios, simple landing pages). When speed, security, low cost are priorities and interactivity not needed.</li>
                <li><strong>Dynamic Website:</strong>   Essential for e-commerce, blogs, news portals, memberships, web apps, forums, user accounts, frequent updates, personalized experiences. When client needs easy content management via CMS.</li>
             </ul>
            <p>  Our "Basic Website" can be either. If blog, e-commerce, or self-updates needed, dynamic is necessary.</p>
             <p>  While static is simple/fast/cheap initially, dynamic provides foundation for growth and engagement. Easy CMS updates keep content fresh (vital for SEO/audience).  Dynamic architecture required for e-commerce, user accounts, personalization.   Position dynamic capabilities as strategic investment for evolution/scalability, often involving CMS.</p>
             <p> The comparison table helps guide clients to the best architecture.</p>

            <h4>Section 2.5: How Websites Work: Client-Side vs. Server-Side Functions</h4>
            <p> Distinguishing client-side (user's browser) vs. server-side (web host) is key for understanding interactive experiences.   Analogy: Client-side = customer's table (seeing menu, choosing); Server-side = restaurant kitchen (processing orders, preparing food from storage/DBs).</p>
            <h5>Core Explanation:</h5>
            <ul>
                <li>  <strong>Client-Side:</strong> Operations in user's browser (Chrome, Firefox) on their device. Browser downloads HTML/CSS/JS, interprets to display page and handle interactions locally.</li>
                <li>  <strong>Server-Side:</strong> Operations on web server hosting files/logic/DBs. Browser sends request to server for info/processing not local (e.g., password check, product data). Server processes, interacts with DB, sends response back.</li>
            </ul>
            <h5>Where Tasks Happen:</h5>
            <ul>
                <li><strong>Client-Side (User's Browser):</strong>  Displaying layout (HTML/CSS).   UI Interactivity (button clicks, menus, sliders via JavaScript).   Form Validation (checking format before sending).  Making requests to server.</li>
                <li><strong>Server-Side (Web Server):</strong>  Processing User Input (forms).  Database Interaction (store, retrieve, update data).  Executing Business Logic (calculations, inventory).  User Authentication/Authorization (login, access control).  Generating Dynamic Content (personalized pages).  API Management (communicating with other services).</li>
            </ul>
            <h5>Implications for Clients:</h5>
             <ul>
                <li><strong>Performance:</strong>   Client-side=Generally fast (local), but complex scripts/media affect load time.   Server-side=Processing takes time (queries, load), impacts page response.</li>
                <li><strong>Security:</strong>   Client-side=Code visible, not for sensitive info, focus on preventing malicious scripts.  Server-side=Critical security here for sensitive data, DBs, core logic.</li>
                <li><strong>Features/Complexity:</strong>  Client-side=Rich, interactive, visual UIs.   Server-side=Powers core functionality, data management, personalization, complex operations. Essential beyond simple static display.</li>
            </ul>
            <h5>Relevance to Our Services:</h5>
             <p>  Offering "Server-Side Functions" means providing the "kitchen" or "brain." Enables powerful, data-driven features (user accounts, e-commerce, bookings) needing server processing, DBs, secure handling.  Explains why these features are larger investments than visual changes.  Backbone of dynamic, scalable solutions.</p>

            <h4>Section 2.6: Infrastructure Choices: Cloud vs. In-House Setups</h4>
            <p> A critical decision: where website/apps/data reside - cloud vs. in-house (on-premises).  Analogy: Cloud = "renting space/services in managed office building" (AWS, Azure); In-house = "owning/maintaining entire building yourself" (servers on-site).</p>
            <h5>Core Explanation:</h5>
            <ul>
                 <li>  <strong>Cloud Infrastructure:</strong> Rent computing resources (servers, storage, DBs) from third-party provider (CSP). Resources in CSP data centers, accessed via internet. CSP maintains hardware.</li>
                 <li>  <strong>In-House (On-Premises) Infrastructure:</strong> Business buys, owns, manages hardware (servers, storage) and software. Housed on-site. Client IT team responsible for setup, maintenance, security, upgrades.</li>
            </ul>
             <h5>Key Differences for Small Businesses (Summary of Table):</h5>
            <ul>
                <li> <strong>Hosting/Location:</strong> Cloud=Off-site provider data centers; In-House=Client premises.</li>
                <li> <strong>Scalability:</strong> Cloud=Highly scalable (easy up/down), cost-effective for growth; In-House=Requires new hardware purchase (costly/slow), hard to scale down.</li>
                <li> <strong>Maintenance:</strong> Cloud=Provider handles hardware; In-House=Client fully responsible (needs IT staff).</li>
                <li> <strong>Cost Structure:</strong> Cloud=Lower upfront, ongoing pay-as-you-go/subscription (OPEX); In-House=High upfront hardware cost (CAPEX), potential lower long-term operational if efficient (plus power, cooling, staff).</li>
                <li> <strong>Data Recovery/Backup:</strong> Cloud=Robust, built-in options usually; In-House=Client responsible, complex/costly for good redundancy.</li>
                <li> <strong>Security:</strong> Cloud=Provider invests heavily, relies on trust; In-House=Client has direct control, level depends on own expertise/investment.</li>
                <li> <strong>Internet Reliance:</strong> Cloud=Requires stable internet; In-House=Local access possible without internet, remote still needs it.</li>
                <li> <strong>Control:</strong> Cloud=Less direct hardware control; In-House=Full control.</li>
             </ul>
            <h5>Our Recommendation for Most Clients:</h5>
            <p>  For most clients, especially SMBs, cloud infrastructure is recommended due to flexibility, scalability, reduced maintenance burden, and lower upfront CAPEX.  Allows focus on core business, not IT management.  Easy scaling is major advantage.  Predictable OPEX often better for SMBs than large irregular CAPEX.  Robust cloud backup/DR offers peace of mind.</p>
            <p> The comparison helps guide clients to best infrastructure choice.</p>
        `,
        module3: `
            <h3>Module 3: Excelling in Outside Sales: Skills & Strategies</h3>
            <p>  This module covers practical application of sales skills: lead generation, managing the sales process, ethical closing, and handling objections for our services.</p>

            <h4>Section 3.1: Generating Quality Leads for Our Services</h4>
            <p>  Effective lead gen needs multi-faceted approach focusing on relationships and value exchange, not immediate pitching.</p>
            <h5>Leveraging LinkedIn:</h5>
            <p> LinkedIn is a B2B lead gen powerhouse.</p>
             <p><em>Actionable Advice:</em></p>
            <ul>
                <li> Optimize personal profiles (expertise, solutions).</li>
                <li> Actively connect (personalized requests better).</li>
                <li> Participate in relevant groups (share insights, not just promote).</li>
                <li> Use search/Sales Navigator for targeting.</li>
                <li> Regularly share relevant, valuable content.</li>
                <li> Encourage employee advocacy (share company content).</li>
            </ul>
            <h5>Value-Based Cold Outreach (Email & LinkedIn):</h5>
            <p> Still viable if thoughtful.  8/10 prospects prefer email.</p>
            <p><em>Actionable Advice:</em></p>
            <ul>
                <li> Thoroughly research prospect/company (industry, challenges).</li>
                <li> Craft highly personalized messages referencing research, how services solve specific problem/goal.  Focus on benefits.</li>
                <li> Keep messages concise, respectful, easy to understand.</li>
                <li> Suggest low-commitment next step (brief call for insight, link to resource), not immediate sale.</li>
                <li> Implement strategic follow-up (4-7 emails often best).</li>
                <li> Consider unique follow-ups (e.g., relevant direct mail) to stand out.</li>
            </ul>
             <h5>Targeted Networking (Online & Offline):</h5>
             <p> Building genuine relationships yields opportunities.</p>
             <p><em>Actionable Advice:</em></p>
             <ul>
                 <li> Identify/participate in industry events, webinars, meetups (virtual/in-person).</li>
                 <li>  Focus on meaningful conversations, listening, offering insights/connections, not direct selling. Become trusted resource.</li>
             </ul>
            <h5>Developing a Referral System:</h5>
            <p> Referrals from satisfied clients are often highest quality leads.</p>
            <p><em>Actionable Advice:</em></p>
            <ul>
                <li>  Make standard practice to ask satisfied clients (best time after successful project/expressed satisfaction).</li>
                <li> Consider formal referral program with incentives.  (Program details later).</li>
                <li> Provide simple tools for referring (email templates, brochure).</li>
                <li>  Always thank referrers promptly. Nurtures relationship.</li>
            </ul>
             <p>  Successful B2B service lead gen hinges on establishing expertise/trust BEFORE direct sales talk. Act as consultants, share insights (e.g., dynamic website benefits, AI agent value). Makes prospects receptive later.</p>

            <h4>Section 3.2: Guiding Clients Through Our Sales Funnel</h4>
            <p>  Well-defined funnel guides seller and client. Understanding each stage and buyer's perspective is key.</p>
             <h5>Understanding the B2B Sales Funnel Stages:</h5>
             <p>  Core stages (terminology varies):</p>
            <ol>
                <li><strong>Prospecting & Initial Qualification:</strong>  Buyer: Dissatisfied/aware of problem/opportunity, starting general search.   Seller: Researches, outreaches, secures initial talk, initial qualification (need fit?).  Seller Goals: Fill pipeline, schedule discovery.</li>
                <li><strong>Needs Discovery and Driving:</strong>  Buyer: Actively analyzing situation, pinpointing sources, defining goals, considering options.   Seller: Consultative stage. Rapport, insightful open questions uncover needs/challenges/pains/objectives. Opportunity to "drive" needs (inspire new ideas/perspectives, co-create vision).  Seller makes impact case (benefit of solving/achieving).   Seller Goals: Fully understand/document needs, establish credibility, quantify impact, qualify further.</li>
                <li><strong>Solution Crafting & Proposal Development:</strong>   Buyer: Needs solution, actively identifying/comparing options from providers. Looking for best fit.   Seller: Analyzes situation, crafts tailored solution (services/upgrades addressing needs), tightens impact case (ROI). Develops formal proposal (solution, scope, timeline, investment).   Seller Goals: Develop compelling proposal showing value/alignment; ensure opportunity fully qualified.</li>
                <li><strong>Solution Presentation & Addressing Concerns:</strong>   Buyer: Evaluating specific vendor solutions, deciding go/no-go, comparing.   Seller: Presents proposal persuasively, client-centric. Focus on how solution achieves results, differentiates. Actively listens/addresses questions/objections.   Seller Goals: Persuade client our solution best; gain provisional agreement.</li>
                <li><strong>Winning (Negotiation & Closing):</strong>   Buyer: Ready to commit, negotiating final agreement/terms.  Seller: Negotiates contract terms, pricing, SLAs. Aims for mutual agreement, formally closes sale (signed contract).  Seller Goals: Finalize agreement, secure commitment.</li>
                <li><strong>Account Development & Retention (Post-Sale):</strong>  Buyer: Evaluates purchase success, decides future relationship (continue, expand, leave).   Seller: Ensures smooth handover. Maintains contact, ensures satisfaction, monitors value, identifies further opportunities/upgrades, solicits feedback. Happy customers become advocates/referrals.  Seller Goals: Maximize satisfaction/value, foster loyalty, identify upsell/cross-sell, generate referrals.</li>
            </ol>
            <p>  Critical: Align sales activity with buyer's stage. (e.g., Don't pitch complex proposal too early). Empathize, understand awareness/commitment, tailor communication. Makes process consultative, not high-pressure.  Example: During Needs Discovery, use structured questions to determine if static/dynamic, template/custom, AI agent needed.  (Refer to detailed internal sales funnel doc *here*).</p>


            <h4>Section 3.3: Ethical and Effective Closing Techniques</h4>
            <p>  Closing is culmination. Effective closing isn't pressure; it's making logical next step easy for convinced client. Rooted in empathy, clarity, mutual benefit.</p>
            <h5>Empathy-Driven Closing Techniques:</h5>
            <p> Prioritize client understanding and comfort.</p>
            <ul>
                <li><strong>The Summary Close:</strong>  How: Summarize services, benefits, outcomes, ask confirmatory question.  Example: "Recap: custom e-commerce site integrating inventory, allowing efficient sales/wider reach, 12-week timeline. Does that reflect understanding and seem right path forward?"   Why: Ensures alignment, reinforces value, natural transition, shows listening.</li>
                <li><strong>The Visual Close (Next Steps Close):</strong>  How: Use simple visual (checklist, timeline) for immediate next steps.  Example: Show: "1. Sign Agreement -> 2. Kick-off Meeting -> 3. Initial Concepts Delivered."   Why: Simplifies, makes tangible, removes uncertainty, shows preparedness.</li>
                 <li><strong>The Storytelling Close (Social Proof Close):</strong>  How: Share brief, relevant success story of similar client.  Example: "Reminds me of [Client], struggled with after-hours inquiries. Implemented AI Agent, saw X% reduction in missed calls, improved satisfaction in 3 months. Confident we can achieve similar."   Why: Leverages social proof, reduces risk, builds trust, helps envision benefits.</li>
                 <li><strong>The Assumptive Close (with Empathy and Confidence):</strong>  How: Use when strong positive signals, concerns addressed. Confidently guide towards *how* to proceed (assuming readiness), not *if*.  Crucial: empathy, focus on expressed needs.  Example: "Since multi-location support addresses your challenge, which AI agent package aligns best with your volume/integration needs?"   Why: Smoother decision (reduces overthinking) when appropriate, projects confidence. Empathetic angle avoids pushiness.</li>
            </ul>
             <h5>Focus on Mutual Benefit and Long-Term Partnership:</h5>
            <p>  Frame closing as start of mutually beneficial partnership. Emphasize how service helps client goals, ongoing support.</p>
            <p>  Ethical closing is natural conclusion when value clear, trust built. Reduces anxiety, enhances client experience, groundwork for positive relationship.</p>

            <h4>Section 3.4: Addressing Common Client Questions & Objections (Price, Scope, Technical Concerns)</h4>
            <p>  Objections are natural, expected. View as opportunities for engagement, clarification, demonstrating value.  Non-technical, reassuring approach is key.</p>
            <h5>Core Strategies for Handling Objections:</h5>
             <p> Apply to most objections:</p>
            <ul>
                 <li>  <strong>Practice Active Listening:</strong> Listen attentively without interruption. Understand concern fully. Note tone/emotions.</li>
                 <li>  <strong>Repeat Back (Clarify & Confirm):</strong> Paraphrase objection to ensure understanding. Shows listening, they feel heard.</li>
                 <li>  <strong>Validate Concerns:</strong> Acknowledge perspective ("Understandable concern," "Fair point"). Builds rapport, shows empathy. Avoid being dismissive.</li>
                 <li>  <strong>Ask Follow-Up Questions (Probe Deeper):</strong> Initial objection may not be root cause. Ask open-ended questions ("Tell me more about budget?", "Comparing it to what?").</li>
                 <li>  <strong>Leverage Social Proof:</strong> Share anonymized success story of similar client with similar reservations.</li>
                 <li>  <strong>Set Specific Follow-Up Time (If Needed):</strong> If prospect needs time, grant space but propose specific follow-up date/time.</li>
            </ul>
             <h5>Handling Specific Objections (Non-Technically):</h5>
            <ul>
                <li><strong>Price Objections ("Too expensive," "No budget," "Competitor cheaper"):</strong>
                    <ul>
                         <li> <em>Reiterate Value/ROI:</em> Shift focus from cost to benefits/return ("Understand investment. Let's revisit how custom site increases leads by X%, translating to Y revenue").</li>
                         <li> <em>Break Down Cost:</em> Show where value lies ("Design phase = X hours, E-comm integration = setup/testing").</li>
                         <li>  <em>Compare to Cost of Inaction:</em> Explore costs of *not* solving problem ("Current cost of manual calls?").</li>
                         <li>  <em>Address Competitor Pricing:</em> Acknowledge, focus on unique value/differentiators ("Competitor X cheaper, but our solution includes [support, scalability, advanced AI] delivering superior long-term value").</li>
                         <li> <em>Explore Options:</em> Different tiers, phased approach, payment plans?</li>
                    </ul>
                 </li>
                 <li><strong>Scope Objections ("Too much/little," "Only need X"):</strong>
                     <ul>
                        <li> <em>Clarify Needs/Priorities:</em> Ask follow-up Qs ("Which components seem unnecessary?").</li>
                        <li> <em>Align Scope with Goals:</em> Reconfirm objectives, show how scope contributes ("Included CMS because you want team updating blog weekly for content strategy").</li>
                        <li>  <em>Discuss Flexibility/Phasing:</em> Explain if scope adjustable ("Can start core website now, phase 2 e-comm later?").</li>
                    </ul>
                </li>
                <li><strong>Technical Uncertainty ("Too complicated," "Don't understand," "Integrate?"):</strong>
                    <ul>
                        <li>  <em>Reassure and Simplify:</em> Emphasize they don't need to be experts, your team handles tech ("Don't worry about AI tech; focus on improved call experience/reports").</li>
                        <li> <em>Use Analogies:</em> Employ simple analogies from training.</li>
                        <li> <em>Focus on Outcomes/Benefits:</em> Instead of server details, "Robust infrastructure ensures site fast, reliable, handles traffic".</li>
                        <li>  <em>Explain Support/Training:</em> Outline support provided ("Comprehensive CMS training, ongoing support").</li>
                        <li> <em>Address Integration Concerns Directly (Simply):</em> "Services designed to integrate. We'll work with team for smooth connection to CRM".</li>
                    </ul>
                 </li>
            </ul>
            <p>  Approaching objections with empathy, understanding, clear non-technical solutions transforms hesitation into opportunity to build trust. Anticipating/practicing responses boosts effectiveness.</p>

             <h4>Conclusion: Equipping the Sales Team for Success</h4>
             <p>  Proficiency requires product knowledge, industry concept understanding, effective sales strategies. This manual provides that foundation.</p>
             <p>  Offerings (Basic Website/App/Agent, upgrades, Custom Solutions) meet diverse needs. Understanding *why* services priced (cost vs complexity, effort, value, ROI) is paramount.  Transparent pricing (incl. TCO) builds trust.</p>
            <p>  Demystifying industry concepts (web/app, template/custom, auto/AI, static/dynamic, client/server, cloud/in-house) empowers team as consultants. Use analogies, focus on practical implications.</p>
            <p>  Success hinges on applying skills: lead gen (networking, value outreach), funnel management (aligned with buyer journey), ethical closing, confident objection handling. Objections are opportunities.</p>
             <p> By internalizing, you will be well-equipped to:</p>
             <ul>
                 <li> Confidently articulate value proposition.</li>
                 <li> Justify pricing via client benefits/outcomes.</li>
                 <li> Educate clients on technical concepts accessibly.</li>
                 <li> Implement effective lead gen/funnel practices.</li>
                 <li> Close deals ethically, build partnerships.</li>
                 <li> Handle objections with poise/expertise.</li>
            </ul>
            <p> Continuous learning key, but this toolkit provides essentials for outstanding results.</p>
        `
    };

    // --- Quiz Questions (Extracted from "Training Quiz.docx") ---
    // Storing only a few examples for brevity. Expand with all 45 questions.
     const quizQuestions = {
        module1: [
            {
                question: "[Module 1, Q Which of the following is NOT listed as one of our core \"Basic\" offerings?",
                options: ["Basic Website", "Basic Mobile App", "Basic AI Phone Agent", "Basic E-commerce Package"],
                answer: "Basic E-commerce Package",
                explanation: "  Basic E-commerce is listed as an upgrade, not a core basic offering." // Example citation for answer key
            },
            {
                question: "[Module 1, Q What is the primary purpose of a \"Basic Website\" as described in the training material?",
                options: ["To facilitate complex e-commerce transactions.", "To act as a primary online \"storefront\" or information hub.", "To offer advanced AI-driven customer interactions.", "To replace the need for a mobile app entirely."],
                answer: "To act as a primary online \"storefront\" or information hub.",
                explanation: "  The training material describes a basic website as the fundamental digital footprint for a business, acting as their primary online 'storefront' or information hub."
            },
            {
                question: "[Module 1, Q According to the training, what is a key advantage of a \"Basic Mobile App\" over a mobile-responsive website?",
                options: ["It's always cheaper and faster to develop.", "It offers a more direct and engaging channel, potentially with richer user experience and offline access.", "It doesn't require users to download anything.", "It primarily focuses on delivering static information."],
                answer: "It offers a more direct and engaging channel, potentially with richer user experience and offline access.",
                explanation: "  The training highlights that a basic mobile app offers a more direct and engaging channel, potentially with a richer user experience and functionalities like offline access."
            },
             {
                question: "[Module 1, Q How does the \"Basic AI Phone Agent\" differ from a simple Interactive Voice Response (IVR) system?",
                options: ["It only uses keypad inputs for navigation.", "It is designed to understand natural language and handle more dynamic interactions.", "It cannot route calls to human agents.", "It is primarily for outbound marketing calls."],
                answer: "It is designed to understand natural language and handle more dynamic interactions.",
                explanation: "  Unlike simple IVRs, the Basic AI Phone Agent is designed to understand natural language and handle more dynamic interactions."
            },
            {
                question: "[Module 1, Q Which key upgrade is described as transforming a website or mobile app into a direct sales channel?",
                options: ["3rd Party Integrations", "Server-Side Functions", "E-commerce Functionality", "Multi-Location Support"],
                answer: "E-commerce Functionality",
                explanation: " E-commerce Functionality is the critical upgrade that transforms a site or app into a direct sales channel."
            },
            {
                question: "[Module 1, Q What is the main benefit of \"3rd Party Integrations\" for a client's business?",
                options: ["Reducing the need for a custom design.", "Enhancing operational efficiency, improving data accuracy, and automating workflows by connecting different software systems.", "Primarily improving the visual aesthetics of a website.", "Lowering the initial cost of a basic website."],
                answer: "Enhancing operational efficiency, improving data accuracy, and automating workflows by connecting different software systems.",
                explanation: " 3rd Party Integrations enhance operational efficiency, improve data accuracy, and automate workflows by connecting different software systems."
            },
             {
                question: "[Module 1, Q \"Server-Side Functions\" are described as:",
                options: ["Visual elements that users interact with directly in their browser.", "The \"behind-the-scenes\" engine enabling complex logic, data processing, and user accounts.", "Primarily related to the design and layout of a webpage.", "A cheaper alternative to custom software solutions."],
                answer: "The \"behind-the-scenes\" engine enabling complex logic, data processing, and user accounts.",
                explanation: "  Server-Side Functions are the 'behind-the-scenes' engine enabling complex logic, data processing, user accounts, etc."
            },
            {
                question: "[Module 1, Q For which offering is \"Multi-Location Support\" specifically mentioned as an upgrade?",
                options: ["Basic Website", "Basic Mobile App", "AI Phone Agent", "Custom Software Solutions"],
                answer: "AI Phone Agent",
                explanation: " Multi-Location Support is mentioned as an upgrade specifically for AI Phone Agents."
            },
            {
                question: "[Module 1, Q When are \"Custom Software Solutions\" typically recommended?",
                options: ["For clients needing a very simple online presence quickly.", "For clients with unique, complex, or highly specialized business requirements not met by standard packages.", "As the cheapest option for starting a new business.", "When a client only needs a template-based design."],
                answer: "For clients with unique, complex, or highly specialized business requirements not met by standard packages.",
                explanation: " Custom Software Solutions are for clients with unique, complex, or specialized requirements not met by standard packages."
            },
            {
                question: "[Module 1, Q Which of the following is NOT listed as a general principle of our pricing philosophy?",
                options: ["Transparency", "Value-Based Approach", "Tiered Options", "Lowest Price Guarantee"],
                answer: "Lowest Price Guarantee",
                explanation: "  Transparency, Value-Based Approach, and Tiered Options are listed pricing principles; Lowest Price Guarantee is not."
            },
            {
                question: "[Module 1, Q What is the indicative price range for a \"Simple/Basic Website\" according to the training material options provided in the quiz doc?",
                // Note: Training text gives multiple ranges. Quiz doc implies one is correct.
                options: ["$100 - $500", "$1,000 - $10,000", "$15,000 - $30,000", "$50,000 - $100,000"],
                answer: "$1,000 - $10,000", // Based on quiz doc expected answer
                explanation: "  Training mentions ranges like $500, $1500-$5000, and $1000-$20000+. The quiz implies $1000-$10000 represents 'simple/basic' contextually."
            },
             {
                question: "[Module 1, Q What is the estimated price range for adding \"Basic E-commerce\" functionality as an upgrade, according to the ranges provided?",
                // Note: Training text says $15k-$30k+, but also mentions $2.5k for plugins/freelance help. Quiz doc implies a specific range choice.
                options: ["$500 - $1,000", "$2,500 - $15,000", "$20,000 - $40,000", "Over $50,000"],
                answer: "$2,500 - $15,000", // Based on quiz doc expected answer, likely representing premium plugins up to simpler robust solutions.
                explanation: "  Training mentions $15k-$30k+ for robust solutions, but also $2.5k for premium plugins/freelance. The quiz likely targets the lower-to-mid range for 'basic add-on'."
            },
            {
                 question: "[Module 1, Q The indicative price range for a \"Basic Mobile App\" (simple login, content display) is:",
                 options: ["$500 - $2,000", "$5,000 - $50,000", "$60,000 - $100,000", "Over $150,000"],
                 answer: "$5,000 - $50,000",
                 explanation: "  Training text indicates $5,000 - $50,000+ for basic mobile apps."
            },
             {
                 question: "[Module 1, Q Adding \"Push Notifications\" to a mobile app is estimated to cost (for setup/integration):",
                 options: ["$100 - $500", "$1,500 - $3,500", "$5,000 - $7,000", "Over $10,000"],
                 answer: "$1,500 - $3,500",
                 explanation: " Training text estimates $1,500 - $3,500 for adding push notifications."
             },
             {
                 question: "[Module 1, Q What is the typical price range for a \"Basic AI Phone Agent\" (Contextual/Conversational AI)?",
                 options: ["$1,000 - $5,000", "$20,000 - $60,000+", "$70,000 - $90,000", "Over $100,000"], // Adjusted options slightly to better match text
                 answer: "$20,000 - $60,000+",
                 explanation: "  Training indicates $20,000 - $60,000+ for contextual/conversational AI agents (more advanced than simple rule-based)."
            }
            // Add remaining 15 questions for Module 1 based on quiz doc, with citations
        ],
        module2: [
             {
                question: "[Module 2, Q How is a website typically accessed by a user?",
                options: ["By downloading it from an app store.", "Through an internet browser on any device with internet connectivity.", "Only via a specific software installed on a desktop.", "Exclusively through social media platforms."],
                answer: "Through an internet browser on any device with internet connectivity.",
                explanation: " A website is accessed through an internet browser on any device with internet connectivity."
            },
            {
                question: "[Module 2, Q What is a key characteristic of a native mobile app?",
                options: ["It's a website optimized for mobile viewing.", "It's downloaded and installed from an app store to run on a specific mobile OS.", "It doesn't require any storage space on the device.", "Updates are always applied automatically without user intervention."],
                answer: "It's downloaded and installed from an app store to run on a specific mobile OS.",
                explanation: "  A native mobile app is downloaded and installed from an app store to run on a specific mobile OS."
            },
            {
                 question: "[Module 2, Q Which of the following functionalities is generally better supported by native mobile apps compared to web apps?",
                 options: ["Displaying text and images.", "Playing videos.", "Utilizing device features like camera, GPS, and push notifications.", "Linking to other websites."],
                 answer: "Utilizing device features like camera, GPS, and push notifications.",
                 explanation: "  Native mobile apps can fully utilize device features like camera, GPS, and push notifications, which is often limited in web apps."
             },
             {
                 question: "[Module 2, Q When is a website generally recommended over a native mobile app?",
                 options: ["When deep, regular engagement with a specific user base is the primary goal.", "When the service relies heavily on device-specific features like the camera.", "For establishing an initial online presence and broad brand visibility with limited budget.", "When offline functionality is critical."],
                 answer: "For establishing an initial online presence and broad brand visibility with limited budget.",
                 explanation: "  Websites are generally recommended for establishing initial online presence, broad visibility, and when budget is limited."
             },
             {
                 question: "[Module 2, Q What is a key benefit of mobile apps regarding user engagement, as mentioned in the training?",
                 options: ["Users spend significantly less time on apps compared to websites.", "Apps offer less personalization.", "Apps can drive deeper engagement through features like push notifications and a tailored experience.", "Apps are primarily for one-time interactions."],
                 answer: "Apps can drive deeper engagement through features like push notifications and a tailored experience.",
                 explanation: "  Apps can drive deeper engagement through features like push notifications and a tailored, personalized experience."
             },
              {
                 question: "[Module 2, Q Can native mobile apps typically offer some offline functionality?",
                 options: ["No, they always require an internet connection.", "Yes, many can store data locally and offer features offline.", "Only if they are also web apps.", "Offline functionality is a feature exclusive to websites."],
                 answer: "Yes, many can store data locally and offer features offline.",
                 explanation: "  Native mobile apps can often offer some offline functionality by storing data locally."
             },
             {
                 question: "[Module 2, Q How are updates typically handled for native mobile apps?",
                 options: ["Updates are live for all users immediately once deployed on a server.", "Users usually need to download and install updates from the app store.", "Native mobile apps never require updates.", "Updates are pushed silently without the user's knowledge."],
                 answer: "Users usually need to download and install updates from the app store.",
                 explanation: " Users typically need to download and install updates for native mobile apps from the app store."
             },
             {
                 question: "[Module 2, Q What is the analogy used to describe a template-based web design?",
                 options: ["Hiring an architect to design a unique home from the ground up.", "Choosing a pre-designed house plan from a catalog.", "Building with individual bricks without a plan.", "Renting a fully furnished apartment."],
                 answer: "Choosing a pre-designed house plan from a catalog.",
                 explanation: " A template is analogous to choosing a pre-designed house plan from a catalog."
             },
             {
                 question: "[Module 2, Q What is a primary advantage of a custom web design regarding brand identity?",
                 options: ["It looks similar to many other websites, ensuring familiarity.", "It ensures a unique online presence that accurately reflects the client's brand.", "It's always quicker to develop than a template.", "It limits the use of brand colors and logos."],
                 answer: "It ensures a unique online presence that accurately reflects the client's brand.",
                 explanation: "  Custom design ensures a unique online presence that accurately reflects the client's brand identity."
             },
             {
                 question: "[Module 2, Q In terms of flexibility and scalability, how does a template design generally compare to a custom design?",
                 options: ["Templates offer more flexibility and scalability.", "Custom designs are typically more rigid and harder to scale.", "Templates can be restrictive and hinder scalability as a business grows.", "Both offer identical levels of flexibility and scalability."],
                 answer: "Templates can be restrictive and hinder scalability as a business grows.",
                 explanation: "  Templates can be restrictive and hinder scalability as a business grows, whereas custom designs offer more flexibility."
             },
              {
                 question: "[Module 2, Q What is a significant advantage of using a template regarding development time and cost?",
                 options: ["Templates take much longer and are more expensive to develop.", "Templates are generally faster to deploy and more cost-effective upfront.", "Custom designs are always quicker and cheaper.", "There is no difference in development time or cost."],
                 answer: "Templates are generally faster to deploy and more cost-effective upfront.",
                 explanation: "  Templates are generally faster to deploy and more cost-effective upfront compared to custom designs."
             },
             {
                 question: "[Module 2, Q How can a custom website design potentially benefit SEO compared to a template?",
                 options: ["Templates always have superior SEO built-in.", "Custom design offers full control over code and structure for optimal SEO.", "SEO is not affected by the design approach.", "Custom designs often have bloated code that harms SEO."],
                 answer: "Custom design offers full control over code and structure for optimal SEO.",
                 explanation: "  Custom design provides full control over code and structure, allowing for meticulous optimization for SEO, which can be limited in templates."
             },
             {
                 question: "[Module 2, Q What is a potential downside of using a template regarding user experience (UX)?",
                 options: ["Templates always offer a perfectly tailored UX for any business.", "The UX may not be perfectly aligned with a client's unique user needs or conversion goals.", "Custom designs usually have poorer UX.", "Templates allow for more in-depth user testing."],
                 answer: "The UX may not be perfectly aligned with a client's unique user needs or conversion goals.",
                 explanation: "  Because templates are not tailored, the UX may not perfectly align with a client's unique user needs or conversion goals."
             },
              {
                 question: "[Module 2, Q Why might a custom website have a higher long-term ROI despite a higher upfront cost?",
                 options: ["Because it requires more frequent rebuilds.", "Because it offers better performance, scalability, and a stronger brand presence.", "Because templates offer better long-term value.", "Because custom sites have no maintenance costs."],
                 answer: "Because it offers better performance, scalability, and a stronger brand presence.",
                 explanation: "  Custom sites can have higher long-term ROI due to better performance, scalability, stronger brand presence, and potentially longer lifespan before needing replacement."
             },
             {
                 question: "[Module 2, Q What analogy is used to describe traditional automation in the training material?",
                 options: ["A self-driving car", "A trusty old bicycle", "A super-smart assistant", "A learning sponge"],
                 answer: "A trusty old bicycle",
                 explanation: " Traditional automation is likened to a 'trusty old bicycle' - rule-based and following a fixed path."
            }
            // Add remaining 15 questions for Module 2 based on quiz doc, with citations
        ],
        module3: [
             {
                question: "[Module 3, Q Which social media platform is highlighted as a \"powerhouse\" for B2B lead generation?",
                options: ["Instagram", "TikTok", "LinkedIn", "Pinterest"],
                answer: "LinkedIn",
                explanation: " LinkedIn is highlighted as a 'powerhouse' for B2B lead generation."
            },
            {
                question: "[Module 3, Q What is a key piece of actionable advice for leveraging LinkedIn for lead generation?",
                options: ["Only connect with people you already know personally.", "Send generic, mass connection requests.", "Actively participate in relevant groups by sharing valuable insights, not just promoting services.", "Keep your LinkedIn profile as brief as possible."],
                answer: "Actively participate in relevant groups by sharing valuable insights, not just promoting services.",
                explanation: " Actively participating in relevant LinkedIn groups by sharing valuable insights, not just promoting, is key advice."
            },
             {
                 question: "[Module 3, Q When conducting value-based cold outreach via email, what is crucial for the first touchpoint?",
                 options: ["Making an immediate sales pitch.", "Keeping the email as long and detailed as possible.", "Providing value and demonstrating an understanding of the prospect's needs through research and personalization.", "Using a generic template for all prospects."],
                 answer: "Providing value and demonstrating an understanding of the prospect's needs through research and personalization.",
                 explanation: "  Providing value and demonstrating understanding through research and personalization is crucial for the first cold outreach touchpoint."
             },
             {
                 question: "[Module 3, Q What is a recommended approach for targeted networking?",
                 options: ["Focus solely on direct selling at events.", "Avoid online events and webinars.", "Build genuine relationships by listening, offering insights, and becoming a trusted resource.", "Only network with direct competitors."],
                 answer: "Build genuine relationships by listening, offering insights, and becoming a trusted resource.",
                 explanation: "  Targeted networking involves building genuine relationships by listening, offering insights, and becoming a trusted resource, not direct selling."
             },
             {
                 question: "[Module 3, Q What is an effective way to encourage referrals from satisfied clients?",
                 options: ["Wait for them to offer referrals without asking.", "Only ask for referrals if a project was unsuccessful.", "Make it a standard practice to ask satisfied clients and consider a formal referral program.", "Discourage referrals to avoid overwhelming the sales team."],
                 answer: "Make it a standard practice to ask satisfied clients and consider a formal referral program.",
                 explanation: "  Making it standard practice to ask satisfied clients and considering a formal referral program is an effective way to encourage referrals."
             },
             {
                question: "[Module 3, Q According to the training, what percentage of prospects report preferring email for communication with sales reps?",
                options: ["2 out of 10", "5 out of 10", "8 out of 10", "9 out of 10"],
                answer: "8 out of 10",
                explanation: " Eight out of ten prospects report preferring email for communication with sales reps."
             },
             {
                question: "[Module 3, Q What is \"employee advocacy\" in the context of social media lead generation?",
                 options: ["Employees advocating for less social media use.", "Encouraging employees to share company content on their personal social media to increase reach and humanize the brand.", "A system where employees handle all customer complaints via social media.", "Employees only interacting with existing clients on social media."],
                 answer: "Encouraging employees to share company content on their personal social media to increase reach and humanize the brand.",
                 explanation: " Employee advocacy involves encouraging employees to share company content on their personal social media to increase reach and humanize the brand."
             },
             {
                 question: "[Module 3, Q What is a suggested low-commitment next step for cold outreach instead of asking for a sale immediately?",
                 options: ["Requesting a signed contract.", "Asking for a large deposit.", "Suggesting a brief introductory call to share a relevant insight or a link to a valuable resource.", "Demanding a list of their competitors."],
                 answer: "Suggesting a brief introductory call to share a relevant insight or a link to a valuable resource.",
                 explanation: " Suggesting a low-commitment next step like a brief call to share insight or a resource is recommended over asking for a sale."
             },
             {
                 question: "[Module 3, Q What is the first stage of the B2B sales funnel described in the training?",
                 options: ["Solution Crafting", "Needs Discovery and Driving", "Prospecting & Initial Qualification", "Winning (Closing)"],
                 answer: "Prospecting & Initial Qualification",
                 explanation: "  Prospecting & Initial Qualification is described as the first core stage."
             },
              {
                 question: "[Module 3, Q During the \"Needs Discovery and Driving\" stage, what is a key activity for the seller?",
                 options: ["Presenting the final proposal and price.", "Asking insightful open-ended questions to deeply uncover client needs and challenges.", "Focusing only on closing the deal quickly.", "Sending a generic brochure."],
                 answer: "Asking insightful open-ended questions to deeply uncover client needs and challenges.",
                 explanation: "  Asking insightful open-ended questions to deeply uncover client needs is a key seller activity during Needs Discovery."
             },
             {
                 question: "[Module 3, Q In which sales funnel stage does the seller typically develop a tailored solution and formal proposal?",
                 options: ["Prospecting", "Solution Crafting & Proposal Development", "Account Development", "Initial Qualification"], // Corrected option based on text
                 answer: "Solution Crafting & Proposal Development",
                 explanation: "  The seller crafts a tailored solution and formal proposal during the Solution Crafting & Proposal Development stage."
             },
              {
                 question: "[Module 3, Q What is the buyer's perspective during the \"Solution Presentation\" stage?",
                 options: ["They are just becoming aware of a problem.", "They are evaluating specific solutions from different vendors and deciding if a solution is a \"go\" or \"no-go.\"", "They have already signed the contract.", "They are not yet considering any solutions."],
                 answer: "They are evaluating specific solutions from different vendors and deciding if a solution is a \"go\" or \"no-go.\"",
                 explanation: "  During the Solution Presentation stage, the buyer is evaluating specific solutions from vendors and making comparisons."
             },
             {
                 question: "[Module 3, Q What is the primary goal for the seller during the \"Winning (Negotiation & Closing)\" stage?",
                 options: ["To conduct initial prospect research.", "To finalize the agreement and secure the client's commitment.", "To identify new leads.", "To provide ongoing technical support."],
                 answer: "To finalize the agreement and secure the client's commitment.",
                 explanation: " The seller's primary goal during the Winning (Closing) stage is to finalize the agreement and secure commitment."
             },
             {
                question: "[Module 3, Q The \"Account Development & Retention\" stage focuses on:",
                options: ["Finding new prospects.", "The initial sales pitch.", "Ensuring client satisfaction post-sale, fostering loyalty, and identifying further opportunities.", "Crafting the first proposal."],
                answer: "Ensuring client satisfaction post-sale, fostering loyalty, and identifying further opportunities.",
                explanation: "  Account Development & Retention focuses on post-sale satisfaction, loyalty, and identifying further opportunities."
             },
             {
                question: "[Module 3, Q Why is it important to align sales activities with the buyer's current stage in their decision-making journey?",
                options: ["To make the sales process longer.", "To ensure the sales process feels like a helpful consultation rather than a high-pressure pitch.", "To focus solely on the seller's timeline.", "To skip the needs discovery phase."],
                answer: "To ensure the sales process feels like a helpful consultation rather than a high-pressure pitch.",
                explanation: "  Aligning activities with the buyer's stage makes the process feel consultative, not high-pressure, improving success chances."
             }
             // Add remaining 15 questions for Module 3 based on quiz doc, with citations
        ]
    };


    function showStep(index) {
        steps.forEach((step, i) => {
            step.classList.toggle('active-step', i === index);
        });
        currentStepIndex = index;
        localStorage.setItem('currentTrainingStep', index);
         // Persist answers to localStorage if navigating back/forth in quizzes
        if (index >= 2 && index <= 7) { // If it's a quiz or content page after user info
             localStorage.setItem('traineeQuizAnswers', JSON.stringify(quizAnswers));
             localStorage.setItem('traineeInfo', JSON.stringify(traineeData)); // Also save info in case they refresh
        }
        window.scrollTo(0, 0); // Scroll to top on step change
    }

    function loadModuleContent() {
        const mod1ContentArea = document.querySelector('#module1-content .module-content-area');
        const mod2ContentArea = document.querySelector('#module2-content .module-content-area');
        const mod3ContentArea = document.querySelector('#module3-content .module-content-area');

        if (mod1ContentArea) mod1ContentArea.innerHTML = moduleContents.module1;
        if (mod2ContentArea) mod2ContentArea.innerHTML = moduleContents.module2;
        if (mod3ContentArea) mod3ContentArea.innerHTML = moduleContents.module3;
    }

     function populateQuiz(moduleKey, formId) {
        const quizForm = document.getElementById(formId);
        if (!quizForm || !quizQuestions[moduleKey]) return;

        quizForm.innerHTML = ''; // Clear previous questions if any

        const currentModuleAnswers = quizAnswers[moduleKey] || {};

        quizQuestions[moduleKey].forEach((q, index) => {
            const questionBlock = document.createElement('div');
            questionBlock.classList.add('question-block');
            const questionText = document.createElement('p');
            // Simple approach to extract question number if present in text
            const qNumMatch = q.question.match(/^\[Module \d+, Q(\d+)\]/);
            const qNumDisplay = qNumMatch ? qNumMatch[ : (index + 1);
            questionText.innerHTML = `<strong>${qNumDisplay}. ${q.question.replace(/^\[.*?\]\s*/, '')}</strong>`; // Remove bracketed prefix if exists
            questionBlock.appendChild(questionText);

            const questionId = `q${index}`; // Use index as the key

            q.options.forEach(option => {
                const label = document.createElement('label');
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `${moduleKey}_${questionId}`; // Ensure unique name per question
                radio.value = option;
                radio.required = true; // Make selection mandatory before proceeding

                // Repopulate saved answer
                if (currentModuleAnswers[questionId] === option) {
                    radio.checked = true;
                }

                radio.addEventListener('change', () => {
                    if (!quizAnswers[moduleKey]) {
                        quizAnswers[moduleKey] = {}; // Initialize if not present
                    }
                    quizAnswers[moduleKey][questionId] = radio.value; // Save answer using index key
                });

                label.appendChild(radio);
                label.appendChild(document.createTextNode(` ${option}`)); // Add space for readability
                questionBlock.appendChild(label);
                questionBlock.appendChild(document.createElement('br')); // Line break between options
            });
            quizForm.appendChild(questionBlock);
        });
    }

    function validateForm(form) {
        let isValid = true;
        form.querySelectorAll('input[required]').forEach(input => {
            if (input.type === 'radio') {
                // Check if at least one radio button in a group is checked
                const radioGroup = form.querySelectorAll(`input[name="${input.name}"]`);
                let isGroupValid = false;
                radioGroup.forEach(radio => {
                    if (radio.checked) {
                        isGroupValid = true;
                    }
                });
                 if (!isGroupValid) {
                    isValid = false;
                    // Highlight the question block or add message
                    const questionBlock = input.closest('.question-block');
                     if (questionBlock && !questionBlock.querySelector('.error-message')) {
                         const errorMsg = document.createElement('span');
                         errorMsg.textContent = ' Please select an answer.';
                         errorMsg.style.color = 'red';
                         errorMsg.style.fontSize = '0.9em';
                         errorMsg.classList.add('error-message');
                         questionBlock.appendChild(errorMsg);
                     }
                 } else {
                      const questionBlock = input.closest('.question-block');
                      const errorMsg = questionBlock ? questionBlock.querySelector('.error-message') : null;
                      if (errorMsg) errorMsg.remove();
                 }
            } else {
                // Standard text input validation
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                     // Remove any previous success styling
                     input.classList.remove('is-valid');
                     // Add error styling
                     input.classList.add('is-invalid');

                } else {
                    input.style.borderColor = '#ccc';
                     // Remove any previous error styling
                     input.classList.remove('is-invalid');
                     // Add success styling
                     input.classList.add('is-valid');
                }
            }
        });
        if (!isValid && form.id.includes('quizForm')) {
             alert('Please answer all questions in this module before proceeding.');
        } else if (!isValid) {
            alert('Please fill in all required fields.');
        }
        return isValid;
    }

    // Event Listeners
    if (traineeForm) {
        traineeForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (!validateForm(traineeForm)) return;

            traineeData.fullName = document.getElementById('fullName').value;
            traineeData.phoneNumber = document.getElementById('phoneNumber').value;
            traineeData.emailAddress = document.getElementById('emailAddress').value;
            traineeData.employeeId = document.getElementById('employeeId').value;
            localStorage.setItem('traineeInfo', JSON.stringify(traineeData));
            showStep(currentStepIndex + 1);
        });
    }

    document.querySelectorAll('.next-button').forEach(button => {
        button.addEventListener('click', () => {
            const currentStepElement = steps[currentStepIndex];
            const quizForm = currentStepElement.querySelector('.quiz-form');

            // Validate quiz form if present on the current step
            if (quizForm) {
                if (!validateForm(quizForm)) {
                    return; // Stop navigation if quiz is incomplete
                }
            }

            if (currentStepIndex < steps.length - 1) {
                showStep(currentStepIndex + 1);
            }
        });
    });


    document.querySelectorAll('.prev-button').forEach(button => {
        button.addEventListener('click', () => {
            if (currentStepIndex > 0) {
                showStep(currentStepIndex - 1);
            }
        });
    });

    const returnToPreviousButton = document.getElementById('returnToPrevious');
    if (returnToPreviousButton) {
        returnToPreviousButton.addEventListener('click', () => {
             // Takes user to the start of the last quiz (Module 3 quiz)
             const lastQuizIndex = steps.findIndex(step => step.id === 'module3-quiz');
             if (lastQuizIndex !== -1) {
                  showStep(lastQuizIndex);
             } else if (currentStepIndex > 0) { // Fallback if ID changes
                 showStep(currentStepIndex - 1);
             }
        });
    }

    const submitAnswersButton = document.getElementById('submitAnswers');
    if (submitAnswersButton) {
        submitAnswersButton.addEventListener('click', function() {
            if (!traineeData.employeeId) {
                 alert("Error: Employee ID not found. Please ensure you completed the initial information form.");
                 // Potentially navigate back to the form step
                 showStep(0);
                 return;
            }

            submissionStatusEl.textContent = 'Submitting...';
            submissionStatusEl.style.color = 'inherit'; // Reset color
            submitAnswersButton.disabled = true;
            returnToPreviousButton.disabled = true;

            // Aggregate all answers including the correct answer/explanation for storage
            const finalQuizResponses = {};
            Object.keys(quizQuestions).forEach(moduleKey => {
                finalQuizResponses[moduleKey] = ;
                const userAnswers = quizAnswers[moduleKey] || {};
                quizQuestions[moduleKey].forEach((q, index) => {
                     const questionId = `q${index}`;
                     const userAnswer = userAnswers[questionId] || "Not Answered";
                     finalQuizResponses[moduleKey].push({
                         question_number: index + 1,
                         question_text: q.question.replace(/^\[.*?\]\s*/, ''), // Cleaned question text
                         user_answer: userAnswer,
                         correct_answer: q.answer,
                         is_correct: userAnswer === q.answer,
                         explanation: q.explanation || "" // Include explanation if available
                     });
                });
            });


            const finalData = {
                userInfo: traineeData,
                quizResponses: finalQuizResponses, // Use the detailed structure
                submissionTimestamp: new Date().toISOString()
            };

            const fileName = `${traineeData.employeeId}_${finalData.submissionTimestamp.replace(/[:.]/g, '-')}.json`;
            const fileContent = JSON.stringify(finalData, null, 2);

            const params = {
                Bucket: S3_BUCKET_NAME,
                Key: `training_submissions/${fileName}`, // Optional: store in a subfolder
                Body: fileContent,
                ContentType: 'application/json'
            };

            s3.upload(params, function(err, data) {
                if (err) {
                    console.error("S3 Upload Error:", err);
                    submissionStatusEl.textContent = `Error during submission: ${err.message}. Please try again or contact support.`;
                    submissionStatusEl.style.color = 'red';
                    submitAnswersButton.disabled = false; // Re-enable on error
                    returnToPreviousButton.disabled = false;

                } else {
                    console.log("S3 Upload Successful:", data.Location);
                    submissionStatusEl.textContent = 'Submission Successful! Your training data has been recorded.';
                    submissionStatusEl.style.color = 'green';
                    // Clear local storage after successful submission
                    localStorage.removeItem('traineeInfo');
                    localStorage.removeItem('traineeQuizAnswers');
                    localStorage.removeItem('currentTrainingStep');
                    // Optionally, disable buttons further or redirect
                    // submitAnswersButton.disabled = true; // Keep disabled
                    // returnToPreviousButton.disabled = true; // Keep disabled
                }
            });
        });
    }

    // Initialization
    loadModuleContent();

    // Load state from localStorage
    const savedStep = localStorage.getItem('currentTrainingStep');
    const savedInfo = localStorage.getItem('traineeInfo');
    const savedAnswers = localStorage.getItem('traineeQuizAnswers');

    if (savedInfo) {
        try {
            traineeData = JSON.parse(savedInfo);
             // Pre-fill form if exists (only really matters if they refresh on step 0)
            if (document.getElementById('fullName')) document.getElementById('fullName').value = traineeData.fullName || '';
            if (document.getElementById('phoneNumber')) document.getElementById('phoneNumber').value = traineeData.phoneNumber || '';
            if (document.getElementById('emailAddress')) document.getElementById('emailAddress').value = traineeData.emailAddress || '';
            if (document.getElementById('employeeId')) document.getElementById('employeeId').value = traineeData.employeeId || '';
        } catch (e) {
            console.error("Error parsing saved trainee info:", e);
            localStorage.removeItem('traineeInfo'); // Clear corrupted data
        }
    }
    if (savedAnswers) {
         try {
            quizAnswers = JSON.parse(savedAnswers);
        } catch (e) {
             console.error("Error parsing saved quiz answers:", e);
             localStorage.removeItem('traineeQuizAnswers'); // Clear corrupted data
             quizAnswers = { module1: {}, module2: {}, module3: {} }; // Reset
        }
    } else {
         quizAnswers = { module1: {}, module2: {}, module3: {} }; // Initialize if not present
    }

    // Must populate quizzes AFTER loading saved answers
    populateQuiz('module1', 'quizFormModule1');
    populateQuiz('module2', 'quizFormModule2');
    populateQuiz('module3', 'quizFormModule3');


    if (savedStep !== null && !isNaN(parseInt(savedStep)) && parseInt(savedStep) < steps.length) {
         // Ensure user info exists if trying to start past step 0
         if (parseInt(savedStep) > 0 && !traineeData.employeeId) {
             console.log("Saved step exists but user info missing, starting at step 0.");
             showStep(0); // Force back to user info form if data is missing
         } else {
             showStep(parseInt(savedStep));
         }
    } else {
        showStep(0); // Start at the first step (user info form)
    }

    // Add CSS classes for visual validation feedback
    document.querySelectorAll('#traineeForm input[required]').forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim()) {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
                input.style.borderColor = '#ccc'; // Reset border
            } else {
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
                 input.style.borderColor = 'red'; // Highlight missing required field
            }
        });
    });

}); 