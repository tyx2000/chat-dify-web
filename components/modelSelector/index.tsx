import styles from './index.module.css';

import { ChevronDownIcon } from '../icons';
import { models } from '@/constances/models';
import { changeModelId } from '@/actions/chat';
import { useRef, useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';

export default function ModelSelector({
  selectedModelId,
}: {
  selectedModelId: string;
}) {
  // @ts-ignore
  const selectorRef = useRef<HTMLElement>();
  const [showModelOptions, setShowModleOptions] = useState(false);

  useClickOutside(selectorRef, () => {
    setShowModleOptions(false);
  });

  return (
    <div className={styles.container}>
      <div
        // @ts-ignore
        ref={selectorRef}
        className={styles.modelSelector}
        onClick={() => setShowModleOptions((c) => !c)}
      >
        <div className={styles.modelName}>{selectedModelId}</div>
        <div className={styles.arrowIcon}>
          <ChevronDownIcon />
        </div>
      </div>

      <div
        className={[
          styles.dropdown,
          showModelOptions ? styles.showDropdown : '',
        ].join(' ')}
      >
        {models.map((model) => (
          <div
            key={model.id}
            className={[
              styles.modelOption,
              selectedModelId === model.id ? styles.selectedModelOption : '',
            ].join(' ')}
            onClick={async (e) => {
              await changeModelId(model.id);
              e.stopPropagation();
              setShowModleOptions(false);
            }}
          >
            <div>
              <div>{model.id}</div>
              <div>{model.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
