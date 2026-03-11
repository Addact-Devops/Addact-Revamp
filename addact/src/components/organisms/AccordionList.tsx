import { motion, AnimatePresence } from "framer-motion";
import { AddactDropdownIcon, AddactRightIcon } from "../atom/icons";

export interface AccordionItem {
  title: string;
  description: string;
}

interface AccordionListProps {
  items: AccordionItem[];
  activeIndex: number;
  onItemClick: (index: number) => void;
}

function AccordionRow({
  item,
  index,
  isActive,
  isLast,
  onClick,
}: {
  item: AccordionItem;
  index: number;
  isActive: boolean;
  isLast: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      className={`border-t border-black/8 ${isLast ? "border-b" : ""} cursor-pointer overflow-hidden`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.38, delay: index * 0.07 }}
      onClick={onClick}
    >
      <div className="flex items-center gap-5 py-5 px-6 select-none">
        <motion.div
          animate={{ rotate: isActive ? 0 : 270 }}
          transition={{ duration: 0.3 }}
        >
          {isActive ? <AddactDropdownIcon /> : <AddactRightIcon />}
        </motion.div>
        <motion.span
          className="justify-start text-stone-950 text-xl lg:text-2xl xl:text-3xl font-medium font-['Montserrat'] leading-[48px]"
          animate={{ color: isActive ? "#0F0F0F" : "#0F0F0F" }}
          transition={{ duration: 0.3 }}
        >
          {item.title}
        </motion.span>
      </div>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <motion.p
              className="w-full 2xl:w-[723px] justify-start text-stone-950 text-xl font-normal font-['Montserrat'] leading-8 px-6 pl-[76px] pb-6"
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.28, delay: 0.08 }}
            >
              {item.description}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function AccordionList({
  items,
  activeIndex,
  onItemClick,
}: AccordionListProps) {
  return (
    <div>
      {items.map((item, index) => (
        <AccordionRow
          key={index}
          item={item}
          index={index}
          isActive={activeIndex === index}
          isLast={index === items.length - 1}
          onClick={() => onItemClick(index)}
        />
      ))}
    </div>
  );
}
