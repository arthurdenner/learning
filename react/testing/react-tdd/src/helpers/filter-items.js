import { filter } from 'lodash/fp';

const filterItems = (search, items) => {
  const string = search
    .replace(/[áàâãäa]/gi, '[áàâãäa]')
    .replace(/[éèêẽëe]/gi, '[éèêẽëe]')
    .replace(/[íìîĩïi]/gi, '[íìîĩïi]')
    .replace(/[óòôõöo]/gi, '[óòôõöo]')
    .replace(/[úùûũüu]/gi, '[úùûũüu]')
    .replace(/[cç]/gi, '[cç]');

  const re = new RegExp(string, 'i');

  return filter(item => re.test(item.name) || re.test(item.brand), items);
};

export default filterItems;
