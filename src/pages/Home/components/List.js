import Item from "./Item";

const List = ({
  listData,
  modifyData,
  reflashStatus,
  completeStatus,
  editStatus,
}) => {
  return (
    <div className="list">
      {listData.map((item) => {
        const { title, content, id, status } = item;
        return (
          <Item
            key={id}
            id={id}
            title={title}
            content={content}
            status={status}
            modifyData={modifyData}
            reflashStatus={reflashStatus}
            completeStatus={completeStatus}
            editStatus={editStatus}
          />
        );
      })}
    </div>
  );
};

export default List;
