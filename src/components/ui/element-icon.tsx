import type { ComponentProps } from 'react';

import paper from '@/assets/paper.png';
import rock from '@/assets/rock.png';
import scissors from '@/assets/scissors.png';
import type { ElementTypes } from '@/classes/QuadTree';

interface IElementIcon extends ComponentProps<'img'> {
  elementType: ElementTypes;
}

const elementTypeIcon: Record<ElementTypes, string> = {
  rock,
  paper,
  scissors
};

const ElementIcon = ({ elementType, ...props }: IElementIcon) => (
  <img {...props} src={elementTypeIcon[elementType]} alt={elementType} />
);

export { ElementIcon };
