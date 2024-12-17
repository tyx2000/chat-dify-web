'use client';

import styles from './index.module.css';

import { ChevronDownIcon, CheckCircleFillIcon } from '../icons';
import { useState } from 'react';
import { models } from '@/constances/models';
import { changeModelId } from '@/actions/chat';

export default function ModelSelector({
  selectedModelId,
}: {
  selectedModelId: string;
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div
      className={styles.modelSelector}
      onClick={() => setShowDropdown((c) => !c)}
    >
      <div className={styles.modelName}>{selectedModelId}</div>
      <div
        className={[
          styles.arrowIcon,
          showDropdown ? styles.rotateArrowIcon : '',
        ].join(' ')}
      >
        <ChevronDownIcon />
      </div>

      <div
        className={[
          styles.dropdown,
          showDropdown ? styles.showDropdown : '',
        ].join(' ')}
      >
        {models.map((model) => (
          <div
            key={model.id}
            className={styles.modelOption}
            onClick={async () => await changeModelId(model.id)}
          >
            <div>
              <div>{model.id}</div>
              <div>{model.description}</div>
            </div>
            <div>{selectedModelId === model.id && <CheckCircleFillIcon />}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
