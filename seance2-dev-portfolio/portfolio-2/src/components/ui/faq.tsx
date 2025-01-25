"use client";

import { gql, useQuery } from "@apollo/client";
import { motion, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import WhirlpoolLoader from "./whirlpool-Loader";

const GET_FAQS = gql`
  query GetFaqs {
    faqs {
      titre
      contenu
    }
  }
`;

interface AccordionItemProps {
  title: string;
  content: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  isExpanded,
  onToggle,
}) => {
  const cardVariants: Variants = {
    collapsed: {
      height: "60px",
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
    expanded: {
      height: "auto",
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  };

  const contentVariants: Variants = {
    collapsed: { opacity: 0 },
    expanded: {
      opacity: 1,
      transition: { delay: 0.1 },
    },
  };

  const chevronVariants: Variants = {
    collapsed: { rotate: 0 },
    expanded: { rotate: 180 },
  };

  return (
    <motion.div
      className="w-90 my-4 h-full cursor-pointer select-none overflow-hidden rounded-lg border"
      style={{ backgroundColor: "#1e1e1e", borderColor: "#2c2c2c" }} 
      variants={cardVariants}
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      onClick={onToggle}
    >
      <div
        className="flex items-center justify-between p-4"
        style={{ color: "#ffffff" }}
      >
        <h2 className="m-0 text-sm font-semibold">{title}</h2>
        <motion.div variants={chevronVariants}>
          <ChevronDown size={18} />
        </motion.div>
      </div>
      <motion.div
        className="text-md select-none px-4 py-4"
        style={{ color: "#ffffff" }} 
        variants={contentVariants}
        initial="collapsed"
        animate={isExpanded ? "expanded" : "collapsed"}
      >
        <p className="m-0 text-sm">{content}</p>
      </motion.div>
    </motion.div>
  );
};

interface AccordionProps {
  items: Array<{
    title: string;
    content: string;
  }>;
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isExpanded={expandedIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

const FaqSection: React.FC = () => {
  const { data, loading, error } = useQuery(GET_FAQS);

  if (loading) {
    return <WhirlpoolLoader />;
  }

  if (error) {
    return (
      <p className="text-center" style={{ color: "#ff0000" }}>
        Erreur : {error.message}
      </p>
    );
  }

  const faqItems = data.faqs.map((faq: any) => ({
    title: faq.titre,
    content: faq.contenu,
  }));

  return (
    <div className="p-8">
      <Accordion items={faqItems} />
    </div>
  );
};

export default FaqSection;