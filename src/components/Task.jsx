import PropTypes from "prop-types";
export default function Task({
  task: { id, title, state },
  onArchiveTask,
  onTogglePinTask,
  onEditTitle,
}) {
  return (
    <div
      className={`list-item ${state}`}
      role="listitem"
      aria-label={`task-${id}`}
    >
      <label
        htmlFor="checked"
        aria-label={`archiveTask-${id}`}
        className="checkbox"
      >
        <input
          type="checkbox"
          disabled={true}
          name="checked"
          id={`archiveTask-${id}`}
          checked={state === "TASK_ARCHIVED"}
        />
        <span
          className="checkbox-custom"
          onClick={() => onArchiveTask("ARCHIVE_TASK", id)}
          role="button"
          aria-label={`archiveButton-${id}`}
        />
      </label>

      <label htmlFor="title" aria-label={title} className="title">
        <input
          type="text"
          value={title}
          name="title"
          placeholder="Input title"
          style={{ textOverflow: "ellipsis" }}
          onChange={(e) => onEditTitle(e.target.value, id)}
        />
      </label>

      {state !== "TASK_ARCHIVED" && (
        <button
          className="pin-button"
          onClick={() => onTogglePinTask(state, id)}
          id={`pinTask-${id}`}
          aria-label={state === "TASK_PINNED" ? "unpin" : "pin"}
          key={`pinTask-${id}`}
        >
          <span className={`icon-star`} />
        </button>
      )}
    </div>
  );
}

Task.propTypes = {
  /** Composition of the task */
  task: PropTypes.shape({
    /** Id of the task */
    id: PropTypes.string.isRequired,
    /** Title of the task */
    title: PropTypes.string.isRequired,
    /** Current state of the task */
    state: PropTypes.string.isRequired,
  }),
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func.isRequired,
  /** Event to change the task to pinned */
  onTogglePinTask: PropTypes.func.isRequired,
  /** Event to change the task title */
  onEditTitle: PropTypes.func.isRequired,
};
