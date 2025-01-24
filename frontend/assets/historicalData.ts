/* eslint-disable @typescript-eslint/no-unused-vars */
import { Scroll, BookOpen, Users, MapPin, Clock, Vegan as Legacy } from 'lucide-react';

export const PERIODS = [
  {
    id: 'VedicAge',
    title: 'Vedic Age',
    time: '1500 BCE - 500 BCE',
    icon: Scroll,
    color: 'amber'
  },
  {
    id: 'Vaishnavism',
    title: 'Vaishnavism',
    time: '600 BCE - 300 BCE',
    icon: Legacy,
    color: 'orange'
  },
  {
    id: 'MauryaEmpire',
    title: 'Maurya Empire',
    time: '322 BCE - 185 BCE',
    icon: MapPin,
    color: 'yellow'
  },
  {
    id: 'GuptaEmpire',
    title: 'Gupta Empire',
    time: '320 CE - 550 CE',
    icon: Clock,
    color: 'amber'
  }
];

export interface Subsection {
  title: string;
  details: string;
}

export interface HistoricalPeriod {
  time_period: string;
  location: string;
  overview: {
    title: string;
    description: string;
  };
  subsections: Subsection[];
}

export const historicalData: Record<string, HistoricalPeriod> = {
  VedicAge: {
    time_period: "1500 BCE - 500 BCE",
    location: "India",
    overview: {
      title: "Vedic Age",
      description: "The Vedic period marks a transformative era in the history of the Indian subcontinent. It represents the transition from the late Bronze Age to the early Iron Age, bridging the gap between the decline of the urban Indus Valley Civilization and the emergence of a second wave of urbanization around 600 BCE in the central Indo-Gangetic Plain."
    },
    subsections: [
      {
        title: "Early Vedic Culture (1700-1100 BCE)",
        details: "The foundation of this period is defined by the composition of the Vedic texts, including the Vedas, which were created between roughly 1500 and 900 BCE. These liturgical texts provide insight into the social, political, and cultural aspects of early Vedic society."
      },
      {
        title: "Society and Expansion",
        details: "Initially centered in the Punjab region, Vedic society was organized into tribes rather than kingdoms. It was predominantly pastoral and maintained a semi-nomadic lifestyle."
      },
      {
        title: "Late Vedic Period",
        details: "The latter half of the Vedic period saw significant changes with the emergence of towns, kingdoms, and complex social hierarchies. The Kuru Kingdom became a central force in codifying orthodox rituals."
      },
      {
        title: "End of the Vedic Age",
        details: "The period concluded with the rise of larger urban centers and the formation of mahajanapadas. It also saw the emergence of new religious movements like Jainism and Buddhism."
      }
    ]
  },
  Vaishnavism: {
    time_period: "600 BCE - 300 BCE",
    location: "India",
    overview: {
      title: "Vaishnavism",
      description: "Vaishnavism is one of the major Hindu denominations along with Shaivism, Shaktism, and Smartism. According to a 2010 estimate, Vaishnavites are the largest Hindu sect, constituting about 641 million or 67.6% of Hindus."
    },
    subsections: [
      {
        title: "Emergence and Fusion",
        details: "The ancient emergence of Vaishnavism is unclear, and broadly hypothesized as a fusion of various regional non-Vedic religions with Vishnu. A merger of several popular non-Vedic theistic traditions developed in the 7th to 4th century BCE."
      },
      {
        title: "Devotion and Spread",
        details: "The Vaishnavite tradition is known for the loving devotion to an avatar of Vishnu (often Krishna), and as such was key to the spread of the Bhakti movement in South Asia in the 2nd millennium CE."
      },
      {
        title: "Key Texts",
        details: "Key texts in Vaishnavism include the Vedas, the Upanishads, the Bhagavad Gita, the Pancaratra (Agama) texts, Naalayira Divya Prabhandham, and the Bhagavata Purana."
      }
    ]
  },
  MauryaEmpire: {
    time_period: "322 BCE - 185 BCE",
    location: "India",
    overview: {
      title: "Maurya Empire",
      description: "The Maurya Empire was a geographically extensive historical power in ancient India. Founded by Chandragupta Maurya, it is one of the largest empires to have ever existed in the Indian subcontinent."
    },
    subsections: [
      {
        title: "Founding and Early Expansion",
        details: "Chandragupta Maurya founded the Maurya Empire in 322 BCE, unifying the northern Indian subcontinent. His reign marked the decline of the Nanda dynasty."
      },
      {
        title: "Ashoka and Buddhism",
        details: "Under Ashoka the Great (c. 268–232 BCE), the Maurya Empire reached its peak. After the bloody Kalinga War, Ashoka embraced Buddhism and propagated its teachings across his empire."
      },
      {
        title: "Decline and Fall",
        details: "After Ashoka's death, the Maurya Empire gradually declined due to weak successors, economic instability, and internal strife."
      }
    ]
  },
  GuptaEmpire: {
    time_period: "320 CE - 550 CE",
    location: "India",
    overview: {
      title: "Gupta Empire",
      description: "The Gupta Empire, often referred to as the Golden Age of India, was a period of great cultural, scientific, and political achievements."
    },
    subsections: [
      {
        title: "Cultural and Scientific Flourishing",
        details: "The Gupta Empire is known for its contributions to science, mathematics, and literature. Prominent scholars like Aryabhata made significant advancements in astronomy and mathematics."
      },
      {
        title: "Political Structure",
        details: "The Gupta rulers established a strong centralized government. Chandragupta I is regarded as the founder of the Gupta Empire, and his son Samudragupta expanded the empire significantly."
      },
      {
        title: "Decline and Fall",
        details: "The Gupta Empire began to decline after the reign of Skandagupta in the mid-5th century. Internal strife and invasions led to its collapse."
      }
    ]
  }
};