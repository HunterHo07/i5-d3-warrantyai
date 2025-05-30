// WarrantyAI - AI Processing Simulation

// Sample product database for realistic extraction
const PRODUCT_DATABASE = [
  {
    brand: "Apple",
    products: ["iPhone 15 Pro", "MacBook Pro", "iPad Air", "Apple Watch", "AirPods Pro"],
    warrantyPeriods: ["1 year", "1 year", "1 year", "1 year", "1 year"],
    categories: ["Electronics", "Electronics", "Electronics", "Electronics", "Electronics"],
  },
  {
    brand: "Samsung",
    products: ["Galaxy S24", "Galaxy Tab", "Galaxy Watch", "Galaxy Buds", "Smart TV"],
    warrantyPeriods: ["1 year", "1 year", "1 year", "1 year", "2 years"],
    categories: ["Electronics", "Electronics", "Electronics", "Electronics", "Electronics"],
  },
  {
    brand: "Sony",
    products: ["PlayStation 5", "WH-1000XM5", "Alpha Camera", "Bravia TV", "Speaker"],
    warrantyPeriods: ["1 year", "1 year", "2 years", "2 years", "1 year"],
    categories: ["Electronics", "Electronics", "Electronics", "Electronics", "Electronics"],
  },
  {
    brand: "LG",
    products: ["OLED TV", "Refrigerator", "Washing Machine", "Dishwasher", "Microwave"],
    warrantyPeriods: ["2 years", "5 years", "3 years", "2 years", "1 year"],
    categories: ["Electronics", "Appliances", "Appliances", "Appliances", "Appliances"],
  },
  {
    brand: "Whirlpool",
    products: ["Refrigerator", "Washing Machine", "Dryer", "Dishwasher", "Oven"],
    warrantyPeriods: ["5 years", "3 years", "3 years", "2 years", "2 years"],
    categories: ["Appliances", "Appliances", "Appliances", "Appliances", "Appliances"],
  },
  {
    brand: "Tesla",
    products: ["Model 3", "Model Y", "Model S", "Model X", "Cybertruck"],
    warrantyPeriods: ["4 years", "4 years", "4 years", "4 years", "4 years"],
    categories: ["Automotive", "Automotive", "Automotive", "Automotive", "Automotive"],
  },
  {
    brand: "IKEA",
    products: ["MALM Bed", "BILLY Bookcase", "POÄNG Chair", "HEMNES Dresser", "KALLAX Shelf"],
    warrantyPeriods: ["25 years", "10 years", "10 years", "10 years", "10 years"],
    categories: ["Furniture", "Furniture", "Furniture", "Furniture", "Furniture"],
  },
];

const STORES = [
  "Best Buy", "Amazon", "Target", "Walmart", "Costco", "Home Depot", 
  "Lowe's", "Apple Store", "Samsung Store", "B&H Photo", "Newegg",
  "Micro Center", "Fry's Electronics", "Office Depot", "Staples"
];

// AI Extraction Simulation
export const aiExtraction = {
  // Simulate receipt text extraction
  extractTextFromImage: async (imageFile) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate OCR processing
        const confidence = 0.85 + Math.random() * 0.1; // 85-95% confidence
        
        resolve({
          text: "Sample receipt text extracted from image",
          confidence,
          processingTime: 1500 + Math.random() * 1000,
        });
      }, 1500 + Math.random() * 1000);
    });
  },

  // Simulate product information extraction
  extractProductInfo: async (receiptText) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Randomly select a product from database
        const randomBrand = PRODUCT_DATABASE[Math.floor(Math.random() * PRODUCT_DATABASE.length)];
        const randomProductIndex = Math.floor(Math.random() * randomBrand.products.length);
        const product = randomBrand.products[randomProductIndex];
        const warrantyPeriod = randomBrand.warrantyPeriods[randomProductIndex];
        const category = randomBrand.categories[randomProductIndex];
        
        // Generate realistic data
        const purchaseDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
        const warrantyYears = parseInt(warrantyPeriod.split(" ")[0]);
        const warrantyExpiry = new Date(purchaseDate.getTime() + warrantyYears * 365 * 24 * 60 * 60 * 1000);
        
        const extractedData = {
          product: product,
          brand: randomBrand.brand,
          model: `${product.split(" ")[0]}-${Math.floor(Math.random() * 9000) + 1000}`,
          category: category,
          purchaseDate: purchaseDate.toISOString().split("T")[0],
          warrantyPeriod: warrantyPeriod,
          warrantyExpiry: warrantyExpiry.toISOString().split("T")[0],
          price: `$${(Math.random() * 2000 + 100).toFixed(2)}`,
          store: STORES[Math.floor(Math.random() * STORES.length)],
          serialNumber: `SN${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          confidence: 0.88 + Math.random() * 0.1, // 88-98% confidence
          extractedFields: [
            "product", "brand", "model", "purchaseDate", 
            "warrantyPeriod", "price", "store"
          ],
          processingTime: 2000 + Math.random() * 2000,
        };

        resolve(extractedData);
      }, 2000 + Math.random() * 2000);
    });
  },

  // Simulate email parsing
  parseEmailReceipt: async (emailContent) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const extractedData = aiExtraction.extractProductInfo("email content");
        resolve({
          ...extractedData,
          source: "email",
          emailSubject: "Your purchase confirmation",
          emailDate: new Date().toISOString(),
        });
      }, 1000 + Math.random() * 1500);
    });
  },

  // Simulate warranty lookup
  lookupWarrantyInfo: async (brand, model, serialNumber) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const warrantyInfo = {
          isValid: Math.random() > 0.1, // 90% chance of valid warranty
          registrationRequired: Math.random() > 0.5,
          extendedWarrantyAvailable: Math.random() > 0.3,
          coverageDetails: [
            "Manufacturing defects",
            "Parts replacement",
            "Labor costs",
            "Technical support"
          ],
          exclusions: [
            "Physical damage",
            "Water damage",
            "Normal wear and tear",
            "Unauthorized repairs"
          ],
          serviceLocations: [
            "Authorized service centers",
            "Mail-in repair service",
            "On-site service (premium)"
          ],
          confidence: 0.92 + Math.random() * 0.05,
        };

        resolve(warrantyInfo);
      }, 1500 + Math.random() * 1000);
    });
  },
};

// Smart Reminder System Simulation
export const smartReminders = {
  // Generate intelligent reminders
  generateReminders: async (productData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const reminders = [];
        const warrantyExpiry = new Date(productData.warrantyExpiry);
        const now = new Date();
        
        // Warranty expiration reminders
        const daysUntilExpiry = Math.floor((warrantyExpiry - now) / (1000 * 60 * 60 * 24));
        
        if (daysUntilExpiry > 30) {
          reminders.push({
            type: "warranty_expiry",
            title: "Warranty Expiring Soon",
            message: `Your ${productData.product} warranty expires in ${daysUntilExpiry} days`,
            date: new Date(warrantyExpiry.getTime() - 30 * 24 * 60 * 60 * 1000),
            priority: "medium",
            category: "warranty",
          });
        }

        // Service reminders based on product category
        if (productData.category === "Appliances") {
          reminders.push({
            type: "maintenance",
            title: "Maintenance Check",
            message: `Schedule maintenance for your ${productData.product}`,
            date: new Date(now.getTime() + 6 * 30 * 24 * 60 * 60 * 1000), // 6 months
            priority: "low",
            category: "maintenance",
          });
        }

        if (productData.category === "Automotive") {
          reminders.push({
            type: "service",
            title: "Service Due",
            message: `Your ${productData.product} is due for service`,
            date: new Date(now.getTime() + 3 * 30 * 24 * 60 * 60 * 1000), // 3 months
            priority: "high",
            category: "service",
          });
        }

        // Registration reminder
        if (Math.random() > 0.5) {
          reminders.push({
            type: "registration",
            title: "Product Registration",
            message: `Register your ${productData.product} to activate warranty`,
            date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 1 week
            priority: "high",
            category: "registration",
          });
        }

        resolve(reminders);
      }, 1000 + Math.random() * 500);
    });
  },

  // Predict optimal service timing
  predictServiceNeeds: async (productHistory) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const predictions = {
          nextServiceDate: new Date(Date.now() + Math.random() * 6 * 30 * 24 * 60 * 60 * 1000),
          serviceType: ["Cleaning", "Inspection", "Calibration", "Replacement"][Math.floor(Math.random() * 4)],
          estimatedCost: `$${(Math.random() * 200 + 50).toFixed(2)}`,
          urgency: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
          confidence: 0.75 + Math.random() * 0.2,
        };

        resolve(predictions);
      }, 800 + Math.random() * 400);
    });
  },
};

// Claim Assistant Simulation
export const claimAssistant = {
  // Analyze claim eligibility
  analyzeClaim: async (productData, issueDescription) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const analysis = {
          eligible: Math.random() > 0.2, // 80% chance of eligibility
          confidence: 0.85 + Math.random() * 0.1,
          reasons: [],
          requiredDocuments: [
            "Original receipt",
            "Product photos",
            "Issue description",
            "Serial number verification"
          ],
          estimatedProcessingTime: "5-10 business days",
          nextSteps: [
            "Gather required documents",
            "Contact manufacturer",
            "Submit claim form",
            "Schedule inspection if needed"
          ],
          tips: [
            "Keep all original packaging",
            "Document the issue with photos",
            "Contact support within warranty period",
            "Be detailed in your description"
          ],
        };

        if (analysis.eligible) {
          analysis.reasons.push("Product is within warranty period");
          analysis.reasons.push("Issue appears to be covered");
        } else {
          analysis.reasons.push("Warranty has expired");
          analysis.reasons.push("Issue may not be covered");
        }

        resolve(analysis);
      }, 1500 + Math.random() * 1000);
    });
  },

  // Generate claim documents
  generateClaimDocuments: async (claimData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const documents = {
          claimForm: {
            id: `CLAIM-${Date.now()}`,
            status: "draft",
            createdAt: new Date().toISOString(),
            fields: {
              productInfo: claimData.productData,
              issueDescription: claimData.issueDescription,
              customerInfo: {
                name: "Demo User",
                email: "demo@warrantyai.com",
                phone: "(555) 123-4567",
              },
            },
          },
          supportingDocs: [
            "receipt_copy.pdf",
            "product_photos.zip",
            "issue_description.txt",
          ],
          submissionInstructions: {
            method: "online",
            url: "https://manufacturer-claims.com",
            alternativeMethod: "mail",
            address: "123 Warranty St, Claims City, CC 12345",
          },
        };

        resolve(documents);
      }, 1200 + Math.random() * 800);
    });
  },
};

// 3D Inventory Simulation
export const inventoryVisualization = {
  // Generate 3D room layout
  generateRoomLayout: async (items) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const rooms = ["Living Room", "Kitchen", "Bedroom", "Office", "Garage"];
        const layout = {
          rooms: rooms.map(room => ({
            name: room,
            items: items.filter(() => Math.random() > 0.7), // Randomly distribute items
            dimensions: {
              width: 10 + Math.random() * 10,
              height: 8 + Math.random() * 4,
              depth: 10 + Math.random() * 10,
            },
            position: {
              x: Math.random() * 20 - 10,
              y: 0,
              z: Math.random() * 20 - 10,
            },
          })),
          totalValue: items.reduce((sum, item) => sum + parseFloat(item.price?.replace("$", "") || 0), 0),
          itemCount: items.length,
          lastUpdated: new Date().toISOString(),
        };

        resolve(layout);
      }, 2000 + Math.random() * 1500);
    });
  },

  // Generate AR placement suggestions
  suggestARPlacement: async (item, roomScan) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const suggestions = {
          recommendedPosition: {
            x: Math.random() * 5 - 2.5,
            y: Math.random() * 2,
            z: Math.random() * 5 - 2.5,
          },
          confidence: 0.8 + Math.random() * 0.15,
          alternatives: Array.from({ length: 3 }, () => ({
            x: Math.random() * 5 - 2.5,
            y: Math.random() * 2,
            z: Math.random() * 5 - 2.5,
            score: Math.random(),
          })),
          reasoning: [
            "Optimal lighting conditions",
            "Easy access for maintenance",
            "Safe distance from other items",
            "Aesthetic placement"
          ],
        };

        resolve(suggestions);
      }, 1000 + Math.random() * 500);
    });
  },
};

// Performance monitoring
export const performanceMonitor = {
  trackProcessingTime: (operation, startTime) => {
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.log(`AI Operation: ${operation} completed in ${duration}ms`);
    
    // Store performance data
    const perfData = JSON.parse(localStorage.getItem("aiPerformance") || "[]");
    perfData.push({
      operation,
      duration,
      timestamp: new Date().toISOString(),
    });
    
    // Keep only last 100 entries
    if (perfData.length > 100) {
      perfData.splice(0, perfData.length - 100);
    }
    
    localStorage.setItem("aiPerformance", JSON.stringify(perfData));
  },

  getAverageProcessingTime: (operation) => {
    const perfData = JSON.parse(localStorage.getItem("aiPerformance") || "[]");
    const operationData = perfData.filter(entry => entry.operation === operation);
    
    if (operationData.length === 0) return 0;
    
    const total = operationData.reduce((sum, entry) => sum + entry.duration, 0);
    return total / operationData.length;
  },
};

export default {
  aiExtraction,
  smartReminders,
  claimAssistant,
  inventoryVisualization,
  performanceMonitor,
};
