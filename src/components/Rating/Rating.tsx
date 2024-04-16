import { useMemo, useState } from "react";
import { styled, css } from "styled-components";

import { RatingProps } from "./types";

import "./Rating.scss";

const ElementContainer = styled.div<{
  $isSelected: boolean;
  $elementSize: string;
  $elementSelectedColor: string;
  $currentIndex: number | null;
  $disabled: boolean | undefined;
}>`
  color: ${(props) =>
    props.$isSelected ? props.$elementSelectedColor : "#b3b3b3"};
  font-size: ${(props) => props.$elementSize};
  transition: color 0.2s linear;

  &:hover {
    color: ${(props) => (props.$disabled ? null : props.$elementSelectedColor)};
  }

  ${(props) => {
    let styles = "";

    if (!props.$currentIndex) return styles;

    for (let i = 1; i < props.$currentIndex; i++) {
      styles += `&:nth-child(${i}) {
            color: ${props.$elementSelectedColor};
          } `;
    }

    return css`
      ${styles}
    `;
  }}
`;

export default function ({
  ratingSpan,
  element,
  elementSize,
  elementSelectedColor,
  ratingNumber,
  disabled,
  onSelect,
}: RatingProps) {
  const selectedIndexes = ratingNumber
    ? Array(ratingNumber)
        .fill(0)
        .map((_, idx) => idx)
    : [];

  const [addedIndexes, setAddedIndexes] = useState<number[]>(selectedIndexes);
  const [currentIndex, setCurrentIndex] = useState<number | null>(
    ratingNumber || null
  );

  const elements = useMemo(() => {
    const elements = [];

    for (let i = 0; i < ratingSpan; i++) {
      elements.push(element);
    }

    return elements;
  }, [element]);

  const handleSelectRating = (idx: number) => {
    if (disabled) return;

    if (addedIndexes.includes(idx)) {
      if (addedIndexes.length <= 1) setAddedIndexes([]);
      else setAddedIndexes(addedIndexes.filter((i) => i <= idx));
    } else {
      setAddedIndexes(Array.from({ length: idx + 1 }, (_, i) => i));
    }

    onSelect && onSelect(idx + 1);
  };

  const handleSetCurrentIndex = (idx: number | null) => {
    if (disabled) return;

    setCurrentIndex(idx);
  };

  return (
    <div className="Rating">
      {elements.map((element, idx) => (
        <ElementContainer
          $isSelected={!!addedIndexes?.includes(idx)}
          $elementSize={elementSize}
          $elementSelectedColor={elementSelectedColor}
          $currentIndex={currentIndex}
          $disabled={disabled}
          className="element"
          key={idx}
          onClick={() => handleSelectRating(idx)}
          onMouseOver={() => handleSetCurrentIndex(idx + 1)}
          onMouseLeave={() => handleSetCurrentIndex(null)}
        >
          {element}
        </ElementContainer>
      ))}
    </div>
  );
}
