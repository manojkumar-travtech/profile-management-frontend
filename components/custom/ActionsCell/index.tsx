import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";

interface ActionsCellProps<T> {
  row: T;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  onMore?: (item: T) => void;
  showEdit?: boolean;
  showDelete?: boolean;
  showView?: boolean;
  showMore?: boolean;
}

function ActionsCell<T>({
  row,
  onEdit,
  onDelete,
  onView,
  onMore,
  showEdit = false,
  showDelete = false,
  showView = false,
  showMore = false,
}: ActionsCellProps<T>) {
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    callback?: (item: T) => void
  ) => {
    e.stopPropagation();
    callback?.(row);
  };

  return (
    <div className="flex gap-2">
      {showDelete && (
        <button
          onClick={(e) => handleClick(e, onDelete)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <Trash className="w-4 h-4 text-gray-600" />
        </button>
      )}
      {showEdit && (
        <button
          onClick={(e) => handleClick(e, onEdit)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <Pencil className="w-4 h-4 text-gray-600" />
        </button>
      )}
      {showView && (
        <button
          onClick={(e) => handleClick(e, onView)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <Eye className="w-4 h-4 text-gray-600" />
        </button>
      )}
      {showMore && (
        <button
          onClick={(e) => handleClick(e, onMore)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <MoreHorizontal className="w-4 h-4 text-gray-600" />
        </button>
      )}
    </div>
  );
}

export default ActionsCell;
