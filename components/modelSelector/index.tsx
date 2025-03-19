import styles from './index.module.css';

import { ChevronDownIcon } from '../icons';
import { models } from '@/constances/models';
import { changeModelId } from '@/actions/chat';

export default function ModelSelector({
  selectedModelId,
}: {
  selectedModelId: string;
}) {
  return (
    <div className={styles.modelSelector}>
      <div className={styles.modelName}>{selectedModelId}</div>
      <div className={styles.arrowIcon}>
        <ChevronDownIcon />
      </div>

      <div className={styles.dropdown}>
        {models.map((model) => (
          <div
            key={model.id}
            className={[
              styles.modelOption,
              selectedModelId === model.id ? styles.selectedModelOption : '',
            ].join(' ')}
            onClick={async () => await changeModelId(model.id)}
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
