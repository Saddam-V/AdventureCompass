import { ReactNode } from "react";

export interface ResearchArea {
  id: number;
  title: string;
  description: string;
  iconSrc: string;
  contributions: string[];
}

export interface Publication {
  id: number;
  title: string;
  publisher: string;
  year: number;
  type: string;
  citationText: string;
  link: string;
  abstract: string;
  tags: string[];
  contributions: string[];
}

export const researchAreas: ResearchArea[] = [
  {
    id: 1,
    title: "Philosophy of Mind",
    description: "Investigating the nature of consciousness, mental representation, and the mind-body problem through the lens of contemporary cognitive science.",
    iconSrc: "/icons/brain.svg",
    contributions: [
      "Developed the \"Integrative Model of Consciousness\"",
      "Research on embodied cognition and perception",
      "Studies on the phenomenology of perception",
      "Investigated extended mind hypothesis applications"
    ]
  },
  {
    id: 2,
    title: "AI Ethics & Philosophy",
    description: "Exploring ethical implications of artificial intelligence and examining what AI reveals about human intelligence and cognition.",
    iconSrc: "/icons/robot.svg",
    contributions: [
      "Framework for evaluating AI moral agency",
      "Research on algorithmic bias and fairness",
      "Analysis of machine learning epistemology",
      "Study of human-AI collaborative intelligence"
    ]
  },
  {
    id: 3,
    title: "Epistemology",
    description: "Studying the nature, origin, and limits of human knowledge, with particular focus on scientific knowledge and rational belief formation.",
    iconSrc: "/icons/book.svg",
    contributions: [
      "Development of \"Dynamic Justification Theory\"",
      "Work on social epistemology and collective knowledge",
      "Studies on epistemic virtues and rational inquiry",
      "Analysis of knowledge acquisition in digital contexts"
    ]
  }
];

export const publications: Publication[] = [
  {
    id: 1,
    title: "Consciousness and Artificial Systems",
    publisher: "Journal of Consciousness Studies",
    year: 2022,
    type: "Journal Publication",
    citationText: "Citation Count: 78",
    link: "#",
    abstract: "This paper examines the conceptual boundaries between consciousness and intelligence, proposing a novel framework for understanding how advanced AI systems might develop aspects of phenomenal experience without full human consciousness.",
    tags: ["Philosophy of Mind", "AI"],
    contributions: [
      "Development of the \"Gradient Theory of Machine Consciousness\"",
      "Analysis of phenomenal vs. access consciousness in AI systems",
      "Ethical implications for development of conscious-like AI"
    ]
  },
  {
    id: 2,
    title: "The Rationality Spectrum",
    publisher: "Oxford University Press",
    year: 2021,
    type: "Book",
    citationText: "ISBN: 978-0199586059",
    link: "#",
    abstract: "This comprehensive examination of human rationality challenges traditional binary views of rational behavior, proposing instead a spectrum model that accommodates various forms of reasoning across different contexts and cognitive architectures.",
    tags: ["Epistemology", "Cognitive Science"],
    contributions: [
      "Introduction of the \"Spectrum Theory of Rationality\"",
      "Integration of findings from behavioral economics and cognitive psychology",
      "New perspective on logical fallacies as adaptive heuristics"
    ]
  },
  {
    id: 3,
    title: "Epistemic Justice in the Age of Algorithms",
    publisher: "Philosophical Quarterly",
    year: 2023,
    type: "Journal Publication",
    citationText: "Citation Count: 42",
    link: "#",
    abstract: "This paper extends traditional concepts of epistemic justice to the domain of algorithmic decision-making, arguing that AI systems can perpetuate existing epistemic injustices while also creating new forms specific to automated knowledge systems.",
    tags: ["Ethics", "AI Ethics"],
    contributions: [
      "Framework for \"Algorithmic Epistemic Injustice\" identification",
      "Analysis of machine learning training data as testimonial space",
      "Policy recommendations for mitigating algorithmic injustice"
    ]
  }
];
