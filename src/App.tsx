import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

type SortField = typeof ALPHABETICALLY | typeof LENGTH | ''

const ALPHABETICALLY = 'alphabetically';
const LENGTH = 'length';

export const goodsFromServer:string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App:React.FC = () => {
  const [sortField, setSortField] = useState<SortField>('');
  const [reverse, setReverse] = useState<boolean>(false);

  const visibleGoods = [...goodsFromServer].sort((good1:string, good2:string) => {
    switch (sortField) {
      case ALPHABETICALLY:
        return good1.toLowerCase().localeCompare(good2.toLowerCase());
      case LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reverse) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(ALPHABETICALLY)}
          type="button"
          className={`button is-info ${sortField !== ALPHABETICALLY ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(LENGTH)}
          type="button"
          className={`button is-success ${sortField !== LENGTH ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={`button is-warning ${!reverse? 'is-light' : ''}`}
        >
          Reverse
        </button>
        {(sortField !== '' || reverse) && (
          <button
            onClick={() => {
              setSortField('');
              setReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
