import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export const navData = [
    {
        id: 1,
        title: 'Home',
        link: '/'
    },
    {
        id: 2,
        title: 'Recipe',
        link: '/recipe/4704'
    },
    {
        id: 3,
        title: 'Search',
        link: '/search'
    },
    {
        id: 4,
        title: 'Contact',
        link: '/contact'
    },
]

export const dataAccordion = [
    {
        id: 1,
        title: 'Dish Type',
        links: [
            'Appetizers & Snacks',
            'Bread Recipes',
            'Cake Recipes',
            'Candy and Fudge',
            'Casserole Recipes',
            'Christmas Cookies',
            'Cocktail Recipes',
            'Main Dishes',
            'Pasta Recipes',
            'Pie Recipes',
            'Sandwiches'
        ]
    },
    {
        id: 2,
        title: 'Meal Type',
        links: [
            'Breakfast and Brunch',
            'Desserts',
            'Dinners',
            'Lunch'
        ]
    },
    {
        id: 3,
        title: 'Diet and Health',
        links: [
            'Diabetic',
            'Gluten Free',
            'High Fiber Recipes',
            'Low Calorie'
        ]
    },
    {
        id: 4,
        title: 'World Cuisine',
        links: [
            'Chinese',
            'Indian',
            'Italian',
            'Mexican'
        ]
    },
    {
        id: 5,
        title: 'Seasonal',
        links: [
            'Baby Shower',
            'Birthday',
            'Christmas',
            'Halloween'
        ]
    }
]

export const socialData = [
  {
    id: 1,
    icon: <FaFacebookF />,
    color: '#3b5998',
  },
  {
      id: 2,
      icon: <FaInstagram />,
      color: '#e4405f',
  },
  {
      id: 3,
      icon: <FaTwitter />,
      color: '#55acee',
  }
];

export const footerData = [
    {
      links: ["Presentations", "Professionals", "Stores"],
    },
    {
      links: ["Webinars", "Workshops", "Local Meetups"],
    },
    {
      links: ["Our Initiatives", "Giving Back", "Communities"],
    },
    {
      links: ["Contact Form", "Work With Us", "Visit Us"],
    },
];

export const customStyles = {
  option: (provided) => ({
    ...provided,
    padding: "8px 14px",
    fontSize: "14px",
  }),
  control: (provided) => ({
    ...provided,
    width: "100%",
    height: "35px",
    outline: "none",
    borderRadius: "50px",
    border: '1px solid #eee',
    padding: "0 0 0 10px",
    background: '#eee',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
};