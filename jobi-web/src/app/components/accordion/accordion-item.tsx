"use client";
import React from "react";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

// type
type IPropType = {
  id:string;
  title:string;
  title_zh?: string;
  desc:string;
  desc_zh?: string;
  isShow?:boolean;
  parent:string;
}

const AccordionItem : React.FC<IPropType> = ({
  id,
  title,
  title_zh,
  desc,
  desc_zh,
  isShow,
  parent,
}) => {
  const localizedTitle = useLocalizedContent(title, title_zh || title);
  const localizedDesc = useLocalizedContent(desc, desc_zh || desc);

  return (
    <div className="accordion-item">
      <div className="accordion-header" id={`heading-${id}`}>
        <button
          className={`accordion-button ${isShow?'':'collapsed'}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse-${id}`}
          aria-expanded={isShow?'true':'false'}
          aria-controls={`collapse-${id}`}
        >
          {localizedTitle}
        </button>
      </div>
      <div
        id={`collapse-${id}`}
        className={`accordion-collapse collapse ${isShow?'show':''}`}
        aria-labelledby={`heading-${id}`}
        data-bs-parent={`#${parent}`}
      >
        <div className="accordion-body">
          <p>
           {localizedDesc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
