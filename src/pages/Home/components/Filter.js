import FilterButton from "./FilterButton";

const BTN_MAP = {
  All: () => null,
  Pending: () => 0,
  Done: () => 1,
};

const BTN_NAMES = Object.entries(BTN_MAP);

const Filter = ({
  setTaskStatus,
  reflashFilter,
  setFilterName,
  filterName,
}) => {
  const btns = BTN_NAMES.map((btn) => (
    <FilterButton
      btn={btn}
      isPressed={btn[0] === filterName}
      setTaskStatus={setTaskStatus}
      reflashFilter={reflashFilter}
      setFilterName={setFilterName}
    />
  ));

  return <div className="filters btn-group stack-exception">{btns}</div>;
};

export default Filter;
