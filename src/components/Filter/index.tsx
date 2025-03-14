import Select from 'react-select';

import './filter.scss';

function Filter({
  options,
  onChange,
  loading,
}: {
  options: {
    label: string;
    value: string;
  }[];
  onChange: (value: any) => void;
  loading: boolean;
}) {
  return (
    <Select
      className="filter__wrapper"
      classNamePrefix="select"
      defaultValue={options[0]}
      isLoading={loading}
      isSearchable={true}
      options={options}
      onChange={onChange}
    />
  );
}

export default Filter;
