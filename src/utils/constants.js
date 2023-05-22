export const HOUSE_TYPES = [
  { value: "duplex", label: "Duplex" },
  { value: "flat", label: "Flat" },
  { value: "bungalow", label: "Bungalow" },
];

export const SPACES = [
  { name: "Sitting Space", value: "sitting_space_images" },
  { name: "Kitchen", value: "kitchen_images" },
  { name: "Bedrooms", value: "bedroom_images" },
  { name: "Dining Area", value: "dining_area_images" },
  { name: "Bathroom", value: "bathroom_images" },
];

export const DEFAULT_AVATAR =
  "https://res.cloudinary.com/olamilekan1/image/upload/v1658528808/avatar-default.png";
export const pageCount = 10;
export const FAQS = [
  {
    question: "What is Zusco?",
    answer:
      "Zusco is a short-term rental platform that connects travelers with property owners who are interested in renting out their homes, apartments, or other accommodations for short stays.",
  },
  {
    question: "How does Zusco work?",
    answer:
      "Property owners can list their properties on the Zusco platform, set the rental price and availability, and communicate with potential renters through the platform's messaging system. Travelers can search for properties by location, dates, and other criteria, and can book their accommodations directly through the platform.",
  },
  {
    question: "Is Zusco safe?",
    answer:
      "Zusco takes safety and security seriously. Property owners and renters are required to create verified accounts with personal information, and all transactions are processed securely through the platform. Additionally, Zusco has a review system that allows users to rate and review their experiences with each other, helping to ensure a positive and trustworthy community.",
  },
  {
    question: "What types of properties can I find on Zusco?",
    answer:
      "Zusco offers a variety of properties for short-term rental, including apartments, houses, villas, and even unique properties like yurts, treehouses, and boats. Properties can be rented for a few nights or for longer stays, depending on the owner's preferences.",
  },
  {
    question: "How do I contact the owner of a property?",
    answer: `You can message the owner directly through the Zusco platform. Once you've found a property you're interested in, simply click the "contact host" button and send them a message. Owners typically respond within 24 hours.`,
  },
  {
    question: "What happens if I have a problem with my rental?",
    answer: `Zusco has a customer support team available 24/7 to assist with any issues that arise during your rental. If you encounter a problem with your rental, you can contact customer support through the platform's messaging system or by phone.`,
  },
  {
    question: "How do I pay for my rental?",
    answer: `Payment is processed securely through the Zusco platform using a major credit card. Payment is due at the time of booking, and additional fees such as cleaning fees or security deposits may also be required by the property owner.`,
  },
  {
    question: "What if I need to cancel my rental?",
    answer: `The cancellation policy for each property is set by the owner and will be listed on the property's listing page. If you need to cancel your rental, you can do so through the Zusco platform. Depending on the owner's cancellation policy, you may be eligible for a full or partial refund.`,
  },
  {
    question: "Can I leave a review of my rental experience?",
    answer: `Yes, Zusco has a review system that allows users to leave feedback about their experiences with property owners and renters. Reviews are a valuable tool for helping future renters make informed decisions about their rental choices.`,
  },
];
export const STATES = [
  "Lagos",
  "Abuja",
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
].map((item) => {
  return { label: item, value: item };
});
export const minPriceValue = 1000;
export const maxPriceValue = 400000;
export const defaultFilterValues = {
  states: ["Lagos"],
  min_price: minPriceValue,
  max_price: maxPriceValue,
  number_of_bedrooms: 2,
  amenities: [],
  allowances: [],
  rules: [],
};
