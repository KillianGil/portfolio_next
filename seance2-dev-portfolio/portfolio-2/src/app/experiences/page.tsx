import React from 'react';
import MorphingText from '@/components/ui/morphing';
import { ExpandableCardDemo } from '@/components/ui/grid-experience';

const page = () => {
  return (
    <div>
      <div className="mb-10">
        <MorphingText texts={['Mes Expériences', 'Mes Stages', 'Mes Jobs']} />
      </div>
      <div className="mb-20">
        <ExpandableCardDemo />
      </div>
    </div>
  );
};

export default page;